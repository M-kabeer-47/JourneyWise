import { CheckCircle, CheckCircle2, Clock, Upload, Ban } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type StepOneProps = {
  title: string;
  availability: string;
  experienceImage: string | File | null; // Changed from gigImage
  city: string;
  country: string;
  category: string;
  duration: number;
  tags: string[];
  description: string;
  itemVariants: any;
};

export default function StepOne({
  title,
  availability,
  experienceImage, // Changed from gigImage
  city,
  country,
  category,
  duration,
  tags,
  description,
  itemVariants,
}: StepOneProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const blobURL = useRef<string | null>(null);
  // Fixed image URL management
  useEffect(() => {
    if (blobURL.current) {
      URL.revokeObjectURL(blobURL.current); // Cleanup previous blob URL
      blobURL.current = null; // Reset the ref
    }
    if (experienceImage) {
      if (typeof experienceImage === "string") {
        setImageUrl(experienceImage);
      } else if (experienceImage instanceof File) {
        const url = URL.createObjectURL(experienceImage);
        setImageUrl(url);
        blobURL.current = url; // Store the blob URL for cleanup

        // Cleanup function
        return () => {
          URL.revokeObjectURL(url);
        };
      }
    } else {
      setImageUrl(null);
    }
  }, [experienceImage]);

  useEffect(() => {
    return () => {
      if (blobURL.current) {
        URL.revokeObjectURL(blobURL.current); // Cleanup on unmount
      }
    };
  }, []);

  return (
    <>
      <div className="space-y-6 md:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <motion.h1
            variants={itemVariants}
            className="text-2xl md:text-4xl font-[800] text-midnight-blue"
          >
            {title || "Experience Title"}
          </motion.h1>
          <motion.div
            variants={itemVariants}
            className={`flex items-center space-x-2 text-sm font-medium ${
              availability === "available"
                ? "text-green-600"
                : "text-orange-600"
            }`}
          >
            {availability === "available" ? (
              <CheckCircle2
                className={`w-5 h-5 ${
                  availability === "available"
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              />
            ) : (
              <Ban className={"w-5 h-5"} />
            )}

            <span>
              {availability === "available" ? "Available" : "Unavailable"}
            </span>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="relative aspect-video rounded-lg overflow-hidden bg-light-gray/30 border-2 border-dashed border-light-gray"
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Experience preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error("Failed to load image:", imageUrl);
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-2">
              <Upload className="w-8 h-8 text-charcoal/50" />
              <span className="text-base text-charcoal/50">
                Upload Experience Image
              </span>
            </div>
          )}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-4 text-sm"
        >
          <div className="flex items-center space-x-2 text-charcoal">
            <span className="font-medium">{city || "City"}</span>
            <span>•</span>
            <span className="font-medium">{country || "Country"}</span>
          </div>
          {category && (
            <span className="px-3 py-1 bg-ocean-blue/10 text-ocean-blue rounded-md font-medium">
              {category}
            </span>
          )}
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-ocean-blue" />
            <span className="text-ocean-blue font-medium">
              {duration ? `${duration} days` : "Duration"}
            </span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
          {tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-midnight-blue/5 text-midnight-blue text-sm rounded-md 
                             flex items-center gap-1.5 font-medium"
            >
              {tag}
              <CheckCircle className="w-3 h-3" />
            </span>
          ))}
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold text-midnight-blue mb-2">
            Description
          </h3>
          <p className="text-base text-charcoal leading-relaxed">
            {description || "Add your experience description..."}
          </p>
        </motion.div>
      </div>
    </>
  );
}
