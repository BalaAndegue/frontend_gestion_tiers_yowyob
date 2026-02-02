"use client"

import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Mail, MessageSquare, Bell, Calendar, CheckCircle2, Circle, Trash2, Edit2 } from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Action, NotificationMethod, ActionStatus } from "@/types"
import { cn } from "@/lib/utils"

interface ActionListProps {
    actions: Action[]
    onEdit?: (action: Action) => void
    onDelete?: (id: string) => void
}

const MethodIcon = ({ method }: { method: NotificationMethod }) => {
    switch (method) {
        case 'EMAIL': return <Mail className="h-4 w-4" />
        case 'SMS': return <MessageSquare className="h-4 w-4" />
        case 'APP': return <Bell className="h-4 w-4" />
        default: return <Bell className="h-4 w-4" />
    }
}

const StatusIcon = ({ status }: { status: ActionStatus }) => {
    switch (status) {
        case 'DONE': return <CheckCircle2 className="h-4 w-4 text-green-500" />
        case 'PENDING': return <Circle className="h-4 w-4 text-yellow-500" />
        case 'CANCELLED': return <Circle className="h-4 w-4 text-red-500" /> // Simplified
        default: return <Circle className="h-4 w-4 text-gray-500" />
    }
}

export function ActionList({ actions, onEdit, onDelete }: ActionListProps) {
    if (!actions || actions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-gray-50 border-dashed">
                <div className="bg-white p-3 rounded-full mb-3 shadow-sm">
                    <Calendar className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-900">Aucune action planifiée</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-[250px]">
                    Planifiez des rappels, emails ou tâches pour ce contact.
                </p>
            </div>
        )
    }

    // Sort actions by date (newest first or upcoming?)
    // Let's sort by date descending for now
    const sortedActions = [...actions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return (
        <div className="space-y-4">
            {sortedActions.map((action) => (
                <div
                    key={action.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow gap-4"
                >
                    <div className="flex items-start gap-4">
                        <div className={cn(
                            "p-2 rounded-full mt-1",
                            action.status === 'DONE' ? "bg-green-50 text-green-600" :
                                action.status === 'PENDING' ? "bg-yellow-50 text-yellow-600" : "bg-gray-100 text-gray-600"
                        )}>
                            <MethodIcon method={action.notificationMethod} />
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-sm text-gray-900">{action.title}</h4>
                                <Badge variant={action.status === 'DONE' ? "secondary" : "outline"} className="text-[10px] h-5">
                                    {action.status === 'PENDING' ? 'En attente' : action.status === 'DONE' ? 'Terminé' : 'Annulé'}
                                </Badge>
                                {action.effect === 'DEFERRED' && <Badge variant="outline" className="text-[10px] h-5 text-purple-600 border-purple-200 bg-purple-50">Différé</Badge>}
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-1">{action.object}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                <Calendar className="h-3 w-3" />
                                <span>{format(new Date(action.date), "PPP 'à' HH:mm", { locale: fr })}</span>
                                <span>•</span>
                                <span>Suivi par: {action.followedBy == '1' ? 'Administrateur' : 'Autre'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                        {onEdit && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600" onClick={() => onEdit(action)}>
                                <Edit2 className="h-3 w-3" />
                            </Button>
                        )}
                        {onDelete && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-600" onClick={() => onDelete(action.id)}>
                                <Trash2 className="h-3 w-3" />
                            </Button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
