"use client"

import { useEffect } from "react"
import { useStore } from "@/lib/store"

export function DataInitializer() {
    const { fetchTiers } = useStore()

    useEffect(() => {
        fetchTiers()
    }, [fetchTiers])

    return null
}
