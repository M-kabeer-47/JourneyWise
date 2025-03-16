"use client"

import type React from "react"
import { useState } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Input from "@/components/ui/Input"
import Image from "next/image"
import { cn } from "@/utils/shadcn/utils"

interface ImageUploadProps {
  onUpload: (url: string) => void
  currentUrl?: string
  className?: string
  disablePreviewUpload?: boolean
}

export function ImageUpload({ 
  onUpload, 
  currentUrl, 
  className,
  disablePreviewUpload = false 
}: ImageUploadProps) {
  const [preview, setPreview] = useState(currentUrl)
  
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const url = reader.result as string
        setPreview(url)
        onUpload(url)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const url = reader.result as string
        setPreview(url)
        onUpload(url)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemove = () => {
    setPreview(undefined)
    onUpload("")
  }

  return (
    <div className={cn("relative", className)}>
      {preview ? (
        <div className="relative group">
          <Image
            src={preview}
            alt="Preview"
            width={400}
            height={300}
            className="w-full h-auto object-cover"
          />
          {!disablePreviewUpload && (
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-charcoal hover:bg-light-gray"
                onClick={handleRemove}
              >
                <X className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          )}
        </div>
      ) : (
        <label
          className={cn(
            "flex flex-col items-center justify-center p-6 w-full cursor-pointer transition-colors",
            "border-2 border-dashed rounded",
            isDragging
              ? "border-ocean-blue bg-ocean-blue/5"
              : "border-light-gray hover:border-ocean-blue/50 hover:bg-light-gray/50",
          )}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <Upload className="h-8 w-8 text-ocean-blue mb-2" />
          <div className="text-sm text-center">
            <span className="text-ocean-blue">Click to upload</span>
            <span className="text-charcoal"> or drag and drop</span>
          </div>
          <p className="text-xs text-charcoal/70 mt-1">SVG, PNG, JPG or GIF</p>
          <Input
            label=""
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            aria-label="Upload image"
          />
        </label>
      )}
    </div>
  )
}

