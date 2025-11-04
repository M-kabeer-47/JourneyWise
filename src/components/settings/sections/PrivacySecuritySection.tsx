import React from "react";
import { Shield } from "lucide-react";
import PreferenceSection from "../shared/PreferenceSection";
import ToggleSwitch from "../shared/ToggleSwitch";
import CustomDropdown from "../../ui/Selector";

export const VISIBILITY_OPTIONS = ["Public", "Private"];

interface PrivacySecuritySectionProps {
  preferences: any;
  onPreferenceChange: (key: string, value: any) => void;
}

export default function PrivacySecuritySection({
  preferences,
  onPreferenceChange,
}: PrivacySecuritySectionProps) {
  return (
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
          <CustomDropdown
            options={VISIBILITY_OPTIONS}
            onClick={(option) =>
              onPreferenceChange("profileVisibility", option.toLowerCase())
            }
            isSmall={true}
            className=""
            value={
              preferences.profileVisibility === "public" ? "Public" : "Private"
            }
          />
        </div>
      </div>

      <ToggleSwitch
        enabled={preferences.showSavedItems}
        onChange={(value) => onPreferenceChange("showSavedItems", value)}
        label="Show Saved Items"
        description="Allow others to see experiences you've saved"
      />
    </PreferenceSection>
  );
}
