"use client"

import { useStore } from "@/lib/store"
import { useParams, useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, Phone, MapPin, Building, FileText, History, Euro, Wallet, CreditCard, Ban, CheckCircle, BarChart as BarChartIcon } from "lucide-react"
import Link from "next/link"
import { Client } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { TierForm } from "@/components/forms/tier-form"
import { useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export default function ClientPage() {
    const { id } = useParams()
    const router = useRouter()
    const { tiers, updateTier } = useStore()
    const [isEditOpen, setIsEditOpen] = useState(false)

    const client = tiers.find(t => t.id === id) as Client | undefined

    if (!client) {
        return <div className="p-8">Client introuvable</div>
    }

    const handleToggleActive = () => {
        updateTier(client.id, { active: !client.active })
    }

    // Mock stats data
    const statsData = [
        { name: 'Jan', total: 1200 },
        { name: 'Fév', total: 2100 },
        { name: 'Mar', total: 800 },
        { name: 'Avr', total: 1600 },
        { name: 'Mai', total: 900 },
        { name: 'Juin', total: 1700 },
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/clients">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div className="flex-1 flex items-center gap-4">
                    <Avatar className="h-12 w-12 border">
                        <AvatarImage src={`https://ui.shadcn.com/avatars/${parseInt(client.id.replace(/\D/g, '')) % 5}.png`} />
                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold">{client.name}</h1>
                            {!client.active && <Badge variant="destructive">Inactif</Badge>}
                            {client.segment && <Badge variant="secondary">{client.segment}</Badge>}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {client.email}</span>
                            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {client.phoneNumber}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleToggleActive} className={client.active ? "text-red-600 hover:text-red-700 hover:bg-red-50" : "text-green-600 hover:text-green-700 hover:bg-green-50"}>
                        {client.active ? <><Ban className="mr-2 h-4 w-4" /> Désactiver</> : <><CheckCircle className="mr-2 h-4 w-4" /> Activer</>}
                    </Button>

                    <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
                        <SheetTrigger asChild>
                            <Button>Modifier</Button>
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-[500px] overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle>Modifier le Client</SheetTitle>
                                <SheetDescription>Modifiez les informations ci-dessous.</SheetDescription>
                            </SheetHeader>
                            <div className="py-6">
                                <TierForm tier={client} onSuccess={() => setIsEditOpen(false)} />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <Tabs defaultValue="profil" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0">
                    <TabsTrigger value="profil" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none h-full px-8">Profil</TabsTrigger>
                    <TabsTrigger value="finance" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none h-full px-8">Finance</TabsTrigger>
                    <TabsTrigger value="stats" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none h-full px-8">Statistiques</TabsTrigger>
                    <TabsTrigger value="factures" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none h-full px-8">Factures ({client.factures?.length || 0})</TabsTrigger>
                    <TabsTrigger value="comms" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none h-full px-8">Communications</TabsTrigger>
                </TabsList>

                <TabsContent value="profil" className="pt-6">
                    <div className="grid grid-cols-3 gap-6">
                        <Card className="col-span-2 shadow-sm border-0 bg-gray-50/50">
                            <CardHeader>
                                <CardTitle>Informations Générales</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="bg-white p-4 rounded-lg shadow-sm border grid grid-cols-2 gap-x-8 gap-y-4">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Identifiant Unique (NUI)</label>
                                        <p className="font-medium mt-1">{client.nui || 'Non défini'}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Secteur</label>
                                        <p className="font-medium mt-1 capitalize">{client.secteurActivite?.toLowerCase() || '-'}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Taille</label>
                                        <p className="font-medium mt-1">{client.tailleEntreprise || '-'}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date création</label>
                                        <p className="font-medium mt-1">{client.dateCreation ? new Date(client.dateCreation).toLocaleDateString() : '-'}</p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg shadow-sm border">
                                    <h4 className="flex items-center gap-2 font-semibold mb-4 text-gray-800">
                                        <MapPin className="h-4 w-4 text-blue-600" /> Adresse
                                    </h4>
                                    <p className="text-gray-700">{client.address}</p>
                                    {client.complement && <p className="text-gray-500 text-sm mt-1">{client.complement}</p>}
                                    <p className="text-gray-700 mt-1">{client.postalCode} {client.city}</p>
                                    <p className="text-gray-700 mt-1 uppercase">{client.pays}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-6">
                            <Card className="shadow-sm border-0 bg-white">
                                <CardHeader>
                                    <CardTitle>Contacts Clés</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {client.contacts?.map((contact) => (
                                        <div key={contact.id} className="flex gap-3 pb-3 border-b last:border-0 last:pb-0">
                                            <Avatar className="h-9 w-9">
                                                <AvatarFallback>{contact.nom.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium text-sm">{contact.nom}</p>
                                                <p className="text-xs text-gray-500">{contact.poste}</p>
                                                <div className="flex gap-2 mt-1">
                                                    <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline text-xs">{contact.email}</a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {(!client.contacts || client.contacts.length === 0) && <p className="text-sm text-gray-500 italic">Aucun contact enregistré.</p>}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="finance" className="pt-6">
                    <div className="grid grid-cols-3 gap-6">
                        {/* Balance & Status */}
                        <div className="col-span-1 space-y-6">
                            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg border-0">
                                <CardContent className="pt-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-blue-100 text-sm font-medium">Solde Actuel</p>
                                            <h3 className="text-3xl font-bold mt-2">
                                                {client.financial?.solde?.toLocaleString('fr-FR', { style: 'currency', currency: client.financial.devise || 'EUR' }) || '0,00 €'}
                                            </h3>
                                        </div>
                                        <Wallet className="h-8 w-8 text-blue-200 opacity-50" />
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-blue-500/30 flex justify-between text-sm">
                                        <span className="text-blue-100">Plafond Crédit</span>
                                        <span className="font-semibold">{client.plafondCredit?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) || '-'}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Payment Methods */}
                        <Card className="col-span-2 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-gray-500" />
                                    Modes de Paiement Autorisés
                                </CardTitle>
                                <CardDescription>Moyens de paiement validés pour ce client.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-2 flex-wrap">
                                    {client.financial?.modesPaiementAutorises?.map((mode) => (
                                        <Badge key={mode} variant="secondary" className="px-3 py-1 text-sm font-medium">
                                            {mode}
                                        </Badge>
                                    ))}
                                    {(!client.financial?.modesPaiementAutorises || client.financial.modesPaiementAutorises.length === 0) && (
                                        <p className="text-sm text-gray-500 italic">Aucun mode de paiement spécifié.</p>
                                    )}
                                </div>

                                <div className="mt-8">
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Informations Bancaires (RIB)</h4>
                                    <div className="p-4 bg-gray-50 rounded border font-mono text-sm text-gray-600 break-all">
                                        {client.financial?.rib || 'Aucun RIB enregistré.'}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="stats" className="pt-6">
                    <div className="grid grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Volume d'Affaires</CardTitle>
                                <CardDescription>Projection sur les 6 derniers mois</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={statsData}>
                                        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}€`} />
                                        <Tooltip />
                                        <Bar dataKey="total" fill="#2563eb" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Répartition des Achats</CardTitle>
                                <CardDescription>Par catégorie de produit</CardDescription>
                            </CardHeader>
                            <CardContent className="flex items-center justify-center h-[300px] text-gray-500">
                                Graphique en construction...
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="factures" className="pt-6">
                    <Card className="shadow-sm border">
                        <CardHeader><CardTitle>Historique des Factures</CardTitle></CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {client.factures?.map(facture => (
                                    <div key={facture.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <FileText className="h-8 w-8 text-blue-500 p-1.5 bg-blue-100 rounded-lg" />
                                            <div>
                                                <p className="font-medium">{facture.numero}</p>
                                                <p className="text-xs text-gray-500">Du {new Date(facture.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">{facture.montantTTC.toFixed(2)} €</p>
                                            <Badge variant={facture.statut === 'payée' ? 'secondary' : 'destructive'} className="text-xs capitalize">{facture.statut}</Badge>
                                        </div>
                                    </div>
                                ))}
                                {(!client.factures || client.factures.length === 0) && <p className="text-center py-8 text-gray-500">Aucune facture.</p>}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="comms" className="pt-6">
                    <Card className="shadow-sm border">
                        <CardHeader><CardTitle>Journal des échanges</CardTitle></CardHeader>
                        <CardContent>
                            <div className="space-y-6 relative border-l ml-3 pl-8">
                                {client.communications?.map((comm, idx) => (
                                    <div key={comm.id} className="relative">
                                        <span className="absolute -left-[41px] bg-white border-2 border-blue-500 rounded-full h-4 w-4 mt-1.5 ring-4 ring-white"></span>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 uppercase">{comm.type}</span>
                                                <span className="text-xs text-gray-500">{new Date(comm.date).toLocaleDateString()}</span>
                                            </div>
                                            <p className="font-medium">{comm.sujet}</p>
                                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border">{comm.contenu}</p>
                                        </div>
                                    </div>
                                ))}
                                {(!client.communications || client.communications.length === 0) && <p className="text-sm text-gray-500 -ml-5">Aucune communication enregistrée.</p>}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>
    )
}
