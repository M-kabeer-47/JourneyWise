"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import { useAppSelector } from "@/hooks/redux";
import { toast } from "../ui/Toast";
import useUserPreferences from "@/hooks/user/useUserPreferences";

// Import modular sections
import DisplayThemeSection from "./sections/DisplayThemeSection";
import TravelInterestsSection from "./sections/TravelInterestsSection";
import NotificationsSection from "./sections/NotificationsSection";
import PrivacySecuritySection from "./sections/PrivacySecuritySection";
import InterestTagsModal from "./TagsModal";

// Import types and constants
import {
  Mountain,
  Waves,
  Landmark,
  Utensils,
  Moon,
  Footprints,
  Flame,
  Building,
  Camera,
  DollarSign,
  Users,
  Car,
  ShoppingBag,
  Home,
  Heart,
  Snowflake,
  Sun,
  Star,
  Sparkles,
} from "lucide-react";
import { PreferencesForm } from "@/lib/schemas/userPreferences";

interface Tag {
  id: string;
  label: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

const INTEREST_TAGS: Tag[] = [
  { id: "adventure", label: "Adventure", icon: Mountain },
  { id: "beach", label: "Beach", icon: Waves },
  { id: "culture", label: "Culture", icon: Landmark },
  { id: "food", label: "Food & Cuisine", icon: Utensils },
  { id: "nightlife", label: "Nightlife", icon: Moon },
  { id: "hiking", label: "Hiking", icon: Footprints },
  { id: "wildlife", label: "Wildlife", icon: Flame },
  { id: "historical", label: "Historical", icon: Building },
  { id: "photography", label: "Photography", icon: Camera },
  { id: "luxury", label: "Luxury", icon: Star },
  { id: "budget", label: "Budget", icon: DollarSign },
  { id: "family", label: "Family", icon: Users },
  { id: "road-trip", label: "Road Trip", icon: Car },
  { id: "shopping", label: "Shopping", icon: ShoppingBag },
  { id: "local", label: "Local Experience", icon: Home },
  { id: "wellness", label: "Wellness", icon: Sparkles },
  { id: "romantic", label: "Romantic", icon: Heart },
  { id: "winter", label: "Winter", icon: Snowflake },
  { id: "summer", label: "Summer", icon: Sun },
];

interface User {
  id: string;
  name: string;
  email: string;
}

interface PreferencesTabProps {
  user: User | null;
}

export default function PreferencesTab({ user }: PreferencesTabProps) {
  const { updatePreferences, preferences: serverPreferences, isLoading } = useUserPreferences();
  
  // Modal states
  const [interestTagsModalOpen, setInterestTagsModalOpen] = useState(false);

  // Use server preferences as initial state
  const [preferences, setPreferences] = useState<PreferencesForm>(
    serverPreferences || {
      theme: "light",
      distanceUnits: "km",
      region: "worldwide",
      interestTags: [],
      priceDropAlerts: true,
      bookingUpdates: true,
      experienceReminders: true,
      profileVisibility: "public",
      showSavedItems: true,
    }
  );

  const handlePreferenceChange = async (key: string, value: any) => {
    // Update local state immediately for UI responsiveness
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Update server
    try {
      await updatePreferences.mutateAsync({ [key]: value });
    } catch (error) {
      // Revert local state on error
      setPreferences(serverPreferences || preferences);
    }
  };

  const toggleInterestTag = (tagId: string) => {
    setPreferences((prev) => {
      const updatedTags = prev.interestTags.includes(tagId)
        ? prev.interestTags.filter((id) => id !== tagId)
        : [...prev.interestTags, tagId];

      return {
        ...prev,
        interestTags: updatedTags,
      };
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-50 rounded-xl"
      >
        <DisplayThemeSection
          preferences={preferences}
          onPreferenceChange={handlePreferenceChange}
        />

        <TravelInterestsSection
          preferences={preferences}
          onPreferenceChange={handlePreferenceChange}
          onOpenInterestTags={() => setInterestTagsModalOpen(true)}
        />

        <NotificationsSection
          preferences={preferences}
          onPreferenceChange={handlePreferenceChange}
        />

        <PrivacySecuritySection
          preferences={preferences}
          onPreferenceChange={handlePreferenceChange}
        />
      </motion.div>

      <InterestTagsModal
        isOpen={interestTagsModalOpen}
        onClose={() => setInterestTagsModalOpen(false)}
        tags={INTEREST_TAGS}
        selectedTags={preferences.interestTags}
        onTagToggle={toggleInterestTag}
        onSave={() => {
          toast.success("Interest tags updated");
          setTimeout(() => setInterestTagsModalOpen(false), 100);
        }}
      />
    </>
  );
}
