import React from "react";
import { Bell } from "lucide-react";
import PreferenceSection from "../shared/PreferenceSection";
import ToggleSwitch from "../shared/ToggleSwitch";

interface NotificationsSectionProps {
  preferences: any;
  onPreferenceChange: (key: string, value: any) => void;
}

export default function NotificationsSection({
  preferences,
  onPreferenceChange,
}: NotificationsSectionProps) {
  return (
    <PreferenceSection
      title="Notifications"
      description="Control what alerts you receive"
      icon={Bell}
    >
      <ToggleSwitch
        enabled={preferences.priceDropAlerts}
        onChange={(value) => onPreferenceChange("priceDropAlerts", value)}
        label="Price Drop Alerts"
        description="Get notified when prices fall for experiences you've saved"
      />

      <ToggleSwitch
        enabled={preferences.bookingUpdates}
        onChange={(value) => onPreferenceChange("bookingUpdates", value)}
        label="Booking Updates"
        description="Receive notifications about changes to your bookings"
      />

      <ToggleSwitch
        enabled={preferences.tripReminders}
        onChange={(value) => onPreferenceChange("tripReminders", value)}
        label="Trip Reminders"
        description="Get reminded about upcoming trips"
      />
    </PreferenceSection>
  );
}