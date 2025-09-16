"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";

import useUserPreferences from "@/hooks/user/useUserPreferences";

// Import modular sections
import DisplayThemeSection from "./sections/DisplayThemeSection";
import TravelInterestsSection from "./sections/TravelInterestsSection";
import NotificationsSection from "./sections/NotificationsSection";
import PrivacySecuritySection from "./sections/PrivacySecuritySection";
import InterestTagsModal from "./TagsModal";

// Import skeleton components
import DisplayThemeSectionSkeleton from "@/components/skeletons/DsiplayThemeSection";
import TravelInterestsSectionSkeleton from "@/components/skeletons/TravelInterestsSection";
import NotificationsSectionSkeleton from "@/components/skeletons/NotificationSection";
import PrivacySecuritySectionSkeleton from "@/components/skeletons/PrivacySection";

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


type TagType = {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
};

const INTEREST_TAGS: TagType[] = [
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
export default function PreferencesTab() {
  const {
    updatePreferences,
    preferences,
    isUpdating,
    isFetching,
    isFetchingError,
  } = useUserPreferences();

  // Modal states
  const [interestTagsModalOpen, setInterestTagsModalOpen] = useState(false);

  // Use server preferences as initial state
  const [userPreferences, setUserPreferences] = useState<PreferencesForm>(
    preferences || {
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

  // Update local state when server preferences load

  const handlePreferenceChange = async (key: string, value: any) => {
    // Update local state immediately for UI responsiveness
    setUserPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Update server
    try {
      await updatePreferences({ [key]: value });
    } catch (error) {
      // Revert local state on error
      setUserPreferences(preferences || userPreferences);
    }
  };

  const toggleInterestTag = (tagId: string) => {
    setUserPreferences((prev) => {
      const updatedTags = prev.interestTags.includes(tagId)
        ? prev.interestTags.filter((id) => id !== tagId)
        : [...prev.interestTags, tagId];

      return {
        ...prev,
        interestTags: updatedTags,
      };
    });
  };
  useEffect(() => {
    if (preferences) setUserPreferences(preferences);
  }, [preferences]);

  if (isFetching) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-50 rounded-xl"
      >
        <DisplayThemeSectionSkeleton />
        <TravelInterestsSectionSkeleton />
        <NotificationsSectionSkeleton />
        <PrivacySecuritySectionSkeleton />
      </motion.div>
    );
  }
  if (isFetchingError) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-red-50 border border-red-200 rounded-xl">
        <Settings className="w-10 h-10 text-red-400 mb-4" />
        <h2 className="text-xl font-semibold text-red-800 mb-2">
          Failed to load preferences
        </h2>
        <p className="text-red-600 mb-4">
          There was an error fetching your preferences. Please try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
  } else {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-xl"
        >
          <DisplayThemeSection
            preferences={userPreferences}
            onPreferenceChange={handlePreferenceChange}
          />

          <TravelInterestsSection
            preferences={userPreferences}
            onPreferenceChange={handlePreferenceChange}
            onOpenInterestTags={() => setInterestTagsModalOpen(true)}
          />

          <NotificationsSection
            preferences={userPreferences}
            onPreferenceChange={handlePreferenceChange}
          />

          <PrivacySecuritySection
            preferences={userPreferences}
            onPreferenceChange={handlePreferenceChange}
          />
        </motion.div>

        <InterestTagsModal
          isOpen={interestTagsModalOpen}
          onClose={() => setInterestTagsModalOpen(false)}
          tags={INTEREST_TAGS}
          selectedTags={userPreferences.interestTags}
          onTagToggle={toggleInterestTag}
          onSave={() => {
            setInterestTagsModalOpen(false);
            handlePreferenceChange("interestTags", userPreferences.interestTags);
          }}
        />
      </>
    );
  }
}
