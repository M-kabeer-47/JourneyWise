import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";

type StepThreeProps = {
  images: (string | File)[];
  includedServices: string[];
  excludedServices: string[];
  itemVariants: any;
};

// Fixed custom hook for stable image URLs
function useStableImageUrls(images: (string | File)[]) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const urlMapRef = useRef<Map<string, string>>(new Map()); // Use string key instead of File
  const lastImagesRef = useRef<(string | File)[]>([]);

  useEffect(() => {
    // Create a serializable key for each image
    const currentImageKeys = images.map((img, index) => {
      if (typeof img === "string") {
        return img;
      } else if (img instanceof File) {
        // Create a unique key combining file properties
        return `file_${img.name}_${img.size}_${img.lastModified}_${index}`;
      }
      return `unknown_${index}`;
    });

    // Check if images actually changed by comparing keys
    const lastImageKeys = lastImagesRef.current.map((img, index) => {
      if (typeof img === "string") {
        return img;
      } else if (img instanceof File) {
        return `file_${img.name}_${img.size}_${img.lastModified}_${index}`;
      }
      return `unknown_${index}`;
    });

    const imagesChanged =
      currentImageKeys.length !== lastImageKeys.length ||
      currentImageKeys.some((key, index) => key !== lastImageKeys[index]);

    if (!imagesChanged && imageUrls.length > 0) {
      return; // No change needed
    }

    console.log("Images changed, updating URLs...", {
      currentImageKeys,
      lastImageKeys,
    });

    const newUrls: string[] = [];
    const newUrlMap = new Map<string, string>();

    images.forEach((img, index) => {
      if (typeof img === "string") {
        newUrls.push(img);
        newUrlMap.set(img, img);
      } else if (img instanceof File) {
        const key = `file_${img.name}_${img.size}_${img.lastModified}_${index}`;

        // Try to reuse existing URL
        let url = urlMapRef.current.get(key);
        if (!url || !url.startsWith("blob:")) {
          // Create new URL if none exists or invalid
          url = URL.createObjectURL(img);
          console.log("Created new blob URL:", url, "for key:", key);
        }

        newUrls.push(url);
        newUrlMap.set(key, url);
      }
    });

    // Clean up old URLs that are no longer needed
    urlMapRef.current.forEach((url, key) => {
      if (!newUrlMap.has(key) && url.startsWith("blob:")) {
        console.log("Revoking old URL:", url);
        URL.revokeObjectURL(url);
      }
    });

    urlMapRef.current = newUrlMap;
    setImageUrls(newUrls);
    lastImagesRef.current = [...images]; // Store a copy
  }, [images]); // Only depend on images array

  // Cleanup all URLs on unmount
  useEffect(() => {
    return () => {
      console.log("Cleaning up all URLs on unmount");
      urlMapRef.current.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
      urlMapRef.current.clear();
    };
  }, []);

  return imageUrls;
}

export default function StepThree({
  images,
  includedServices,
  excludedServices,
  itemVariants,
}: StepThreeProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const imageUrls = useStableImageUrls(images);

  console.log("StepThree render:", {
    imagesLength: images.length,
    imageUrlsLength: imageUrls.length,
    activeImageIndex,
    imageUrls: imageUrls.slice(0, 3), // Log first 3 URLs
  });

  // Reset active index when images change significantly
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
    <div className="space-y-6 md:space-y-8">
      {/* Gallery Section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-xl font-semibold text-midnight-blue">Gallery</h3>
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
                  onError={(e) => {
                    console.error("Image failed to load:", currentImageUrl);
                    e.currentTarget.src = "/placeholder.svg";
                  }}
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
        <h3 className="text-xl font-semibold text-midnight-blue mb-4">
          Services
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Included Services */}
          <div className="bg-midnight-blue border border-ocean-blue/20 rounded-lg p-4 shadow-sm overflow-hidden">
            <h4 className="text-lg font-semibold text-white mb-3">
              Included Services
            </h4>
            <div className="overflow-hidden"> {/* Add overflow container */}
              <ul className="space-y-2 max-h-48 overflow-y-auto">
                {includedServices.filter(Boolean).map((service, index) => (
                  <motion.li
                    key={`included-${index}-${service}`}
                    initial={{ opacity: 0, x: -20 }} // Reduce x value
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }} // Shorter delay and duration
                    className="flex items-center text-white overflow-hidden" // Add overflow-hidden
                  >
                    <Check className="w-4 h-4 mr-2 flex-shrink-0 text-ocean-blue" />
                    <span className="text-sm truncate flex-1" title={service}> {/* Add truncate and flex-1 */}
                      {service.length > 25
                        ? service.substring(0, 25) + "..."
                        : service}
                    </span>
                  </motion.li>
                ))}
                {includedServices.filter(Boolean).length === 0 && (
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
            <div className="overflow-hidden"> {/* Add overflow container */}
              <ul className="space-y-2 max-h-48 overflow-y-auto">
                {excludedServices.filter(Boolean).map((service, index) => (
                  <motion.li
                    key={`excluded-${index}-${service}`}
                    initial={{ opacity: 0, x: -20 }} // Reduce x value
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }} // Shorter delay and duration
                    className="flex items-center text-midnight-blue overflow-hidden" // Add overflow-hidden
                  >
                    <X className="w-4 h-4 mr-2 flex-shrink-0 text-red-600" />
                    <span className="text-sm truncate flex-1" title={service}> {/* Add truncate and flex-1 */}
                      {service.length > 25
                        ? service.substring(0, 25) + "..."
                        : service}
                    </span>
                  </motion.li>
                ))}
                {excludedServices.filter(Boolean).length === 0 && (
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
