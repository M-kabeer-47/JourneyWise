"use client"

import React, {  useEffect ,useState} from "react"
import { GripVertical, Trash2, ChevronLeft } from "lucide-react"
import { useDraggable } from "@dnd-kit/core"
import {
  ChevronRight,
  ImageIcon,
  List,
  ListOrdered,
  CircleDot,
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
import { CarouselEditor } from "@/components/editor/carousel-editor"
import { ImageUpload } from "@/components/editor/image-upload"
import { EmojiPicker } from "@/components/editor/emoji-picker"
import { cn } from "@/utils/shadcn/utils"
import type { BlockType } from "@/lib/types/block"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"


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

function DraggableItem({
  type,
  icon,
  label,
  data = {},
}: {
  type: string
  icon: React.ReactNode
  label: string
  data?: Record<string, any>
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `${type}-${label}`,
    data: {
      type,
      isTemplate: true,
      ...data,
    },
  })

  return (
    <Button
      ref={setNodeRef}
      variant="ghost"
      size="icon"
      className={cn(
        "shrink-0 text-charcoal hover:text-ocean-blue transition-colors",
        isDragging && "ring-2 ring-ocean-blue bg-light-gray cursor-grabbing",
        !isDragging && "cursor-grab",
      )}
      {...listeners}
      {...attributes}
    >
      <GripVertical className="h-4 w-4" />
    </Button>
  )
}

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
  {
    key: "carousel",
    icon: <Images className="h-4 w-4" />,
    type: "carousel",
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
  
  isMobile = false,
  currentListItemIndex
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
    { type: "list", icon: <List className="h-4 w-4" />, label: "List", key: "list", data: { listItems: [""] } },
    {
      type: "carousel",
      icon: <Images className="h-4 w-4" />,
      label: "Image Carousel",
      key: "carousel",
      data: { images: [] },
    },
  ]

  const handleAlign = (align: string) => {
    if (selectedBlock) {
      onBlockUpdate?.(selectedBlock.id, { align })
      selectedBlock.align = align
    }
  }

  const handleTextStyle = (style: string) => {
    if (!selectedBlock) return;

    // Use the ref to get current styles
    const currentStyles = selectedBlock.textStyle || {}
    
    
    // Toggle the specific style
    const newStyles = {
      ...currentStyles,
      [style]: !currentStyles[style]
    };
    
    // Update the ref immediately
    

    // Update the block with new styles
    onBlockUpdate?.(selectedBlock.id, {
      textStyle: newStyles
    });
  };

  const handleEmojiSelect = (emoji: string) => {
    if (!selectedBlock) return;
    else if(selectedBlock.type === "list" && selectedBlock.listItems) {

        
        const content = selectedBlock.listItems[currentListItemIndex] || "";
        const newContent = `${content}${emoji}`;
        onBlockUpdate?.(selectedBlock.id, {
          listItems: selectedBlock.listItems.map((item, index) => index === currentListItemIndex ? newContent : item),   
        });
        
      


    }
    
    const content = selectedBlock.content || "";
    const newContent = `${content}${emoji}`;
    
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
                selectedBlock.textStyle?.bold && "bg-light-gray text-ocean-blue",
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
                selectedBlock.textStyle?.italic && "bg-light-gray text-ocean-blue",
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
                selectedBlock.textStyle?.underline && "bg-light-gray text-ocean-blue",
              )}
              onClick={() => handleTextStyle("underline")}
            >
              <Underline className="h-4 w-4" />
            </Button>
         
                      </div>
        </div>
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
                selectedBlock?.align === "right" && "bg-light-gray text-ocean-blue",
              )}
              onClick={() => handleAlign("right")}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
           
          </div>
        </div>
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
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-charcoal hover:text-ocean-blue"
                onClick={onClearSelection}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center justify-center w-full relative left-[-30px]">
                <h3 className="font-medium text-charcoal text-center">Settings</h3>
              </div>
              
              
             
              
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
              <div className="flex items-center justify-center w-full relative left-[-30px]">
                <h3 className="font-medium text-charcoal text-center">Settings</h3>
              </div>
              
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
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-charcoal hover:text-ocean-blue"
                onClick={onClearSelection}
              >
                <ArrowLeft className="h-4 w-4" /> 
              </Button>
              <div className="flex items-center justify-center w-full relative left-[-30px]">
                <h3 className="font-medium text-charcoal text-center">Settings</h3>
              </div>  
            </div>

            
            {/* Image upload */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-charcoal mb-2">Image</h4>
              <ImageUpload
                currentUrl={selectedBlock.url}
                onUpload={(url) => onBlockUpdate?.(selectedBlock.id, { url })}
                className="w-full"
                disablePreviewUpload={true}
              />
            </div>
            
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
                    selectedBlock.align === "left" && "bg-ocean-blue/10 border-ocean-blue text-ocean-blue"
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
                    selectedBlock.align === "center" && "bg-ocean-blue/10 border-ocean-blue text-ocean-blue"
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
                    selectedBlock.align === "right" && "bg-ocean-blue/10 border-ocean-blue text-ocean-blue"
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
                  onToggle?.()
                }}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center justify-center w-full relative left-[-30px]">
                <h3 className="font-medium text-charcoal text-center">Settings</h3>
              </div>
              
              
             
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

      case "carousel":
        return (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-charcoal hover:text-ocean-blue"
                onClick={onClearSelection}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center justify-center w-full relative left-[-30px]">
                <h3 className="font-medium text-charcoal text-center">Settings</h3>
              </div>
              
            </div>
            
            <CarouselEditor
              images={selectedBlock.images || []}
              onChange={(images) => onBlockUpdate?.(selectedBlock.id, { images })}
            />
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
              isExpanded ? "h-[60vh]" : "h-12"
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
            <Button
              key={key}
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
          ))}
        </div>
      )}

      {(isExpanded || selectedBlock) && (
        <ScrollArea className={cn("h-full", isMobile && "pt-0")}>
          <div className="p-4">
            {!selectedBlock ? (
              <div className="space-y-4">
                <div className={cn("flex items-center justify-between px-2", isMobile && "hidden")}>
                  <h3 className="font-medium text-charcoal">Add Blocks</h3>
                </div>
                <div className="space-y-1">
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
                      {!isMobile && (
                        <DraggableItem type={tool.type} icon={tool.icon} label={tool.label} data={tool.data} />
                      )}
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
            <Button
              key={key}
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
          ))}
        </div>
      )}
    </div>
  )
}

const ImageSizeOption = React.forwardRef<
  HTMLDivElement,
  {
    value: string
    label: string
    icon: React.ReactNode
    description?: string
  }
>(({ value, label, icon, description }, ref) => (
  <div ref={ref}>
    <RadioGroupItem value={value} id={value} className="peer sr-only" />
    <Label
      htmlFor={value}
      className={cn(
        "flex flex-col items-center gap-2 rounded-lg border-2 border-light-gray bg-white p-4",
        "hover:border-ocean-blue/50 hover:bg-light-gray/5 transition-all cursor-pointer",
        "peer-data-[state=checked]:border-ocean-blue peer-data-[state=checked]:bg-ocean-blue/5",
        "peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-ocean-blue/20",
        // Improve touch target size on mobile
        "min-h-[120px] justify-center",
      )}
    >
      {icon}
      <div className="text-center">
        <p className="text-sm font-medium text-charcoal">{label}</p>
        {description && <p className="text-xs text-charcoal/70">{description}</p>}
      </div>
    </Label>
  </div>
))
ImageSizeOption.displayName = "ImageSizeOption"

