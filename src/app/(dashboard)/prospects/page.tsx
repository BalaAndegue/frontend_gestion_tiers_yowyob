"use client"

import { useStore } from "@/lib/store"
import { DataTable } from "@/components/ui/data-table"
import { CreateTierDialog } from "@/components/forms/create-tier-dialog"
import { ColumnDef } from "@tanstack/react-table"
import { Prospect } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const columns: ColumnDef<Prospect>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Prospect
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={row.original.avatar} />
                    <AvatarFallback>{row.original.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-medium">{row.original.name}</span>
                    {!row.original.active && <Badge variant="destructive" className="w-fit text-[10px] h-4 px-1">Inactif</Badge>}
                </div>
            </div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phoneNumber",
        header: "Téléphone",
    },
    {
        accessorKey: "sourceProspect",
        header: "Source",
        cell: ({ row }) => <Badge variant="outline">{row.original.sourceProspect}</Badge>
    },
    {
        accessorKey: "potentiel",
        header: "Potentiel",
        cell: ({ row }) => {
            const p = row.original.potentiel;
            const color = p === 'ELEVE' || p === 'STRATEGIQUE' ? 'text-green-600 font-bold' : 'text-gray-600';
            return <span className={color}>{p}</span>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex justify-end">
                <Link href={`/prospects/${row.original.id}`}>
                    <Button variant="ghost" size="sm">
                        Voir
                    </Button>
                </Link>
            </div>
        )
    }
]

export default function ProspectsPage() {
    const { tiers } = useStore()
    const prospects = tiers.filter((t): t is Prospect => t.type === 'prospect')

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Prospects</h2>
                    <p className="text-gray-500">Pipeline de conversion et suivi des leads.</p>
                </div>
                <CreateTierDialog type="prospect" label="Nouveau Prospect" />
            </div>

            <DataTable columns={columns} data={prospects} searchKey="name" searchPlaceholder="Rechercher un prospect..." />
        </div>
    )
}
