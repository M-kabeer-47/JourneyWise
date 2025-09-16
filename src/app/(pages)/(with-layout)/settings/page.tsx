"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAppSelector } from "@/hooks/redux";
import Tabs from "@/components/profile/Tabs";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const AccountSettingsTab = dynamic(
  () => import("@/components/settings/AccountSettingsTab")
);
const SecurityTab = dynamic(() => import("@/components/settings/SecurityTab"));
const PreferencesTab = dynamic(
  () => import("@/components/settings/PreferencesTab")
);
const PaymentBillingTab = dynamic(
  () => import("@/components/settings/PaymentBillingTab")
);

const settingsTabs = [
  { key: "account", label: "Account" },
  { key: "security", label: "Security" },
  { key: "preferences", label: "Preferences" },
  { key: "payment", label: "Payment & Billing" },
];

export default function SettingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAppSelector((state) => state.user);

  // Get active tab from URL params, default to 'account'
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "account"
  );

  // Validate tab exists, redirect to account if invalid
  useEffect(() => {
    const validTabs = settingsTabs.map((tab) => tab.key);
    const currentTab = searchParams.get("tab");

    if (currentTab && !validTabs.includes(currentTab)) {
      router.replace("/settings?tab=account");
    } else if (!currentTab) {
      // Set default tab in URL without triggering navigation
      router.replace("/settings?tab=account");
    } else {
      setActiveTab(currentTab);
    }
  }, [searchParams, router]);

  const handleTabChange = (tabKey: string) => {
    // Update URL with new tab
    router.push(`/settings?tab=${tabKey}`, { scroll: false });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountSettingsTab user={user} />;
      case "security":
        return <SecurityTab />;
      case "preferences":
        return <PreferencesTab />;
      case "payment":
        return <PaymentBillingTab user={user.user} />;
      default:
        return <AccountSettingsTab user={user} />;
    }
  };

  return (
    <div className="bg-gray-50 pb-[200px] min-h-auto">
      {/* Header */}
      <div className="relative top-[80px]">
        <div className="max-w-[1400px] mx-auto p-4 sm:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-[800] text-midnight-blue mb-2 font-raleway">
              Settings
            </h1>
            <p className="text-charcoal sm:text-base text-sm font-geist">
              Manage your account preferences and settings
            </p>
          </div>

          {/* Tabs Navigation */}
          <Tabs
            options={settingsTabs}
            activeKey={activeTab}
            onChange={handleTabChange}
            className="max-w-2xl"
          />
        </div>

        {/* Content Area */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
