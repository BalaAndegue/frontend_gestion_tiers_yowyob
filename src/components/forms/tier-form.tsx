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
    FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useStore } from "@/lib/store"
import { ClientDTO, FournisseurDTO, CommercialDTO, ProspectDTO } from "@/lib"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" // Assuming these exist or using basic divs if not
import { cn } from "@/lib/utils"

// Enums from lib
const { segment, typeClientOhada } = ClientDTO
const { modePaiement, typeFournisseurOhada } = FournisseurDTO
const { typeCommercial, typePersonnelOhada } = CommercialDTO
const { typeProspectOhada } = ProspectDTO

// Common Schema
const baseSchema = z.object({
    code: z.string().optional().default(""),
    name: z.string().min(2, "Le nom est requis"),
    shortName: z.string().optional().or(z.literal("")),
    description: z.string().optional().or(z.literal("")),
    email: z.string().email("Email invalide").optional().or(z.literal("")),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    complement: z.string().optional().or(z.literal("")),
    postalCode: z.string().optional().or(z.literal("")),
    city: z.string().optional(),
    pays: z.enum(['CMR', 'CG', 'TC', 'GB', 'CI']).optional(),
    website: z.string().optional().or(z.literal("")),
    secteurActivite: z.string().optional(),
    tailleEntreprise: z.string().optional(),
    compteComptable: z.string().optional(),
    numeroFiscal: z.string().optional(),
    registreCommerce: z.string().optional(),
    active: z.boolean().default(true),
})

// ... (schema extensions remain the same) ...



// Specific Schemas
const clientSchema = baseSchema.extend({
    // Using nativeEnum or string if simple match needed
    segment: z.nativeEnum(segment).optional(),
    typeClientOhada: z.nativeEnum(typeClientOhada).optional(),
    plafondCredit: z.coerce.number().optional(),
    estAssujettiTVA: z.boolean().optional(),
})

const fournisseurSchema = baseSchema.extend({
    modePaiement: z.nativeEnum(modePaiement).optional(),
    typeFournisseurOhada: z.nativeEnum(typeFournisseurOhada).optional(),
    delaiLivraison: z.string().optional(),
})

const commercialSchema = baseSchema.extend({
    typeCommercial: z.nativeEnum(typeCommercial).optional(),
    typePersonnelOhada: z.nativeEnum(typePersonnelOhada).optional(),
    commission: z.coerce.number().optional(),
    zonesCouvertes: z.string().optional(),
})

const prospectSchema = baseSchema.extend({
    typeProspectOhada: z.nativeEnum(typeProspectOhada).optional(),
    potentiel: z.enum(['FAIBLE', 'MOYEN', 'ELEVE', 'STRATEGIQUE']).optional(),
    sourceProspect: z.string().optional(),
})

// Union type for form values
type TierFormValues = z.infer<typeof clientSchema> & z.infer<typeof fournisseurSchema> & z.infer<typeof commercialSchema> & z.infer<typeof prospectSchema> & { type: string }

// Combined Schema for resolver (simplified for this UI which handles one type at a time usually, but we need one resolver)
// Actually we can dynamically pick schema based on type, but for simplicity let's use a superset or conditional
const dynamicSchema = (type: string) => {
    switch (type) {
        case 'client': return clientSchema
        case 'fournisseur': return fournisseurSchema
        case 'commercial': return commercialSchema
        case 'prospect': return prospectSchema
        default: return baseSchema
    }
}

interface TierFormProps {
    tier: any // Using any to accept simplified Tier object or DTO
    onSuccess?: () => void
}

