"use client"

import { useParams, useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Ban, CheckCircle, Save, Printer } from "lucide-react"
import Link from "next/link"
import { MOCK_FOURNISSEURS } from "@/lib_moc_data/mock-data"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { TierForm } from "@/components/forms/tier-form"

export default function SupplierPage() {
    const { id } = useParams()
    const [isEditOpen, setIsEditOpen] = useState(false)

    // Fetch from MOCK
    const supplier = MOCK_FOURNISSEURS.find(t => t.id === id)

    if (!supplier) {
        return <div className="p-8 text-center text-red-500">Fournisseur introuvable ({id})</div>
    }

    return (
        <div className="space-y-4 max-w-[1600px] mx-auto p-2">
            {/* Header / Actions Bar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center gap-4">
                    <Link href="/fournisseurs">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold uppercase text-blue-900">Fiche Fournisseur : {supplier.name}</h1>
                        <p className="text-xs text-gray-500">Fournisseur certifié</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Printer className="h-4 w-4 mr-2" /> Imprimer Fiche
                    </Button>
                    <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
                        <SheetTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                                <Save className="h-4 w-4 mr-2" /> Modifier
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-[800px] overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle>Modifier le Fournisseur</SheetTitle>
                                <SheetDescription>Modifiez les informations ci-dessous.</SheetDescription>
                            </SheetHeader>
                            <div className="py-6">
                                <TierForm tier={supplier} onSuccess={() => setIsEditOpen(false)} />
                            </div>
                        </SheetContent>
                    </Sheet>

                    <Button variant="destructive" size="sm">
                        <Ban className="h-4 w-4 mr-2" /> Supprimer
                    </Button>
                </div>
            </div>

            {/* Main Form Area */}
            <Card className="border-t-4 border-t-yellow-600 shadow-md">
                <CardContent className="p-6 space-y-6">

                    {/* Top Stats Box */}
                    <div className="flex justify-end mb-4">
                        <div className="bg-yellow-100 border border-yellow-300 px-4 py-2 rounded flex flex-col items-center min-w-[150px]">
                            <span className="text-xs font-bold text-yellow-800 uppercase">Solde Actuel</span>
                            <span className="text-xl font-black text-red-600">
                                {supplier.financial?.solde?.toLocaleString('fr-FR') || '0'} {supplier.financial?.devise || 'XAF'}
                            </span>
                        </div>
                    </div>

                    {/* Row 1 */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4">
                            <Label className="text-xs font-semibold text-gray-600">Raison sociale *</Label>
                            <Input value={supplier.name} readOnly className="bg-gray-50 font-bold" />
                        </div>
                        <div className="col-span-4">
                            <Label className="text-xs font-semibold text-gray-600">Forme Juridique *</Label>
                            <Input value={supplier.formeJuridique || 'SA'} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-4">
                            <Label className="text-xs font-semibold text-gray-600">Code Fournisseur *</Label>
                            <Input value={supplier.codeFournisseur || supplier.id} readOnly className="bg-gray-50" />
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-3">
                            <Label className="text-xs font-semibold text-gray-600">Pays *</Label>
                            <Input value={supplier.pays || ''} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-3">
                            <Label className="text-xs font-semibold text-gray-600">Contact *</Label>
                            <Input value={supplier.contact || ''} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-3">
                            <Label className="text-xs font-semibold text-gray-600">Délai Livraison</Label>
                            <Input value={supplier.delaiLivraison || 'J+0'} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-3">
                            <Label className="text-xs font-semibold text-gray-600">Famille *</Label>
                            <Input value={supplier.familleFournisseur || ''} readOnly className="bg-gray-50" />
                        </div>
                    </div>

                    {/* Row 3 - Address */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-8">
                            <Label className="text-xs font-semibold text-gray-600">Adresse :</Label>
                            <Input value={supplier.address} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-2">
                            <Label className="text-xs font-semibold text-gray-600">Code postale :</Label>
                            <Input value={supplier.city} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-2">
                            <Label className="text-xs font-semibold text-gray-600">Ville :</Label>
                            <Input value={supplier.city} readOnly className="bg-gray-50" />
                        </div>
                    </div>

                    {/* Row 4 - Contact */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-3">
                            <Label className="text-xs font-semibold text-gray-600">Téléphone :</Label>
                            <Input value={supplier.phoneNumber} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-2">
                            <Label className="text-xs font-semibold text-gray-600">Fax :</Label>
                            <Input value={supplier.fax || ''} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-3">
                            <Label className="text-xs font-semibold text-gray-600">Email :</Label>
                            <Input value={supplier.email} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-4">
                            <Label className="text-xs font-semibold text-gray-600">Site Web :</Label>
                            <Input value={supplier.website || ''} readOnly className="bg-gray-50" />
                        </div>
                    </div>

                    {/* Row 5 - Notes */}
                    <div>
                        <Label className="text-xs font-semibold text-gray-600">Notes / Conditions Particulières :</Label>
                        <Textarea value={supplier.notes || ''} readOnly className="h-16 bg-gray-50 resize-none" />
                    </div>

                </CardContent>
            </Card>

            {/* Tabs Section */}
            <Tabs defaultValue="factures" className="w-full">
                <TabsList className="w-full justify-start h-auto flex-wrap bg-gray-100 p-0 rounded-t-lg border-b">
                    <TabsTrigger value="info" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-white px-4 py-2 text-xs">Produits Référencés</TabsTrigger>
                    <TabsTrigger value="factures" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-white px-4 py-2 text-xs font-bold">Historique Factures</TabsTrigger>
                    <TabsTrigger value="reglements" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-white px-4 py-2 text-xs">Règlements</TabsTrigger>
                </TabsList>

                <div className="bg-white border-x border-b p-4 min-h-[300px]">
                    <TabsContent value="factures" className="mt-0">
                        <div className="border rounded">
                            <Table className="text-xs">
                                <TableHeader className="bg-gray-100">
                                    <TableRow>
                                        <TableHead>NoFacture</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">MontantHT</TableHead>
                                        <TableHead className="text-right">TVA</TableHead>
                                        <TableHead className="text-right">MontantTTC</TableHead>
                                        <TableHead>Statut</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {/* Mock invoices list */}
                                    <TableRow>
                                        <TableCell className="text-gray-500 text-center py-8" colSpan={6}>Aucune facture fournisseur mockée pour l'instant.</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    <TabsContent value="info" className="mt-0">
                        <p className="text-sm text-gray-500 italic">Liste des produits...</p>
                    </TabsContent>
                    <TabsContent value="reglements" className="mt-0">
                        <p className="text-sm text-gray-500 italic">Historique des règlements...</p>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}
