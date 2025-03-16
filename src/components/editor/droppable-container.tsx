"use client"

import type React from "react"
import { useDroppable } from "@dnd-kit/core"
import { cn } from "@/utils/shadcn/utils"

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
        "min-h-[200px] rounded-lg transition-colors", 
        isOver && "bg-ocean-blue/5 border-2 border-dashed border-ocean-blue/50",
        className
      )}
      data-droppable-id={id}
    >
      {children}
    </div>
  );
}

