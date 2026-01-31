"use client"

import { useParams, useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Ban, CheckCircle, Save, Printer } from "lucide-react"
import Link from "next/link"
import { Client } from "@/types"
import { MOCK_CLIENTS } from "@/lib_moc_data/mock-data"
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

export default function ClientPage() {
    const { id } = useParams()
    const router = useRouter()

    // Fetch from MOCK
    const client = MOCK_CLIENTS.find(t => t.id === id)

    if (!client) {
        return <div className="p-8 text-center text-red-500">Client introuvable ({id})</div>
    }

    return (
        <div className="space-y-4 max-w-[1600px] mx-auto p-2">
            {/* Header / Actions Bar similar to right sidebar in screenshot but horizontal for web */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center gap-4">
                    <Link href="/clients">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold uppercase text-blue-900">Fiche Client : {client.name}</h1>
                        <p className="text-xs text-gray-500">Utilisateur : Administrateur</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Printer className="h-4 w-4 mr-2" /> Solde des comptes
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                        <Save className="h-4 w-4 mr-2" /> Enregistrer
                    </Button>
                    <Button variant="destructive" size="sm">
                        <Ban className="h-4 w-4 mr-2" /> Supprimer
                    </Button>
                </div>
            </div>

            {/* Main Form Area */}
            <Card className="border-t-4 border-t-blue-600 shadow-md">
                <CardContent className="p-6 space-y-6">

                    {/* Top Stats Box */}
                    <div className="flex justify-end mb-4">
                        <div className="bg-orange-100 border border-orange-300 px-4 py-2 rounded flex flex-col items-center min-w-[150px]">
                            <span className="text-xs font-bold text-orange-800 uppercase">Solde Actuel</span>
                            <span className="text-xl font-black text-red-600">
                                {client.financial?.solde?.toLocaleString('fr-FR')} {client.financial?.devise}
                            </span>
                        </div>
                    </div>

                    {/* Row 1 */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4">
                            <Label className="text-xs font-semibold text-gray-600">Raison sociale *</Label>
                            <Input value={client.name} readOnly className="bg-gray-50 font-bold" />
                        </div>
                        <div className="col-span-4">
                            <Label className="text-xs font-semibold text-gray-600">Société *</Label>
                            <Input value={client.name} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-4">
                            <Label className="text-xs font-semibold text-gray-600">Code *</Label>
                            <Input value={client.code || client.id} readOnly className="bg-gray-50" />
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-3">
                            <Label className="text-xs font-semibold text-gray-600">Pays *</Label>
                            <Input value={client.pays || ''} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-3">
                            <Label className="text-xs font-semibold text-gray-600">Contact *</Label>
                            <Input value={client.contact || ''} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-3">
                            <Label className="text-xs font-semibold text-gray-600">Forme juridique *</Label>
                            <Input value={client.formeJuridique || 'Individuel'} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-3">
                            {/* Trying to match Famille/Type client split */}
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <Label className="text-xs font-semibold text-gray-600">Famille *</Label>
                                    <Input value={client.familleClient || ''} readOnly className="bg-gray-50" />
                                </div>
                                <div>
                                    <Label className="text-xs font-semibold text-gray-600">Type *</Label>
                                    <Input value={client.segment || ''} readOnly className="bg-gray-50" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 3 - Pricing & Misc */}
                    <div className="bg-gray-50 p-3 rounded border border-gray-100">
                        <Label className="text-xs font-bold text-red-500 mb-2 block">Les prix à appliquer *</Label>
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-2 flex items-center space-x-2">
                                <Checkbox checked={client.estAssujettiTVA} disabled />
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Assujeti à la TVA</label>
                            </div>
                            <div className="col-span-6 flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox checked={client.pricingCategory?.detail} disabled />
                                    <label className="text-sm">Détail</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox checked={client.pricingCategory?.demisGros} disabled />
                                    <label className="text-sm">Démis gros</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox checked={client.pricingCategory?.gros} disabled />
                                    <label className="text-sm">Gros</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox checked={client.pricingCategory?.superGros} disabled />
                                    <label className="text-sm">Super Gros</label>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <Label className="text-[10px] text-gray-500">Nbre copies Facture</Label>
                                <Input className="h-8" value={client.creditInfo?.copiesFacture || 0} readOnly />
                            </div>
                            <div className="col-span-2">
                                <Label className="text-[10px] text-gray-500">Taux Rem. Fact.</Label>
                                <Input className="h-8" value={client.creditInfo?.tauxRemise || 0} readOnly />
                            </div>
                        </div>
                    </div>

                    {/* Row 4 - Address */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-8">
                            <Label className="text-xs font-semibold text-gray-600">Adresse :</Label>
                            <Input value={client.address} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-2">
                            <Label className="text-xs font-semibold text-gray-600">Code postale :</Label>
                            <Input value={client.postalCode} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-2">
                            <Label className="text-xs font-semibold text-gray-600">Ville :</Label>
                            <Input value={client.city} readOnly className="bg-gray-50" />
                        </div>
                    </div>

                    {/* Row 5 - Contact & Credit */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-3">
                            <Label className="text-xs font-semibold text-gray-600">Téléphone :</Label>
                            <Input value={client.phoneNumber} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-2">
                            <Label className="text-xs font-semibold text-gray-600">Fax :</Label>
                            <Input value={client.fax || ''} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-3">
                            <Label className="text-xs font-semibold text-gray-600">Email :</Label>
                            <Input value={client.email} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-2">
                            <Label className="text-xs font-semibold text-gray-600">Site Web :</Label>
                            <Input value={client.website || ''} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-2 bg-red-50 p-2 rounded border border-red-100">
                            <Label className="text-xs font-semibold text-red-600">Plafond crédit :</Label>
                            <div className="flex items-center gap-2">
                                <Input value={client.plafondCredit?.toLocaleString()} className="h-8 font-bold text-red-600 bg-white" readOnly />
                            </div>
                            <div className="flex items-center mt-1 space-x-1">
                                <Checkbox checked={!client.creditInfo?.activé} disabled />
                                <span className="text-[9px] whitespace-nowrap">Cocher pour désactiver</span>
                            </div>
                        </div>
                    </div>

                    {/* Row 6 - Notes */}
                    <div>
                        <Label className="text-xs font-semibold text-gray-600">Notes :</Label>
                        <Textarea value={client.notes || ''} readOnly className="h-16 bg-gray-50 resize-none" />
                    </div>

                </CardContent>
            </Card>

            {/* Tabs Section */}
            <Tabs defaultValue="solde" className="w-full">
                <TabsList className="w-full justify-start h-auto flex-wrap bg-gray-100 p-0 rounded-t-lg border-b">
                    <TabsTrigger value="info" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-white px-4 py-2 text-xs">Informations comptables</TabsTrigger>
                    <TabsTrigger value="products" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-white px-4 py-2 text-xs">Liste des produits</TabsTrigger>
                    <TabsTrigger value="modes" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-white px-4 py-2 text-xs">Modes règlement autorisés</TabsTrigger>
                    <TabsTrigger value="solde" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-white px-4 py-2 text-xs font-bold">Situation du solde</TabsTrigger>
                    <TabsTrigger value="factures" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-white px-4 py-2 text-xs">Liste des factures</TabsTrigger>
                </TabsList>

                <div className="bg-white border-x border-b p-4 min-h-[300px]">
                    <TabsContent value="solde" className="mt-0">
                        {/* Situation du Solde Table */}
                        <div className="border rounded">
                            <Table className="text-xs">
                                <TableHeader className="bg-gray-100">
                                    <TableRow>
                                        <TableHead>Magasin</TableHead>
                                        <TableHead>Etat</TableHead>
                                        <TableHead>BL N°</TableHead>
                                        <TableHead>Livré le</TableHead>
                                        <TableHead>Règlement</TableHead>
                                        <TableHead className="text-right">Montant TTC</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {/* Warnings / Solde Header Row */}
                                    <TableRow className="bg-red-600 text-white font-bold hover:bg-red-600">
                                        <TableCell colSpan={5} className="py-1 text-center border-r uppercase">&lt;- SOLDE -&gt;</TableCell>
                                        <TableCell className="text-right py-1">0,0</TableCell>
                                    </TableRow>

                                    {client.balanceStatusData?.map((item, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{item.magasin}</TableCell>
                                            <TableCell>{item.etat}</TableCell>
                                            <TableCell>{item.blNo}</TableCell>
                                            <TableCell>{item.livreLe}</TableCell>
                                            <TableCell>{item.reglement}</TableCell>
                                            <TableCell className="text-right font-medium">{item.montantTTC.toLocaleString('fr-FR', { minimumFractionDigits: 1 })}</TableCell>
                                        </TableRow>
                                    ))}

                                    {/* Totals Row */}
                                    <TableRow className="bg-gray-700 text-white font-bold hover:bg-gray-700">
                                        <TableCell colSpan={5} className="py-1 border-r text-red-500"> --&gt; Totaux Magasin</TableCell>
                                        <TableCell className="text-right py-1 text-red-500">
                                            {client.balanceStatusData?.reduce((acc, i) => acc + i.montantTTC, 0).toLocaleString('fr-FR', { minimumFractionDigits: 1 })}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className="bg-blue-800 text-white font-bold hover:bg-blue-800">
                                        <TableCell colSpan={5} className="py-1 border-r"> Totaux factures</TableCell>
                                        <TableCell className="text-right py-1">
                                            {client.balanceStatusData?.reduce((acc, i) => acc + i.montantTTC, 0).toLocaleString('fr-FR', { minimumFractionDigits: 1 })}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    <TabsContent value="modes" className="mt-0">
                        <div className="max-w-2xl border rounded">
                            <Table className="text-xs">
                                <TableHeader className="bg-gray-100">
                                    <TableRow>
                                        <TableHead className="w-[100px]">Code</TableHead>
                                        <TableHead>Libellé</TableHead>
                                        <TableHead className="w-[100px]">Autorisé?</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {client.paymentMethodsData?.map((mode) => (
                                        <TableRow key={mode.code}>
                                            <TableCell className="font-bold">{mode.code}</TableCell>
                                            <TableCell className="font-medium">{mode.libelle}</TableCell>
                                            <TableCell>
                                                <Checkbox checked={mode.autorise} disabled />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    <TabsContent value="factures" className="mt-0">
                        <div className="border rounded">
                            <Table className="text-xs">
                                <TableHeader className="bg-gray-100">
                                    <TableRow>
                                        <TableHead>NomClient</TableHead>
                                        <TableHead>NoFacture</TableHead>
                                        <TableHead className="text-right">MontantHT</TableHead>
                                        <TableHead className="text-right">MontantRemise</TableHead>
                                        <TableHead className="text-right">MontantTVA</TableHead>
                                        <TableHead className="text-right">MontantPrCpte</TableHead>
                                        <TableHead className="text-right">MontantTTC</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {/* Mock invoices list to match screenshot structure if needed, or use client.factures if mapped */}
                                    <TableRow>
                                        <TableCell className="text-gray-500 text-center py-8" colSpan={7}>Aucune facture à afficher pour le moment (Mock Data Vide pour cet onglet)</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    <TabsContent value="info" className="mt-0">
                        <p className="text-sm text-gray-500 italic">Informations comptables...</p>
                    </TabsContent>
                    <TabsContent value="products" className="mt-0">
                        <p className="text-sm text-gray-500 italic">Liste des produits...</p>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}
