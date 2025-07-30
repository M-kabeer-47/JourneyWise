import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  Plus,
  Camera,
  Minus,
  X,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ExperienceData } from "@/lib/schemas/experience";

interface FormStep3Props {
  formData: ExperienceData;
  handleInputChange: (field: keyof ExperienceData, value: any) => void;
  errors: Partial<ExperienceData>;
}

// Create a custom hook for image URL management
function useImageUrls(experienceImages: (string | File)[]) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const urlsRef = useRef<Map<File, string>>(new Map());

  useEffect(() => {
    const newUrls: string[] = [];
    const newFileUrls = new Map<File, string>();

    experienceImages.forEach((img) => {
      if (typeof img === "string") {
        newUrls.push(img);
      } else if (img instanceof File) {
        // Reuse existing URL if same file
        let url = urlsRef.current.get(img);
        if (!url) {
          url = URL.createObjectURL(img);
        }
        newFileUrls.set(img, url);
        newUrls.push(url);
      }
    });

    // Clean up old URLs that are no longer needed
    urlsRef.current.forEach((url, file) => {
      if (!newFileUrls.has(file)) {
        URL.revokeObjectURL(url);
      }
    });

    urlsRef.current = newFileUrls;
    setImageUrls(newUrls);

    // Cleanup function
    // return () => {
    //   newFileUrls.forEach((url) => {
    //     if (url.startsWith("blob:")) {
    //       URL.revokeObjectURL(url);
    //     }
    //   });
    // };
  }, [experienceImages]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      urlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      urlsRef.current.clear();
    };
  }, []);

  return imageUrls;
}

export default function FormStep3({
  formData,
  handleInputChange,
  errors,
}: FormStep3Props) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(5);
  const [dragOver, setDragOver] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Use the custom hook
  const imageUrls = useImageUrls(formData.experienceImages);

  // Calculate total slots (images + empty slots when under limit)
  const totalSlots =
    formData.experienceImages.length +
    (formData.experienceImages.length < 20 ? 1 : 0);

  // Calculate maximum start index
  const maxStartIndex = Math.max(0, totalSlots - visibleImages);

  // Auto-adjust startIndex when it becomes invalid
  useEffect(() => {
    if (startIndex > maxStartIndex) {
      setStartIndex(maxStartIndex);
    }
  }, [startIndex, maxStartIndex]);

  const addImages = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        const newImages = [...formData.experienceImages, ...Array.from(files)];
        handleInputChange("experienceImages", newImages);

        // Auto-slide to show newly added images
        const newTotalSlots = newImages.length + (newImages.length < 20 ? 1 : 0);
        const newMaxStartIndex = Math.max(0, newTotalSlots - visibleImages);
        if (newImages.length >= visibleImages) {
          setStartIndex(newMaxStartIndex);
        }
      }
      e.target.value = "";
    },
    [formData.experienceImages, handleInputChange, visibleImages]
  );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const newImages = [...formData.experienceImages, ...Array.from(files)];
      handleInputChange("experienceImages", newImages);

      // Auto-slide to show newly added images
      const newTotalSlots = newImages.length + (newImages.length < 20 ? 1 : 0);
      const newMaxStartIndex = Math.max(0, newTotalSlots - visibleImages);
      if (newImages.length >= visibleImages) {
        setStartIndex(newMaxStartIndex);
      }
    }
  };

  // Fixed removeImage function
  const removeImage = (index: number) => {
    const newImages = formData.experienceImages.filter((_, i) => i !== index);
    handleInputChange("experienceImages", newImages);

    // Calculate new constraints
    const newTotalSlots = newImages.length + (newImages.length < 20 ? 1 : 0);
    const newMaxStartIndex = Math.max(0, newTotalSlots - visibleImages);

    // Adjust startIndex to keep it within valid bounds
    if (startIndex > newMaxStartIndex) {
      setStartIndex(newMaxStartIndex);
    }
  };

  // Fixed slide functions - move exactly one position
  const slideLeft = useCallback(() => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const slideRight = useCallback(() => {
    setStartIndex((prev) => Math.min(maxStartIndex, prev + 1));
  }, [maxStartIndex]);

  // Apply transform based on startIndex
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${
        startIndex * (100 / visibleImages)
      }%)`;
    }
  }, [startIndex, visibleImages]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleImages(5);
      } else if (window.innerWidth >= 768) {
        setVisibleImages(4);
      } else if (window.innerWidth >= 640) {
        setVisibleImages(3);
      } else {
        setVisibleImages(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFocus = useCallback(
    (fieldName: string) => setFocusedField(fieldName),
    []
  );
  const handleBlur = useCallback(() => setFocusedField(null), []);

  const addService = useCallback(
    (type: "included" | "excluded") => {
      const currentServices =
        formData[type === "included" ? "includedServices" : "excludedServices"];
      handleInputChange(
        type === "included" ? "includedServices" : "excludedServices",
        [...currentServices, ""]
      );
    },
    [formData, handleInputChange]
  );

  const removeService = useCallback(
    (type: "included" | "excluded", index: number) => {
      const currentServices =
        formData[type === "included" ? "includedServices" : "excludedServices"];
      const newServices = currentServices.filter((_, i) => i !== index);
      handleInputChange(
        type === "included" ? "includedServices" : "excludedServices",
        newServices
      );
    },
    [formData, handleInputChange]
  );

  const updateService = useCallback(
    (type: "included" | "excluded", index: number, value: string) => {
      const field =
        type === "included" ? "includedServices" : "excludedServices";
      const currentServices = [...formData[field]];
      currentServices[index] = value;
      handleInputChange(field, currentServices);
    },
    [formData, handleInputChange]
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue">
          Visual Highlights & Services
        </h2>
        <p className="mt-2 text-base text-charcoal">
          Add experience images and specify included and excluded services
        </p>
      </div>

      <div className="space-y-8">
        {/* Image Upload */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-midnight-blue">
              Gallery experience images
            </h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-charcoal">
                      {formData.experienceImages.length}/20
                    </span>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-midnight-blue border border-gray-200 p-2 rounded-lg text-sm max-w-[300px]">
                  <p>
                    Upload up to 20 clear, high-quality experienceImages
                    showcasing hotels, attractions, and key experiences
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Fixed Image Gallery */}
          <div className="relative overflow-hidden">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                // Total width based on actual slots needed
                width: `${totalSlots * (100 / visibleImages)}%`,
              }}
            >
              {/* Render actual images */}
              {imageUrls.map((imgUrl, index) => (
                <div
                  key={`image-${index}`}
                  className="px-2"
                  style={{ width: `${100 / visibleImages}%` }}
                >
                  <div className="relative aspect-square">
                    <img
                      src={imgUrl || "/placeholder.svg"}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
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

              {/* Render one empty slot when under limit */}
              {formData.experienceImages.length < 20 && (
                <div
                  className="px-2"
                  style={{ width: `${100 / visibleImages}%` }}
                >
                  <div
                    className={`relative aspect-square bg-gray-100 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer hover:border-ocean-blue/50 transition-all duration-200 ${
                      dragOver ? "border-ocean-blue bg-ocean-blue/5" : "border-gray-300"
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    <div className="text-center">
                      <Camera className={`w-6 h-6 mx-auto mb-2 transition-colors ${
                        dragOver ? "text-ocean-blue" : "text-gray-400"
                      }`} />
                      <span className={`text-sm transition-colors ${
                        dragOver ? "text-ocean-blue" : "text-gray-400"
                      }`}>
                        {dragOver ? "Drop here" : "Add Image"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fixed Navigation buttons */}
            {totalSlots > visibleImages && (
              <>
                <button
                  onClick={slideLeft}
                  type="button"
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md disabled:opacity-50 transition-opacity"
                  disabled={startIndex === 0}
                >
                  <ChevronLeft className="w-6 h-6 text-midnight-blue" />
                </button>
                <button
                  type="button"
                  onClick={slideRight}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md disabled:opacity-50 transition-opacity"
                  disabled={startIndex >= maxStartIndex}
                >
                  <ChevronRight className="w-6 h-6 text-midnight-blue" />
                </button>
              </>
            )}
          </div>

          {/* Upload button */}
          {formData.experienceImages.length < 20 && (
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
                  <span>Add images</span>
                </div>
              </label>
            </div>
          )}
          {errors.experienceImages && (
            <p className="text-red-500 text-sm mt-1">
              {typeof errors.experienceImages === "string"
                ? errors.experienceImages
                : Array.isArray(errors.experienceImages)
                ? errors.experienceImages.join(", ")
                : String(errors.experienceImages)}
            </p>
          )}
        </div>

        {/* Services sections - optimized with reusable component */}
        <ServiceSection
          title="Included Services"
          services={formData.includedServices}
          onAddService={() => addService("included")}
          onRemoveService={(index) => removeService("included", index)}
          onUpdateService={(index, value) =>
            updateService("included", index, value)
          }
          focusedField={focusedField}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="included"
          error={
            Array.isArray(errors.includedServices)
              ? errors.includedServices.join(", ")
              : errors.includedServices
          }
        />

        <ServiceSection
          title="Excluded Services"
          services={formData.excludedServices}
          onAddService={() => addService("excluded")}
          onRemoveService={(index) => removeService("excluded", index)}
          onUpdateService={(index, value) =>
            updateService("excluded", index, value)
          }
          error={
            Array.isArray(errors.excludedServices)
              ? errors.excludedServices.join(", ")
              : errors.excludedServices
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="excluded"
          focusedField={focusedField}
        />
      </div>
    </div>
  );
}

