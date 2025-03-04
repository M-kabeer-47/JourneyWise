"use client"

import { useState, useCallback, useEffect } from "react"
import { nanoid } from "nanoid"
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Laptop, Smartphone, Save, Type, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Block } from "@/components/editor/block"
import { Toolbar } from "@/components/editor/toolbar"
import { DroppableContainer } from "@/components/editor/droppable-container"

import { cn } from "@/utils/shadcn/utils"
import type { BlockType, DragData } from "@/lib/types/block"

export default function TravelBlogEditor() {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop")
  const [blocks, setBlocks] = useState<BlockType[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isToolbarExpanded, setIsToolbarExpanded] = useState(true)
  const [selectedBlock, setSelectedBlock] = useState<BlockType | undefined>()
  const [isMobile, setIsMobile] = useState(false)
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 500)
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveId(null)
      return
    }

    const activeData = active.data.current as DragData
    const overId = over.id === "editor-content" ? null : over.id

    if (activeData.isTemplate) {
      // Add new block
      const newBlock: BlockType = {
        id: nanoid(),
        type: activeData.type as BlockType["type"],
        content:
          activeData.type === "heading" ? "New Heading" : activeData.type === "paragraph" ? "Start writing..." : "",
        level: activeData.level,
        listItems: activeData.type === "list" ? ["New item"] : undefined,
        images: activeData.type === "carousel" ? [] : undefined,
      }

      setBlocks((blocks) => {
        if (!overId) {
          return [...blocks, newBlock]
        }

        const overIndex = blocks.findIndex((block) => block.id === overId)
        const newBlocks = [...blocks]
        newBlocks.splice(overIndex + 1, 0, newBlock)
        return newBlocks
      })

      setSelectedBlock(newBlock)
    } else if (active.id !== over.id) {
      // Reorder existing blocks
      setBlocks((blocks) => {
        const oldIndex = blocks.findIndex((block) => block.id === active.id)
        const newIndex = overId ? blocks.findIndex((block) => block.id === overId) : blocks.length - 1
        return arrayMove(blocks, oldIndex, newIndex)
      })
    }

    setActiveId(null)
  }

  const handleDragCancel = () => {
    setActiveId(null)
  }

  const handleDeleteBlock = useCallback(
    (id: string) => {
      setBlocks((blocks) => blocks.filter((block) => block.id !== id))
      if (selectedBlock?.id === id) {
        setSelectedBlock(undefined)
      }
    },
    [selectedBlock],
  )

  const handleUpdateBlock = useCallback(
    (id: string, updates: Partial<BlockType>) => {
      setBlocks((blocks) => blocks.map((block) => (block.id === id ? { ...block, ...updates } : block)))
      if (updates.selected === false) {
        setSelectedBlock(undefined)
      } else if (selectedBlock?.id === id) {
        setSelectedBlock((prev) => (prev ? { ...prev, ...updates } : prev))
      }
    },
    [selectedBlock],
  )

  const handleAddBlock = useCallback((type: string, data: Record<string, any> = {}) => {
    const newBlock: BlockType = {
      id: nanoid(),
      type: type as BlockType["type"],
      content: type === "heading" ? "New Heading" : type === "paragraph" ? "Start writing..." : "",
      level: data.level,
      listItems: type === "list" ? ["New item"] : undefined,
      images: type === "carousel" ? [] : undefined,
    }

    setBlocks((blocks) => [...blocks, newBlock])
    setSelectedBlock(newBlock)
  }, [])

  function handleSave(){
    console.log("Saving...")
  }
  
  // Toggle toolbar for mobile
  const toggleMobileToolbar = () => {
    setIsToolbarExpanded(!isToolbarExpanded)
  }
  
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-light-gray bg-white/80 backdrop-blur-xl">
        <div className="h-full flex items-center justify-between px-4">
          <h1 className="text-xl font-semibold text-midnight-blue">Travel Blog Editor</h1>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 mr-2">
              <Button
                variant={viewMode === "desktop" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("desktop")}
                className="text-ocean-blue"
              >
                <Laptop className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "mobile" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("mobile")}
                className="text-ocean-blue"
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>

            <Button
              size="sm"
              className="bg-ocean-blue hover:bg-midnight-blue text-white transition-colors"
              onClick={handleSave}
            >
              <Save className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Save Changes</span>
            </Button>
          </div>
        </div>
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <main className={cn(
          "pt-16 min-h-screen",
          isMobile && isToolbarExpanded && "pb-[60vh]" // Add padding when toolbar is expanded on mobile
        )}>
          <div className={cn(
            "transition-all duration-300", 
            !isMobile && isToolbarExpanded ? "lg:mr-[400px]" : "lg:mr-12",
            "mr-0"
          )}>
            <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-8">
              <div
                className={cn(
                  "mx-auto transition-all duration-300",
                  viewMode === "mobile" ? "max-w-[375px]" : "w-full",
                )}
              >
                <div className="bg-white rounded-lg border border-light-gray p-4 md:p-8">
                  <DroppableContainer>
                    <SortableContext items={blocks.map((block) => block.id)} strategy={verticalListSortingStrategy}>
                      <div className="space-y-6">
                        {blocks.map((block) => (
                          <Block
                            key={block.id}
                            {...block}
                            onDelete={handleDeleteBlock}
                            onUpdate={handleUpdateBlock}
                            onSelect={setSelectedBlock}
                            isSelected={selectedBlock?.id === block.id}
                          />
                        ))}

                        {blocks.length === 0 && (
                          <div className="h-[calc(100vh-16rem)] flex flex-col items-center justify-center text-center p-4">
                            <div className="w-16 h-16 mb-4 rounded-full bg-light-gray flex items-center justify-center">
                              <Type className="h-6 w-6 text-ocean-blue" />
                            </div>
                            <h3 className="text-lg font-medium text-midnight-blue mb-2">Start Creating</h3>
                            <p className="text-sm text-charcoal max-w-sm">
                              Drag and drop elements from the toolbar to start building your travel blog
                            </p>
                          </div>
                        )}
                      </div>
                    </SortableContext>
                  </DroppableContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile toolbar toggle button - adjust positioning */}
          {isMobile && !isToolbarExpanded && (
            <Button
              variant="secondary"
              size="icon"
              className="fixed bottom-20 right-4 z-50 rounded-full shadow-lg h-12 w-12 bg-ocean-blue text-white hover:bg-midnight-blue"
              onClick={toggleMobileToolbar}
            >
              <Settings className="h-5 w-5" />
            </Button>
          )}

          <Toolbar
            isExpanded={isToolbarExpanded}
            onToggle={() => setIsToolbarExpanded(!isToolbarExpanded)}
            selectedBlock={selectedBlock}
            onBlockUpdate={handleUpdateBlock}
            onClearSelection={() => setSelectedBlock(undefined)}
            onAddBlock={handleAddBlock}
            onDelete={handleDeleteBlock}
            isMobile={isMobile}
          />
        </main>

        <DragOverlay>
          {activeId && (
            <div className="p-4 rounded-lg bg-white shadow-lg border border-ocean-blue">
              <div className="w-64 h-12 bg-light-gray animate-pulse rounded" />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

