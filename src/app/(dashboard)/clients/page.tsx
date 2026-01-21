"use client"

import { useStore } from "@/lib/store"
import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { CreateTierDialog } from "@/components/forms/create-tier-dialog"
import { Client } from "@/types"

export default function ClientsPage() {
    const { tiers } = useStore()
    const clients = tiers.filter((t): t is Client => t.type === 'client')

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
                    <p className="text-gray-500">Gérez votre base de clients et leurs informations.</p>
                </div>
                <CreateTierDialog type="client" label="Nouveau Client" />
            </div>

            <DataTable columns={columns} data={clients} searchKey="name" searchPlaceholder="Rechercher par nom..." />
        </div>
    )
}
