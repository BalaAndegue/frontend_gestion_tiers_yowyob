"use client"

import React, { useState, useRef, useEffect } from 'react'
import { X, Minus, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DraggableDialogProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
    width?: string
}

export function DraggableDialog({ isOpen, onClose, title, children, width = "w-[600px]" }: DraggableDialogProps) {
    const [isMinimized, setIsMinimized] = useState(false)
    const [isMaximized, setIsMaximized] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

    // Reset position and state when opened
    useEffect(() => {
        if (isOpen) {
            setPosition({ x: 0, y: 0 })
            setIsMinimized(false)
            setIsMaximized(false)
        }
    }, [isOpen])

    const handleMouseDown = (e: React.MouseEvent) => {
        if (isMaximized) return // Disable dragging when maximized
        setIsDragging(true)
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || isMaximized) return
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            })
        }

        const handleMouseUp = () => {
            setIsDragging(false)
        }

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging, dragStart, isMaximized])

    if (!isOpen) return null

    const toggleMaximize = () => {
        if (isMinimized) setIsMinimized(false)
        setIsMaximized(!isMaximized)
        if (!isMaximized) {
            setPosition({ x: 0, y: 0 }) // Reset position when maximizing
        }
    }

    const toggleMinimize = () => {
        if (isMaximized) setIsMaximized(false)
        setIsMinimized(!isMinimized)
    }

    return (
        <div
            className={cn(
                "fixed z-50 bg-white shadow-2xl transition-all duration-200 ease-in-out flex flex-col border border-gray-200",
                isMaximized
                    ? "inset-0 w-full h-full rounded-none"
                    : `${isMinimized ? 'h-12' : 'h-[600px]'} ${width} rounded-t-lg border-x border-t`
            )}
            style={isMaximized ? {} : {
                bottom: 0,
                right: '80px',
                transform: `translate(${position.x}px, ${position.y}px)`,
                maxHeight: isMinimized ? '48px' : '90vh'
            }}
        >
            {/* Header / Drag Handle */}
            <div
                className={cn(
                    "bg-gray-900 text-white px-4 py-3 flex items-center justify-between select-none",
                    isMaximized ? "rounded-none" : "rounded-t-lg cursor-grab active:cursor-grabbing"
                )}
                onMouseDown={handleMouseDown}
            >
                <div className="flex items-center gap-2 overflow-hidden">
                    <h3 className="font-medium text-sm truncate">{title}</h3>
                </div>
                <div className="flex items-center gap-1" onMouseDown={(e) => e.stopPropagation()}>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-white hover:bg-gray-700 hover:text-white"
                        onClick={toggleMinimize}
                        title="Réduire"
                    >
                        <Minus className="h-3 w-3" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-white hover:bg-gray-700 hover:text-white"
                        onClick={toggleMaximize}
                        title={isMaximized ? "Restaurer" : "Agrandir"}
                    >
                        <Maximize2 className={`h-3 w-3 ${isMaximized ? 'rotate-180' : ''}`} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-white hover:bg-red-600 hover:text-white"
                        onClick={onClose}
                        title="Fermer"
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </div>
            </div>

            {/* Content */}
            {!isMinimized && (
                <div className={cn(
                    "flex-1 overflow-auto bg-white relative",
                    isMaximized ? "p-0" : "p-0" // We handle padding inside the absolute div usually
                )}>
                    <div className="absolute inset-0 overflow-auto">
                        <div className={cn("transition-all duration-200", isMaximized ? "p-8 max-w-5xl mx-auto" : "p-4")}>
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