export function TierForm({ tier, onSuccess }: TierFormProps) {
    const { updateTier, addTier, isLoading } = useStore()
    const type = tier.type || 'client'
    const defaultCode = tier.code || `TIER-${Date.now().toString().slice(-6)}`

    const form = useForm<TierFormValues>({
        resolver: zodResolver(dynamicSchema(type) as any),
        defaultValues: {
            code: defaultCode,
            ...tier,
            // Ensure fields are not undefined/null for controlled inputs
            email: tier.email || "",
            website: tier.website || "",
            address: tier.address || "",
            city: tier.city || "",
            phoneNumber: tier.phoneNumber || "",
            plafondCredit: tier.plafondCredit || 0,
            commission: tier.commission || 0,
        },
    })

    async function onSubmit(values: TierFormValues) {
        try {
            // Determine if creating or updating
            if (tier.id) {
                await updateTier(tier.id, values as any)
            } else {
                await addTier({ ...values, type } as any)
            }
            if (onSuccess) onSuccess()
        } catch (error) {
            console.error("Form submission error", error)
            // Ideally set form error here
        }
    }

    // Gmail-like Section Container
    const Section = ({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) => (
        <div className={cn("bg-white rounded-lg border border-gray-200 shadow-sm mb-6 overflow-hidden", className)}>
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">{title}</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {children}
            </div>
        </div>
    )

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto py-6">

                {/* Header / Actions can go here if needed */}

                <Section title="Informations Générales">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Nom / Raison Sociale</FormLabel>
                                <FormControl>
                                    <Input className="bg-gray-50 focus:bg-white transition-colors" placeholder="Ex: Entreprise S.A.R.L" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type de Tiers</FormLabel>
                                <FormControl>
                                    <Input disabled value={type.toUpperCase()} className="bg-gray-100 text-gray-500" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Professionnel</FormLabel>
                                <FormControl>
                                    <Input placeholder="contact@entreprise.com" {...field} />
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
                                    <Input placeholder="+237..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Site Web</FormLabel>
                                <FormControl>
                                    <Input placeholder="www.entreprise.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Section>

                <Section title="Coordonnées & Localisation">
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Adresse Complète</FormLabel>
                                <FormControl>
                                    <Input placeholder="123 Rue de la République" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="complement"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Complément Adresse</FormLabel>
                                <FormControl>
                                    <Input placeholder="Batiment B, 2ème étage..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Code Postal</FormLabel>
                                <FormControl>
                                    <Input placeholder="BP 1234" {...field} />
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
                                    <Input placeholder="Douala" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="pays"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pays</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner le pays" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="CMR">Cameroun (CMR)</SelectItem>
                                        <SelectItem value="CG">Congo (CG)</SelectItem>
                                        <SelectItem value="TC">Tchad (TC)</SelectItem>
                                        <SelectItem value="GB">Gabon (GB)</SelectItem>
                                        <SelectItem value="CI">Côte d'Ivoire (CI)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Section>

                <Section title="Informations Légales & Fiscales">
                    <FormField
                        control={form.control}
                        name="compteComptable"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Compte Comptable</FormLabel>
                                <FormControl>
                                    <Input placeholder="411100" {...field} />
                                </FormControl>
                                <FormDescription className="text-xs">Généralement auto-généré</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="numeroFiscal"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Numéro Fiscal (NIU)</FormLabel>
                                <FormControl>
                                    <Input placeholder="M05..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="registreCommerce"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Registre de Commerce</FormLabel>
                                <FormControl>
                                    <Input placeholder="RC/..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Section>

                {/* Dynamic Sections Based on Type */}

                {type === 'client' && (
                    <Section title="Configuration Client">
                        <FormField
                            control={form.control}
                            name="typeClientOhada"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type OHADA</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner le type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(typeClientOhada).map((v) => (
                                                <SelectItem key={v} value={v}>{v}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="segment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Segment</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner le segment" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(segment).map((v) => (
                                                <SelectItem key={v} value={v}>{v}</SelectItem>
                                            ))}
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
                                    <FormLabel>Plafond Crédit</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input type="number" {...field} className="pl-8" />
                                            <span className="absolute left-3 top-2.5 text-gray-400">€</span>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </Section>
                )}

                {type === 'fournisseur' && (
                    <Section title="Configuration Fournisseur">
                        <FormField
                            control={form.control}
                            name="typeFournisseurOhada"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type OHADA</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner le type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(typeFournisseurOhada).map((v) => (
                                                <SelectItem key={v} value={v}>{v}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="modePaiement"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mode de Paiement</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choisir..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(modePaiement).map((v) => (
                                                <SelectItem key={v} value={v}>{v}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="delaiLivraison"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Délai Livraison (jours)</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </Section>
                )}

                {type === 'commercial' && (
                    <Section title="Données Commerciales">
                        <FormField
                            control={form.control}
                            name="typeCommercial"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type de Contrat</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choisir..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(typeCommercial).map((v) => (
                                                <SelectItem key={v} value={v}>{v}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="commission"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Commission (%)</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.1" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="zonesCouvertes"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Zones Couvertes</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nord, Littoral..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </Section>
                )}

                {type === 'prospect' && (
                    <Section title="Suivi Prospect">
                        <FormField
                            control={form.control}
                            name="typeProspectOhada"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Classification</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choisir..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(typeProspectOhada).map((v) => (
                                                <SelectItem key={v} value={v}>{v}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="potentiel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Potentiel</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Niveau" />
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
                        <FormField
                            control={form.control}
                            name="sourceProspect"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Source</FormLabel>
                                    <FormControl>
                                        <Input placeholder="LinkedIn, Salon..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </Section>
                )}

                <div className="flex justify-end gap-3 pt-6">
                    <Button variant="outline" type="button" onClick={() => window.history.back()}>
                        Annuler
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white min-w-[150px]">
                        Enregistrer les modifications
                    </Button>
                </div>
            </form>
        </Form>
    )
}
