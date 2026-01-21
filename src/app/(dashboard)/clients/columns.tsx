"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Client } from "@/types"
import { MoreHorizontal, ArrowUpDown, Eye, Pencil, Ban, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useStore } from "@/lib/store"

// We need a wrapper component to use hooks in cell render
const ActionCell = ({ client }: { client: Client }) => {
    const { updateTier } = useStore()

    const handleToggle = () => {
        updateTier(client.id, { active: !client.active })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(client.id)}
                >
                    Copier ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={`/clients/${client.id}`} className="flex items-center cursor-pointer">
                        <Eye className="mr-2 h-4 w-4" /> Voir détails
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-blue-600">
                    <Pencil className="mr-2 h-4 w-4" /> Modifier
                </DropdownMenuItem>

                {client.active ? (
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

export const columns: ColumnDef<Client>[] = [
    {
        accessorKey: "name",
        id: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Client
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const client = row.original
            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://ui.shadcn.com/avatars/${parseInt(client.id.replace(/\D/g, '')) % 5}.png`} />
                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-medium">{client.name}</span>
                        {!client.active && <Badge variant="destructive" className="w-fit text-[10px] h-4 px-1">Inactif</Badge>}
                    </div>
                </div>
            )
        },
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
        accessorKey: "city",
        header: "Ville",
    },
    {
        accessorKey: "segment",
        header: "Segment",
        cell: ({ row }) => {
            const seg = row.original.segment
            return (
                <Badge variant={seg === 'ENTREPRISE' ? 'default' : 'secondary'}>
                    {seg}
                </Badge>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <ActionCell client={row.original} />,
    },
]
