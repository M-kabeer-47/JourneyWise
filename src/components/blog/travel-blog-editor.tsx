"use client"

import { useState, useCallback, useEffect } from "react"
import { nanoid } from "nanoid"
import dynamic from 'next/dynamic'
    


import type { BlockType } from "@/lib/types/block"
import { arrayMove } from "@dnd-kit/sortable"

// Dynamically import DnD components with ssr: false
const DndComponents = dynamic(
  () => import('@/components/editor/dnd-components'),
  { ssr: false }
)

export default function TravelBlogEditor() {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop")
  const [blocks, setBlocks] = useState<BlockType[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isToolbarExpanded, setIsToolbarExpanded] = useState(true)
  const [selectedBlock, setSelectedBlock] = useState<BlockType | undefined>()
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  // Check if we're on the client
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-collapse toolbar on mobile
  useEffect(() => {
    if (isMobile && !selectedBlock) {
      setIsToolbarExpanded(false)
    }
  }, [isMobile, selectedBlock])

  const handleDragStart = useCallback((event: any) => {
    setActiveId(event.active.id)
  }, [])

  const handleDragEnd = useCallback((event: any) => {
    const { active, over } = event
    
    if (over && active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        
        return arrayMove(items, oldIndex, newIndex)
      })
    }
    
    setActiveId(null)
  }, [])

  const handleDragCancel = useCallback(() => {
    setActiveId(null)
  }, [])

  const handleAddBlock = useCallback((type: string, data?: Record<string, any>) => {
    const newBlock: BlockType = {
      id: nanoid(),
      type,
      textStyle: {
        bold: type === 'heading' ? true : false,
        italic: false,
        underline: false,
      },
      ...data,
    }
    
    setBlocks((prev) => [...prev, newBlock])
  }, [])

  function handleUpdateBlock(id: string, updates: Partial<BlockType>) {
    
    if (selectedBlock?.id === id) {
      setSelectedBlock((prev) => {
        if (prev) {
          return { ...prev, ...updates }
        }
        return prev
      });
    }
   
    
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id === id) {
          // Special handling for textStyle updates to preserve existing styles
          if (updates.textStyle) {
            const updatedBlock = {
              ...block,
              ...updates,
              textStyle: {
                ...block.textStyle,
                ...updates.textStyle
              }
            };
            
            return updatedBlock;
          }
          return { ...block, ...updates }
        }
        return block
      })
    )
  }
  
  

  const handleDeleteBlock = useCallback((id: string) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id))
    if (selectedBlock?.id === id) {
      setSelectedBlock(undefined)
    }
  }, [selectedBlock])

  
  const toggleMobileToolbar = useCallback(() => {
    setIsToolbarExpanded((prev) => !prev)
  }, [])

  // Render placeholder during SSR
  if (!isClient) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-light-gray rounded w-48 mb-8"></div>
            <div className="h-64 bg-light-gray/50 rounded mb-4"></div>
            <div className="h-32 bg-light-gray/50 rounded mb-4"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <DndComponents
        blocks={blocks}
        activeId={activeId}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
        handleDragCancel={handleDragCancel}
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedBlock={selectedBlock}
        setSelectedBlock={setSelectedBlock}
        handleUpdateBlock={handleUpdateBlock}
        handleDeleteBlock={handleDeleteBlock}
        handleAddBlock={handleAddBlock}
        isToolbarExpanded={isToolbarExpanded}
        setIsToolbarExpanded={setIsToolbarExpanded}
        isMobile={isMobile}
        toggleMobileToolbar={toggleMobileToolbar}
      />
    </div>
  )
}

