"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import BookingForm from "@/components/booking/BookingForm";
import IllustrationSection from "@/components/booking/IllustrationSection";
import { toast } from "@/components/ui/Toast";
import BookingSkeleton from "@/components/skeletons/BookingSkeleton";

export default function BookingPage() {
  const { id } = useParams();
  const { data: tripData, isLoading } = useQuery({
    queryKey: ["experience", id],
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/experience/${id}`);
        return res.data;
      } catch (error) {
        toast.error("Failed to load trip information");
        console.error("Error loading trip data:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 10, // Consider data fresh for 10 minutes
  });

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 md:py-16 relative top-0 sm:top-[-40px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile header (shown only on small screens) */}
        <div className="sm:hidden mb-6">
          <h1 className="text-2xl font-bold font-raleway bg-gradient-to-r from-midnight-blue to-ocean-blue bg-clip-text text-transparent">
            Book Your Experience
          </h1>
          <p className="text-gray-600 mt-1">
            You're just a few steps away from an unforgettable journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-0 sm:gap-8 bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg">
          {/* Left side - Illustration (hidden on mobile) */}
          <div className="hidden md:block h-full">
            <IllustrationSection />
          </div>

          {/* Right side - Booking form */}
          <div className="p-4 sm:p-6 lg:p-10 overflow-y-auto max-h-screen">
            {/* Desktop header (hidden on mobile) */}
            <div className="hidden sm:block mb-6">
              <h1 className="text-3xl font-bold font-raleway bg-gradient-to-r from-midnight-blue to-ocean-blue bg-clip-text text-transparent">
                Book Your Experience
              </h1>
              <p className="text-gray-600 mt-2">
                You're just a few steps away from an unforgettable journey
              </p>
            </div>

            {isLoading ? <BookingSkeleton /> : <BookingForm tripData={tripData} />}
          </div>
        </div>
      </div>
    </div>
  );
}
