"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import ProfileTabs from "@/components/profile/ProfileSidebar";
import { useAppSelector } from "@/hooks/redux";
import dynamic from "next/dynamic";

const ProfileTab = dynamic(() => import("@/components/profile/ProfileTab"));
const TripsTab = dynamic(() => import("@/components/profile/TripsTab"));
const BlogsTab = dynamic(() => import("@/components/profile/BlogsTab"));
const BookingsTab = dynamic(() => import("@/components/profile/BookingsTab"));
const SavedTab = dynamic(() => import("@/components/profile/SavedTab"));

const validTabs = ["profile", "trips", "blogs", "saved", "bookings"];

export default function UserProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAppSelector((state) => state.user);

  // Get active tab from URL params, default to 'profile'
  const activeTab = searchParams.get("tab") || "profile";

  // Validate and set default tab
  useEffect(() => {
    const currentTab = searchParams.get("tab");

    if (currentTab && !validTabs.includes(currentTab)) {
      router.replace("/profile?tab=profile");
    } else if (!currentTab) {
      router.replace("/profile?tab=profile");
    }
  }, [searchParams, router]);

  const handleTabChange = (tabKey: string) => {
    router.push(`/profile?tab=${tabKey}`, { scroll: false });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab user={user} onTabChange={handleTabChange} />;
      case "trips":
        return <TripsTab user={user} />;
      case "blogs":
        return <BlogsTab user={user} />;
      case "saved":
        return <SavedTab user={user} />;
      case "bookings":
        return <BookingsTab user={user} />;
      default:
        return <ProfileTab user={user} onTabChange={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-[200px]">
      <ProfileTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="max-w-[1400px] mx-auto p-4 sm:p-8 mt-[100px] sm:mt-[80px]">
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
  );
}
