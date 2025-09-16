"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ProfileTabs from "@/components/profile/ProfileSidebar";
import { useAppSelector } from "@/hooks/redux";
import ProfilePageSkeleton from "@/components/skeletons/ProfilePageSkeleton";
import dynamic from "next/dynamic"

const ProfileTab = dynamic(()=>import("@/components/profile/ProfileTab"))
const TripsTab = dynamic(()=>import("@/components/profile/TripsTab"))
const BlogsTab = dynamic(()=>import("@/components/profile/BlogsTab"))
const BookingsTab =dynamic(()=>import("@/components/profile/BookingsTab"))
const SavedTab = dynamic(()=>import("@/components/profile/SavedTab"))
export default function UserProfilePage() {
  const user = useAppSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState("profile");

  // Mock stats

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab user={user.user} onTabChange={setActiveTab} />;
      case "trips":
        return <TripsTab userID={user.user?.id || ""} />;
      case "blogs":
        return <BlogsTab userID={user.user?.id || ""} />;
      case "saved":
        return <SavedTab userID={user.user?.id || ""} />;
      case "bookings":
        return <BookingsTab userID={user.user?.id || ""} />;
      default:
        return <ProfileTab user={user.user} onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-[200px]">
      {/* Horizontal Tab Navigation */}
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content Area */}
      <div className="max-w-[1400px] mx-auto p-4 sm:p-8 mt-[100px]  sm:mt-[80px]">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {user.isLoading || user.user === null ? (
            <ProfilePageSkeleton />
          ) : (
            renderTabContent()
          )}
        </motion.div>
      </div>
    </div>
  );
}
