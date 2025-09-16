"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ExperienceCarousel from "../experiences/ExperienceCarousel";
import useFetchExperiences from "@/hooks/experience/useFetchExperiences";

export default function MarketplaceShowcase() {
  const { experiences, isLoading, isFetching } = useFetchExperiences();
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-midnight-blue mb-4 font-raleway">
            Discover Amazing Experiences
          </h2>
          <p className="text-xl text-charcoal max-w-3xl mx-auto font-geist">
            Browse thousands of verified travel experiences from licensed agents
            worldwide
          </p>
        </motion.div>

        <ExperienceCarousel experiences={experiences} isLoading={isFetching} />
      </div>
    </section>
  );
}
