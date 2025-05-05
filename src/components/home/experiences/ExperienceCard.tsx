"use client";
import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Experience } from '@/lib/types/experience';
import Link from 'next/link';


export default function ExperienceCard({ experience, agent }: { experience: Experience; agent: {
  avatar: string | undefined; name: string
} }) {
  return (
    <motion.div
      
      transition={{ duration: 0.2 }}
      className="relative w-full h-[400px] group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <Link href={`/experience/${experience.id}`} className="block h-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={experience.gigImage}
            alt={experience.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Enhanced gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue via-ocean-blue/40 to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-300" />
        </div>

        {/* Content overlay */}
        <div className="relative h-full flex flex-col justify-end p-5 text-white">
          {/* Title & Price */}
          <div className="flex items-start justify-between mb-3 gap-2">
            <h3 className="text-xl font-bold leading-tight line-clamp-2 flex-1">
              {experience.title}
            </h3>
            <div className="text-right shrink-0">
              <div className="text-xs text-white/90">Starting at</div>
              <div className="text-2xl font-bold">${experience.tier?.tierInfo?.[0]?.price}</div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-white mb-3 line-clamp-2 font-medium">
            {experience.description}
          </p>

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
                src={agent.avatar}
                alt={agent.name}
                className="w-8 h-8 rounded-full border-2 border-white/70"
              />
              <div>
                <p className="text-sm font-medium text-white">{agent.name}</p>
                <div className="flex items-center">
                  <Star className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" />
                  <span className="ml-1 text-xs text-white/90">
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