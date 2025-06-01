"use client"

import { useState, useCallback } from "react"
import { nanoid } from "nanoid"
import { arrayMove } from "@dnd-kit/sortable"
import type { BlockType, DragData } from "@/lib/types"
import { BLOCK_TYPES } from "@/lib/constants"

export function useBlockEditor() {
  const [blocks, setBlocks] = useState<BlockType[]>([])
  const [selectedBlock, setSelectedBlock] = useState<BlockType>()

  const handleAddBlock = useCallback((type: string, data: Record<string, any> = {}) => {
    const newBlock: BlockType = {
      id: nanoid(),
      type: type as BlockType["type"],
      content: type === BLOCK_TYPES.HEADING ? "New Heading" : type === BLOCK_TYPES.PARAGRAPH ? "Start writing..." : "",
      level: data.level,
      listItems: type === BLOCK_TYPES.LIST ? ["New item"] : undefined,
      images: type === BLOCK_TYPES.CAROUSEL ? [] : undefined,
    }

    setBlocks((blocks) => [...blocks, newBlock])
    setSelectedBlock(newBlock)
    return newBlock
  }, [])

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

  const handleDeleteBlock = useCallback(
    (id: string) => {
      setBlocks((blocks) => blocks.filter((block) => block.id !== id))
      if (selectedBlock?.id === id) {
        setSelectedBlock(undefined)
      }
    },
    [selectedBlock],
  )

  const handleMoveBlock = useCallback((activeId: string, overId: string | null) => {
    setBlocks((blocks) => {
      const oldIndex = blocks.findIndex((block) => block.id === activeId)
      const newIndex = overId ? blocks.findIndex((block) => block.id === overId) : blocks.length - 1
      return arrayMove(blocks, oldIndex, newIndex)
    })
  }, [])

  const handleDropBlock = useCallback(
    (activeData: DragData, overId: string | null) => {
      if (activeData.isTemplate) {
        const newBlock = handleAddBlock(activeData.type, activeData)
        if (overId) {
          setBlocks((blocks) => {
            const overIndex = blocks.findIndex((block) => block.id === overId)
            const withoutNew = blocks.filter((block) => block.id !== newBlock.id)
            const newBlocks = [...withoutNew]
            newBlocks.splice(overIndex + 1, 0, newBlock)
            return newBlocks
          })
        }
      }
    },
    [handleAddBlock],
  )

  return {
    blocks,
    selectedBlock,
    setSelectedBlock,
    handleAddBlock,
    handleUpdateBlock,
    handleDeleteBlock,
    handleMoveBlock,
    handleDropBlock,
  }
}

