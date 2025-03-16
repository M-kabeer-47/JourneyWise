"use client"

import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core"

import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Save, Type, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Block } from "@/components/editor/block"
import { Toolbar } from "@/components/editor/toolbar"
import { DroppableContainer } from "@/components/editor/droppable-container"
import { cn } from "@/utils/shadcn/utils"
import type { BlockType } from "@/lib/types/block"
import SaveBlog  from "@/utils/functions/SaveBlog"
import { useEffect } from "react"

interface DndComponentsProps {
  blocks: BlockType[]
  activeId: string | null
  handleDragStart: (event: any) => void
  handleDragEnd: (event: any) => void
  handleDragCancel: () => void
  viewMode: "desktop" | "mobile"
  setViewMode: (mode: "desktop" | "mobile") => void
  selectedBlock: BlockType | undefined
  setSelectedBlock: (block: BlockType | undefined) => void
  handleUpdateBlock: (id: string, updates: Partial<BlockType>) => void
  handleDeleteBlock: (id: string) => void
  handleAddBlock: (type: string, data?: Record<string, any>) => void
  isToolbarExpanded: boolean
  setIsToolbarExpanded: (expanded: boolean) => void
  isMobile: boolean
  toggleMobileToolbar: () => void
  currentBlockIndex: number | null
  setCurrentBlockIndex: (index: number | null) => void
  blocksRef: React.RefObject<HTMLTextAreaElement[]>
  currentListItemIndex: number | null
  setCurrentListItemIndex: (index: number)=>void
  listItemsRef: React.RefObject<Map<string, HTMLTextAreaElement>>
  
}

export default function DndComponents({
  blocks,
  activeId,
  handleDragStart,
  handleDragEnd,
  handleDragCancel,
  viewMode,
  currentBlockIndex,
  setCurrentBlockIndex,
  selectedBlock,
  setSelectedBlock,
  handleUpdateBlock,
  handleDeleteBlock,
  handleAddBlock,
  isToolbarExpanded,
  setIsToolbarExpanded,
  isMobile,
  toggleMobileToolbar,
  blocksRef,
  currentListItemIndex,
  setCurrentListItemIndex,
  listItemsRef,
}: DndComponentsProps) {

  
  useEffect(() => {

  }, [])

  const sensors = useSensors(
    useSensor(isMobile ? TouchSensor : PointerSensor, {
      // Better configuration for both mouse and touch
      activationConstraint: {
        distance: isMobile ? 5 : 5,  // Shorter distance on mobile
        delay: isMobile ? 0 : 0,   // Small delay on mobile to distinguish tap from drag
        tolerance: isMobile ? 0 : 0, // Some tolerance on mobile
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      
    >
      <header className="sticky top-0 z-50 w-full border-b border-light-gray bg-white">
        <div className=" flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-midnight-blue font-[raleway]">JourneyWise</h1>
          </div>
          <div className="flex items-center gap-2">
         
            <Button variant="default" size="sm" className="bg-ocean-blue hover:bg-midnight-blue" onClick={() => SaveBlog(blocks)}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </header>

      <main className={cn(
  `${!isToolbarExpanded && !isMobile ? "pr-[50px] pl-[50px]": "pl-[20px]"} py-8 relative`,
  // Add padding at the bottom when toolbar is expanded on mobile
  isMobile && isToolbarExpanded && "pb-[40vh]",
  // Make the main content area scrollable
  "overflow-y-auto h-[calc(100vh-4rem)]"
)}>
        <div className="flex">
          <div className={cn(
            "flex-1",
            isToolbarExpanded && !isMobile && "mr-[400px]"
          )}>
            <div className="ml-0">
              <div
                className={cn(  
                  "border border-light-gray rounded-lg bg-white shadow-sm transition-all pb-[100px]",
                  viewMode === "mobile" ? "max-w-[375px] mx-auto" : "w-full max-w-[calc(100%-2rem)]"
                )}
              >
                <div className="p-4">
                  <DroppableContainer id="blocks">
                    <SortableContext 
                      items={blocks.filter(block => block && block.id).map((block) => block.id)} 
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-1">
                        {blocks.map((block,index) => 
                          block && block.id ? (
                            <Block
                              
                              key={block.id}
                              {...block}
                              currentBlockIndex={currentBlockIndex}

                              index={index}
                              id={block.id}
                              blocksRef={blocksRef}
                              currentListItemIndex={currentListItemIndex}
                              listItemsRef={listItemsRef}
                              setCurrentBlockIndex={setCurrentBlockIndex}
                              setCurrentListItemIndex={setCurrentListItemIndex}
                              onToggle={() => setIsToolbarExpanded(!isToolbarExpanded)}
                              onDelete={handleDeleteBlock}
                              onUpdate={handleUpdateBlock}
                              onSelect={setSelectedBlock}
                              isSelected={selectedBlock?.id === block.id}
                            />
                          ) : null
                        )}

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

          {/* Mobile toolbar toggle button */}
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
            currentListItemIndex={currentListItemIndex}
            currentBlockIndex={currentBlockIndex ?? 0}
            blockRefs={blocksRef}
            listItemsRef={listItemsRef}
            isExpanded={isToolbarExpanded}
            onToggle={() => setIsToolbarExpanded(!isToolbarExpanded)}
            selectedBlock={selectedBlock}
            onBlockUpdate={handleUpdateBlock}
            onClearSelection={() => setSelectedBlock(undefined)}
            onAddBlock={handleAddBlock}
            onDelete={handleDeleteBlock}
            isMobile={isMobile}
          />
        </div>

        <DragOverlay>
          {activeId && (
            <div className="p-4 rounded-lg bg-white shadow-lg border border-ocean-blue">
              <div className="w-64 h-12 bg-light-gray animate-pulse rounded" />
            </div>
          )}
        </DragOverlay>
      </main>
    </DndContext>
  )
}