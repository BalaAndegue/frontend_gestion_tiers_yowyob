"use client"

import { useStore } from "@/lib/store"
import { useParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, CheckCircle, Ban, XCircle, Clock, User } from "lucide-react"
import Link from "next/link"
import { Commercial, Client } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { TierForm } from "@/components/forms/tier-form"
import { TierStats } from "@/components/tier-stats"
import { useState } from "react"

export default function CommercialPage() {
    const { id } = useParams()
    const { tiers, updateTier } = useStore()
    const [isEditOpen, setIsEditOpen] = useState(false)

    const commercial = tiers.find(t => t.id === id) as Commercial | undefined
    // Resolve linked clients
    const linkedClients = tiers.filter(t => t.type === 'client' && commercial?.clients?.includes(t.id)) as Client[]

    if (!commercial) {
        return <div className="p-8">Commercial introuvable</div>
    }

    const handleToggleActive = () => {
        updateTier(commercial.id, { active: !commercial.active })
    }

    // Initialize from store data or default to empty
    const [affaires, setAffaires] = useState(commercial?.affaires || [])

    const handleUpdateAffaireStatus = (id: string, newStatus: 'gagnée' | 'perdue') => {
        const updatedAffaires = affaires.map(a =>
            a.id === id ? { ...a, status: newStatus } : a
        )
        setAffaires(updatedAffaires)
        updateTier(commercial.id, { affaires: updatedAffaires })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/commerciaux">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div className="flex-1 flex items-center gap-4">
                    <Avatar className="h-12 w-12 border">
                        <AvatarImage src={`https://ui.shadcn.com/avatars/${parseInt(commercial.id.replace(/\D/g, '')) % 5}.png`} />
                        <AvatarFallback>{commercial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold">{commercial.name}</h1>
                            {!commercial.active && <Badge variant="destructive">Inactif</Badge>}
                            <Badge variant="secondary">{commercial.typeCommercial}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {commercial.email}</span>
                            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {commercial.phoneNumber}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleToggleActive} className={commercial.active ? "text-red-600" : "text-green-600"}>
                        {commercial.active ? <><Ban className="mr-2 h-4 w-4" /> Désactiver</> : <><CheckCircle className="mr-2 h-4 w-4" /> Activer</>}
                    </Button>
                    <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
                        <SheetTrigger asChild>
                            <Button>Modifier</Button>
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-[500px] overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle>Modifier le Commercial</SheetTitle>
                                <SheetDescription>Modifiez les informations ci-dessous.</SheetDescription>
                            </SheetHeader>
                            <div className="py-6">
                                <TierForm tier={commercial} onSuccess={() => setIsEditOpen(false)} />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <Tabs defaultValue="profil" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0">
                    <TabsTrigger value="profil" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none h-full px-8">Profil</TabsTrigger>
                    <TabsTrigger value="affaires" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none h-full px-8">Affaires & Clients</TabsTrigger>
                    <TabsTrigger value="stats" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none h-full px-8">Statistiques</TabsTrigger>
                </TabsList>

                <TabsContent value="profil" className="pt-6">
                    <div className="grid grid-cols-3 gap-6">
                        <Card className="col-span-2 shadow-sm border-0 bg-gray-50/50">
                            <CardHeader>
                                <CardTitle>Informations Collaborateur</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="bg-white p-4 rounded-lg shadow-sm border grid grid-cols-2 gap-x-8 gap-y-4">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Matricule</label>
                                        <p className="font-medium mt-1">{commercial.matricule}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Commission</label>
                                        <p className="font-medium mt-1 text-green-600">{commercial.commission}%</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Embauche</label>
                                        <p className="font-medium mt-1">{commercial.dateDebutContrat ? new Date(commercial.dateDebutContrat).toLocaleDateString() : '-'}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="affaires" className="pt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Client List */}
                        <Card className="shadow-sm border">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" /> Clients Apportés
                                </CardTitle>
                                <CardDescription>Clients rapportés à l'organisation</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {linkedClients.length === 0 ? (
                                    <p className="text-gray-500 text-sm">Aucun client assigné.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {linkedClients.map(client => (
                                            <div key={client.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium text-sm">{client.name}</p>
                                                        <p className="text-xs text-gray-500">{client.email}</p>
                                                    </div>
                                                </div>
                                                <Link href={`/clients/${client.id}`}>
                                                    <Button variant="ghost" size="sm">Voir</Button>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Affaires List */}
                        <Card className="shadow-sm border">
                            <CardHeader><CardTitle>Affaires Rapportées</CardTitle></CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {affaires.map(affaire => (
                                        <div key={affaire.id} className="p-3 border rounded-lg bg-white">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <div className="font-medium text-sm">{affaire.titre}</div>
                                                    <div className="text-xs text-gray-500">{new Date(affaire.date).toLocaleDateString()}</div>
                                                </div>
                                                <Badge variant={affaire.status === 'gagnée' ? 'default' : affaire.status === 'perdue' ? 'destructive' : 'secondary'}>
                                                    {affaire.status === 'en_cours' ? 'EN COURS' : affaire.status.toUpperCase()}
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between items-center mt-3">
                                                <div className="font-mono font-bold text-sm">{affaire.montant.toLocaleString()} €</div>
                                                <div className="flex gap-1">
                                                    {affaire.status === 'en_cours' && (
                                                        <>
                                                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => handleUpdateAffaireStatus(affaire.id, 'gagnée')}>
                                                                <CheckCircle className="h-4 w-4" />
                                                            </Button>
                                                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleUpdateAffaireStatus(affaire.id, 'perdue')}>
                                                                <XCircle className="h-4 w-4" />
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="stats" className="pt-6">
                    <TierStats type="commercial" />
                </TabsContent>
            </Tabs>
        </div>
    )
}
