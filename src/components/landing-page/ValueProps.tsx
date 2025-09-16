"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  BarChart3,
  ArrowRight,
  PenTool,
  MessageCircle,
  Compass,
  Star,
  TrendingUp,
} from "lucide-react";

const valueProps = [
  {
    icon: Users,
    title: "Smart Route Planning",
    description:
      "Discover community-created routes with optimized waypoints and local recommendations from experienced travelers.",
    features: [
      "Point-to-point route creation",
      "Community voting system",
      "Waypoint optimization",
      "Save & customize routes",
    ],
    cta: "Explore routes",
    href: "/routes",
  },
  {
    icon: PenTool,
    title: "Travel Stories & Guides",
    description:
      "Share your travel experiences and discover authentic stories from fellow travelers worldwide through our integrated blog platform.",
    features: [
      "Travel blog platform",
      "Photo sharing",
      "Local insights",
      "Community engagement",
    ],
    cta: "Read stories",
    href: "/blog",
  },
  {
    icon: Calendar,
    title: "Curated Travel Experiences",
    description:
      "Book unique, handcrafted travel experiences designed by verified local agents. From adventure tours to cultural immersions, find experiences that create lasting memories and authentic connections with destinations.",
    features: [
      "Verified local experiences",
      "Instant booking system",
      "24/7 customer support",
      "Flexible cancellation",
      "Local expert guides",
      "Authentic cultural activities",
    ],
    cta: "Book experiences",
    href: "/experiences",
  },
  {
    icon: BarChart3,
    title: "Agent Dashboard",
    description:
      "Comprehensive business tools for travel professionals to manage bookings, track revenue, and grow their client base effectively with real-time analytics.",
    features: [
      "Booking management",
      "Revenue analytics",
      "Client communication",
      "Profile verification",
    ],
    cta: "Join as agent",
    href: "/agent-signup",
  },
];

const decorativeIcons = [Star, MessageCircle, Compass, TrendingUp];

export default function ValueProps() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-midnight-blue mb-4 font-raleway">
            Why Choose JourneyWise?
          </h2>
          <p className="text-xl text-charcoal max-w-3xl mx-auto font-geist">
            Your complete platform for discovering, planning, and booking
            authentic travel experiences
          </p>
        </motion.div>

        {/* Custom Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {valueProps.map((prop, index) => {
            const isDarkCard = index === 2; // Experiences card
            const DecorativeIcon = decorativeIcons[index];

            return (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`
                  rounded-3xl p-8 hover:shadow-lg transition-all duration-300 group relative overflow-hidden
                  ${index === 0 ? "xl:col-span-1 xl:row-span-1" : ""}
                  ${index === 1 ? "xl:col-span-1 xl:row-span-1" : ""}
                  ${
                    index === 2
                      ? "md:col-span-2 xl:col-span-1 xl:row-span-2 lg:p-10"
                      : ""
                  }
                  ${
                    index === 3
                      ? "md:col-span-2 xl:col-span-2 xl:row-span-1"
                      : ""
                  }
                  ${
                    isDarkCard
                      ? "bg-midnight-blue text-white"
                      : "bg-white border border-gray-100"
                  }
                  ${!isDarkCard ? "min-h-[350px]" : ""}
                `}
              >
                {/* Icon */}
                <div
                  className={`
                  rounded-2xl flex items-center justify-center mb-8 transition-transform duration-300 group-hover:scale-105
                  ${
                    isDarkCard
                      ? "w-16 h-16 bg-white/10"
                      : "w-14 h-14 bg-gradient-to-br from-ocean-blue/10 to-midnight-blue/10"
                  }
                `}
                >
                  <prop.icon
                    className={`
                    ${
                      isDarkCard
                        ? "text-white w-8 h-8"
                        : "text-midnight-blue w-7 h-7"
                    }
                  `}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3
                    className={`
                    font-bold mb-4 font-raleway
                    ${
                      isDarkCard
                        ? "text-white text-2xl lg:text-3xl"
                        : "text-midnight-blue text-xl lg:text-2xl"
                    }
                  `}
                  >
                    {prop.title}
                  </h3>

                  <p
                    className={`
                    font-geist leading-relaxed mb-6
                    ${
                      isDarkCard
                        ? "text-white/80 text-lg mb-8"
                        : "text-charcoal text-base"
                    }
                  `}
                  >
                    {prop.description}
                  </p>

                  {/* Features List - Only show for dark card */}
                  {isDarkCard && (
                    <div className="grid grid-cols-1 gap-3 mb-8">
                      {prop.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-ocean-blue rounded-full mt-2.5 flex-shrink-0" />
                          <span className="text-white/90 text-sm font-medium leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <a
                      href={prop.href}
                      className={`
                        inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 group-hover:gap-3
                        ${
                          isDarkCard
                            ? "bg-ocean-blue text-white hover:bg-ocean-blue/90"
                            : "bg-midnight-blue text-white hover:bg-midnight-blue/90"
                        }
                      `}
                    >
                      {prop.cta}
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </a>
                  </div>
                </div>

                {/* Decorative Icons */}
                <div className="absolute top-6 right-6 opacity-20">
                  <DecorativeIcon
                    className={`
                    ${
                      isDarkCard
                        ? "w-8 h-8 text-white"
                        : "w-6 h-6 text-ocean-blue"
                    }
                  `}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats */}
      </div>
    </section>
  );
}
