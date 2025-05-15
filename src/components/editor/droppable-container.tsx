"use client"

import type React from "react"
import { useDroppable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"

interface DroppableContainerProps {
  id: string
  children: React.ReactNode
  className?: string
}

export function DroppableContainer({
  id,
  children,
  className,
}: DroppableContainerProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    
      <div
        ref={setNodeRef}
        className={cn(
          "rounded-lg transition-colors relative ",
          isOver && "bg-ocean-blue/5 border-2 border-dashed border-ocean-blue/50",
          className
        )}
      >
        {/* Render existing children */}
        {children}
  
        {/* Large bottom area for easy drop */}
        <div className="h-32 w-full opacity-0 pointer-events-none" />
      </div>
    );
}

