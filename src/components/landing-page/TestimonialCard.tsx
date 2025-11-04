"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface TestimonialsCardProps {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  location: string;
  index?: number;
}

export default function TestimonialsCard({
  name,
  role,
  avatar,
  rating,
  text,
  location,
  index = 0,
}: TestimonialsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 max-w-[550px] flex-shrink-0 relative overflow-hidden group flex flex-col"
    >
      {/* Decorative gradient background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-ocean-blue/5 to-midnight-blue/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />

      {/* Quote icon */}
      <div className="absolute top-2 left-6 opacity-80 transition-opacity duration-300">
        <Quote
          className="w-14 h-14 text-midnight-blue rotate-180"
          fill="currentColor"
        />
      </div>

      {/* Testimonial text */}
      <p className="text-charcoal font-geist leading-relaxed relative z-10 text-[15px] mt-10 mb-6 flex-grow">
        "{text}"
      </p>

      {/* Rating stars */}
      <div className="flex items-center gap-1 relative z-10 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>

      {/* User info */}
      <div className="flex items-center gap-4 relative z-10">
        <div className="relative">
          <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-ocean-blue/10">
            <div className="w-full h-full bg-gradient-to-br from-ocean-blue/20 to-midnight-blue/20 flex items-center justify-center">
              <span className="text-lg font-semibold text-ocean-blue font-raleway">
                {name.charAt(0)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-semibold text-midnight-blue font-raleway text-base">
            {name}
          </h4>
          <p className="text-sm text-charcoal font-geist">{role}</p>
          <p className="text-xs text-charcoal font-geist mt-1">{location}</p>
        </div>
      </div>
    </motion.div>
  );
}
