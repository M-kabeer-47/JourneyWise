"use client"

import React, {  useEffect ,useState} from "react"
import { ListItemType } from "@/lib/types/block"

import {
  ChevronRight,
  ImageIcon,
  List,
  ListOrdered,
  GripVertical, 
  ChevronLeft,
  Check,
  Minus,
  Heading1,
  Heading2,
  Heading3,
  Text,
  Images,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  ArrowLeft,
  SplitSquareHorizontal,
  StretchHorizontal,
  Maximize2,
  ArrowUpWideNarrowIcon as ArrowsHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import ImageSizeOption from "../ui/ImageSizeOption"
import { ImageUpload } from "@/components/editor/image-upload"
import { EmojiPicker } from "@/components/editor/emoji-picker"
import { cn } from "@/utils/shadcn/utils"
import type { BlockType } from "@/lib/types/block"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { DraggableItem } from "./draggable-item"
import { current } from "@reduxjs/toolkit"


interface ToolbarProps {
  isExpanded: boolean
  onToggle: () => void
  selectedBlock?: BlockType
  onBlockUpdate?: (id: string, updates: Partial<BlockType>) => void
  onClearSelection?: () => void
  onAddBlock?: (type: string, data?: Record<string, any>) => void
  onDelete?: (id: string) => void
  isMobile?: boolean
  currentListItemIndex: number
  currentBlockIndex: number
  blockRefs: React.MutableRefObject<HTMLTextAreaElement[]>
  listItemsRef: React.MutableRefObject<Map<string, HTMLTextAreaElement>>
}

const PositionSlider = ({ handlePositionChange, initialValue = 0 }: { 
  handlePositionChange: (value: number) => void,
  initialValue?: number 
}) => {
  // Add local state to track slider value during interaction
  const [sliderValue, setSliderValue] = useState(initialValue);
  
  // Update local state when initialValue changes (from parent)
  useEffect(() => {
    setSliderValue(initialValue);
  }, [initialValue]);
  
  // Handler for slider change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(e.target.value);
    setSliderValue(newValue);
    handlePositionChange(newValue);
  };
  
  return (
    <div className="border-t border-light-gray mt-4 pt-4">
      <h4 className="text-sm font-medium text-charcoal mb-2">Block Spacing</h4>
      <div className="px-2">
        <div className="flex items-center gap-3">
          <span className="text-xs text-charcoal whitespace-nowrap">Bottom</span>
          <div className="relative flex-1">
            <input
              type="range"
              min="-5"
              max="5"
              step="1"
              value={sliderValue}
              onChange={handleChange}
              className="w-full h-2 bg-light-gray rounded-lg appearance-none cursor-pointer accent-ocean-blue"
              style={{
                accentColor: 'var(--ocean-blue, #0077cc)',
                background: 'linear-gradient(to right, #e2e8f0, #e2e8f0)',
                height: '6px',
              }}
            />
            <div className="absolute w-full flex justify-between text-xs text-charcoal/50 px-1 mt-1">
              <span>-5</span>
              <span>0</span>
              <span>5</span>
            </div>
          </div>
          <span className="text-xs text-charcoal whitespace-nowrap">Top</span>
        </div>
        <div className="text-center mt-4">
          <span className="inline-block px-3 py-1 bg-ocean-blue/10 text-ocean-blue text-xs rounded-full">
            {sliderValue > 0 ? `Top: ${sliderValue}` : sliderValue < 0 ? `Bottom: ${Math.abs(sliderValue)}` : "No spacing"}
          </span>
        </div>
      </div>
    </div>
  );
};


// Define the most important tools for mobile quick access
const mobileQuickTools = [
  {
    key: "heading-1",
    icon: <Heading1 className="h-4 w-4" />,
    type: "heading",
    data: { level: 1 },
  },
  {
    key: "paragraph",
    icon: <Text className="h-4 w-4" />,
    type: "paragraph",
  },
  {
    key: "image",
    icon: <ImageIcon className="h-4 w-4" />,
    type: "image",
  
  },
  {
    key: "list-bulleted",
    icon: <List className="h-4 w-4" />,
    type: "list",
    data: { listStyle: { type: "bulleted" } },
  },
  
];

