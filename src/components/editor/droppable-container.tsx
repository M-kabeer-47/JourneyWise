"use client"

import type React from "react"
import { useDroppable } from "@dnd-kit/core"
import { cn } from "@/utils/shadcn/utils"

interface DroppableContainerProps {
  children: React.ReactNode
}

export function DroppableContainer({ children }: DroppableContainerProps) {
  const { setNodeRef, isOver, active } = useDroppable({
    id: "editor-content",
  })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-[800px] relative transition-colors rounded-lg",
        isOver && active?.data?.current?.isTemplate && "ring-2 ring-ocean-blue ring-dashed bg-ocean-blue/5",
      )}
    >
      {children}
      {isOver && active?.data?.current?.isTemplate && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-ocean-blue text-sm font-medium bg-white px-3 py-1.5 rounded-full shadow-sm border border-ocean-blue/20">
            Drop to add block
          </div>
        </div>
      )}
    </div>
  )
}

