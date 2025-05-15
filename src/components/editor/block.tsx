"use client";

import type React from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X, Plus, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BlockType } from "@/lib/types/Block";

import { Check, CircleDot, Dot, Minus } from "lucide-react";
import type { ListItemType } from "@/lib/types/Block";
import AutoResizeTextarea from "../ui/AutoResizeTextArea";
import { ImageIcon } from "lucide-react";
import  DraggableImage from "../ui/DraggableImage";
import { useEffect } from "react";



interface BlockProps extends BlockType {
  onDelete: (id: string, index: number) => void;
  onUpdate: (id: string, updates: Partial<BlockType>) => void;
  onSelect: (block: BlockType) => void;
  isSelected: boolean;
  setCurrentListItemIndex: (index: number) => void;
  setCurrentBlockType: (type: string) => void;
  ref?: React.RefObject<HTMLDivElement | HTMLTextAreaElement>;
  index?: number;
  setCurrentBlockIndex: (index: number | null) => void;
  blocksRef?: React.MutableRefObject<HTMLTextAreaElement[]>;
  listItemsRef?: React.MutableRefObject<Map<string, HTMLTextAreaElement>>;
  currentListItemIndex?: number;
  onToggle?: ()=>void;
  currentBlockIndex?: number | null;
  
  
}

