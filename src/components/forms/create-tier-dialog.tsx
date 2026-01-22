"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { DraggableDialog } from "@/components/ui/draggable-dialog"
import { TierForm } from "@/components/forms/tier-form"
import { Tier, TierType } from "@/types"

interface CreateTierDialogProps {
    type: TierType
    label?: string
}

export function CreateTierDialog({ type, label }: CreateTierDialogProps) {
    const [open, setOpen] = useState(false)

    // Default empty tier based on type
    const emptyTier: Partial<Tier> = {
        id: "", // Empty ID for new creation
        type: type,
        name: "",
        email: "",
        phoneNumber: "",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        // Type specific defaults to avoid form errors
        ...(type === 'client' && { segment: 'ENTREPRISE' }),
        ...(type === 'fournisseur' && { modePaiement: 'VIREMENT' }),
        ...(type === 'commercial' && { commission: 5, typeCommercial: 'INTERNE' }),
        ...(type === 'prospect' && { potentiel: 'MOYEN' }),
    }

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                {label || "Nouveau"}
            </Button>

            <DraggableDialog
                isOpen={open}
                onClose={() => setOpen(false)}
                title={`Nouveau ${type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Tier'}`}
            >
                <div className="py-2">
                    <TierForm
                        tier={emptyTier as Tier}
                        onSuccess={() => setOpen(false)}
                    />
                </div>
            </DraggableDialog>
        </>
    )
}
