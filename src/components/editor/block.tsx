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
import AutoResizeTextarea from "../ui/AutoResizeTextArea"
import { ImageIcon } from "lucide-react"
import { set } from "zod"
interface BlockProps extends BlockType {
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<BlockType>) => void
  onSelect: (block: BlockType) => void
  isSelected: boolean
  setCurrentListItemIndex: (index: number) => void
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
  textStyle,
  imageSize = "medium",
  listStyle = { type: "bulleted", icon: "disc" },
  
  setCurrentListItemIndex,
  position,
  onDelete,
  onUpdate,
  onSelect,
  isSelected,
}: BlockProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

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
    if (contentRef.current) {
      contentRef.current.textContent = content
    }
  }, [content ])

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
    textStyle.bold ? (styles.fontWeight = "bold") : (styles.fontWeight = "normal")
    textStyle.italic ? (styles.fontStyle = "italic") : (styles.fontStyle = "normal")
    textStyle.underline ? (styles.textDecoration = "underline") : (styles.textDecoration = "none")
    return styles
  }

  const getImageSizeClass = () => {
    switch (imageSize) {
      case "small":
        return "max-w-md"
      case "medium":
        return "max-w-2xl"
      case "large":
        return "max-w-4xl"
      case "full":
        return "w-full"
      default:
        return "max-w-2xl"
    }
  }


  const handleClick = (e: React.MouseEvent) => {
    // Immediately select the block and pass current styles
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
      textStyle: textStyle || { bold: false, italic: false, underline: false },
      imageSize,
      listStyle,
      
    });
  }

  const handleFocus = (e: React.FocusEvent) => {
    // Also handle focus events to ensure selection state is updated
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
      textStyle: textStyle || { bold: false, italic: false, underline: false },
      imageSize,
      listStyle,
      
      
    });
  }
  const handleListItemClick = (index: number) => {
    setCurrentListItemIndex(index);
    // Call onSelect with the specified list item index
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
      textStyle: textStyle || { bold: false, italic: false, underline: false },
      imageSize,
      listStyle,
      
    });
  };


 
  

  

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
    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onUpdate(id, { content: e.target.value });
    };

    switch (type) {
      case "heading": {
        return (
          <input
            type="text"
            value={content || ''}
            onChange={handleContentChange}
            // onClick={handleClick}
            onFocus={handleFocus}
            
            placeholder="Type heading..."
            className={cn(
              "w-full outline-none focus:ring-2 focus:ring-ocean-blue/20 rounded px-2",
              "text-charcoal h-[1.5em] overflow-visible",
              level === 1 && "text-4xl  mb-4",
              level === 2 && "text-3xl font-semibold mb-4",
              level === 3 && "text-2xl font-medium mb-3",
              textStyle?.bold && "font-bold",
              textStyle?.italic && "italic",
              textStyle?.underline && "underline",
              align === "center" && "text-center",
              align === "right" && "text-right",
              align === "left" && "text-left",
            )}
          />
        );
      }

      case "paragraph":
        return (
          <AutoResizeTextarea
          value={content}
          onChange={handleContentChange}
          onFocus={handleFocus}
          placeholder="Type paragraph..."
          className="w-full outline-none focus:ring-2 focus:ring-ocean-blue/20 rounded px-1 text-charcoal pl-[5px]" 
          minHeight="1.5em"
        />
        );

      case "image":
        return (
          <div className={cn(
            "mb-6",
            imageSize === "full" && "mx-[-1rem] w-[calc(100%+2rem)]" // Negative margin to break out of container
          )} onClick={handleClick}>
            {url ? (
              <div className={cn(
                getImageSizeClass(),
                align === "left" && "mr-auto ml-0",
                align === "center" && "mx-auto",
                align === "right" && "ml-auto mr-0",
                imageSize === "full" && "mx-0 w-full" // Override alignment for full width
              )}>
                <div className={cn(
                  "border border-light-gray/30 rounded-lg overflow-hidden",
                  imageSize === "full" && "rounded-none", // Remove border radius for full width
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
                "flex flex-col items-center justify-center border border-light-gray/30 p-8 text-center rounded-lg",
                getImageSizeClass(),
                align === "left" && "mr-auto ml-0",
                align === "center" && "mx-auto",
                align === "right" && "ml-auto mr-0",
                imageSize === "small" && "h-48",
                imageSize === "medium" && "h-64",
                imageSize === "large" && "h-80",
                imageSize === "full" && "h-96 w-full rounded-none",
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
                    onClick={handleListItemClick}
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
                    onClick={handleListItemClick}
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
      <div className="absolute md:-left-[30px] left-[-25px] top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ">
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
          "py-2 rounded-lg transition-colors",
          "cursor-default",
          "min-h-fit max-w-full",
          "focus-within:bg-light-gray/20 bg-white",
        )}
        onClick={handleClick}
      >
        {renderContent()}
      </div>
    </div>
  )
}

interface ListItemProps {
  item: string
  index: number
  onUpdate: (index: number, value: string) => void
  onDelete: (index: number) => void
  isDash?: boolean
  align?: string
  textStyle?: { bold?: boolean; italic?: boolean; underline?: boolean }
  isSelected?: boolean
  listStyle?: { type: "numbered" | "bulleted"; icon?: "disc" | "circle" | "none" | "dash" | "tick" }
  isNumbered?: boolean
  onClick?: (index: number) => void
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
  onClick,
}: ListItemProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(index, e.target.value);
  };

  const getTextStyles = () => {
    const styles: Record<string, string> = {
      textAlign: align || "left",
    }

    textStyle?.bold ? (styles.fontWeight = "bold") : (styles.fontWeight = "normal")
    textStyle?.italic ? (styles.fontStyle = "italic") : (styles.fontStyle = "normal")
    textStyle?.underline ? (styles.textDecoration = "underline") : (styles.textDecoration = "none")
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
     
      case "circle":
        return (
          <span className="absolute -left-5 text-ocean-blue">
            <CircleDot className="h-4 w-4" />
          </span>
        )

      case "none":
        return null

      case "tick":
        return (
          <span className="absolute -left-5 text-ocean-blue">
            <Check className="h-4 w-4" />
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
      <input
        type="text"
        value={item}
        onChange={handleChange}
        onClick={()=>onClick(index)}
        placeholder="List item..."
        className={cn(
          "flex-1 outline-none focus:ring-2 focus:ring-ocean-blue/20 rounded px-2 py-1",
          "text-charcoal min-h-[1em]",
          isSelected && "bg-light-gray/50"
        )}
        style={getTextStyles()}
      />
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8 opacity-0 group-hover:opacity-100",
          "text-charcoal hover:text-red-500 hover:bg-red-50"
        )}
        onClick={() => onDelete(index)}
      >
        <X className="h-4 w-4" />
      </Button>
    </li>
  );
}

