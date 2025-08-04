import { useState, useRef, useEffect } from "react";
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Trash,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ImageGalleryProps {
  value: (File | string)[];
  onChange: (images: (File | string)[]) => void;
  error?: string;
  imageUrls: string[];
}

export default function ImageGallery({
  value,
  onChange,
  error,
  imageUrls,
}: ImageGalleryProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(5);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const totalSlots = 20;
  const maxStartIndex = Math.max(0, totalSlots - visibleImages);

  const slideLeft = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const slideRight = () => {
    if (startIndex < maxStartIndex) {
      setStartIndex((prev) => prev + 1);
    }
  };

  // Add images handler
  const addImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && value.length + files.length <= 20) {
      const newImages = [...value, ...Array.from(files)];
      onChange(newImages);

      // Auto-slide to show newly added images if needed
      if (newImages.length >= visibleImages) {
        const newStartIndex = Math.min(
          newImages.length - visibleImages + 1,
          maxStartIndex
        );
        setStartIndex(newStartIndex);
      }
    }
    e.target.value = "";
  };

  const removeImages = () => {
    onChange([]);
    setStartIndex(0);
  };

  // Remove image handler
  const removeImage = (index: number) => {
    const newImages = value.filter((_, i) => i !== index);
    onChange(newImages);
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && value.length + files.length <= 20) {
      const newImages = [...value, ...Array.from(files)];
      onChange(newImages);

      // Auto-slide to show newly added images
      if (newImages.length >= visibleImages) {
        const newStartIndex = Math.min(
          newImages.length - visibleImages + 1,
          maxStartIndex
        );
        setStartIndex(newStartIndex);
      }
    }
  };

  // Simple transform - move by exact percentages
  useEffect(() => {
    if (sliderRef.current) {
      const movePercentage = (startIndex / totalSlots) * 100;
      sliderRef.current.style.transform = `translateX(-${movePercentage}%)`;
    }
  }, [startIndex, totalSlots]);

  // Responsive handling
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

  // Create array of 20 slots
  const renderSlots = () => {
    const slots = [];

    for (let i = 0; i < totalSlots; i++) {
      const hasImage = imageUrls[i] !== undefined && imageUrls[i] !== null;
      const imageUrl = hasImage ? imageUrls[i] : null;

      slots.push(
        <div
          key={`slot-${i}`}
          className="flex-shrink-0 px-2"
          style={{ width: `${100 / totalSlots}%` }}
        >
          {hasImage ? (
            // Render image slot
            <div className="relative aspect-square">
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            // Render empty slot
            <div
              className={`relative aspect-square bg-gray-100 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer transition-colors ${
                dragOver
                  ? "border-ocean-blue bg-ocean-blue/5"
                  : "border-gray-300"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDrop={handleDrop}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragOver(false);
              }}
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              <div className="text-center">
                <Camera
                  className={`w-6 h-6 mx-auto mb-2 ${
                    dragOver ? "text-ocean-blue" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-sm ${
                    dragOver ? "text-ocean-blue" : "text-gray-400"
                  }`}
                >
                  {i === value.length ? "Add Image" : "Empty"}
                </span>
              </div>
            </div>
          )}
        </div>
      );
    }

    return slots;
  };

  return (
    <div className="space-y-4">
      {/* Title and count */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-midnight-blue">
          Gallery experience images
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-charcoal">
                  {value.length}/20
                </span>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-white text-midnight-blue border border-gray-200 p-2 rounded-lg text-sm max-w-[300px]">
              <p>
                Upload up to 20 images showcasing hotels, attractions, and
                key experiences
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Image Gallery */}
      <div className="relative overflow-hidden z-20">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ width: `${(totalSlots / visibleImages) * 100}%` }}
        >
          {renderSlots()}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={slideLeft}
          type="button"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg disabled:opacity-50 hover:bg-white transition-colors"
          disabled={startIndex === 0}
        >
          <ChevronLeft className="w-6 h-6 text-midnight-blue" />
        </button>
        <button
          type="button"
          onClick={slideRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg disabled:opacity-50 hover:bg-white transition-colors"
          disabled={startIndex >= maxStartIndex}
        >
          <ChevronRight className="w-6 h-6 text-midnight-blue" />
        </button>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}

      {/* Upload and remove buttons */}
      {value.length < 20 && (
        <div className="flex justify-between mt-4">
          {/* Remove all images button */}
          <button
            type="button"
            onClick={removeImages}
            className="flex items-center space-x-2 px-4 py-2 bg-[#c1121f] text-white rounded-lg transition-colors duration-200"
          >
            <Trash className="w-5 h-5" />
            <span>Remove all images</span>
          </button>

          {/* Add images button */}
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
    </div>
  );
}