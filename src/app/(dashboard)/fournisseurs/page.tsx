"use client"

// import { useStore } from "@/lib/store"
import { MOCK_FOURNISSEURS } from "@/lib_moc_data/mock-data"
import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { CreateTierDialog } from "@/components/forms/create-tier-dialog"
// import { Fournisseur } from "@/types"

export default function FournisseursPage() {
    // const { tiers } = useStore()
    // const fournisseurs = tiers.filter((t): t is Fournisseur => t.type === 'fournisseur')
    const fournisseurs = MOCK_FOURNISSEURS

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Fournisseurs</h2>
                    <p className="text-gray-500">Gérez vos relations fournisseurs et commandes.</p>
                </div>
                <CreateTierDialog type="fournisseur" label="Nouveau Fournisseur" />
            </div>
            <DataTable columns={columns} data={fournisseurs} searchKey="name" searchPlaceholder="Rechercher par nom..." />
        </div>
    )
}
