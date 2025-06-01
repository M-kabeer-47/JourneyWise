"use client";
import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Experience } from "@/lib/types/Experience";
import Link from "next/link";

export default function ExperienceCard({
  experience,
}: {
  experience: Experience;
}) {
  // Use the agent from experience if not provided separately

  return (
    <motion.div
      transition={{ duration: 0.2 }}
      className="relative w-full h-[400px] group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <Link href={`/experience/${experience.id}`} className="block h-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={experience.experienceImage}
            alt={experience.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Original gradient overlay but with slightly better visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-300" />
        </div>

        {/* Enhanced Availability Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div
            className={`flex items-center px-3 py-1.5 rounded-full backdrop-blur-sm ${
              experience.isAvailable
                ? "bg-green-500/20 text-green-50 border border-green-300/30"
                : "bg-red-500/20 text-red-50 border border-red-300/30"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full mr-2 ${
                experience.isAvailable
                  ? "bg-green-400 animate-pulse"
                  : "bg-red-400"
              }`}
            ></span>
            <span className="text-xs font-medium">
              {experience.isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>

        {/* Content overlay - reverted to original but with better text visibility */}
        <div className="relative h-full flex flex-col justify-end p-5 text-white">
          {/* Title & Price */}
          <div className="flex items-start justify-between mb-3 gap-2">
            <h3 className="text-xl font-bold leading-tight line-clamp-2 flex-1 drop-shadow-sm">
              {experience.title}
            </h3>
            <div className="text-right shrink-0">
              <div className="text-xs text-white/90">Starting at</div>
              <div className="text-2xl font-bold">
                ${experience?.tier?.tierInfo[0].price}
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white/70 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs text-white/90 drop-shadow-sm">
              {experience.duration} {experience.duration === 1 ? "day" : "days"}
            </span>
          </div>

          {/* Tags */}
          {experience.tags && experience.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {experience.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-ocean-blue/30 backdrop-blur-sm rounded-full text-xs font-medium text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* User Info & Rating */}
          <div className="flex items-center justify-between pt-3 border-t border-white/30">
            <div className="flex items-center space-x-2">
              <img
                src={
                  (experience.agent && experience.agent.avatar) ||
                  "/default-avatar.png"
                }
                alt={
                  (experience.agent && experience.agent.name) || "Agent Avatar"
                }
                className="w-8 h-8 rounded-full border-2 border-white/70"
              />
              <div>
                <p className="text-sm font-medium text-white drop-shadow-sm">
                  {experience.agent && experience.agent.name}
                </p>
                <div className="flex items-center">
                  <Star
                    className="w-3.5 h-3.5 text-yellow-400"
                    fill="currentColor"
                  />
                  <span className="ml-1 text-xs text-white/90 drop-shadow-sm">
                    {experience.averageRating}
                  </span>
                </div>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 bg-white text-midnight-blue rounded-full text-sm font-semibold hover:bg-light-gray transition-colors duration-300"
            >
              View Details
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
