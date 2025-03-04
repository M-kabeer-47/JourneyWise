"use client"

import type React from "react"
import { useDraggable } from "@dnd-kit/core"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils/shadcn/utils"

interface DraggableItemProps {
  type: string
  icon: React.ReactNode
  label: string
  data?: Record<string, any>
}

export const DraggableItem = ({ type, icon, label, data }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useDraggable({
    id: `${type}-${label}`,
    data: { type, isTemplate: true, ...data },
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : undefined

  return (
    <Button
      ref={setNodeRef}
      variant="ghost"
      size="icon"
      className={cn(
        "shrink-0 text-charcoal hover:text-ocean-blue transition-colors",
        isDragging && "ring-2 ring-ocean-blue bg-light-gray cursor-grabbing",
        !isDragging && "cursor-grab",
      )}
      style={style}
      {...listeners}
      {...attributes}
    >
      {icon}
    </Button>
  )
}