export function Block({
  
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
  margin = { top: 0, bottom: 0 },
  onDelete,
  onUpdate,
  onSelect,
  isSelected,
  id,
  index,
  setCurrentBlockIndex,
  blocksRef,
  listItemsRef,
  currentListItemIndex,
  onToggle,
  
  currentBlockIndex,
  setCurrentBlockType,
  
}: BlockProps) {
  
  
  

  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isOver } = useSortable({
    id,
    transition: {
      duration: 150,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
    
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: "relative" as const,
    zIndex: isDragging ? 10 : 1,
  };

  useEffect(() => {
    if(isDragging) {
      onToggle && onToggle()
    }
  }, [isDragging])

  

  const handleListItemAdd = () => {
    onUpdate(id, {
      listItems: [
        ...listItems,
        {
          content: "",
          textStyle: { bold: false, italic: false, underline: false },
          align: "left",
        },
      ],

    });
    
    
    setTimeout(() => {
      let textarea = listItemsRef?.current.get(`${id}-${listItems.length}`)
      if(textarea){
        textarea.focus()
      }
    }, 50)

  };

  const handleListItemUpdate = (index: number, value: string) => {
    const newItems = [...listItems];
    newItems[index] = {
      content: value,
      textStyle: listItems[index].textStyle,
      align: listItems[index].align,
    };
    onUpdate(id, { listItems: newItems });
  };

  const handleListItemDelete = (index: number) => {
    onUpdate(id, {
      listItems: listItems.filter((_, i) => i !== index),
    });
  };

  const getTextStyles = () => {
    const styles: Record<string, string> = {
      textAlign: align || "left",
    };
    if (textStyle) {
      styles.fontWeight = textStyle.bold ? "800" : "normal";
      styles.fontStyle = textStyle.italic ? "italic" : "normal";
      styles.textDecoration = textStyle.underline ? "underline" : "none";
      
    }
    return styles;
  };

  const getImageSizeClass = () => {
    switch (imageSize) {
      case "small":
        return "max-w-md";
      case "medium":
        return "max-w-2xl";
      case "large":
        return "max-w-3xl";
      case "full":
        return "w-full";
      default:
        return "max-w-2xl";
    }
  };
  const getImageBlockSizeClass = () => {
    switch (imageSize) {
      case "small":
        return "max-w-md h-[330px]";
      case "medium":
        return "max-w-2xl h-[430px]";
      case "large":
        return "max-w-3xl h-[530px]";
      case "full":
        return "w-full";
      default:
        return "max-w-2xl";
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    console.log("Content: "+content)
    setCurrentBlockIndex(index ?? null);
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

  const handleFocus = () => {
    console.log("index: "+index)
    setCurrentBlockIndex(index ?? null);
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

  const handleListItemFocus = (index: number) => {
    console.log("key: "+id+" "+index)
    setCurrentListItemIndex(index);
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
    const styles: React.CSSProperties = {};
    if (margin?.top || margin?.bottom) {
      
      if (margin?.top) {
        styles.marginTop = `${margin.top}px`;
      }
      if (margin?.bottom) {
        styles.marginBottom = `${margin.bottom}px`;
      }
    }
    return styles;
  };

  const renderContent = () => {
    const handleContentChange = (content: string) => {
      
      console.log("content: "+content)
      onUpdate(id, { content });
    };

    switch (type) {
      case "heading": {
        return (
          <AutoResizeTextarea
            blocksRef={blocksRef}
            currentBlockIndex={currentBlockIndex}
            index={index}
            id={id}
            listItemsRef={listItemsRef}
            listItemIndex={currentListItemIndex}
            minHeight="30px"
            value={content || ""}
            onChange={handleContentChange}
            onFocus={handleFocus}
            placeholder="Type heading..."
            textStyles={getTextStyles()}
            setCurrentBlockType={setCurrentBlockType}
            className={cn(
              "w-full outline-none focus:ring-2 focus:ring-ocean-blue/20 rounded px-2",
              "text-black overflow-visible ",
              level === 1 && "text-3xl md:text-5xl font-bold font-raleway",
              level === 2 && "text-2xl md:text-4xl font-semibold font-raleway",  
              level === 3 && "text-xl md:text-3xl font-medium font-raleway",
              align === "center" && "text-center",
              align === "right" && "text-right",
              align === "left" && "text-left"
            )}
          />
        );
      }
      case "paragraph":
        return (
          <AutoResizeTextarea
            blocksRef={blocksRef}
            currentBlockIndex={currentBlockIndex}
            index={index}
            value={content}
            onChange={handleContentChange}
            onFocus={handleFocus}
            placeholder="Type paragraph..."
            className="w-full outline-none  focus:ring-2 focus:ring-ocean-blue/20 rounded px-1 text-charcoal pl-[5px]"
            minHeight="1.5em"
            textStyles={getTextStyles()}
            setCurrentBlockType={setCurrentBlockType}
            
          />
        );
      case "image":
        return (
          <div
            className={cn(
              "h-auto mb-[30px] mt-[30px]",
              imageSize === "full" && "mx-[-1rem] w-[calc(100%+2rem)]"
            )}
            onClick={handleClick}
          >
            {url ? (
              <div
                className={cn(
                  getImageSizeClass(),
                  
                  align === "left" && "mr-auto ml-0",
                  align === "center" && "mx-auto",
                  align === "right" && "ml-auto mr-0",
                  imageSize === "full" && "mx-0 w-full",
                  
                  
                )}
              >
                <div
                  className={cn(
                    "rounded-md overflow-hidden",
                    imageSize === "full" && "rounded-none"
                  )}
                >
                  {imageSize === "full" ? (
                    <DraggableImage
                    blockId={id}
                    width={0}
                    height={220}
                    containerHeight={"220px"}
                    src={url}
                    alt={alt || ""}
                    className="w-full object-cover h-60"
                    onUpdate={onUpdate}
      />
                  ) : (
                    <img src={url} alt={
                      alt || ""
                    } className="w-full object-cover" />
                  )}
                </div>
                {content && (
                  <p className="text-sm text-center text-charcoal/80 mt-2 italic">
                    {content}
                  </p>
                )}
              </div>
            ) : (
              <div
                className={cn(
                  "flex flex-col items-center justify-center border border-light-gray/30 p-8 text-center rounded-lg",
                  getImageBlockSizeClass(),
                  align === "left" && "mr-auto ml-0",
                  align === "center" && "mx-auto",
                  align === "right" && "ml-auto mr-0",
                  
                  imageSize === "full" && "w-full h-60 rounded-none",
                  "border-[2px] border-charcoal/50",
                  isSelected && "ring-2 ring-ocean-blue border-[0px]"
                )}
              >
                <div className="flex flex-col items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-ocean-blue mb-2" />
                  <p className="text-sm text-charcoal">
                    Select this block to upload an image
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      case "list":
        return (
          <div className="group " onClick={handleClick}>
            {listStyle?.type === "numbered" ? (
              <ol
                className={cn(
                  "space-y-1 list-decimal ",
                  align === "center" && "text-center",
                  align === "right" && "text-right"
                )}
                style={getTextStyles()}
              >
                {listItems.map((item: ListItemType, index) => (
                  <ListItem
                    key={index}
                    item={item}
                    index={index}
                    onUpdate={handleListItemUpdate}
                    onDelete={handleListItemDelete}
                    onFocus={handleListItemFocus}
                    align={item.align}
                    textStyle={item}
                    isSelected={isSelected}
                    listStyle={listStyle}
                    id={id}
                    isNumbered
                    listItemsRef={listItemsRef}
                    currentListItemIndex={currentListItemIndex}
                    setCurrentBlockType={setCurrentBlockType}
                  />
                ))}
              </ol>
            ) : (
              <ul
                className={cn(
                  "pl-2 space-y-1",
                  "list-none",
                  align === "center" && "text-center",
                  align === "right" && "text-right"
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
                    onFocus={handleListItemFocus}
                    
                    align={item.align}
                    textStyle={item}
                    isSelected={isSelected}
                    listStyle={listStyle}
                    id={id}
                    listItemsRef={listItemsRef}
                    currentListItemIndex={currentListItemIndex}
                    setCurrentBlockType={setCurrentBlockType}

                  />
                ))}
              </ul>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleListItemAdd();
              }}
              className={cn(
                "text-ocean-blue hover:text-ocean-blue/80 hover:bg-light-gray/50 transition-colors duration-300 ease-in-out",
"ml-2 mt-1 hidden group-hover:flex transition-all duration-300 ease-in-out"

              )}
            >
              {/* show on hover */}

              <Plus className="h-4 w-4 mr-2 " />
              Add Item
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-block-id={id}
      className={cn(
        "group relative rounded-lg transition-all duration-200",
        isDragging && "opacity-50 ring-2 ring-ocean-blue shadow-lg",
        isSelected && "bg-light-gray/50",
        isOver && !isDragging && "after:absolute after:inset-x-0 after:h-0.5 after:-top-2 after:bg-ocean-blue/80",
        "mb-4", // Add some margin to make it easier to drop between blocks
      )}
    >
      {/* Drop indicator - shows where item will be inserted */}
      {isOver && !isDragging && (
        <div className="absolute left-0 right-0 -top-3 h-1 bg-ocean-blue rounded-full z-10" />
      )}
      
      {/* Block Controls - Move to left side, show on hover */}
      <div className={cn(
        "absolute -left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2",
        "opacity-0 group-hover:opacity-100 transition-opacity",
        "z-20",
      )}>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8",
            "cursor-grab hover:bg-light-gray transition-colors",
            isDragging && "cursor-grabbing",
          )}
          {...attributes}
                {...listeners}

        >
          <GripVertical className="h-4 w-4 text-ocean-blue" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8",
            "text-red-500 hover:bg-red-50",
          )}
          onClick={() => onDelete(id, index ?? -1)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Actual block content */}
      <div onClick={handleClick}
                
      style={getPositionStyles()} 
      >
        {renderContent()}
      </div>
    </div>
  );
}

interface ListItemProps {
  id?:string
  item: ListItemType;
  index: number;
  onUpdate: (index: number, value: string) => void;
  onDelete: (index: number) => void;
  
  align?: string;
  textStyle?: ListItemType;
  isSelected?: boolean;
  listStyle?: { type: "numbered" | "bulleted"; icon?: "disc" | "circle" | "none" | "dash" | "tick" };
  isNumbered?: boolean;
  onFocus?: (index: number) => void;
  addItem?: () => void;
  currentListItemIndex?: number;
  listItemsRef?: React.MutableRefObject<Map<string, HTMLElement>>;
  setCurrentBlockType?: (type: "list" | "text") => void;
}

function ListItem({
  item,
  index,
  onUpdate,
  onDelete,
  
  isSelected,
  listStyle,
  isNumbered,
  onFocus,
  id,
  listItemsRef,
  setCurrentBlockType,
  

  
}: ListItemProps) {
  const handleChange = (value: string) => {
    onUpdate(index, value);
  };

  const getListTextStyles = () => {
    const styles: Record<string, string> = {};
    const textStyle = item.textStyle;
    if (textStyle?.bold) styles.fontWeight = "bold";
    if (textStyle?.italic) styles.fontStyle = "italic";
    if (textStyle?.underline) styles.textDecoration = "underline";
    return styles;
  };

  const renderBullet = () => {
    if (isNumbered) {
      return (
        <span className="text-charcoal font-medium min-w-[24px] text-right">
          {index + 1}.
        </span>
      );
    }


    switch (listStyle?.icon) {
      
      case "none":
        return null;
      case "dash":
        return (
          <span className="text-charcoal min-w-[16px]">
            <Minus className="h-4 w-4" />
          </span>
        );  
      
      case "tick":
        return (
          <span className="text-charcoal min-w-[16px]">
            <Check className="h-4 w-4"/>
          </span>
        );
      case "disc":
        return (
          <span className="text-charcoal min-w-[16px]">
            <Dot className="h-5 w-5 " />
          </span>
        );
      
    }
  };

  return (
    <li
      className={cn(
      "flex items-center gap-2 group relative w-full left-[-20px] m-0 text-charcoal pl-4",
        isSelected && "bg-light-gray/50",
        
        
      )}
    
    
    >
      {renderBullet()}
      <div className="flex w-full ">
        <div
          
          className={`w-full relative left-[-5px] 1 ${isNumbered ? "top-[1px]" : ""}`}
        >
          <AutoResizeTextarea            
            type="list"
            value={item.content}
            onListChange={handleChange}
            id={id}
            listItemIndex={index}
            listItemsRef={listItemsRef}
            onFocus={()=>{
              if(onFocus) {
                onFocus(index)  
              }
            }}
            setCurrentBlockType={setCurrentBlockType}
            className={cn(
              "outline-none focus:ring-2 focus:ring-ocean-blue/20 rounded px-2 py-1",
              "text-charcoal min-h-[1em] w-full relative top-[2px]",
              isSelected && "bg-light-gray/50",
              isNumbered && "relative top-[2px] left-[2px]"
            )}
            textStyles={getListTextStyles()}
            
          />
        </div>
      </div>
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




