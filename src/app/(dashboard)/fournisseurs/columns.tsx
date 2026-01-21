"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Fournisseur } from "@/types"
import { MoreHorizontal, ArrowUpDown, Eye, Ban, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useStore } from "@/lib/store"
import { Badge } from "@/components/ui/badge"

const ActionCell = ({ supplier }: { supplier: Fournisseur }) => {
    const { updateTier } = useStore()
    const handleToggle = () => updateTier(supplier.id, { active: !supplier.active })

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href={`/fournisseurs/${supplier.id}`} className="flex items-center w-full cursor-pointer">
                        <Eye className="mr-2 h-4 w-4" /> Détails
                    </Link>
                </DropdownMenuItem>
                {supplier.active ? (
                    <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleToggle}>
                        <Ban className="mr-2 h-4 w-4" /> Désactiver
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem className="text-green-600 cursor-pointer" onClick={handleToggle}>
                        <CheckCircle className="mr-2 h-4 w-4" /> Activer
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const columns: ColumnDef<Fournisseur>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Fournisseur
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="font-medium">{row.original.name}</span>
                {!row.original.active && <Badge variant="destructive" className="w-fit text-[10px] h-4 px-1">Inactif</Badge>}
            </div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "city",
        header: "Ville",
    },
    {
        accessorKey: "modePaiement",
        header: "Paiement",
    },
    {
        id: "actions",
        cell: ({ row }) => <ActionCell supplier={row.original} />,
    },
]
