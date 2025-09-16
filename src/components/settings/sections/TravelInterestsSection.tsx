import React from "react";
import { Star } from "lucide-react";
import PreferenceSection from "../shared/PreferenceSection";
import SettingButton from "../shared/SettingButton";
import CustomDropdown from "../../ui/CustomDropdown";
import { Label } from "@/components/ui/label";

export const REGIONS_OPTIONS = [
  "Worldwide",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Africa",
  "Oceania",
  "Middle East",
  "Caribbean",
];
export const VISIBILITY_OPTIONS = ["Public", "Private"];
const getRegionDisplayValue = (region: string) => {
  switch (region) {
    case "worldwide":
      return "Worldwide";
    case "asia":
      return "Asia";
    case "europe":
      return "Europe";
    case "north_america":
      return "North America";
    case "south_america":
      return "South America";
    case "africa":
      return "Africa";
    case "oceania":
      return "Oceania";
    case "middle_east":
      return "Middle East";
    case "caribbean":
      return "Caribbean";
    default:
      return "Worldwide";
  }
};

const getRegionInternalValue = (displayValue: string) => {
  switch (displayValue) {
    case "Worldwide":
      return "worldwide";
    case "Asia":
      return "asia";
    case "Europe":
      return "europe";
    case "North America":
      return "north_america";
    case "South America":
      return "south_america";
    case "Africa":
      return "africa";
    case "Oceania":
      return "oceania";
    case "Middle East":
      return "middle_east";
    case "Caribbean":
      return "caribbean";
    default:
      return "worldwide";
  }
};
interface TravelInterestsSectionProps {
  preferences: any;
  onPreferenceChange: (key: string, value: any) => void;
  onOpenInterestTags: () => void;
}

export default function TravelInterestsSection({
  preferences,
  onPreferenceChange,
  onOpenInterestTags,
}: TravelInterestsSectionProps) {
  return (
    <PreferenceSection
      title="Travel Interests"
      description="Personalize your experience based on what you love"
      icon={Star}
    >
      <div
        className="flex justify-between items-center"
        onClick={onOpenInterestTags}
      >
        <Label className="text-charcoal">Interest Tags</Label>
        <button className="flex items-center gap-3 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-ocean-blue transition-colors w-48 text-charcoal text-sm ">
          Select Tags
        </button>
      </div>

      {/* Region Dropdown */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-charcoal">
          Preferred Region
        </label>
        <div className="w-48">
          <CustomDropdown
            options={REGIONS_OPTIONS}
            onClick={(option) =>
              onPreferenceChange(
                "region",
                getRegionInternalValue(option)
              )
            }
            isSmall={true}
            className=""
            value={getRegionDisplayValue(preferences.region)}
          />
        </div>
      </div>
    </PreferenceSection>
  );
}
