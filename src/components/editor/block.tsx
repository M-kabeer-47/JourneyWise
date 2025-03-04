"use client"

import type React from "react"
import Image from "next/image"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, X, Plus, ChevronLeft, ChevronRight, Settings2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils/shadcn/utils"
import type { BlockType } from "@/lib/types/block"
import { type JSX, useState, useRef, useEffect } from "react"
import { Check, CircleDot, Dot, Minus } from "lucide-react"
import { useSensors, useSensor, PointerSensor, KeyboardSensor } from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { isMobile } from "@/utils/blog/utils"

import { ImageIcon } from "lucide-react"
interface BlockProps extends BlockType {
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<BlockType>) => void
  onSelect: (block: BlockType) => void
  isSelected: boolean
  margin?: { top?: number; bottom?: number }
  position?: { top?: number; bottom?: number }
}

export function Block({
  id,
  type,
  content = "",
  level = 1,
  url,
  alt,
  images = [],
  listItems = [],
  align = "left",
  textStyle = {},
  imageSize = "medium",
  listStyle = { type: "bulleted", icon: "disc" },
  margin,
  position,
  onDelete,
  onUpdate,
  onSelect,
  isSelected,
}: BlockProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false) // Added mobile menu state
  const contentRef = useRef<HTMLElement>(null)
  const [isTouching, setIsTouching] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isOver } = useSortable({
    id,
    data: {
      type,
      isTemplate: false,
    },
  })

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // Reduce the distance required to start dragging on mobile
        distance: isMobile ? 5 : 8,
        // Add a delay before dragging starts on mobile to prevent accidental drags
        delay: isMobile ? 200 : 0,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  useEffect(() => {
    if (contentRef.current && !isEditing) {
      contentRef.current.textContent = content
    }
  }, [content, isEditing])

  useEffect(() => {
    const handleTouchStart = () => setIsTouching(true)
    const handleTouchEnd = () => setIsTouching(false)

    document.addEventListener("touchstart", handleTouchStart)
    document.addEventListener("touchend", handleTouchEnd)

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [])

  const handleListItemAdd = () => {
    onUpdate(id, {
      listItems: [...listItems, "New item"],
    })
  }

  const handleListItemUpdate = (index: number, value: string) => {
    const newItems = [...listItems]
    newItems[index] = value
    onUpdate(id, { listItems: newItems })
  }

  const handleListItemDelete = (index: number) => {
    onUpdate(id, {
      listItems: listItems.filter((_, i) => i !== index),
    })
  }

  const getTextStyles = () => {
    const styles: Record<string, string> = {
      textAlign: align || "left",
    }
    if (textStyle?.bold) styles.fontWeight = "bold"
    if (textStyle?.italic) styles.fontStyle = "italic"
    if (textStyle?.underline) styles.textDecoration = "underline"
    return styles
  }

  const getImageSizeClass = () => {
    switch (imageSize) {
      case "small":
        return "max-w-md mx-auto"
      case "medium":
        return "max-w-2xl mx-auto"
      case "large":
        return "max-w-4xl mx-auto"
      case "full":
        return "w-full -mx-4 md:-mx-8 rounded-[0px]"
      default:
        return "max-w-2xl mx-auto"
    }
  }

  const getListStyleType = () => {
    if (listStyle.type === "numbered") return "decimal"
    switch (listStyle.icon) {
      case "circle":
        return "circle"
      case "square":
        return "square"
      case "dash":
        return "none"
      default:
        return "disc"
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    
    // Don't do anything on click - icons will be visible through CSS
  }

  const handleOpenToolbar = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect({
      id,
      type,
      content,
      level,
      url,
      alt,
      images,
      listItems,
      align,
      textStyle,
      imageSize,
      listStyle,
      margin,
    })
  }

  

  

  const getPositionStyles = () => {
    const styles: React.CSSProperties = {}
    
    // Only apply positioning if we have position values
    if (position?.top || position?.bottom) {
      styles.position = 'relative' // Set relative positioning
      
      if (position?.top) {
        styles.top = `${position.top}px` // Use top instead of margin
      }
      if (position?.bottom) {
        styles.top = `-${position.bottom}px` // Use negative top for bottom positioning
      }
    }
    
    return styles
  }

  const renderContent = () => {
    const commonInputStyles = cn(
      "outline-none focus:ring-2 focus:ring-ocean-blue/20 rounded px-2",
      "text-charcoal min-h-[1em]",
      "empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400",
      "hover:bg-light-gray/20 focus:bg-light-gray/20 transition-colors",
      "cursor-text",
    )

    switch (type) {
      case "heading": {
        const Tag = `h${level}` as keyof JSX.IntrinsicElements
        return (
          <Tag
            ref={contentRef as any}
            className={cn(
              commonInputStyles,
              level === 1 && "text-4xl font-bold mb-6",
              level === 2 && "text-3xl font-semibold mb-4",
              level === 3 && "text-2xl font-medium mb-3",
            )}
            contentEditable
            data-placeholder="Type heading..."
            suppressContentEditableWarning
            style={getTextStyles()}
          />
        )
      }

      case "paragraph":
        return (
          <p
            ref={contentRef as any}
            className={cn(commonInputStyles, "mb-4 leading-relaxed")}
            contentEditable
            data-placeholder="Type paragraph..."
            suppressContentEditableWarning
            style={getTextStyles()}
          />
        )

      case "image":
        return (
          <div className="mb-6" onClick={handleClick}>
            {url ? (
              <div className={cn(
                getImageSizeClass(),
                align === "left" && "mr-auto ml-0",
                align === "center" && "mx-auto",
                align === "right" && "ml-auto mr-0",
              )}>
                <div className={cn(
                  "border border-light-gray/30 rounded-lg overflow-hidden",
                  isSelected && "ring-2 ring-ocean-blue"
                )}>
                  <Image
                    src={url}
                    alt={alt || ""}
                    width={1200}
                    height={800}
                    className={cn(
                      "w-full h-auto object-cover",
                      imageSize === "full" ? "aspect-[21/9]" : "aspect-auto"
                    )}
                    priority={imageSize === "full"}
                  />
                </div>
                {content && (
                  <p className="text-sm text-center text-charcoal/80 mt-2 italic">
                    {content}
                  </p>
                )}
              </div>
            ) : (
              <div className={cn(
                "flex flex-col items-center justify-center border-2 border-ocean-blue p-8 text-center rounded-lg",
                getImageSizeClass(),
                align === "left" && "mr-auto ml-0",
                align === "center" && "mx-auto",
                align === "right" && "ml-auto mr-0",
                imageSize === "small" && "h-48",
                imageSize === "medium" && "h-64",
                imageSize === "large" && "h-80",
                imageSize === "full" && "h-96 aspect-[21/9]",
                isSelected && "ring-2 ring-ocean-blue"
              )}>
                <div className="flex flex-col items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-ocean-blue mb-2" />
                  <p className="text-sm text-charcoal">Select this block to upload an image</p>
                </div>
              </div>
            )}
          </div>
        )

      case "list":
        return (
          <div className="-mt-2 mb-4" onClick={handleClick}>
            {listStyle?.type === "numbered" ? (
              <ol
                className={cn(
                  "pl-6 space-y-1 list-decimal",
                  align === "center" && "text-center",
                  align === "right" && "text-right",
                )}
                style={getTextStyles()}
              >
                {listItems.map((item, index) => (
                  <ListItem
                    key={index}
                    item={item}
                    index={index}
                    onUpdate={handleListItemUpdate}
                    onDelete={handleListItemDelete}
                    
                    align={align}
                    textStyle={textStyle}
                    isSelected={isSelected}
                    listStyle={listStyle}
                    isNumbered
                  />
                ))}
              </ol>
            ) : (
              <ul
                className={cn(
                  "pl-6 space-y-1",
                  "list-none",
                  align === "center" && "text-center",
                  align === "right" && "text-right",
                )}
                style={getTextStyles()}
              >
                {listItems.map((item, index) => (
                  <ListItem
                    key={index}
                    item={item}
                    index={index}
                    onUpdate={handleListItemUpdate}
                    onDelete={handleListItemDelete}
                    
                    isDash={listStyle?.icon === "dash"}
                    align={align}
                    textStyle={textStyle}
                    isSelected={isSelected}
                    listStyle={listStyle}
                  />
                ))}
              </ul>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                handleListItemAdd()
              }}
              className={cn(
                "text-ocean-blue hover:text-ocean-blue/80 hover:bg-light-gray/50",
                "ml-6 mt-2 transition-colors",
              )}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        )

      case "carousel":
        return (
          <div className="mb-6" onClick={handleClick}>
            {images.length > 0 ? (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-light-gray">
                <Image
                  src={images[currentSlide].url || "/placeholder.svg?height=720&width=1280"}
                  alt={images[currentSlide].alt || "Carousel image"}
                  fill
                  className="object-cover"
                />
                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                      }}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))
                      }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "w-1.5 h-1.5 rounded-full transition-all",
                        index === currentSlide ? "bg-white w-3" : "bg-white/60 hover:bg-white/80",
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentSlide(index)
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="aspect-video rounded-lg border-2 border-dashed border-light-gray flex items-center justify-center">
                <div className="text-center text-charcoal">
                  <Plus className="w-6 h-6 mx-auto mb-2 text-ocean-blue" />
                  <p>Add images to create a carousel</p>
                </div>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        ...getPositionStyles()
      }}
      className={cn(
        "group relative rounded-lg transition-all duration-200 cursor-pointer relative ",
        isDragging && "opacity-50 ring-2 ring-ocean-blue shadow-lg z-50",
        isSelected && "bg-light-gray/50",
        isTouching && "bg-light-gray/20",
        isOver &&
          !isDragging &&
          "after:absolute after:inset-x-0 after:h-3 after:-bottom-3 after:bg-ocean-blue/10 after:border-b-2 after:border-ocean-blue",
      )}
    >
      {/* Block Controls - Show only on hover/focus */}
      <div className="absolute md:-left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ">
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8 cursor-grab hover:bg-light-gray transition-colors", isDragging && "cursor-grabbing")}
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="h-4 w-4 text-ocean-blue" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-light-gray transition-colors"
          onClick={handleOpenToolbar}
        >
          <Settings2 className="h-4 w-4 text-ocean-blue" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-red-50 hover:text-red-500 transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            onDelete(id)
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Content Area */}
      <div
        className={cn(
          "py-2 px-4 rounded-lg transition-colors",
          "cursor-default",
          "hover:bg-light-gray/20",
          "focus-within:bg-light-gray/20",
        )}
        onClick={handleClick}
      >
        {renderContent()}
      </div>
    </div>
  )
}

