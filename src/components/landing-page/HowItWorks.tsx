"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CreditCard,
  MapPin,
  Plus,
  Calendar,
  TrendingUp,
} from "lucide-react";

const travelerSteps = [
  {
    icon: Search,
    title: "Discover",
    description: "Search and filter professional travel experiences",
    detail:
      "Browse thousands of verified experiences from licensed travel agents worldwide. Use our advanced filters to find exactly what you're looking for.",
    videoUrl: "/sample.mp4", // Use local video file
  },
  {
    icon: CreditCard,
    title: "Book",
    description: "Secure checkout with direct agent contact",
    detail:
      "Complete secure payment through our encrypted platform and get instant access to your chosen travel agent for direct communication.",
    videoUrl: "/sample.mp4",
  },
  {
    icon: MapPin,
    title: "Travel & Save",
    description: "Save routes and write trip journals",
    detail:
      "Create lasting memories by documenting your journey, sharing routes with the community, and writing detailed travel blogs.",
    videoUrl: "/sample.mp4",
  },
];

const agentSteps = [
  {
    icon: Plus,
    title: "List",
    description: "Create professional travel listings",
    detail:
      "Upload stunning photos, create detailed itineraries, set competitive pricing, and manage your availability calendar with ease.",
    videoUrl: "/sample.mp4",
  },
  {
    icon: Calendar,
    title: "Manage",
    description: "Handle bookings, calendar, and communication",
    detail:
      "Streamline your business with our comprehensive dashboard. Track bookings, manage schedules, and communicate directly with travelers.",
    videoUrl: "/sample.mp4",
  },
  {
    icon: TrendingUp,
    title: "Grow",
    description: "Analytics and featured placements",
    detail:
      "Access detailed performance analytics, get insights into booking trends, and boost visibility with featured placement options.",
    videoUrl: "/sample.mp4",
  },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"traveler" | "agent">("traveler");
  const [hoveredStep, setHoveredStep] = useState<number | null>(0);
  const [videoErrors, setVideoErrors] = useState<{ [key: number]: string }>({});
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isMobileView, setIsMobileView] = useState(false);

  const currentSteps = activeTab === "traveler" ? travelerSteps : agentSteps;

  // Check if we're in mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Play video on hover, pause when not hovered
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (hoveredStep === index) {
          video.currentTime = 0; // Reset to beginning
          video
            .play()
            .then(() => {
              console.log(`Video ${index} playing successfully`);
              // Clear any previous errors
              setVideoErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[index];
                return newErrors;
              });
            })
            .catch((error) => {
              console.error(`Video ${index} play failed:`, error);
              setVideoErrors((prev) => ({
                ...prev,
                [index]: error.message,
              }));
            });
        } else {
          video.pause();
        }
      }
    });
  }, [hoveredStep]);

  // Reset video refs when tab changes and set first card as active
  useEffect(() => {
    videoRefs.current = [];
    setHoveredStep(0);
    setVideoErrors({});
  }, [activeTab]);

  const handleCardHover = (index: number) => {
    if (!isMobileView) {
      // Only enable hover effects on desktop
      setHoveredStep(index);
    }
  };

  const handleCardClick = (index: number) => {
    if (isMobileView) {
      // For mobile, use clicks instead of hover
      setHoveredStep(index === hoveredStep ? null : index);
    }
  };

  const handleVideoError = (index: number, error: Event) => {
    const videoElement = error.target as HTMLVideoElement;
    const errorMessage = `Video error: ${
      videoElement.error?.message || "Unknown error"
    }`;
    console.error(`Video ${index} error:`, errorMessage);
    setVideoErrors((prev) => ({
      ...prev,
      [index]: errorMessage,
    }));
  };

  const handleVideoLoadStart = (index: number) => {
    console.log(`Video ${index} started loading`);
  };

  const handleVideoCanPlay = (index: number) => {
    console.log(`Video ${index} can play`);
  };

  return (
    <section className="py-10 md:py-20 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-midnight-blue mb-3 md:mb-4 font-raleway">
            How JourneyWise Works
          </h2>
          <p className="text-lg md:text-xl text-charcoal max-w-3xl mx-auto font-geist">
            From concept to journey - streamline every step of your travel
            experience, allowing you to discover and book experiences in
            minutes.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 md:mb-16">
          <div className="bg-gray-100 rounded-full p-1 shadow-sm">
            <button
              onClick={() => setActiveTab("traveler")}
              className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all text-xs md:text-sm ${
                activeTab === "traveler"
                  ? "bg-white text-midnight-blue shadow-sm"
                  : "text-gray-600 hover:text-midnight-blue"
              }`}
            >
              For Travelers
            </button>
            <button
              onClick={() => setActiveTab("agent")}
              className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all text-xs md:text-sm ${
                activeTab === "agent"
                  ? "bg-white text-midnight-blue shadow-sm"
                  : "text-gray-600 hover:text-midnight-blue"
              }`}
            >
              For Agents
            </button>
          </div>
        </div>

        {/* MOBILE LAYOUT - Only shows on screens smaller than md breakpoint */}
        <div className="md:hidden space-y-6">
          {currentSteps.map((step, index) => {
            const isActive = hoveredStep === index;

            return (
              <motion.div
                key={`mobile-${activeTab}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => handleCardClick(index)}
                className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Content section */}
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isActive ? "bg-ocean-blue/20" : "bg-gray-100"
                      }`}
                    >
                      <step.icon className="w-5 h-5 text-midnight-blue" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1 text-midnight-blue">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-charcoal">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Detail text is always visible on mobile */}
                  <div className="ml-[52px] mt-2">
                    <p className="text-sm leading-relaxed text-charcoal">
                      {step.detail}
                    </p>
                  </div>
                </div>

                {/* Video section - Always below content in mobile */}
                <div className="w-full h-[200px] relative">
                  {videoErrors[index] ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-2">
                      <div className="text-red-500 text-xs mb-1">
                        Video Error
                      </div>
                      <div className="text-gray-500 text-[10px]">
                        {videoErrors[index]}
                      </div>
                    </div>
                  ) : (
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      controls={false}
                      onError={(e) => handleVideoError(index, e)}
                      onLoadStart={() => handleVideoLoadStart(index)}
                      onCanPlay={() => handleVideoCanPlay(index)}
                    >
                      <source src={step.videoUrl} type="video/mp4" />
                    </video>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* DESKTOP LAYOUT - Original layout, hidden on mobile */}
        <div className="hidden md:block w-full">
          <div className="flex gap-6">
            {currentSteps.map((step, index) => {
              const isHovered = hoveredStep === index;

              return (
                <motion.div
                  key={`${activeTab}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onHoverStart={() => handleCardHover(index)}
                  className="relative group cursor-pointer"
                  animate={{
                    flex: isHovered ? "0 0 50%" : "0 0 25%",
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {/* Connection Line */}
                  {index < currentSteps.length - 1 && (
                    <div className="hidden md:block absolute top-12 -right-3 w-6 h-0.5 bg-gradient-to-r from-ocean-blue/30 to-transparent z-0" />
                  )}

                  <motion.div
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className={`
                      h-[600px] rounded-3xl shadow-sm border-2 relative z-10 overflow-hidden w-full
                      ${
                        isHovered
                          ? "bg-ocean-blue/5 border-ocean-blue/20"
                          : "bg-white border-gray-100"
                      }
                    `}
                    style={{
                      boxShadow: isHovered
                        ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                        : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div className="relative h-full">
                      {/* Content */}
                      <div className="flex w-full p-6 flex-col h-full">
                        {/* Icon and Title */}
                        <div className="flex items-start gap-3">
                          <motion.div
                            transition={{ duration: 0.3 }}
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                          >
                            <step.icon className="w-5 h-5 text-midnight-blue" />
                          </motion.div>
                          <div className="flex-1">
                            <motion.h3
                              transition={{ duration: 0.3 }}
                              className="font-bold text-lg mb-1 text-midnight-blue"
                            >
                              {step.title}
                            </motion.h3>
                            <p className="text-sm leading-relaxed text-charcoal">
                              {step.description}
                            </p>
                          </div>
                        </div>

                        {/* Detail text - Fixed height container to prevent jumps */}
                        <div className="mt-4 ml-[52px] h-16 flex items-start">
                          <AnimatePresence mode="wait">
                            {isHovered && (
                              <motion.div
                                key={`detail-${index}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-full"
                              >
                                <p className="text-sm leading-relaxed text-charcoal">
                                  {step.detail}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Video positioned at bottom-right (only for desktop) */}
                      <div className="absolute bottom-0 right-0">
                        <motion.div
                          transition={{ duration: 0.3 }}
                          className="w-[100%] h-[400px]"
                        >
                          {/* Video Container */}
                          <div
                            className={`w-full h-full relative rounded-xl shadow-sm overflow-hidden duration-300 transition-all left-[30px] ${
                              isHovered ? "top-0" : "top-[20px]"
                            }`}
                          >
                            {videoErrors[index] ? (
                              // Error State
                              <div className="w-full h-full flex flex-col items-center justify-center text-center p-2">
                                <div className="text-red-500 text-xs mb-1">
                                  Video Error
                                </div>
                                <div className="text-gray-500 text-[10px]">
                                  {videoErrors[index]}
                                </div>
                              </div>
                            ) : (
                              // Video Element
                              <video
                                ref={(el) => {
                                  videoRefs.current[index] = el;
                                }}
                                className={`w-full h-full object-cover relative rounded-xl ${
                                  isHovered
                                    ? "left-0"
                                    : "left-[50px] opacity-70"
                                }`}
                                muted
                                loop
                                playsInline
                                controls={false}
                                onError={(e) => handleVideoError(index, e)}
                                onLoadStart={() => handleVideoLoadStart(index)}
                                onCanPlay={() => handleVideoCanPlay(index)}
                              >
                                <source src={step.videoUrl} type="video/mp4" />
                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                  <span className="text-xs text-gray-500">
                                    Video not supported
                                  </span>
                                </div>
                              </video>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Get Started CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-10 md:mt-16"
        >
          <button className="bg-midnight-blue text-white px-6 md:px-8 py-3 rounded-full font-medium hover:bg-midnight-blue/90 transition-all duration-300 shadow-sm hover:shadow-md">
            Get started
          </button>
        </motion.div>
      </div>
    </section>
  );
}
