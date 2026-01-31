"use client"

import { useParams, useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Ban, UserCheck, Save, Printer } from "lucide-react"
import Link from "next/link"
import { MOCK_PROSPECTS } from "@/lib_moc_data/mock-data"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { TierForm } from "@/components/forms/tier-form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProspectPage() {
    const { id } = useParams()
    const router = useRouter()
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isConverting, setIsConverting] = useState(false)
    const [showConvertDialog, setShowConvertDialog] = useState(false)

    const handleConvert = async () => {
        setIsConverting(true)
        try {
            // Simulation API Call
            await new Promise(resolve => setTimeout(resolve, 1500))
            // In a real app, we would call: await ProspectsService.convertToClient(id)

            // Show success (using alert for now as toast was not confirmed)
            alert(`Prospect ${prospect?.name} converti en client avec succès.\nCompte comptable généré.`)

            // Navigate to clients list or the new client page
            router.push('/clients')
        } catch (error) {
            console.error("Conversion failed", error)
            alert("Erreur lors de la conversion du prospect.")
        } finally {
            setIsConverting(false)
            setShowConvertDialog(false)
        }
    }

    // Mock Data
    const prospect = MOCK_PROSPECTS.find(p => p.id === id)

    if (!prospect) {
        return <div className="p-8 text-center text-red-500">Prospect introuvable ({id})</div>
    }

    return (
        <div className="space-y-4 max-w-[1600px] mx-auto p-2">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center gap-4">
                    <Link href="/prospects">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Retour
                        </Button>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-gray-100 shadow-sm">
                            <AvatarImage src={prospect.avatar} />
                            <AvatarFallback className="text-xl">{prospect.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-bold uppercase text-blue-900">Prospect : {prospect.name}</h1>
                            <p className="text-xs text-gray-500">Source : {prospect.sourceProspect}</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="bg-green-100 text-green-800 hover:bg-green-200"
                        onClick={() => setShowConvertDialog(true)}
                        disabled={isConverting}
                    >
                        {isConverting ? (
                            <>Converting...</>
                        ) : (
                            <>
                                <UserCheck className="h-4 w-4 mr-2" /> Convertir en Client
                            </>
                        )}
                    </Button>

                    <Dialog open={showConvertDialog} onOpenChange={setShowConvertDialog}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Convertir en Client ?</DialogTitle>
                                <DialogDescription>
                                    Cette action va transformer ce prospect en client actif :
                                    <ul className="list-disc pl-5 mt-2 text-left">
                                        <li>Génération automatique du compte comptable client</li>
                                        <li>Activation du module de facturation</li>
                                        <li>Transfert de l'historique</li>
                                    </ul>
                                    <br />
                                    <strong>Êtes-vous sûr de vouloir continuer ?</strong>
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setShowConvertDialog(false)}>Annuler</Button>
                                <Button className="bg-green-600 hover:bg-green-700" onClick={handleConvert} disabled={isConverting}>
                                    {isConverting ? "Traitement..." : "Confirmer la conversion"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
                        <SheetTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                                <Save className="h-4 w-4 mr-2" /> Modifier
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle>Modifier le Prospect</SheetTitle>
                                <SheetDescription>Modifiez les informations ci-dessous.</SheetDescription>
                            </SheetHeader>
                            <div className="py-6">
                                <TierForm tier={prospect} onSuccess={() => setIsEditOpen(false)} />
                            </div>
                        </SheetContent>
                    </Sheet>

                    <Button variant="destructive" size="sm">
                        <Ban className="h-4 w-4 mr-2" /> Clôturer / Perdu
                    </Button>
                </div>
            </div>

            {/* Main Info */}
            <Card className="border-t-4 border-t-green-600 shadow-md">
                <CardContent className="p-6 space-y-6">

                    {/* Top Stats Box */}
                    <div className="flex justify-end mb-4 gap-4">
                        <div className="bg-green-50 border border-green-200 px-4 py-2 rounded flex flex-col items-center min-w-[120px]">
                            <span className="text-xs font-bold text-green-800 uppercase">Potentiel</span>
                            <span className="text-lg font-black text-green-900">
                                {prospect.potentiel}
                            </span>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 px-4 py-2 rounded flex flex-col items-center min-w-[120px]">
                            <span className="text-xs font-bold text-blue-800 uppercase">Probabilité</span>
                            <span className="text-lg font-black text-blue-900">
                                {prospect.probabilite}%
                            </span>
                        </div>
                    </div>

                    {/* Row 1 */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-6">
                            <Label className="text-xs font-semibold text-gray-600">Nom Prospect / Entreprise *</Label>
                            <Input value={prospect.name} readOnly className="bg-gray-50 font-bold" />
                        </div>
                        <div className="col-span-3">
                            <Label className="text-xs font-semibold text-gray-600">Code *</Label>
                            <Input value={prospect.code} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-3">
                            <Label className="text-xs font-semibold text-gray-600">Source *</Label>
                            <Input value={prospect.sourceProspect} readOnly className="bg-gray-50" />
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-3">
                            <Label className="text-xs font-semibold text-gray-600">Pays *</Label>
                            <Input value={prospect.pays || 'CMR'} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-3">
                            <Label className="text-xs font-semibold text-gray-600">Contact Principal *</Label>
                            <Input value={prospect.contact || ''} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-6">
                            <Label className="text-xs font-semibold text-gray-600">Ville *</Label>
                            <Input value={prospect.city} readOnly className="bg-gray-50" />
                        </div>
                    </div>

                    {/* Row 3 - Contact */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4">
                            <Label className="text-xs font-semibold text-gray-600">Téléphone *</Label>
                            <Input value={prospect.phoneNumber} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-8">
                            <Label className="text-xs font-semibold text-gray-600">Email *</Label>
                            <Input value={prospect.email} readOnly className="bg-gray-50" />
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <Label className="text-xs font-semibold text-gray-600">Notes / Besoins identifiés :</Label>
                        <Textarea value={prospect.notes || prospect.notesProspect || ''} readOnly className="h-32 bg-gray-50 resize-none" />
                    </div>

                </CardContent>
            </Card>

            {/* Simple Tabs for History */}
            <Tabs defaultValue="actions" className="w-full">
                <TabsList className="w-full justify-start h-auto flex-wrap bg-gray-100 p-0 rounded-t-lg border-b">
                    <TabsTrigger value="actions" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-white px-4 py-2 text-xs font-bold">Actions / Échanges</TabsTrigger>
                </TabsList>
                <div className="bg-white border-x border-b p-4 min-h-[150px]">
                    <TabsContent value="actions" className="mt-0">
                        <p className="text-sm text-gray-500 italic">Historique des échanges à venir...</p>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}
