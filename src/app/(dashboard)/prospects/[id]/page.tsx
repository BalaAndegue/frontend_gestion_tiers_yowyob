"use client"

import { Separator } from "@/components/ui/separator"

import { useStore } from "@/lib/store"
import { useParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, Phone, MapPin, Building, MessageSquare, Calendar, PhoneCall, CheckCircle, Ban, History } from "lucide-react"
import Link from "next/link"
import { Prospect } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { TierForm } from "@/components/forms/tier-form"
import { TierStats } from "@/components/tier-stats"
import { useState } from "react"

export default function ProspectPage() {
    const { id } = useParams()
    const { tiers, updateTier } = useStore()
    const [isEditOpen, setIsEditOpen] = useState(false)

    const prospect = tiers.find(t => t.id === id) as Prospect | undefined

    if (!prospect) {
        return <div className="p-8">Prospect introuvable</div>
    }

    const handleToggleActive = () => {
        updateTier(prospect.id, { active: !prospect.active })
    }

    // Mock interactions
    const interactions = [
        { id: 1, type: 'CALL', date: '2023-06-25', note: 'Appel initial, intéressé par le module CRM.' },
        { id: 2, type: 'EMAIL', date: '2023-06-26', note: 'Envoi de la brochure tarifaire.' },
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/prospects">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div className="flex-1 flex items-center gap-4">
                    <Avatar className="h-12 w-12 border">
                        <AvatarImage src={`https://ui.shadcn.com/avatars/${parseInt(prospect.id.replace(/\D/g, '')) % 5}.png`} />
                        <AvatarFallback>{prospect.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold">{prospect.name}</h1>
                            {!prospect.active && <Badge variant="destructive">Inactif</Badge>}
                            <Badge className={prospect.potentiel === 'ELEVE' || prospect.potentiel === 'STRATEGIQUE' ? 'bg-green-600' : 'bg-blue-600'}>
                                {prospect.potentiel}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {prospect.email}</span>
                            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {prospect.phoneNumber}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleToggleActive} className={prospect.active ? "text-red-600" : "text-green-600"}>
                        {prospect.active ? <><Ban className="mr-2 h-4 w-4" /> Désactiver</> : <><CheckCircle className="mr-2 h-4 w-4" /> Activer</>}
                    </Button>
                    <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
                        <SheetTrigger asChild>
                            <Button>Modifier</Button>
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-[500px] overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle>Modifier le Prospect</SheetTitle>
                                <SheetDescription>Modifiez les informations ci-dessous.</SheetDescription>
                            </SheetHeader>
                            <div className="py-6">
                                <TierForm tier={prospect} onSuccess={() => setIsEditOpen(false)} />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <Tabs defaultValue="profil" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0">
                    <TabsTrigger value="profil" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none h-full px-8">Profil</TabsTrigger>
                    <TabsTrigger value="interactions" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none h-full px-8">Interactions</TabsTrigger>
                    <TabsTrigger value="stats" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none h-full px-8">Statistiques</TabsTrigger>
                </TabsList>

                <TabsContent value="stats" className="pt-6">
                    <TierStats type="prospect" />
                </TabsContent>

                <TabsContent value="profil" className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="col-span-2 shadow-sm border border-gray-100 bg-white">
                            <CardHeader className="pb-4 border-b border-gray-50">
                                <CardTitle className="text-lg font-medium text-gray-900">Détails Prospect</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8 pt-6">
                                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Identifiant (NUI)</label>
                                        <p className="text-sm font-medium text-gray-900 mt-1">{prospect.numeroFiscal || prospect.nui || '-'}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Date création</label>
                                        <p className="text-sm font-medium text-gray-900 mt-1">{prospect.createdAt ? new Date(prospect.createdAt).toLocaleDateString() : '-'}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Source</label>
                                        <p className="text-sm font-medium text-gray-900 mt-1">{prospect.sourceProspect || '-'}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h4 className="flex items-center gap-2 text-sm font-semibold mb-4 text-gray-900">
                                        <MapPin className="h-4 w-4 text-gray-500" /> Adresse
                                    </h4>
                                    <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
                                        <div>
                                            <p className="text-gray-900">{prospect.address || 'Non renseignée'}</p>
                                            <p className="text-gray-900 mt-1">{prospect.city}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-gray-900 font-medium uppercase">{prospect.pays}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mt-6">
                                    <h4 className="flex items-center gap-2 font-semibold mb-4 text-gray-900">
                                        <History className="h-4 w-4 text-orange-600" /> Convertir
                                    </h4>
                                    <p className="text-sm text-gray-600 mb-4">Ce prospect est prêt ? Transformez-le en client pour générer des factures.</p>
                                    <div className="flex gap-4">
                                        <Button className="flex-1 bg-green-600 hover:bg-green-700">
                                            <CheckCircle className="mr-2 h-4 w-4" /> Convertir en Client
                                        </Button>
                                        <Button variant="outline" className="flex-1">
                                            <Calendar className="mr-2 h-4 w-4" /> Planifier RDV
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-6">
                            <Card className="shadow-sm border-0 bg-blue-50/50">
                                <CardHeader>
                                    <CardTitle className="text-base text-blue-900">Qualification (BANT)</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Budget</label>
                                        <p className="font-medium text-sm">~ 50k - 100k €</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Autorité</label>
                                        <p className="font-medium text-sm">Décideur (CEO)</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Besoin</label>
                                        <p className="font-medium text-sm">Remplacement ERP actuel</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Timing</label>
                                        <p className="font-medium text-sm">Urgent (Q1 2024)</p>
                                    </div>
                                    <div className="pt-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Probabilité</label>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-green-500" style={{ width: `${prospect.probabilite || 50}%` }}></div>
                                            </div>
                                            <span className="text-sm font-bold">{prospect.probabilite || 50}%</span>
                                        </div>
                                    </div>

                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="interactions" className="pt-6">
                    <Card className="shadow-sm border">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Journal des Interactions</CardTitle>
                                <CardDescription>Historique des contacts avec le prospect</CardDescription>
                            </div>
                            <Button variant="secondary" size="sm">Ajouter</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6 relative border-l ml-3 pl-8">
                                {interactions.map((interaction) => (
                                    <div key={interaction.id} className="relative">
                                        <span className="absolute -left-[41px] bg-white border-2 border-orange-500 rounded-full h-4 w-4 mt-1.5 ring-4 ring-white"></span>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge variant="outline" className="text-xs">{interaction.type}</Badge>
                                                <span className="text-xs text-gray-500">{new Date(interaction.date).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-sm text-gray-700">{interaction.note}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs >
        </div >
    )
}
