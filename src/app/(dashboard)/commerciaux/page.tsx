"use client"

import { useStore } from "@/lib/store"
import { CreateTierDialog } from "@/components/forms/create-tier-dialog"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Commercial } from "@/types"
import Link from "next/link"
import { Ban, CheckCircle } from "lucide-react"

export default function CommerciauxPage() {
    const { tiers, updateTier } = useStore()
    const commerciaux = tiers.filter((t): t is Commercial => t.type === 'commercial')

    const handleToggle = (id: string, currentStatus: boolean) => {
        updateTier(id, { active: !currentStatus })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Espace Commercial</h2>
                    <p className="text-gray-500">Suivi des performances et de l'équipe commerciale.</p>
                </div>
                <CreateTierDialog type="commercial" label="Nouveau Commercial" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {commerciaux.map((comm) => (
                    <Card key={comm.id} className="overflow-hidden relative group hover:shadow-lg transition-shadow cursor-pointer">
                        <Link href={`/commerciaux/${comm.id}`} className="block h-full">
                            <div className={`h-24 transition-colors ${comm.active ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gray-400'}`}></div>

                            <CardContent className="pt-0 relative">
                                <Avatar className={`h-20 w-20 border-4 border-white absolute -top-10 shadow-md ${!comm.active && 'grayscale'}`}>
                                    <AvatarImage src={`https://ui.shadcn.com/avatars/${parseInt(comm.id.replace(/\D/g, '')) % 5 + 5}.png`} />
                                    <AvatarFallback>{comm.name?.charAt(0)}</AvatarFallback>
                                </Avatar>

                                <div className="mt-12 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold flex items-center gap-2">
                                                {comm.name}
                                                {!comm.active && <Badge variant="destructive" className="text-[10px] h-5">Inactif</Badge>}
                                            </h3>
                                            <p className="text-sm text-gray-500">Matricule: {comm.matricule}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Objectif Mensuel</span>
                                            <span className="font-bold">85%</span>
                                        </div>
                                        <Progress value={comm.active ? 85 : 0} className="h-2" />
                                    </div>

                                    <div className="flex gap-2 text-sm text-gray-600">
                                        <Badge variant="secondary">{comm.clients?.length || 0} Clients</Badge>
                                        <Badge variant="secondary">{comm.affaires?.length || 0} Affaires</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Link>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="h-8 text-xs"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleToggle(comm.id, comm.active)
                                }}
                            >
                                {comm.active ? <><Ban className="mr-1 h-3 w-3" /> Désactiver</> : <><CheckCircle className="mr-1 h-3 w-3" /> Activer</>}
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
