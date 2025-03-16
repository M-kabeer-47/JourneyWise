import type { BLOCK_TYPES, LIST_TYPES, LIST_ICONS, IMAGE_SIZES, ALIGNMENTS } from "@/lib/constants"


export type ListItemType = {
  content: string
  textStyle: {
    bold: boolean
    italic: boolean
    underline: boolean
  },
  align: "left" | "center" | "right" | ""
}
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
  listItems?: ListItemType[]
  align?: "left" | "center" | "right"
  textStyle?: {
    bold: boolean
    italic: boolean
    underline: boolean
  }
  imageSize?: keyof typeof IMAGE_SIZES
  listStyle?: { type: "numbered" | "bulleted"; icon?: "disc" | "circle" | "none" | "dash" | "tick" };
 
  
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