// Custom styled input component
const StyledInput = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  description 
}: { 
  label: string; 
  placeholder: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  description?: string;
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-charcoal">{label}</label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={cn(
            "w-full px-3 py-2.5 rounded-md",
            "border border-light-gray bg-white text-charcoal",
            "placeholder:text-charcoal/40",
            "focus:outline-none focus:ring-2 focus:ring-ocean-blue/30 focus:border-ocean-blue",
            "transition-colors duration-200"
          )}
        />
      </div>
      {description && (
        <p className="text-xs text-charcoal/70">{description}</p>
      )}
    </div>
  );
};

export function Toolbar({
  isExpanded,
  onToggle,
  selectedBlock,
  onBlockUpdate,
  onClearSelection,
  onAddBlock,
currentBlockIndex,
  isMobile = false,
  currentListItemIndex,
  blockRefs,
  listItemsRef,
}: ToolbarProps) {
  // Add a ref to track current styles
  



  const handlePositionChange = (value: number) => {
    if (selectedBlock) {
      onBlockUpdate?.(selectedBlock.id, {
        position: {
          top: value > 0 ? value * 8 : 0, // Positive value moves down
          bottom: value < 0 ? Math.abs(value) * 8 : 0, // Negative value moves up
        },
      })
    }
  }
  
  // Calculate initial position value for the slider
  const getInitialPositionValue = () => {
    if (!selectedBlock) return 0
    
    const position = selectedBlock.position || {};
    const { top = 0, bottom = 0 } = position;
    
    if (top > 0) return Math.round(top / 8); // Convert back from pixels
    if (bottom > 0) return -Math.round(bottom / 8);
    return 0;
  }

  const tools = [
    {
      type: "heading",
      icon: <Heading1 className="h-4 w-4" />,
      label: "Heading 1",
      key: "heading-1",
      data: { level: 1 },
    },
    {
      type: "heading",
      icon: <Heading2 className="h-4 w-4" />,
      label: "Heading 2",
      key: "heading-2",
      data: { level: 2 },
    },
    {
      type: "heading",
      icon: <Heading3 className="h-4 w-4" />,
      label: "Heading 3",
      key: "heading-3",
      data: { level: 3 },
    },
    { type: "paragraph", icon: <Text className="h-4 w-4" />, label: "Paragraph", key: "paragraph" },
    { type: "image", icon: <ImageIcon className="h-4 w-4" />, label: "Image", key: "image" },
    { type: "list", icon: <List className="h-4 w-4" />, label: "List", key: "list", data: { align: "", listItems: [{
      content: "",
      textStyle: {
        bold: false,
        italic: false,
        underline: false,
      },
      align: "left",
    }] } },
    
  ]

  const handleAlign = (align: "left" | "right" | "center") => {
   if(selectedBlock?.type === "list" && selectedBlock.listItems) {
      onBlockUpdate?.(selectedBlock.id, {
        listItems: selectedBlock.listItems.map((item, index) => index === currentListItemIndex ? { ...item, align } : item),
      });
    
    }

    else if (selectedBlock) {
      onBlockUpdate?.(selectedBlock.id, { align })
      selectedBlock.align = align
    }
  }

  const handleListItemStyle = (style: string) => {

    if (selectedBlock && selectedBlock.type === "list" && selectedBlock.listItems) {
      const currentListItem = selectedBlock.listItems[currentListItemIndex];
      if (!currentListItem) return;
      else {
        const currentStyles = currentListItem.textStyle
        console.log("Current styles of the list item with index: "+currentListItemIndex+" are: "+JSON.stringify(currentStyles))
        const newStyles = {
          ...currentStyles,
          [style as keyof ListItemType["textStyle"]]: !currentStyles[style]
        };
        console.log("New styles of the list item with index: "+currentListItemIndex+" are: "+JSON.stringify(newStyles))
        onBlockUpdate?.(selectedBlock.id, {
          listItems: selectedBlock.listItems.map((item, index) => index === currentListItemIndex ? { ...item, textStyle: newStyles } : item),
        });
      }
    }
  }
  const handleTextStyle = (style: string) => {
    if (!selectedBlock) return;
    else if(selectedBlock.type === "list" && selectedBlock.listItems) {
      handleListItemStyle(style)
      return;
    }
   
     // 
      

    
    const currentStyles: ListItemType["textStyle"] = selectedBlock.textStyle || {
      bold: false,
      italic: false,
      underline: false}
    
    
    
    // Toggle the specific style
    const newStyles:ListItemType["textStyle"] = {
      ...currentStyles,
      [style as keyof ListItemType["textStyle"]]: !currentStyles[style as keyof ListItemType["textStyle"]]
    };
    
    // Update the ref immediately
    

    // Update the block with new styles
    onBlockUpdate?.(selectedBlock.id, {
      textStyle: newStyles
    });
  };


  const handleEmojiSelect = (emoji: string) => {
    if (!selectedBlock) return;
  
    // For list items
    if (selectedBlock.type === "list" && selectedBlock.listItems) {
      const key = `${selectedBlock.id}-${currentListItemIndex}`;
      console.log("Key inside function: "+key)
      const listItemTextarea = listItemsRef.current.get(key);
      
      if (listItemTextarea) {
        // Use cursor position logic
        const start = listItemTextarea.selectionStart;
        const end = listItemTextarea.selectionEnd;
        const text = listItemTextarea.value; 
        console.log("Text: " + text)
        
        const newContent = `${text.substring(0, start)}${emoji}${text.substring(end)}`;
        
        
        
        // Position cursor after emoji
        setTimeout(() => {
          if (listItemTextarea) {
            const newPosition = start + emoji.length;
            listItemTextarea.selectionStart = newPosition;
            listItemTextarea.selectionEnd = newPosition;
            listItemTextarea.focus();
          }
        }, 100);
        onBlockUpdate?.(selectedBlock.id, {
          listItems: selectedBlock.listItems.map((item, index) => 
            index === currentListItemIndex ? { ...item, content: newContent } : item
          )
        });
        
        return;
      }
    }
    
    // Regular block logic (unchanged)
    const textarea = blockRefs.current[currentBlockIndex];
    
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const newContent = `${text.substring(0, start)}${emoji}${text.substring(end)}`;
    
    setTimeout(() => {
      let newIndex = start + emoji.length;
      textarea.selectionStart = newIndex;
      textarea.selectionEnd = newIndex;
      textarea.focus();
    }, 100);
    
    onBlockUpdate?.(selectedBlock.id, {
      content: newContent,
    });
  };


  const renderBlockEditor = () => {
    if (!selectedBlock) return null

    const commonFormatting = (
      <>
        <div className="border-t border-light-gray mt-4 pt-4">
          <h4 className="text-sm font-medium text-charcoal mb-2">Text Formatting</h4>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "flex-1 text-charcoal hover:text-ocean-blue",
                (selectedBlock.textStyle?.bold || (selectedBlock.listItems && selectedBlock.listItems[currentListItemIndex]?.textStyle?.bold)) && "bg-light-gray text-ocean-blue",
              )}
              onClick={() => handleTextStyle("bold")}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "flex-1 text-charcoal hover:text-ocean-blue",
                (selectedBlock.textStyle?.italic || selectedBlock.listItems && selectedBlock.listItems[currentListItemIndex]?.textStyle?.italic) && "bg-light-gray text-ocean-blue",
              )}
              onClick={() => handleTextStyle("italic")}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "flex-1 text-charcoal hover:text-ocean-blue",
                (selectedBlock.textStyle?.underline || (selectedBlock.listItems && selectedBlock.listItems[currentListItemIndex]?.textStyle?.underline)) && "bg-light-gray text-ocean-blue",
              )}
              onClick={() => handleTextStyle("underline")}
            >
              <Underline className="h-4 w-4" />
            </Button>
         
                      </div>
        </div>
        {

selectedBlock.type !== "list" && (
        <div className="border-t border-light-gray mt-4 pt-4">
          
          <h4 className="text-sm font-medium text-charcoal mb-2">Alignment</h4>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "flex-1 text-charcoal hover:text-ocean-blue",
                selectedBlock?.align === "left" && "bg-light-gray text-ocean-blue",
              )}
              onClick={() => handleAlign("left")}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "flex-1 text-charcoal hover:text-ocean-blue",
                selectedBlock?.align === "center" && "bg-light-gray text-ocean-blue",
              )}
              onClick={() => handleAlign("center")}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "flex-1 text-charcoal hover:text-ocean-blue",
                selectedBlock?.align === "right"  && "bg-light-gray text-ocean-blue",
              )}
              onClick={() => handleAlign("right")}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
           
          </div>
        </div>
)}
        {(selectedBlock.type === "heading" || selectedBlock.type === "paragraph" || selectedBlock.type === "list") && (
          <div className="border-t border-light-gray mt-4 pt-4">
            <h4 className="text-sm font-medium text-charcoal mb-2">Emoji</h4>
            <div className="px-2">
              <EmojiPicker onEmojiSelect={handleEmojiSelect} />
            </div>
          </div>
        )}
      </>
    )

    switch (selectedBlock.type) {
      case "heading":
        return (
          <div className="p-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-charcoal hover:text-ocean-blue "
                onClick={onClearSelection}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              
              
             
              
            </div>
            {commonFormatting}
            <PositionSlider 
              handlePositionChange={handlePositionChange}
              initialValue={getInitialPositionValue()}
            />
          </div>
        )

      case "paragraph":
        return (
          <div className="p-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-charcoal hover:text-ocean-blue"
                onClick={onClearSelection}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              
            </div>
            {commonFormatting}
            <PositionSlider 
              handlePositionChange={handlePositionChange}
              initialValue={getInitialPositionValue()}
            />
          </div>
        )

      case "image":
        return (
          <div className="space-y-6 p-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-charcoal  hover:text-ocean-blue"
                onClick={onClearSelection}
              >
                <ArrowLeft className="h-4 w-4" /> 
              </Button>
              
            </div>

            
            {/* Image upload section with preview of current image */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-charcoal mb-2">Image</h4>
              
              {/* Show current image preview with replace option */}
              {selectedBlock.url ? (
                <div className="space-y-3">
                  <div className="relative rounded-md overflow-hidden border border-light-gray/30">
                    <img 
                      src={selectedBlock.url} 
                      alt={selectedBlock.alt || "Current image"} 
                      className="w-full h-[120px] object-cover"
                    />
                    <div className="absolute inset-0  opacity-0  transition-opacity flex items-center justify-center">
                      {/* Replace with a single button that opens file dialog directly */}
                      <ImageUpload
                        currentUrl={undefined}
                        onUpload={(url) => onBlockUpdate?.(selectedBlock.id, { url })}
                        className="w-full"
                        showPreview={false}
                        buttonLabel="Replace Image"
                        buttonClassName="bg-white/90 text-charcoal hover:bg-white"
                        key={`${selectedBlock.id}-replace-${Date.now()}`} // Force fresh instance
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <ImageUpload
                  currentUrl={selectedBlock.url}
                  onUpload={(url) => onBlockUpdate?.(selectedBlock.id, { url })}
                  className="w-full"
                  disablePreviewUpload={true}
                  key={selectedBlock.id}
                />
              )}
            </div>
            
            {/* Rest of image settings remain the same */}
            {/* Image size */}
            <div>
              <h4 className="text-sm font-medium text-charcoal mb-2">Size</h4>
              <RadioGroup
                value={selectedBlock.imageSize || "medium"}
                onValueChange={(value) => onBlockUpdate?.(selectedBlock.id, { imageSize: value })}
                className="grid grid-cols-2 gap-2"
              >
                <ImageSizeOption
                  value="small"
                  label="Small"
                  icon={<SplitSquareHorizontal className="h-8 w-8 text-ocean-blue" />}
                />
                <ImageSizeOption
                  value="medium"
                  label="Medium"
                  icon={<StretchHorizontal className="h-8 w-8 text-ocean-blue" />}
                />
                <ImageSizeOption
                  value="large"
                  label="Large"
                  icon={<ArrowsHorizontal className="h-8 w-8 text-ocean-blue" />}
                />
                <ImageSizeOption
                  value="full"
                  label="Full width"
                  icon={<Maximize2 className="h-8 w-8 text-ocean-blue" />}
                  description="Cover image"
                />
              </RadioGroup>
            </div>
            
            {/* Alignment - Make consistent with other settings */}
            <div>
              <h4 className="text-sm font-medium text-charcoal mb-2">Alignment</h4>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "flex-1 justify-center",
                    selectedBlock.align === "left" && "bg-light-gray text-ocean-blue"
                  )}
                  onClick={() => onBlockUpdate?.(selectedBlock.id, { align: "left" })}
                >
                  <AlignLeft className="h-4 w-4 mr-2" />
                  
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "flex-1 justify-center",
                    selectedBlock.align === "center" && "bg-light-gray text-ocean-blue"
                  )}
                  onClick={() => onBlockUpdate?.(selectedBlock.id, { align: "center" })}
                >
                  <AlignCenter className="h-4 w-4 mr-2" />
                  
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "flex-1 justify-center",
                    selectedBlock.align === "right"  && "bg-light-gray text-ocean-blue"
                  )}
                  onClick={() => onBlockUpdate?.(selectedBlock.id, { align: "right" })}
                >
                  <AlignRight className="h-4 w-4 mr-2" />
                  
                </Button>
              </div>
            </div>
            
            {/* Caption - Use custom styled input */}
            <StyledInput
              label="Caption"
              placeholder="Add a caption..."
              value={selectedBlock.content || ""}
              onChange={(e) => onBlockUpdate?.(selectedBlock.id, { content: e.target.value })}
              description="Optional caption displayed below the image"
            />
            
            {/* Alt text - Use custom styled input */}
            <StyledInput
              label="Alt Text"
              placeholder="Describe this image..."
              value={selectedBlock.alt || ""}
              onChange={(e) => onBlockUpdate?.(selectedBlock.id, { alt: e.target.value })}
              description="Text description for screen readers and SEO"
            />
            
            {/* Position slider */}
            <PositionSlider
              handlePositionChange={handlePositionChange}
              initialValue={getInitialPositionValue()}
            />
          </div>
        )

      case "list":
        return (
          <div className="p-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-charcoal hover:text-ocean-blue"
                onClick={() => {
                  onClearSelection?.()
                  
                }}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              
              
             
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-charcoal mb-2">List Style</h4>
              <RadioGroup
                value={selectedBlock.listStyle?.type || "bulleted"}
                onValueChange={(value) =>
                  onBlockUpdate?.(selectedBlock.id, {
                    listStyle: {
                      ...selectedBlock.listStyle,
                      type: value as "numbered" | "bulleted",
                      // Reset icon when switching to numbered
                      ...(value === "numbered" && { icon: undefined }),
                    },
                  })
                }
                className="grid grid-cols-2 gap-2"
              >
                <div>
                  <RadioGroupItem value="bulleted" id="bulleted" className="peer sr-only" />
                  <Label
                    htmlFor="bulleted"
                    className="flex items-center justify-center gap-2 rounded-md border-2 border-muted bg-popover p-[10px] hover:bg-light-gray/80 hover:text-accent-foreground peer-data-[state=checked]:border-ocean-blue [&:has([data-state=checked])]:border-ocean-blue [&:has([data-state=checked])]:bg-ocean-blue/5 cursor-pointer "
                  >
                    <List className="h-4 w-4 text-ocean-blue" />
                    <span>Bulleted</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="numbered" id="numbered" className="peer sr-only" />
                  <Label
                    htmlFor="numbered"
                    className="flex items-center justify-center gap-2 rounded-md border-2 border-muted bg-popover p-[10px] hover:bg-light-gray/80 hover:text-accent-foreground peer-data-[state=checked]:border-ocean-blue [&:has([data-state=checked])]:border-ocean-blue [&:has([data-state=checked])]:bg-ocean-blue/5 cursor-pointer "
                  >
                    <ListOrdered className="h-4 w-4 text-ocean-blue" />
                    <span>Numbered</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            {selectedBlock.listStyle?.type === "bulleted" && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-charcoal mb-2">Bullet Style</h4>
                <RadioGroup
                  value={selectedBlock.listStyle?.icon}
                  onValueChange={(value) =>
                    onBlockUpdate?.(selectedBlock.id, {
                      listStyle: {
                        ...selectedBlock.listStyle,
                        icon: value as "disc" | "circle" | "square" | "dash" | "none",
                      },
                    })
                  }
                  className="grid grid-cols-2 gap-2"
                >
                  <div>
                    <RadioGroupItem value="disc" id="disc" className="peer sr-only" />
                    <Label
                      htmlFor="disc"
                      className="flex items-center justify-center gap-2 rounded-md border-2 border-muted bg-popover p-[5px] hover:bg-light-gray/80 hover:text-accent-foreground peer-data-[state=checked]:border-ocean-blue [&:has([data-state=checked])]:border-ocean-blue [&:has([data-state=checked])]:bg-ocean-blue/5 cursor-pointer  "
                    >
                      <span className="text-lg text-ocean-blue">•</span>
                      <span>Disc</span>
                    </Label>
                  </div>
                
                  <div>
                    <RadioGroupItem value="tick" id="tick" className="peer sr-only " />
                    <Label
                      htmlFor="tick"
                      className="flex items-center justify-center gap-2 rounded-md border-2 border-muted bg-popover p-[10px] hover:bg-light-gray/80 hover:text-accent-foreground peer-data-[state=checked]:border-ocean-blue [&:has([data-state=checked])]:border-ocean-blue [&:has([data-state=checked])]:bg-ocean-blue/5 cursor-pointer  "
                    >
                      <Check className="h-4 w-4 text-ocean-blue" />
                      <span>Tick</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="dash" id="dash" className="peer sr-only" />
                    <Label
                      htmlFor="dash"
                      className="flex items-center justify-center gap-2 rounded-md border-2 border-muted bg-popover p-[10px] hover:bg-light-gray/80 hover:text-accent-foreground peer-data-[state=checked]:border-ocean-blue [&:has([data-state=checked])]:border-ocean-blue [&:has([data-state=checked])]:bg-ocean-blue/5 cursor-pointer  "
                    >
                      <Minus className="h-4 w-4 text-ocean-blue" />
                      <span>Dash</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="none" id="none" className="peer sr-only" />
                    <Label
                      htmlFor="none"
                      className="flex items-center justify-center gap-2 rounded-md border-2 border-muted bg-popover p-[10px] hover:bg-light-gray/80 hover:text-accent-foreground peer-data-[state=checked]:border-ocean-blue [&:has([data-state=checked])]:border-ocean-blue [&:has([data-state=checked])]:bg-ocean-blue/5 cursor-pointer  "
                    >
                   
                      <span>None</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            {commonFormatting}
              <PositionSlider 
              handlePositionChange={handlePositionChange}
              initialValue={getInitialPositionValue()}
            />
          </div>
        )

      

      default:
        return null
    }
  }

  useEffect(() => {
    if (selectedBlock && !isExpanded) {
      onToggle()
    }
  }, [selectedBlock, isExpanded, onToggle])

  return (
    <div
      className={cn(
        "transition-all duration-300 bg-white border-light-gray z-40",
        isMobile 
          ? cn(
              "fixed bottom-0 left-0 right-0 border-t",
              isExpanded ? "h-[40vh]" : "h-12"
            )
          : cn(
              "fixed right-0 top-16 h-[calc(100vh-4rem)] border-l",
              isExpanded ? "w-[min(400px,100vw)]" : "w-12"
            )
      )}
    >
      {!isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -left-12 top-4 w-8 h-8 bg-white shadow-sm border border-light-gray rounded-full"
          onClick={() => {
            if (isExpanded) {
              onClearSelection?.()
            }
            onToggle()
          }}
        >
          <ChevronRight className={cn("h-4 w-4 text-ocean-blue transition-transform", isExpanded && "rotate-180")} />
        </Button>
      )}
      
      {isMobile && isExpanded && (
        <div className="flex items-center justify-between p-2 border-b border-light-gray">
          <div className="w-8"></div>
          <h3 className="font-medium text-charcoal">
            {selectedBlock ? "Block Settings" : "Add Blocks"}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-charcoal"
            onClick={() => {
              onClearSelection?.()
              onToggle()
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      )}

      {isMobile && !isExpanded && (
        <div className="flex items-center justify-around h-full px-2">
          {mobileQuickTools.map(({ key, icon, type, data }) => (
            <div key={key} className="relative">
              <Button
                key={`btn-${key}`}
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-ocean-blue hover:bg-light-gray"
                onClick={() => {
                  onAddBlock?.(type, data)
                  onToggle()
                }}
              >
                {icon}
              </Button>
              
            </div>
          ))}
        </div>
      )}

      {(isExpanded || selectedBlock) && (
        <ScrollArea className={cn("h-full", isMobile && "pt-[0px]")}>
          <div className="">
            {!selectedBlock ? (
              <div className="space-y-4">
                <div className={cn("flex items-center justify-between px-2", isMobile && "hidden")}>
                  <h3 className="font-medium text-charcoal">Add Blocks</h3>
                </div>
                <div className="space-y-1 h-auto pb-[60px]">
                  {tools.map(({ key, ...tool }) => (
                    <div key={key} className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        className="flex-1 justify-start gap-2 text-charcoal hover:text-ocean-blue transition-colors"
                        onClick={() => onAddBlock?.(tool.type, tool.data)}
                      >
                        <span className="text-ocean-blue">{tool.icon}</span>
                        <span className="text-sm font-normal">{tool.label}</span>
                      </Button>
                      {/* Add the DraggableItem component here */}
                      <DraggableItem
                        type={tool.type}
                        icon={<GripVertical className="h-4 w-4" />}
                        label={tool.label}
                        data={tool.data}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                {renderBlockEditor()}
              </div>
            )}
          </div>
        </ScrollArea>
      )}

      {!isMobile && !isExpanded && !selectedBlock && (
        <div className="flex flex-col items-center gap-2 p-2">
          {tools.map(({ key, icon, type, data }) => (
            <div key={key} className="relative group">
              <Button
                key={`btn-${key}`}
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-ocean-blue hover:bg-light-gray"
                onClick={() => {
                  onAddBlock?.(type, data)
                  onToggle()
                }}
              >
                {icon}
              </Button>
              {/* Add a hidden draggable that appears on hover */}
              <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <DraggableItem
                  type={type}
                  icon={<GripVertical className="h-4 w-4" />}
                  label={key}
                  data={data}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


