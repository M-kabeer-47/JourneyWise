"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import SettingsTabs from "@/components/settings/SettingsTabs";
import AccountSettingsTab from "@/components/settings/AccountSettingsTab";
import SecurityTab from "@/components/settings/SecurityTab";
import PreferencesTab from "@/components/settings/PreferencesTab";
import PaymentBillingTab from "@/components/settings/PaymentBillingTab";
import { useAppSelector } from "@/hooks/redux";

const settingsTabs = [
  { key: "account", label: "Account" },
  { key: "security", label: "Security" },
  { key: "preferences", label: "Preferences" },
  { key: "payment", label: "Payment & Billing" },
];

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const user = useAppSelector((state) => state.user);
  
  const [activeTab, setActiveTab] = useState(
    searchParams?.get("tab") || "account"
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountSettingsTab user={user.user} />;
      case "security":
        return <SecurityTab user={user.user} />;
      case "preferences":
        return <PreferencesTab user={user.user} />;
      case "payment":
        return <PaymentBillingTab user={user.user} />;
      default:
        return <AccountSettingsTab user={user.user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-[200px]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto p-4 sm:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-[800] text-midnight-blue mb-2 font-raleway">
              Settings
            </h1>
            <p className="text-charcoal sm:text-base text-sm">
              Manage your account preferences and settings
            </p>
          </div>
          
          {/* Tabs Navigation */}
          <SettingsTabs
            options={settingsTabs}
            activeKey={activeTab}
            onChange={setActiveTab}
            className="max-w-2xl"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-[1400px] mx-auto p-4 sm:p-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {user.isLoading ? (
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : (
            renderTabContent()
          )}
        </motion.div>
      </div>
    </div>
  );
}
