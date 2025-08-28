"use client";
import React, { useState } from "react";
import {
  Star,
  Edit3,
  Eye,
  CircleCheck,
  Bookmark,
  BookmarkCheck,
  Clock,
  MapPin,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Experience } from "@/lib/types/experience";
import Link from "next/link";
import { formatPrice } from "@/utils/functions/formatPrice";
import Image from "next/image";
import { useAppSelector } from "@/hooks/redux";
import useSavePost from "@/hooks/savedPosts/useSavePost";
import AuthorCard from "../ui/AuthorCard";
interface ExperienceCardProps {
  experience: Experience;
  isAgent?: boolean;
  onSave?: (experienceId: string) => void;
  onUnsave?: (experienceId: string) => void;
  queryKey?: string;
}

export default function ExperienceCard({
  experience,
  isAgent = false,

  queryKey = "experiences",
}: ExperienceCardProps) {
  
  const user = useAppSelector((state) => state.user.user);
  const {savePost,unsavePost} = useSavePost();
  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (experience.isSaved) {
      unsavePost.mutateAsync({savedPostID:experience.id, queryKey});
    } else {
      if(!user){
        return;
      }
      console.log("Experience ID",experience.id);
      console.log("User ID",user?.id);
      console.log("Query Key",queryKey);
      savePost.mutateAsync({userID:user?.id,postID:experience.id,type:"experience", queryKey});
      
    }
  };

  // Function to truncate description
  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-ocean-blue/20 transform h-full flex flex-col"
    >
      {/* Cover Image with Overlay - Fixed Height */}
      <div className="relative h-64 overflow-hidden flex-shrink-0">
        <Image
          src={experience.experienceImage}
          alt={experience.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Top Row: Availability & Save Button */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          {/* Availability Badge */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm ${
              experience.isAvailable
                ? "bg-green-500/20 text-green-100 border border-green-500/30"
                : "bg-red-500/20 text-red-100 border border-red-500/30"
            }`}
          >
            <CircleCheck className="w-4 h-4" />
            <span className="text-xs font-medium">
              {experience.isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>

          {/* Save Button (only for non-agent) */}
          {!isAgent && user && (
            <button
              onClick={handleSaveToggle}
              className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
            >
              {
              (savePost.isLoading || unsavePost.isLoading) ? (
                <Loader2 className="w-4 h-4 animate-spin text-ocean-blue" />
              ) : 
              unsavePost.isError ? (
                <Bookmark className="w-4 h-4 text-ocean-blue" fill="currentColor" />
              ) : savePost.isError ? (
                <Bookmark className="w-4 h-4 text-gray-600 hover:text-ocean-blue" />
              ) : experience.isSaved ? (
                <BookmarkCheck className="w-4 h-4 text-ocean-blue" fill="currentColor" />
              ) : (
                <Bookmark className="w-4 h-4 text-gray-600 hover:text-ocean-blue" />
              )}
            </button>
          )}
        </div>

        {/* Bottom Left: Agent Info */}
        {experience.agent && <AuthorCard name={experience.agent.name} image={experience.agent.image} />}

        {/* Agent Action Buttons (overlay on image) */}
        {isAgent && (
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
            <Link href={`/agent/experiences/edit/${experience.id}`}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 bg-white/95 backdrop-blur-sm text-midnight-blue rounded-full text-sm font-semibold hover:bg-white transition-colors duration-300 flex items-center gap-2 shadow-lg"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </motion.button>
            </Link>
            <Link href={`/agent/experiences/${experience.id}`}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 bg-ocean-blue/95 backdrop-blur-sm text-white rounded-full text-sm font-semibold hover:bg-ocean-blue transition-colors duration-300 flex items-center gap-2 shadow-lg"
              >
                <Eye className="w-4 h-4" />
                View
              </motion.button>
            </Link>
          </div>
        )}
      </div>

      {/* Content Section - Flexible Height */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Tags */}
        {experience.tags && experience.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {experience.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 text-sm font-semibold bg-ocean-blue/10 text-midnight-blue rounded-full sm:text-sm text-xs" 
              >
                {tag}
              </span>
            ))}
            {experience.tags.length > 3 && (
              <span className="inline-block px-3 py-1 text-sm font-semibold bg-gray-100 text-gray-600 rounded-full">
                +{experience.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-[800] text-charcoal line-clamp-2 mb-3 group-hover:text-midnight-blue transition-colors duration-200 leading-tight font-raleway">
          {experience.title}
        </h3>

        {/* Description */}
        {experience.description && (
          <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
            {truncateDescription(experience.description)}
          </p>
        )}

        {/* Spacer to push content to bottom */}
        <div className="flex-grow"></div>

        {/* Meta Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>
                {experience.duration}{" "}
                {experience.duration === 1 ? "day" : "days"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
              <span>{experience.averageRating}</span>
            </div>
          </div>

          {/* Action Button for non-agent mode */}
          {!isAgent ? (
            <Link href={`/experience/${experience.id}`}>
              <div className="flex items-center gap-1 text-ocean-blue text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span>View Details</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ) : (
            <div className="text-sm text-gray-600">Agent Dashboard</div>
          )}
        </div>

        {/* Price Row - Always at bottom */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Starting at</span>
            <span className="text-2xl font-bold text-midnight-blue">
              ${formatPrice(experience.minPrice)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
