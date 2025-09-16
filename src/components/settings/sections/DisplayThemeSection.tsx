import React from "react";
import { Palette } from "lucide-react";
import PreferenceSection from "../shared/PreferenceSection";
import CustomDropdown from "../../ui/CustomDropdown";
import CurrencyDropdown from "../../ui/CurrencyDropdown";

const THEME_OPTIONS = ["Light", "Dark", "System Default"];
const UNITS_OPTIONS = ["Kilometers (km)", "Miles (mi)"];

interface DisplayThemeSectionProps {
  preferences: any;
  onPreferenceChange: (key: string, value: any) => void;
}

export const getThemeDisplayValue = (theme: string) => {
  switch (theme) {
    case "light":
      return "Light";
    case "dark":
      return "Dark";
    case "system":
      return "System Default";
    default:
      return "Light";
  }
};

export const getThemeInternalValue = (displayValue: string) => {
  switch (displayValue) {
    case "Light":
      return "light";
    case "Dark":
      return "dark";
    case "System Default":
      return "system";
    default:
      return "light";
  }
};

export const getUnitsDisplayValue = (units: string) => {
  return units === "km" ? "Kilometers (km)" : "Miles (mi)";
};

export const getUnitsInternalValue = (displayValue: string) => {
  return displayValue === "Kilometers (km)" ? "km" : "miles";
};

export default function DisplayThemeSection({
  preferences,
  onPreferenceChange,
}: DisplayThemeSectionProps) {
  return (
    <PreferenceSection
      title="Display & Theme"
      description="Customize how the app looks and feels"
      icon={Palette}
    >
      {/* Theme Dropdown */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-charcoal">Theme</label>
        <div className="w-48">
          <CustomDropdown
            options={THEME_OPTIONS}
            onClick={(option) =>
              onPreferenceChange("theme", getThemeInternalValue(option))
            }
            isSmall={true}
            className=""
            value={getThemeDisplayValue(preferences.theme)}
          />
        </div>
      </div>

      {/* Units Dropdown */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-charcoal">
          Distance Units
        </label>
        <div className="w-48">
          <CustomDropdown
            options={UNITS_OPTIONS}
            onClick={(option) =>
              onPreferenceChange(
                "distanceUnits",
                getUnitsInternalValue(option)
              )
            }
            isSmall={true}
            className=""
            value={getUnitsDisplayValue(preferences.distanceUnits)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-charcoal">Currency</label>
        <div className="w-48">
          <CurrencyDropdown />
        </div>
      </div>
    </PreferenceSection>
  );
}
