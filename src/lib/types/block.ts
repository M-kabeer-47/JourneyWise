import type { BLOCK_TYPES, LIST_TYPES, LIST_ICONS, IMAGE_SIZES, ALIGNMENTS } from "@/lib/constants"

export type BlockType = {
  id: string
  type: keyof typeof BLOCK_TYPES
  content?: string
  level?: 1 | 2 | 3
  url?: string
  alt?: string
  images?: Array<{
    id: string
    url: string
    alt?: string
  }>
  listItems?: string[]
  align?: keyof typeof ALIGNMENTS
  textStyle?: {
    bold: boolean
    italic: boolean
    underline: boolean
  }
  imageSize?: keyof typeof IMAGE_SIZES
  listStyle?: {
    type: keyof typeof LIST_TYPES
    icon?: keyof typeof LIST_ICONS
  }
 
  
  position?: {
    top?: number
    bottom?: number
  }
  listItemIndex?: number
}


export type DragData = {
  type: string
  isTemplate?: boolean
}

