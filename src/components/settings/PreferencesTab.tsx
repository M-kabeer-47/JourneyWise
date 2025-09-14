"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Palette,
  Bell,
  Shield,
  Tag,
  ChevronDown,
  X,
  Check,
  Sparkles,
  Star,
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
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import CurrencyDropdown from "../ui/CurrencyDropdown";
import { toast } from "../ui/Toast";
import SortBy from "../ui/SortBy";

interface User {
  id: string;
  name: string;
  email: string;
}

interface PreferencesTabProps {
  user: User | null;
}

// Define interest tags with Lucide icons instead of emojis
const INTEREST_TAGS = [
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

// Define regions data without icons
const REGIONS = [
  { value: "worldwide", label: "Worldwide" },
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "north_america", label: "North America" },
  { value: "south_america", label: "South America" },
  { value: "africa", label: "Africa" },
  { value: "oceania", label: "Oceania" },
  { value: "middle_east", label: "Middle East" },
  { value: "caribbean", label: "Caribbean" },
];

export default function PreferencesTab({ user }: PreferencesTabProps) {
  const dispatch = useAppDispatch();
  const { selectedCurrency } = useAppSelector((state) => state.currency);

  // Modal states
  const [interestTagsModalOpen, setInterestTagsModalOpen] = useState(false);

  // Local state for preferences
  const [preferences, setPreferences] = useState({
    // Display & Theme
    theme: "light", // 'light', 'dark', 'system'

    // Units & Display
    preferredUnits: "metric", // 'metric', 'imperial'

    // Regions & Interests
    preferredRegion: "worldwide",
    interestTags: ["adventure", "culture", "food"], // Default selected tags

    // Notifications
    priceDropAlerts: true,
    bookingUpdates: true,
    tripReminders: true,

    // Privacy
    profileVisibility: "public", // 'public', 'private'
    showSavedItems: true,
  });

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Auto apply changes - show toast notification
    toast.success("Preference updated");
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

  const saveInterestTags = () => {
    toast.success("Interest tags updated");
    setInterestTagsModalOpen(false);
  };

  const PreferenceSection = ({
    title,
    description,
    icon: Icon,
    children,
  }: {
    title: string;
    description: string;
    icon: any;
    children: React.ReactNode;
  }) => (
    <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
          <Icon className="w-5 h-5 text-ocean-blue" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-charcoal font-raleway">
            {title}
          </h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );

  const ToggleSwitch = ({
    enabled,
    onChange,
    label,
    description,
  }: {
    enabled: boolean;
    onChange: (value: boolean) => void;
    label: string;
    description?: string;
  }) => (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <label className="text-sm font-medium text-charcoal">{label}</label>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? "bg-midnight-blue" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  const SettingButton = ({
    label,
    value,
    onClick,
  }: {
    label: string;
    value: string;
    onClick: () => void;
  }) => (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-charcoal">{label}</label>
      <button
        onClick={onClick}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none hover:bg-gray-50 flex items-center gap-2 font-medium text-ocean-blue w-48 justify-between"
      >
        <span>{value}</span>
        <ChevronDown size={16} className="text-gray-500" />
      </button>
    </div>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-50 rounded-xl p-6 sm:p-8"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Settings className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-charcoal font-raleway">
              Preferences
            </h2>
            <p className="text-sm text-gray-600">
              Customize your travel experience and app behavior
            </p>
          </div>
        </div>

        {/* Display & Theme */}
        <PreferenceSection
          title="Display & Theme"
          description="Customize how the app looks and feels"
          icon={Palette}
        >
          {/* Theme Dropdown */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-charcoal">Theme</label>
            <div className="w-48">
              <SortBy
                options={[
                  { value: "light", label: "Light" },
                  { value: "dark", label: "Dark" },
                  { value: "system", label: "System Default" },
                ]}
                activeSort={{ value: preferences.theme, direction: "asc" }}
                onSortChange={(newSort) =>
                  handlePreferenceChange("theme", newSort.value)
                }
                size="small"
                isSmall={true}
              />
            </div>
          </div>

          {/* Units Dropdown */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-charcoal">
              Distance Units
            </label>
            <div className="w-48">
              <SortBy
                options={[
                  { value: "metric", label: "Kilometers (km)" },
                  { value: "imperial", label: "Miles (mi)" },
                ]}
                activeSort={{
                  value: preferences.preferredUnits,
                  direction: "asc",
                }}
                onSortChange={(newSort) =>
                  handlePreferenceChange("preferredUnits", newSort.value)
                }
                size="small"
                isSmall={true}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-charcoal">
              Currency
            </label>
            <div className="w-48">
              <CurrencyDropdown />
            </div>
          </div>
        </PreferenceSection>

        {/* Travel Interests & Regions */}
        <PreferenceSection
          title="Travel Interests"
          description="Personalize your experience based on what you love"
          icon={Star}
        >
          <SettingButton
            label="Interest Tags"
            value={`${preferences.interestTags.length} tags selected`}
            onClick={() => setInterestTagsModalOpen(true)}
          />

          {/* Region Dropdown */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-charcoal">
              Preferred Region
            </label>
            <div className="w-48">
              <SortBy
                options={REGIONS}
                activeSort={{
                  value: preferences.preferredRegion,
                  direction: "asc",
                }}
                onSortChange={(newSort) =>
                  handlePreferenceChange("preferredRegion", newSort.value)
                }
                size="small"
                isSmall={true}
              />
            </div>
          </div>
        </PreferenceSection>

        {/* Notifications */}
        <PreferenceSection
          title="Notifications"
          description="Control what alerts you receive"
          icon={Bell}
        >
          <ToggleSwitch
            enabled={preferences.priceDropAlerts}
            onChange={(value) =>
              handlePreferenceChange("priceDropAlerts", value)
            }
            label="Price Drop Alerts"
            description="Get notified when prices fall for experiences you've saved"
          />

          <ToggleSwitch
            enabled={preferences.bookingUpdates}
            onChange={(value) =>
              handlePreferenceChange("bookingUpdates", value)
            }
            label="Booking Updates"
            description="Receive notifications about changes to your bookings"
          />

          <ToggleSwitch
            enabled={preferences.tripReminders}
            onChange={(value) => handlePreferenceChange("tripReminders", value)}
            label="Trip Reminders"
            description="Get reminded about upcoming trips"
          />
        </PreferenceSection>

        {/* Privacy & Security */}
        <PreferenceSection
          title="Privacy & Security"
          description="Control your data and privacy settings"
          icon={Shield}
        >
          {/* Profile Visibility Dropdown */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-charcoal">
              Profile Visibility
            </label>
            <div className="w-48">
              <SortBy
                options={[
                  { value: "public", label: "Public" },
                  { value: "private", label: "Private" },
                ]}
                activeSort={{
                  value: preferences.profileVisibility,
                  direction: "asc",
                }}
                onSortChange={(newSort) =>
                  handlePreferenceChange("profileVisibility", newSort.value)
                }
                size="small"
                isSmall={true}
              />
            </div>
          </div>

          <ToggleSwitch
            enabled={preferences.showSavedItems}
            onChange={(value) =>
              handlePreferenceChange("showSavedItems", value)
            }
            label="Show Saved Items"
            description="Allow others to see experiences you've saved"
          />
        </PreferenceSection>
      </motion.div>

      {/* Interest Tags Modal - Improved like onboarding screens */}
      <AnimatePresence>
        {interestTagsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-3xl shadow-xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-bold text-charcoal font-raleway">
                      What interests you?
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">
                      Select topics you're interested in to personalize your
                      experience
                    </p>
                  </div>
                  <button
                    onClick={() => setInterestTagsModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {INTEREST_TAGS.map((tag) => {
                    const isSelected = preferences.interestTags.includes(
                      tag.id
                    );
                    return (
                      <button
                        key={tag.id}
                        onClick={() => toggleInterestTag(tag.id)}
                        className={`group flex flex-col items-center justify-center p-6 rounded-xl transition-all ${
                          isSelected
                            ? "bg-ocean-blue/10 border-2 border-ocean-blue"
                            : "bg-gray-50 hover:bg-ocean-blue/5 border-2 border-transparent"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                            isSelected
                              ? "bg-ocean-blue text-white"
                              : "bg-white text-ocean-blue group-hover:bg-ocean-blue/10"
                          }`}
                        >
                          <tag.icon size={24} />
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            isSelected ? "text-ocean-blue" : "text-charcoal"
                          }`}
                        >
                          {tag.label}
                        </span>
                        {isSelected && (
                          <span className="absolute top-3 right-3">
                            <Check
                              className="w-5 h-5 text-ocean-blue"
                              strokeWidth={3}
                            />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-8 py-6 border-t border-gray-100 bg-white flex justify-end">
                <div className="flex gap-3">
                  <button
                    onClick={() => setInterestTagsModalOpen(false)}
                    className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-charcoal font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveInterestTags}
                    className="px-6 py-3 bg-ocean-blue text-white rounded-lg hover:bg-ocean-blue/90 transition-colors flex items-center gap-2 font-medium"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Save Preferences</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
