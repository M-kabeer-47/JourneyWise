"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useRef, useEffect, useState } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <motion.section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{
          y: smoothY,
          scale: smoothScale,
        }}
        initial={{ y: "10%", scale: 0.9 }}
        animate={isLoaded ? { y: "0%", scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          }}
        />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center text-white max-w-7xl px-4 sm:px-6 lg:px-8"
        style={{ opacity: smoothOpacity }}
        initial={{ opacity: 0, y: 50 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        {/* Main Heading - Inspired by bold typography from images */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 1.2,
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="mb-8"
        >
          <h1
            className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-none tracking-tight"
            style={{
              fontFamily:
                '"Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif',
              letterSpacing: "-0.04em",
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            <span className="block text-white">DISCOVER</span>
            <span className="block">
              <span className="text-white">YOUR </span>
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                NEXT
              </span>
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              ADVENTURE
            </span>
          </h1>
        </motion.div>

        {/* Subtitle - Clean and purpose-driven */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg sm:text-xl lg:text-2xl mb-12 text-gray-200 max-w-4xl mx-auto leading-relaxed font-light"
          style={{
            fontFamily: '"Inter", sans-serif',
            letterSpacing: "0.01em",
          }}
        >
          Explore breathtaking destinations, curated experiences, and create
          unforgettable memories with the world's most trusted travel platform.
        </motion.p>

        {/* Simple CTA Buttons - Inspired by minimal approach */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center"
          >
            Start Exploring
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-white/10 backdrop-blur-md text-white px-10 py-4 rounded-full font-semibold text-lg border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 flex items-center"
          >
            <Play className="mr-2 w-5 h-5" />
            Watch Story
          </motion.button>
        </motion.div>

        {/* Trust Indicators - Minimal and clean */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-300 mb-6 font-light">
            Trusted by over 100,000 travelers worldwide
          </p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-2xl font-bold">50K+</div>
            <div className="w-px h-6 bg-white/30"></div>
            <div className="text-2xl font-bold">200+</div>
            <div className="w-px h-6 bg-white/30"></div>
            <div className="text-2xl font-bold">4.9★</div>
          </div>
          <div className="flex justify-center items-center space-x-8 mt-2 text-xs text-gray-400 font-light">
            <span>Happy Travelers</span>
            <span>Destinations</span>
            <span>Rating</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-white/70"
        >
          <span className="text-xs mb-3 font-light tracking-wider">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
        </motion.div>
      </motion.div>

      {/* Side Stats - Inspired by Wanderly layout */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={isLoaded ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
        className="hidden xl:block absolute left-8 top-1/2 transform -translate-y-1/2 text-white space-y-8"
      >
        <div className="text-left">
          <div className="text-4xl font-black mb-2">1.2M+</div>
          <div className="text-sm font-light text-gray-300 leading-tight">
            Trips Planned
            <br />
            Successfully
          </div>
        </div>
        <div className="w-px h-16 bg-white/20 mx-auto"></div>
        <div className="text-left">
          <div className="text-4xl font-black mb-2">150+</div>
          <div className="text-sm font-light text-gray-300 leading-tight">
            Curated
            <br />
            Destinations
          </div>
        </div>
        <div className="w-px h-16 bg-white/20 mx-auto"></div>
        <div className="text-left">
          <div className="text-4xl font-black mb-2">4.9</div>
          <div className="text-sm font-light text-gray-300 leading-tight">
            Traveller
            <br />
            Satisfaction
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
