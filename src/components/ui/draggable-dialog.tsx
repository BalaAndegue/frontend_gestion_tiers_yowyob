"use client"

import React, { useState, useRef, useEffect } from 'react'
import { X, Minus, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DraggableDialogProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
    width?: string
}

export function DraggableDialog({ isOpen, onClose, title, children, width = "w-[600px]" }: DraggableDialogProps) {
    const [isMinimized, setIsMinimized] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

    // Reset position when opened
    useEffect(() => {
        if (isOpen) {
            // Default to bottom right with some margin
            // In a real app we might calculate window size, but fixed CSS 'bottom-0 right-20' handles initial state well
            // We only use position for deltas if we want relative movement, or absolute if we want fixed.
            // Let's use transform translate.
            setPosition({ x: 0, y: 0 })
        }
    }, [isOpen])

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return
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
    }, [isDragging, dragStart])

    if (!isOpen) return null

    return (
        <div
            className={`fixed z-50 bg-white shadow-2xl rounded-t-lg border-x border-t border-gray-200 flex flex-col transition-height duration-200 ease-in-out ${isMinimized ? 'h-12' : 'h-[600px]'} ${width}`}
            style={{
                bottom: 0,
                right: '80px',
                transform: `translate(${position.x}px, ${position.y}px)`,
                maxHeight: '90vh'
            }}
        >
            {/* Header / Drag Handle */}
            <div
                className="bg-gray-900 text-white px-4 py-3 rounded-t-lg cursor-grab active:cursor-grabbing flex items-center justify-between select-none"
                onMouseDown={handleMouseDown}
            >
                <h3 className="font-medium text-sm">{title}</h3>
                <div className="flex items-center gap-1" onMouseDown={(e) => e.stopPropagation()}>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-white hover:bg-gray-700 hover:text-white"
                        onClick={() => setIsMinimized(!isMinimized)}
                    >
                        {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-white hover:bg-red-600 hover:text-white"
                        onClick={onClose}
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </div>
            </div>

            {/* Content */}
            {!isMinimized && (
                <div className="flex-1 overflow-y-auto p-4 bg-white relative">
                    <div className="absolute inset-0 overflow-auto">
                        <div className="p-4">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
