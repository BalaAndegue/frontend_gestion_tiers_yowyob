"use client"

import { useParams, useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Ban, CheckCircle, Save, Printer, DollarSign } from "lucide-react"
import Link from "next/link"
import { MOCK_COMMERCIAUX, MOCK_CLIENTS } from "@/lib_moc_data/mock-data"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState, useMemo } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { TierForm } from "@/components/forms/tier-form"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Client, Facture, PaiementCommission } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Helper to generate mock invoices if missing
const getMockFactures = (clientId: string, clientName: string): Facture[] => {
    return [
        {
            id: `FAC-${clientId}-01`,
            numero: `FAC-2024-${clientId.slice(-4)}-01`,
            date: new Date('2024-01-15'),
            montantHT: 150000,
            montantTTC: 178875,
            statut: 'payée'
        },
        {
            id: `FAC-${clientId}-02`,
            numero: `FAC-2024-${clientId.slice(-4)}-02`,
            date: new Date('2024-02-10'),
            montantHT: 200000,
            montantTTC: 238500,
            statut: 'envoyée'
        }
    ]
}

export default function CommercialPage() {
    const { id } = useParams()
    const router = useRouter()
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isPaymentOpen, setIsPaymentOpen] = useState(false)

    // Data Resolution
    const commercial = MOCK_COMMERCIAUX.find(c => c.id === id)

    // Local state for payments (mocking backend persistence)
    const [paiements, setPaiements] = useState<PaiementCommission[]>(commercial?.paiements || [
        { id: 'PAY-01', date: new Date('2024-01-30'), montant: 5000, reference: 'VIR-001', statut: 'payé' }
    ])

    const relevantClients = useMemo(() => {
        if (!commercial || !commercial.clients) return []
        return MOCK_CLIENTS.filter(c => commercial.clients?.includes(c.id))
    }, [commercial])

    const allInvoices = useMemo(() => {
        return relevantClients.flatMap(c => {
            // Use existing factures or generate mocks
            const invoices = c.factures && c.factures.length > 0 ? c.factures : getMockFactures(c.id, c.name)
            return invoices.map(inv => ({ ...inv, clientName: c.name }))
        })
    }, [relevantClients])

    // Commission Calculations
    const commissionRate = commercial?.commission || 0
    const salesPaid = allInvoices.filter(i => i.statut === 'payée').reduce((sum, i) => sum + i.montantHT, 0)
    const commissionAcquise = salesPaid * (commissionRate / 100)

    const totalPaidCommission = paiements.filter(p => p.statut === 'payé').reduce((sum, p) => sum + p.montant, 0)
    const balanceDue = commissionAcquise - totalPaidCommission

    if (!commercial) {
        return <div className="p-8 text-center text-red-500">Commercial introuvable ({id})</div>
    }

    const handlePayCommission = () => {
        // Mock payment
        const newPayment: PaiementCommission = {
            id: `PAY-${Date.now()}`,
            date: new Date(),
            montant: balanceDue,
            reference: `VIR-${Date.now().toString().slice(-4)}`,
            statut: 'payé',
            note: 'Règlement automatique du solde'
        }
        setPaiements([...paiements, newPayment])
        setIsPaymentOpen(false)
        alert("Paiement enregistré !")
    }

    return (
        <div className="space-y-4 max-w-[1600px] mx-auto p-2">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center gap-4">
                    <Link href="/commerciaux">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Retour
                        </Button>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-gray-100 shadow-sm">
                            <AvatarImage src={commercial.avatar} />
                            <AvatarFallback className="text-xl">{commercial.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-bold uppercase text-blue-900">Fiche Commercial : {commercial.name}</h1>
                            <p className="text-xs text-gray-500">Matricule : {commercial.matricule}</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Printer className="h-4 w-4 mr-2" /> Imprimer
                    </Button>
                    <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
                        <SheetTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                                <Save className="h-4 w-4 mr-2" /> Modifier
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle>Modifier le Commercial</SheetTitle>
                                <SheetDescription>Modifiez les informations ci-dessous.</SheetDescription>
                            </SheetHeader>
                            <div className="py-6">
                                <TierForm tier={commercial} onSuccess={() => setIsEditOpen(false)} />
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Button variant="destructive" size="sm">
                        <Ban className="h-4 w-4 mr-2" /> Désactiver
                    </Button>
                </div>
            </div>

            {/* Main Info */}
            <Card className="border-t-4 border-t-purple-600 shadow-md">
                <CardContent className="p-6 space-y-6">
                    {/* Top Stats Box */}
                    <div className="flex justify-end mb-4 gap-4">
                        <div className="bg-blue-50 border border-blue-200 px-4 py-2 rounded flex flex-col items-center min-w-[150px]">
                            <span className="text-xs font-bold text-blue-800 uppercase">Chiffre d'Affaires (Payé)</span>
                            <span className="text-lg font-black text-blue-900">
                                {salesPaid.toLocaleString()} XAF
                            </span>
                        </div>
                        <div className="bg-purple-100 border border-purple-300 px-4 py-2 rounded flex flex-col items-center min-w-[150px]">
                            <span className="text-xs font-bold text-purple-800 uppercase">Taux Commission</span>
                            <span className="text-xl font-black text-purple-900">
                                {commercial.commission}%
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4">
                            <Label className="text-xs font-semibold text-gray-600">Nom Complet *</Label>
                            <Input value={commercial.name} readOnly className="bg-gray-50 font-bold" />
                        </div>
                        <div className="col-span-4">
                            <Label className="text-xs font-semibold text-gray-600">Type Contrat *</Label>
                            <Input value={commercial.typeCommercial || 'INTERNE'} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-4">
                            <Label className="text-xs font-semibold text-gray-600">Code Tiers *</Label>
                            <Input value={commercial.code} readOnly className="bg-gray-50" />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4">
                            <Label className="text-xs font-semibold text-gray-600">Email</Label>
                            <Input value={commercial.email} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-4">
                            <Label className="text-xs font-semibold text-gray-600">Téléphone</Label>
                            <Input value={commercial.phoneNumber} readOnly className="bg-gray-50" />
                        </div>
                        <div className="col-span-4">
                            <Label className="text-xs font-semibold text-gray-600">Zone</Label>
                            <Input value={commercial.zonesCouvertes || 'Toutes'} readOnly className="bg-gray-50" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="commissions" className="w-full">
                <TabsList className="w-full justify-start h-auto flex-wrap bg-gray-100 p-0 rounded-t-lg border-b">
                    <TabsTrigger value="commissions" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-white px-4 py-2 text-xs font-bold">Commissions & Paiements</TabsTrigger>
                    <TabsTrigger value="factures" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-white px-4 py-2 text-xs">Factures Clients</TabsTrigger>
                    <TabsTrigger value="clients" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-white px-4 py-2 text-xs">Portefeuille Clients ({relevantClients.length})</TabsTrigger>
                </TabsList>

                <div className="bg-white border-x border-b p-4 min-h-[300px]">

                    <TabsContent value="commissions" className="mt-0 space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                            <Card>
                                <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Total Commissions Acquises</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{commissionAcquise.toLocaleString()} XAF</div>
                                    <p className="text-xs text-muted-foreground">Sur factures payées uniquement</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Total Versé</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-green-600">{totalPaidCommission.toLocaleString()} XAF</div>
                                </CardContent>
                            </Card>
                            <Card className={balanceDue > 0 ? "border-red-200 bg-red-50" : ""}>
                                <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Solde à Payer</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-red-600">{balanceDue.toLocaleString()} XAF</div>
                                    {balanceDue > 0 && (
                                        <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
                                            <DialogTrigger asChild>
                                                <Button size="sm" className="mt-2 w-full bg-green-600 hover:bg-green-700">
                                                    <DollarSign className="h-4 w-4 mr-2" /> Payer le solde
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Enregistrer un paiement de commission</DialogTitle>
                                                    <DialogDescription>
                                                        Confirmez le paiement pour <strong>{commercial.name}</strong>.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label className="text-right">Montant</Label>
                                                        <Input value={balanceDue.toLocaleString() + ' XAF'} disabled className="col-span-3 font-bold" />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button variant="outline" onClick={() => setIsPaymentOpen(false)}>Annuler</Button>
                                                    <Button onClick={handlePayCommission}>Confirmer le Paiement</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold mb-2">Historique des Paiements</h3>
                            <div className="border rounded">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Référence</TableHead>
                                            <TableHead>Montant</TableHead>
                                            <TableHead>Statut</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paiements.map(p => (
                                            <TableRow key={p.id}>
                                                <TableCell>{p.date.toLocaleDateString()}</TableCell>
                                                <TableCell>{p.reference}</TableCell>
                                                <TableCell>{p.montant.toLocaleString()} XAF</TableCell>
                                                <TableCell><Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">payé</Badge></TableCell>
                                            </TableRow>
                                        ))}
                                        {paiements.length === 0 && <TableRow><TableCell colSpan={4} className="text-center text-gray-500">Aucun paiement.</TableCell></TableRow>}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="factures" className="mt-0">
                        <div className="border rounded">
                            <Table className="text-xs">
                                <TableHeader className="bg-gray-100">
                                    <TableRow>
                                        <TableHead>N° Facture</TableHead>
                                        <TableHead>Client</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Montant HT</TableHead>
                                        <TableHead className="text-right">Montant TTC</TableHead>
                                        <TableHead>Statut</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {allInvoices.map(facture => (
                                        <TableRow key={facture.id}>
                                            <TableCell className="font-medium">{facture.numero}</TableCell>
                                            <TableCell>{(facture as any).clientName}</TableCell>
                                            <TableCell>{facture.date.toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right">{facture.montantHT.toLocaleString()}</TableCell>
                                            <TableCell className="text-right">{facture.montantTTC.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Badge variant={facture.statut === 'payée' ? 'default' : 'secondary'} className={facture.statut === 'payée' ? 'bg-green-600' : ''}>
                                                    {facture.statut}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {allInvoices.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-4 text-gray-500">Aucune facture trouvée.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    <TabsContent value="clients" className="mt-0">
                        <div className="border rounded">
                            <Table className="text-xs">
                                <TableHeader className="bg-gray-100">
                                    <TableRow>
                                        <TableHead>Code Client</TableHead>
                                        <TableHead>Nom Client</TableHead>
                                        <TableHead>Ville</TableHead>
                                        <TableHead>Segment</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {relevantClients.map(client => (
                                        <TableRow key={client.id}>
                                            <TableCell>{client.code}</TableCell>
                                            <TableCell className="font-bold">{client.name}</TableCell>
                                            <TableCell>{client.city}</TableCell>
                                            <TableCell><Badge variant="outline">{client.segment}</Badge></TableCell>
                                        </TableRow>
                                    ))}
                                    {relevantClients.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center py-4 text-gray-500">Aucun client dans le portefeuille.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}
