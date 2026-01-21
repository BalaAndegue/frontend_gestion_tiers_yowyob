"use client"

import { useStore } from "@/lib/store"
import { useParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, Phone, MapPin, Building, Truck, CreditCard, Ban, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Fournisseur } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { TierForm } from "@/components/forms/tier-form"
import { TierStats } from "@/components/tier-stats"
import { useState } from "react"

export default function SupplierPage() {
    const { id } = useParams()
    const { tiers, updateTier } = useStore()
    const [isEditOpen, setIsEditOpen] = useState(false)

    const supplier = tiers.find(t => t.id === id) as Fournisseur | undefined

    if (!supplier) {
        return <div className="p-8">Fournisseur introuvable</div>
    }

    const handleToggleActive = () => {
        updateTier(supplier.id, { active: !supplier.active })
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/fournisseurs">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div className="flex-1 flex items-center gap-4">
                    <Avatar className="h-12 w-12 border">
                        <AvatarImage src={`https://ui.shadcn.com/avatars/${parseInt(supplier.id.replace(/\D/g, '')) % 5}.png`} />
                        <AvatarFallback>{supplier.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold">{supplier.name}</h1>
                            {!supplier.active && <Badge variant="destructive">Inactif</Badge>}
                            <Badge variant="outline">Fournisseur</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {supplier.email}</span>
                            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {supplier.phoneNumber}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleToggleActive} className={supplier.active ? "text-red-600" : "text-green-600"}>
                        {supplier.active ? <><Ban className="mr-2 h-4 w-4" /> Désactiver</> : <><CheckCircle className="mr-2 h-4 w-4" /> Activer</>}
                    </Button>
                    <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
                        <SheetTrigger asChild>
                            <Button>Modifier</Button>
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-[500px] overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle>Modifier le Fournisseur</SheetTitle>
                                <SheetDescription>Modifiez les informations ci-dessous.</SheetDescription>
                            </SheetHeader>
                            <div className="py-6">
                                <TierForm tier={supplier} onSuccess={() => setIsEditOpen(false)} />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <Tabs defaultValue="profil" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0">
                    <TabsTrigger value="profil" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none h-full px-8">Profil</TabsTrigger>
                    <TabsTrigger value="commandes" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none h-full px-8">Commandes</TabsTrigger>
                    <TabsTrigger value="stats" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none h-full px-8">Statistiques</TabsTrigger>
                </TabsList>

                <TabsContent value="stats" className="pt-6">
                    <TierStats type="fournisseur" />
                </TabsContent>

                <TabsContent value="profil" className="pt-6">
                    <div className="grid grid-cols-3 gap-6">
                        <Card className="col-span-2 shadow-sm border-0 bg-gray-50/50">
                            <CardHeader>
                                <CardTitle>Informations Fournisseur</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="bg-white p-4 rounded-lg shadow-sm border grid grid-cols-2 gap-x-8 gap-y-4">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Identifiant (NUI)</label>
                                        <p className="font-medium mt-1">{supplier.nui || 'Non défini'}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Mode de Paiement</label>
                                        <p className="font-medium mt-1 uppercase text-blue-600">{supplier.modePaiement}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Secteur</label>
                                        <p className="font-medium mt-1 capitalize">{supplier.secteurActivite?.toLowerCase() || '-'}</p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg shadow-sm border">
                                    <h4 className="flex items-center gap-2 font-semibold mb-4 text-gray-800">
                                        <MapPin className="h-4 w-4 text-blue-600" /> Coordonnées
                                    </h4>
                                    <p className="text-gray-700">{supplier.address || 'Adresse non renseignée'}</p>
                                    <p className="text-gray-700 mt-1">{supplier.city}</p>
                                    <p className="text-gray-700 mt-1 uppercase">{supplier.pays}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="commandes" className="pt-6">
                    <Card className="shadow-sm border">
                        <CardHeader><CardTitle>Historique des Commandes</CardTitle></CardHeader>
                        <CardContent className="text-center py-8 text-gray-500">
                            Module d'achat en cours de développement.
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
