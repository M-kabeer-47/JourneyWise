import { motion, AnimatePresence } from "framer-motion"
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useMemo } from "react"

type StepThreeProps = {
  images: (string | File)[]
  includedServices: string[]
  excludedServices: string[]
  itemVariants: any
}

export default function StepThree({ images, includedServices, excludedServices, itemVariants }: StepThreeProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const memoizedImageUrls = useMemo(() => {
    return images.map((img) => {
      if (typeof img === "string") {
        return img
      } else if (img instanceof File) {
        return URL.createObjectURL(img)
      }
      return "/placeholder.svg"
    })
  }, [images])

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
    setActiveImageIndex(0)
  }, [])

  const nextImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Gallery Section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-xl font-semibold text-midnight-blue">Gallery</h3>
        <div className="relative overflow-hidden rounded-lg aspect-video">
          <AnimatePresence initial={false}>
            {memoizedImageUrls.length > 0 ? (
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={memoizedImageUrls[activeImageIndex] || "/placeholder.svg"}
                  alt={`Gallery image ${activeImageIndex + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </motion.div>
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">No images uploaded</span>
              </div>
            )}
          </AnimatePresence>
          {memoizedImageUrls.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full transition-all duration-300 hover:bg-white z-10"
              >
                <ChevronLeft className="w-6 h-6 text-midnight-blue" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full transition-all duration-300 hover:bg-white z-10"
              >
                <ChevronRight className="w-6 h-6 text-midnight-blue" />
              </button>
            </>
          )}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {memoizedImageUrls.slice(0, 5).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${index === activeImageIndex ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Services Section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-xl font-semibold text-midnight-blue mb-4">Services</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Included Services */}
          <div className="bg-midnight-blue border border-ocean-blue/20 rounded-lg p-4 shadow-sm">
            <h4 className="text-lg font-semibold text-white mb-3">Included Services</h4>
            <ul className="space-y-2">
              {includedServices.map((service, index) => (
                <li key={index} className="flex items-center text-white">
                  <Check className="w-4 h-4 mr-2 flex-shrink-0 text-ocean-blue" />
                  <span className="text-sm">{service.length > 20 ? service.substring(0, 20) + "..." : service}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Excluded Services */}
          <div className="bg-accent border border-midnight-blue/20 rounded-lg p-4 shadow-sm">
            <h4 className="text-lg font-semibold text-midnight-blue mb-3">Excluded Services</h4>
            <ul className="space-y-2">
              {excludedServices.map((service, index) => (
                <li key={index} className="flex items-center text-midnight-blue">
                  <X className="w-4 h-4 mr-2 flex-shrink-0 text-red-600" />
                  <span className="text-sm">{service.length > 20 ? service.substring(0, 20) + "..." : service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

