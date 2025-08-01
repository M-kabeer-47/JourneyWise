"use client"
import { CheckCircle, CheckCircle2, Clock, Upload, Ban } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { stepOneSchema } from "@/lib/schemas/experience";
import { z } from "zod";

type stepOneType = z.infer<typeof stepOneSchema>;

type StepOneProps = {
  data: stepOneType;
  itemVariants: any;
};

export default function StepOne({ data, itemVariants }: StepOneProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const blobURL = useRef<string | null>(null);
  // Fixed image URL management
  useEffect(() => {
    

    if (blobURL.current) {
      URL.revokeObjectURL(blobURL.current); // Cleanup previous blob URL
      blobURL.current = null; // Reset the ref
    }
    if (data.experienceImage) {
      if (typeof data.experienceImage === "string") {
        setImageUrl(data.experienceImage);
      } else if (data.experienceImage instanceof File) {
        const url = URL.createObjectURL(data.experienceImage);
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
  }, [data.experienceImage]);

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
            {data.title || "Experience Title"}
          </motion.h1>
          <motion.div
            variants={itemVariants}
            className={`flex items-center space-x-2 text-sm font-medium ${
              data.availability === "available"
                ? "text-green-600"
                : "text-orange-600"
            }`}
          >
            {data.availability === "available" ? (
              <CheckCircle2
                className={`w-5 h-5 ${
                  data.availability === "available"
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              />
            ) : (
              <Ban className={"w-5 h-5"} />
            )}

            <span>
              {data.availability === "available" ? "Available" : "Unavailable"}
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
            <span className="font-medium">{data.city || "City"}</span>
            <span>•</span>
            <span className="font-medium">{data.country || "Country"}</span>
          </div>
          {data.category && (
            <span className="px-3 py-1 bg-ocean-blue/10 text-ocean-blue rounded-md font-medium">
              {data.category}
            </span>
          )}
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-ocean-blue" />
            <span className="text-ocean-blue font-medium">
              {data.duration ? `${data.duration} days` : "Duration"}
            </span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
          {data.tags.map((tag: string, index: number) => (
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
          <h3 className="text-base font-semibold text-midnight-blue mb-2">
            Description
          </h3>
          <p className="text-base text-charcoal leading-relaxed">
            {data.description || "Add your experience description..."}
          </p>
        </motion.div>
      </div>
    </>
  );
}
