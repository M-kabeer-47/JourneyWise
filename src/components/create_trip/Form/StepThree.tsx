import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { Plus, Camera, Minus, X, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { ExperienceData } from "@/lib/schemas/experience"

interface FormStep3Props {
  formData: ExperienceData
  handleInputChange: (field: keyof ExperienceData, value: any) => void
  errors: Partial<ExperienceData>
}

export default function FormStep3({ formData, handleInputChange, errors }: FormStep3Props) {
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [startIndex, setStartIndex] = useState(0)
  const [visibleImages, setVisibleImages] = useState(5)
  const sliderRef = useRef<HTMLDivElement>(null)

  const addImages = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files) {
        const newImages = [...formData.images, ...Array.from(files)]
        handleInputChange("images", newImages)
      }
    },
    [formData.images, handleInputChange],
  )

  const memoizedImageUrls = useMemo(() => {
    return formData.images.map((img) => {
      if (typeof img === "string") {
        return img
      } else if (img instanceof File) {
        return URL.createObjectURL(img)
      }
      return "/placeholder.svg"
    })
  }, [formData.images])

  useEffect(() => {
    return () => {
      memoizedImageUrls.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url)
        }
      })
    }
  }, [memoizedImageUrls])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleImages(5)
      } else if (window.innerWidth >= 768) {
        setVisibleImages(4)
      } else if (window.innerWidth >= 640) {
        setVisibleImages(3)
      } else {
        setVisibleImages(2)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleFocus = (fieldName: string) => setFocusedField(fieldName)
  const handleBlur = () => setFocusedField(null)

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    handleInputChange("images", newImages)
  }

  const addService = (type: "included" | "excluded") => {
    const currentServices = formData[type === "included" ? "includedServices" : "excludedServices"]
    handleInputChange(type === "included" ? "includedServices" : "excludedServices", [...currentServices, ""])
  }

  const removeService = (type: "included" | "excluded", index: number) => {
    const currentServices = formData[type === "included" ? "includedServices" : "excludedServices"]
    const newServices = currentServices.filter((_, i) => i !== index)
    handleInputChange(type === "included" ? "includedServices" : "excludedServices", newServices)
  }

  const slideLeft = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1)
    }
  }

  const slideRight = () => {
    if (startIndex < formData.images.length - visibleImages) {
      setStartIndex(startIndex + 1)
    }
  }

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${startIndex * (100 / visibleImages)}%)`
    }
  }, [startIndex, visibleImages])

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue">Visual Highlights & Services</h2>
        <p className="mt-2 text-base text-charcoal">Add images and specify included and excluded services</p>
      </div>

      <div className="space-y-8">
        {/* Image Upload */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-midnight-blue">Gallery Images</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-charcoal">{formData.images.length}/20</span>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-midnight-blue border border-gray-200 p-2 rounded-lg text-sm max-w-[300px]">
                  <p>Upload up to 20 clear, high-quality images showcasing hotels, attractions, and key experiences</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="relative overflow-hidden">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-300 ease-in-out"
              style={{ width: `${Math.max(formData.images.length, visibleImages) * (100 / visibleImages)}%` }}
            >
              {memoizedImageUrls.map((imgUrl, index) => (
                <div key={index} className={`px-2`} style={{ width: `${100 / visibleImages}%` }}>
                  <div className="relative aspect-square">
                    <img
                      src={imgUrl || "/placeholder.svg"}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {formData.images.length < visibleImages &&
                Array.from({ length: visibleImages - formData.images.length }).map((_, index) => (
                  <div key={`empty-${index}`} className={`px-2`} style={{ width: `${100 / visibleImages}%` }}>
                    <div className="relative aspect-square bg-gray-100 rounded-lg"></div>
                  </div>
                ))}
            </div>
            {formData.images.length > visibleImages && (
              <>
                <button
                  onClick={slideLeft}
                  type="button"
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
                  disabled={startIndex === 0}
                >
                  <ChevronLeft className="w-6 h-6 text-midnight-blue" />
                </button>
                <button
                type="button"
                  onClick={slideRight}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
                  disabled={startIndex >= formData.images.length - visibleImages}
                >
                  <ChevronRight className="w-6 h-6 text-midnight-blue" />
                </button>
              </>
            )}
          </div>
          {formData.images.length < 20 && (
            <div className="flex justify-center mt-4">
              <label htmlFor="image-upload" className="cursor-pointer">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={addImages}
                />
                <div className="flex items-center space-x-2 px-4 py-2 bg-ocean-blue text-white rounded-lg hover:bg-ocean-blue/90 transition-colors duration-200">
                  <Camera className="w-5 h-5" />
                  <span>Add Images</span>
                </div>
              </label>
            </div>
          )}
          {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
        </div>

        {/* Included Services */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-midnight-blue">Included Services</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent className="bg-white text-midnight-blue border border-gray-200 p-2 rounded-lg text-sm">
                  <p>List services that are included in your experience (max 20 characters each)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="space-y-3">
            {formData.includedServices.map((service, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={service}
                  onChange={(e) => {
                    const newServices = [...formData.includedServices]
                    newServices[index] = e.target.value
                    handleInputChange("includedServices", newServices)
                  }}
                  onFocus={() => handleFocus(`includedServices.${index}`)}
                  onBlur={handleBlur}
                  maxLength={20}
                  className={`flex-grow px-4 h-11 rounded-lg border text-charcoal text-sm
                             transition-all duration-200 outline-none
                             ${
                               focusedField === `includedServices.${index}`
                                 ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                                 : "border-gray-200"
                             }`}
                  placeholder="Enter an included service"
                />
                <button
                  type="button"
                  onClick={() => removeService("included", index)}
                  className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            ))}
            {errors.includedServices && <p className="text-red-500 text-sm mt-1">{errors.includedServices}</p>}
            <button
              type="button"
              onClick={() => addService("included")}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-ocean-blue hover:bg-ocean-blue/10 rounded-lg transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Service
            </button>
          </div>
        </div>

        {/* Excluded Services */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-midnight-blue">Excluded Services</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent className="bg-white text-midnight-blue border border-gray-200 p-2 rounded-lg text-sm">
                  <p>List services that are not included in your experience (max 20 characters each)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="space-y-3">
            {formData.excludedServices.map((service, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={service}
                  onChange={(e) => {
                    const newServices = [...formData.excludedServices]
                    newServices[index] = e.target.value
                    handleInputChange("excludedServices", newServices)
                  }}
                  onFocus={() => handleFocus(`excludedServices.${index}`)}
                  onBlur={handleBlur}
                  maxLength={20}
                  className={`flex-grow px-4 h-11 rounded-lg border text-charcoal text-sm
                             transition-all duration-200 outline-none
                             ${
                               focusedField === `excludedServices.${index}`
                                 ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                                 : "border-gray-200"
                             }`}
                  placeholder="Enter an excluded service"
                />
                <button
                  type="button"
                  onClick={() => removeService("excluded", index)}
                  className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            ))}
            {errors.excludedServices && <p className="text-red-500 text-sm mt-1">{errors.excludedServices}</p>}
            <button
              type="button"
              onClick={() => addService("excluded")}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-ocean-blue hover:bg-ocean-blue/10 rounded-lg transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Service
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

