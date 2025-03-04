"use client"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { GripVertical, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "@/components/editor/image-upload"
import { cn } from "@/utils/shadcn/utils"

interface CarouselEditorProps {
  images: Array<{ id: string; url: string; alt?: string }>
  onChange: (images: Array<{ id: string; url: string; alt?: string }>) => void
}

export function CarouselEditor({ images, onChange }: CarouselEditorProps) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(images)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    onChange(items)
  }

  const handleAddImage = () => {
    onChange([...images, { id: `image-${Date.now()}`, url: "" }])
  }

  const handleRemoveImage = (id: string) => {
    onChange(images.filter((img) => img.id !== id))
  }

  const handleImageUpload = (id: string, url: string) => {
    onChange(images.map((img) => (img.id === id ? { ...img, url } : img)))
  }

  return (
    <div className="space-y-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="carousel-images">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {images.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={cn(
                        "group relative rounded-lg p-2 -mx-2",
                        snapshot.isDragging && "ring-2 ring-ocean-blue",
                      )}
                    >
                      <div {...provided.dragHandleProps} className="absolute left-2 top-1/2 -translate-y-1/2">
                        <GripVertical className="h-4 w-4 text-charcoal" />
                      </div>
                      <div className="pl-8 pr-8">
                        <ImageUpload currentUrl={image.url} onUpload={(url) => handleImageUpload(image.id, url)} />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(image.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button variant="outline" size="sm" className="w-full" onClick={handleAddImage}>
        <Plus className="h-4 w-4 mr-2" />
        Add Image
      </Button>
    </div>
  )
}