function ListItem({
  item,
  index,
  onUpdate,
  onDelete,
  
  isDash,
  align,
  textStyle,
  isSelected,
  listStyle,
  isNumbered,
}: {
  item: string
  index: number
  onUpdate: (index: number, value: string) => void
  onDelete: (index: number) => void
  
  isDash?: boolean
  align?: string
  textStyle?: { bold?: boolean; italic?: boolean; underline?: boolean }
  isSelected?: boolean
  listStyle?: { type: "numbered" | "bulleted"; icon?: "disc" | "circle" | "square" | "dash" }
  isNumbered?: boolean
}) {
  const getTextStyles = () => {
    const styles: Record<string, string> = {
      textAlign: align || "left",
    }
    if (textStyle?.bold) styles.fontWeight = "bold"
    if (textStyle?.italic) styles.fontStyle = "italic"
    if (textStyle?.underline) styles.textDecoration = "underline"
    return styles
  }

  const renderBullet = () => {
    if (isNumbered) {
      return <span className="absolute -left-6 text-ocean-blue font-medium">{index + 1}.</span>
    }

    if (isDash) {
      return (
        <span className="absolute -left-4 text-ocean-blue">
          <Minus className="h-4 w-4" />
        </span>
      )
    }

    switch (listStyle?.icon) {
      case "square":
        return (
          <span className="absolute -left-5 text-ocean-blue">
            <Check className="h-4 w-4" />
          </span>
        )
      case "circle":
        return (
          <span className="absolute -left-5 text-ocean-blue">
            <CircleDot className="h-4 w-4" />
          </span>
        )
      case "disc":
      default:
        return (
          <span className="absolute -left-5 text-ocean-blue">
            <Dot className="h-5 w-5" />
          </span>
        )
    }
  }

  return (
    <li className={cn("flex items-center gap-2 group relative -mt-1", isSelected && "bg-light-gray/50")}>
      {renderBullet()}
      <div
        className={cn(
          "flex-1 outline-none focus:ring-2 focus:ring-ocean-blue/20 rounded px-2 py-1 text-charcoal min-h-[1em]",
          "empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400",
          "hover:bg-light-gray/50 focus:bg-light-gray/50 transition-colors",
          isSelected && "bg-light-gray/50",
        )}
        contentEditable
        data-placeholder="List item..."
        suppressContentEditableWarning
        
        
        onClick={(e) => e.stopPropagation()}
        style={getTextStyles()}
      >
        {item}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity",
          "text-charcoal hover:text-red-500 hover:bg-red-50",
        )}
        onClick={(e) => {
          e.stopPropagation()
          onDelete(index)
        }}
      >
        <X className="h-4 w-4" />
      </Button>
    </li>
  )
}

