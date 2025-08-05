import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { StepThreeType } from "@/lib/types/create-experience-steps";
import useImageUrls from "@/hooks/experience/useImageUrls";
type StepThreeProps = {
  data: StepThreeType;
  itemVariants: any;
  imageUrls: string[];
};

// Fixed custom hook for stable image URLs


export default function StepThree({ data, itemVariants,imageUrls }: StepThreeProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  

  console.log("StepThree render:", {
    imagesLength: data.experienceImages.length,
    imageUrlsLength: imageUrls.length,
    activeImageIndex,
    imageUrls: imageUrls.slice(0, 3), // Log first 3 URLs
  });

  // Reset active index when data.images change significantly
  useEffect(() => {
    if (activeImageIndex >= imageUrls.length && imageUrls.length > 0) {
      setActiveImageIndex(0);
    }
  }, [imageUrls.length, activeImageIndex]);

  const nextImage = useCallback(() => {
    if (imageUrls.length > 0) {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }
  }, [imageUrls.length]);

  const prevImage = useCallback(() => {
    if (imageUrls.length > 0) {
      setActiveImageIndex(
        (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
      );
    }
  }, [imageUrls.length]);

  // Memoize the current image URL to prevent flicker
  const currentImageUrl = useMemo(() => {
    const url = imageUrls[activeImageIndex];
    console.log("Current image URL:", url, "at index:", activeImageIndex);
    return url || "/placeholder.svg";
  }, [imageUrls, activeImageIndex]);

  return (
    <div className="space-y-6 md:space-y-8 md:mt-6">
      {/* Gallery Section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-3xl font-bold text-midnight-blue">Gallery</h3>
        <div className="relative overflow-hidden rounded-lg aspect-video bg-gray-100">
          {imageUrls.length > 0 ? (
            <>
              <div className="absolute inset-0">
                <img
                  key={`${activeImageIndex}-${currentImageUrl}`} // Force re-render with key
                  src={currentImageUrl}
                  alt={`Gallery image ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  onLoad={() =>
                    console.log("Image loaded successfully:", currentImageUrl)
                  }
                  
                />
              </div>

              {imageUrls.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full transition-all duration-300 hover:bg-white z-10"
                  >
                    <ChevronLeft className="w-6 h-6 text-midnight-blue" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full transition-all duration-300 hover:bg-white z-10"
                  >
                    <ChevronRight className="w-6 h-6 text-midnight-blue" />
                  </button>
                </>
              )}

              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {imageUrls.slice(0, 5).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === activeImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
                {imageUrls.length > 5 && (
                  <span className="text-white text-xs ml-2">
                    +{imageUrls.length - 5}
                  </span>
                )}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-gray-400">No images uploaded yet</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Services Section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-3xl font-bold text-midnight-blue mb-4">
          Services
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Included Services */}
          <div className="bg-midnight-blue border border-ocean-blue/20 rounded-lg p-4 shadow-sm overflow-hidden">
            <h4 className="text-lg font-semibold text-white mb-3">
              Included Services
            </h4>
            <div className="overflow-hidden">
              {" "}
              {/* Add overflow container */}
              <ul className="space-y-2 max-h-48 overflow-y-auto">
                {data.includedServices.filter(Boolean).map((service, index) => (
                  <motion.li
                    key={`included-${index}-${service}`}
                    transition={{ delay: index * 0.05, duration: 0.3 }} // Shorter delay and duration
                    className="flex items-center text-white overflow-hidden" // Add overflow-hidden
                  >
                    <Check className="w-4 h-4 mr-2 flex-shrink-0 text-ocean-blue" />
                    <span className="text-sm truncate flex-1" title={service}>
                      {" "}
                      {/* Add truncate and flex-1 */}
                      {service.length > 25
                        ? service.substring(0, 25) + "..."
                        : service}
                    </span>
                  </motion.li>
                ))}
                {data.includedServices.filter(Boolean).length === 0 && (
                  <li className="text-white/70 text-sm italic">
                    No services added yet
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Excluded Services */}
          <div className="bg-accent border border-midnight-blue/20 rounded-lg p-4 shadow-sm overflow-hidden">
            <h4 className="text-lg font-semibold text-midnight-blue mb-3">
              Excluded Services
            </h4>
            <div className="overflow-hidden">
              {" "}
              {/* Add overflow container */}
              <ul className="space-y-2 max-h-48 overflow-y-auto">
                {data.excludedServices
                  .filter(Boolean)
                  .map((service: string, index: number) => (
                    <motion.li
                      key={`excluded-${index}-${service}`}
                      transition={{ delay: index * 0.05, duration: 0.3 }} // Shorter delay and duration
                      className="flex items-center text-midnight-blue overflow-hidden" // Add overflow-hidden
                    >
                      <X className="w-4 h-4 mr-2 flex-shrink-0 text-red-600" />
                      <span className="text-sm truncate flex-1" title={service}>
                        {" "}
                        {/* Add truncate and flex-1 */}
                        {service.length > 25
                          ? service.substring(0, 25) + "..."
                          : service}
                      </span>
                    </motion.li>
                  ))}
                {data.excludedServices.filter(Boolean).length === 0 && (
                  <li className="text-midnight-blue/70 text-sm italic">
                    No services added yet
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
