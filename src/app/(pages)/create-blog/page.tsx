"use client"

import { useState, useRef,useCallback, useEffect } from "react"
import { nanoid } from "nanoid"
import dynamic from 'next/dynamic'



import type { BlockType } from "@/lib/types/block"


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
  const [currentBlockIndex, setCurrentBlockIndex] = useState<number | null>(null)
  const blocksRef = useRef<HTMLTextAreaElement[]>([])
  const [currentListItemIndex, setCurrentListItemIndex] = useState<number>(0);   
      const listItemsRef = useRef<Map<string, HTMLTextAreaElement>>(new Map());
  
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

  const handleAddBlock = useCallback((type: string, data?: Record<string, any>) => {
    let id = nanoid()
    const newBlock: BlockType = {
      id,
      type,
      textStyle: {
        bold: type === 'heading' ? true : false,
        italic: false,
        underline: false,
      },
      ...data,
    }
    setSelectedBlock(newBlock)
    setBlocks((prev) => [...prev, newBlock])
    setTimeout(() => {
    if(type==="list"){
      let textarea = listItemsRef.current.get(`${id}-${currentListItemIndex}`)
      if(textarea){
        textarea.focus()
      }
    }
    else{
      if(type!="image"){
        let textarea=blocksRef.current[blocksRef.current.length-1]
      if(textarea){
      console.log("textarea",textarea)
      textarea.focus()
    }
      }
 
    }
    
    }
    ,50)
    

  }, [])

  const handleDragEnd = useCallback((event: any) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      return;
    }
    
    // Handle inserting new blocks from toolbar
    if (active.id.toString().startsWith('new-') && over.id) {
      const { type, ...data } = active.data.current || {};
      
      // Check if we're inserting into the main container or between blocks
      if (over.id === 'blocks') {
        // Add to the end
        handleAddBlock(type, data);
      } else {
        // Insert before the target block
        const newBlock = {
          id: nanoid(),
          type,
          textStyle: {
            bold: type === 'heading' ? true : false,
            italic: false,
            underline: false,
          },
          ...data,
        };
        
        setBlocks(prev => {
          const index = prev.findIndex(block => block.id === over.id);
          if (index === -1) return [...prev, newBlock]; // fallback to append
          
          const newBlocks = [...prev];
          newBlocks.splice(index, 0, newBlock);
          return newBlocks;
        });
      }
      
      setActiveId(null);
      return;
    }
    
    // Handle reordering existing blocks
    if (active.id !== over.id) {
      setBlocks(prev => {
        const oldIndex = prev.findIndex(block => block.id === active.id);
        const newIndex = prev.findIndex(block => block.id === over.id);
        
        if (oldIndex !== -1 && newIndex !== -1) {
          const result = [...prev];
          const [removed] = result.splice(oldIndex, 1);
          result.splice(newIndex, 0, removed);
          return result;
        }
        
        return prev;
      });
    }
    
    setActiveId(null);
  }, [handleAddBlock]);

  const handleDragCancel = useCallback(() => {
    setActiveId(null)
  }, [])

  

  function handleUpdateBlock(id: string, updates: Partial<BlockType>) {
    
    if (selectedBlock?.id === id) {
      setSelectedBlock((prev) => {
        if (prev) {
          if (updates.listItems) {
            
            return { ...prev, listItems: updates.listItems, ...updates };
          }
          return { ...prev, ...updates };
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

        blocksRef={blocksRef}
        currentBlockIndex={currentBlockIndex}
        listItemsRef={listItemsRef}
        currentListItemIndex={currentListItemIndex}
        setCurrentListItemIndex={setCurrentListItemIndex}
        setCurrentBlockIndex={setCurrentBlockIndex}
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

