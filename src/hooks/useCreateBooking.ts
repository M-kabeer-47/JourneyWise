"use client";

import { useState } from "react";
import axios from "axios";
import { ExperienceResponse } from "@/lib/types/experience";

interface UseCreateBookingProps {
  experienceData: ExperienceResponse;
  customerID: string;
  isCustomTierSelected: boolean;
}

export const useCreateBooking = ({
  experienceData,
  customerID,
  isCustomTierSelected,
}: UseCreateBookingProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fixDate = (date: Date) => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
  };

  const createBooking = async (data: any) => {
    setIsSubmitting(true);

    const booking = {
      ...data,
      tier: {
        ...data.tier,
        currency: experienceData.experience.currency,
      },
      totalPrice: (data.tier.price || 0) * (data.packageCount || 1),
      agentID: experienceData.agent.agentID,
      customerID: "4Tlkb3LOqayKnRDTGayGXHWC6qsePSW7",
      customerName: data.name,
      customerEmail: data.email,
      customerPhone: data.phone,
      experienceID: experienceData.experience.id,
      tripName: experienceData.experience.title,
      agent: experienceData.agent.name,
      isCustomRequest: isCustomTierSelected,
      bookingDate: new Date(),
      startDate: fixDate(data.startDate),
      endDate: fixDate(data.endDate),
      status: "pending",
      noOfPackages: data.packageCount,
    };

    try {
      await axios.post("/api/create-booking", { booking });

      return true;
    } catch (error) {
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    createBooking,
    isSubmitting,
  };
};