// Reusable Service Section Component
interface ServiceSectionProps {
  title: string;
  services: string[];
  onAddService: () => void;
  onRemoveService: (index: number) => void;
  onUpdateService: (index: number, value: string) => void;
  focusedField: string | null;
  onFocus: (field: string) => void;
  onBlur: () => void;
  type: "included" | "excluded";
  error?: string;
}

function ServiceSection({
  title,
  services,
  onAddService,
  onRemoveService,
  onUpdateService,
  focusedField,
  onFocus,
  onBlur,
  type,
  error,
}: ServiceSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-midnight-blue">{title}</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="w-5 h-5 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent className="bg-white text-midnight-blue border border-gray-200 p-2 rounded-lg text-sm">
              <p>
                List services that are{" "}
                {type === "included" ? "included in" : "not included in"} your
                experience (max 20 characters each)
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="space-y-3">
        {services.map((service, index) => (
          <div key={`${type}-${index}`} className="flex items-center gap-2">
            <input
              type="text"
              value={service}
              onChange={(e) => onUpdateService(index, e.target.value)}
              onFocus={() => onFocus(`${type}Services.${index}`)}
              onBlur={onBlur}
              className={`flex-grow px-4 h-11 rounded-lg border text-charcoal text-sm
                         transition-all duration-200 outline-none
                         ${
                           focusedField === `${type}Services.${index}`
                             ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                             : "border-gray-200"
                         }`}
              placeholder={`Enter ${
                type === "included" ? "an included" : "an excluded"
              } service`}
            />
            <button
              type="button"
              onClick={() => onRemoveService(index)}
              className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        ))}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <button
          type="button"
          onClick={onAddService}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-ocean-blue hover:bg-ocean-blue/10 rounded-lg transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>
    </div>
  );
}
