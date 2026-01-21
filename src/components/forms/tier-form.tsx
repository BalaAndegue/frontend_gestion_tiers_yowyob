"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tier, Client, Fournisseur, Commercial, Prospect } from "@/types"
import { useStore } from "@/lib/store"

const tierSchema = z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    // Client specific
    segment: z.enum(['PARTICULIER', 'ENTREPRISE', 'REVENDEUR']).optional(),
    plafondCredit: z.coerce.number().optional(),
    // Fournisseur specific
    modePaiement: z.enum(['VIREMENT', 'CHEQUE', 'TRAITE']).optional(),
    // Commercial
    commission: z.coerce.number().optional(),
    // Prospect
    potentiel: z.enum(['FAIBLE', 'MOYEN', 'ELEVE', 'STRATEGIQUE']).optional(),
})

type TierFormValues = z.infer<typeof tierSchema>

interface TierFormProps {
    tier: Tier
    onSuccess?: () => void
}

export function TierForm({ tier, onSuccess }: TierFormProps) {
    const { updateTier } = useStore()

    // Helper to safely extract values based on type
    const getDefaultValues = (): Partial<TierFormValues> => {
        const base = {
            name: tier.name,
            email: tier.email,
            phoneNumber: tier.phoneNumber,
            address: tier.address || "",
            city: tier.city || "",
        }

        if (tier.type === 'client') {
            const c = tier as Client
            return { ...base, segment: c.segment, plafondCredit: c.plafondCredit }
        }
        if (tier.type === 'fournisseur') {
            const f = tier as Fournisseur
            return { ...base, modePaiement: f.modePaiement }
        }
        if (tier.type === 'commercial') {
            const c = tier as Commercial
            return { ...base, commission: c.commission }
        }
        if (tier.type === 'prospect') {
            const p = tier as Prospect
            return { ...base, potentiel: p.potentiel }
        }
        return base
    }

    const form = useForm<TierFormValues>({
        resolver: zodResolver(tierSchema) as any,
        defaultValues: getDefaultValues(),
    })

    function onSubmit(values: TierFormValues) {
        updateTier(tier.id, values)
        if (onSuccess) onSuccess()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom / Raison Sociale</FormLabel>
                            <FormControl>
                                <Input placeholder="Acme Corp" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="contact@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Téléphone</FormLabel>
                                <FormControl>
                                    <Input placeholder="+33..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adresse</FormLabel>
                                <FormControl>
                                    <Input placeholder="123 Rue..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ville</FormLabel>
                                <FormControl>
                                    <Input placeholder="Paris" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {tier.type === 'client' && (
                    <div className="p-4 bg-blue-50 rounded-lg space-y-4">
                        <h4 className="font-medium text-blue-900">Options Client</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="segment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Segment</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionner" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="PARTICULIER">Particulier</SelectItem>
                                                <SelectItem value="ENTREPRISE">Entreprise</SelectItem>
                                                <SelectItem value="REVENDEUR">Revendeur</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="plafondCredit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Plafond Crédit (€)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                )}

                {tier.type === 'fournisseur' && (
                    <FormField
                        control={form.control}
                        name="modePaiement"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mode de Paiement</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="VIREMENT">Virement</SelectItem>
                                        <SelectItem value="CHEQUE">Chèque</SelectItem>
                                        <SelectItem value="TRAITE">Traite</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                {tier.type === 'commercial' && (
                    <FormField
                        control={form.control}
                        name="commission"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Commission (%)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                {tier.type === 'prospect' && (
                    <FormField
                        control={form.control}
                        name="potentiel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Potentiel</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="FAIBLE">Faible</SelectItem>
                                        <SelectItem value="MOYEN">Moyen</SelectItem>
                                        <SelectItem value="ELEVE">Élevé</SelectItem>
                                        <SelectItem value="STRATEGIQUE">Stratégique</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <div className="flex justify-end pt-4">
                    <Button type="submit">Enregistrer</Button>
                </div>
            </form>
        </Form>
    )
}
