"use client";
import React, { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import ProfileTabs from "@/components/profile/ProfileSidebar";
import ProfileTab from "@/components/profile/ProfileTab";
import TripsTab from "@/components/profile/TripsTab";
import BlogsTab from "@/components/profile/BlogsTab";
import SavedTab from "@/components/profile/SavedTab";
import BookingsTab from "@/components/profile/BookingsTab";
import {
  mockUser,
  mockTrips,
  mockBlogs,
  mockSavedItems,
  mockBookings,
} from "@/data/mockProfileData";

export default function UserProfilePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const userId = params?.id as string;

  const [activeTab, setActiveTab] = useState(
    searchParams?.get("tab") || "profile"
  );

  // Mock stats
  const stats = {
    tripsCount: mockTrips.length,
    blogsCount: mockBlogs.filter((b) => b.isPublished).length,
    savedCount: mockSavedItems.length,
    bookingsCount: mockBookings.length,
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileTab
            user={mockUser}
            recentTrips={mockTrips}
            recentBlogs={mockBlogs}
            recentBookings={mockBookings}
            onTabChange={setActiveTab}
          />
        );
      case "trips":
        return <TripsTab trips={mockTrips} />;
      case "blogs":
        return <BlogsTab blogs={mockBlogs} />;
      case "saved":
        return <SavedTab savedItems={mockSavedItems} />;
      case "bookings":
        return <BookingsTab bookings={mockBookings} />;
      default:
        return (
          <ProfileTab
            user={mockUser}
            recentTrips={mockTrips}
            recentBlogs={mockBlogs}
            recentBookings={mockBookings}
            onTabChange={setActiveTab}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Horizontal Tab Navigation */}
      <ProfileTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        stats={stats}
      />

      {/* Content Area */}
      <div className="max-w-[1400px] mx-auto p-4 sm:p-8  mt-20" >
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
