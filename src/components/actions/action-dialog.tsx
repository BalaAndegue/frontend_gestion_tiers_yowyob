"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Loader2, Send, Paperclip } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DraggableDialog } from "@/components/ui/draggable-dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Action, NotificationMethod, ActionEffect } from "@/types"
import { useStore } from "@/lib/store"

const formSchema = z.object({
    title: z.string().min(2, "Le titre est requis"),
    object: z.string().min(2, "L'objet est requis"),
    followedBy: z.string().min(1, "Veuillez sélectionner un responsable"),
    notificationMethod: z.enum(['EMAIL', 'SMS', 'APP'] as const),
    date: z.date({
        message: "Une date est requise",
    }),
    content: z.string().min(5, "Le contenu est requis"),
    effect: z.enum(['IMMEDIATE', 'DEFERRED'] as const),
})

interface ActionDialogProps {
    defaultValues?: Partial<Action>
}

export function ActionDialog({ defaultValues }: ActionDialogProps) {
    const {
        currentUser,
        tiers,
        updateTier,
        isSchedulerOpen,
        schedulerTierId,
        closeScheduler
    } = useStore()

    // For "Followed By", ideally we want a list of employees.
    const employees = [
        { id: '1', name: 'Administrateur' },
        { id: '2', name: 'Commercial 1' },
        { id: '3', name: 'Secrétaire' },
    ]

    const form = useForm<z.infer<typeof formSchema> & { tierId: string }>({
        resolver: zodResolver(formSchema.extend({
            tierId: z.string().min(1, "Veuillez sélectionner un tiers")
        })),
        defaultValues: {
            title: defaultValues?.title || "",
            object: defaultValues?.object || "",
            followedBy: defaultValues?.followedBy || currentUser?.id || "1",
            notificationMethod: defaultValues?.notificationMethod || "EMAIL",
            date: defaultValues?.date || new Date(),
            content: defaultValues?.content || "",
            effect: defaultValues?.effect || "IMMEDIATE",
            tierId: schedulerTierId || "",
        },
    })

    // Reset tierId when schedulerTierId changes
    useState(() => {
        if (schedulerTierId) {
            form.setValue('tierId', schedulerTierId)
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema> & { tierId: string }) => {
        try {
            const { tierId: targetTierId, ...actionValues } = values
            const newAction: Action = {
                id: defaultValues?.id || crypto.randomUUID(),
                ...actionValues,
                status: defaultValues?.status || 'PENDING',
                createdAt: defaultValues?.createdAt || new Date(),
            }

            const targetTier = tiers.find(t => t.id === targetTierId)
            if (!targetTier) return

            const updatedActions = [newAction, ...(targetTier.actions || [])]
            await updateTier(targetTierId, { actions: updatedActions })

            form.reset()
            closeScheduler()
        } catch (error) {
            console.error("Error saving action", error)
        }
    }

    if (!isSchedulerOpen) return null

    return (
        <DraggableDialog
            isOpen={isSchedulerOpen}
            onClose={closeScheduler}
            title="Nouvelle Action / Tâche"
            width="w-[600px]"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="tierId"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel className="text-xs text-muted-foreground">Tiers / Contact</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!!schedulerTierId}>
                                        <FormControl>
                                            <SelectTrigger className="h-8 md:h-9">
                                                <SelectValue placeholder="Sélectionner un tiers" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {tiers.map(tier => (
                                                <SelectItem key={tier.id} value={tier.id}>{tier.name} ({tier.type})</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Titre de l'action" {...field} className="border-0 border-b rounded-none px-0 focus-visible:ring-0 shadow-none font-medium text-lg" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"ghost"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal border-0 border-b rounded-none shadow-none px-0 hover:bg-transparent",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Date d'échéance</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="object"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Objet" {...field} className="border-0 border-b rounded-none px-0 focus-visible:ring-0 shadow-none" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-3 gap-4">
                        <FormField
                            control={form.control}
                            name="followedBy"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs text-muted-foreground">Suivi par</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-8 md:h-9">
                                                <SelectValue placeholder="Sélectionner" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {employees.map(emp => (
                                                <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="notificationMethod"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs text-muted-foreground">Notification</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-8 md:h-9">
                                                <SelectValue placeholder="Moyen" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="EMAIL">Email</SelectItem>
                                            <SelectItem value="SMS">SMS</SelectItem>
                                            <SelectItem value="APP">In-App</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="effect"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs text-muted-foreground">Effet</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-8 md:h-9">
                                                <SelectValue placeholder="Effet" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="IMMEDIATE">Immédiat</SelectItem>
                                            <SelectItem value="DEFERRED">Différé</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Textarea
                                        placeholder="Contenu de l'action..."
                                        className="min-h-[200px] resize-none border-0 focus-visible:ring-0 shadow-none p-0"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-between items-center pt-2 border-t mt-auto">
                        <div className="flex gap-2">
                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                <Paperclip className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            <Button type="button" variant="ghost" onClick={closeScheduler}>Annuler</Button>
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                                <Send className="h-4 w-4" />
                                Planifier
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </DraggableDialog>
    )
}
