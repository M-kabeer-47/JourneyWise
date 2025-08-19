"use client";
import React, { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import OverviewTab from '@/components/profile/OverviewTab';
import TripsTab from '@/components/profile/TripsTab';
import BlogsTab from '@/components/profile/BlogsTab';
import SavedTab from '@/components/profile/SavedTab';
import BookingsTab from '@/components/profile/BookingsTab';
import { mockUser, mockTrips, mockBlogs, mockSavedItems, mockBookings } from '@/data/mockProfileData';

export default function UserProfilePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const userId = params?.id as string;
  
  const [activeTab, setActiveTab] = useState(searchParams?.get('tab') || 'overview');

  // Mock stats
  const stats = {
    tripsCount: mockTrips.length,
    blogsCount: mockBlogs.filter(b => b.isPublished).length,
    savedCount: mockSavedItems.length,
    bookingsCount: mockBookings.length,
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab 
            recentTrips={mockTrips}
            recentBlogs={mockBlogs}
            upcomingBooking={mockBookings.find(b => b.status === 'confirmed')}
          />
        );
      case 'trips':
        return <TripsTab trips={mockTrips} />;
      case 'blogs':
        return <BlogsTab blogs={mockBlogs} />;
      case 'saved':
        return <SavedTab savedItems={mockSavedItems} />;
      case 'bookings':
        return <BookingsTab bookings={mockBookings} />;
      default:
        return <OverviewTab recentTrips={mockTrips} recentBlogs={mockBlogs} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <ProfileHeader user={mockUser} stats={stats} />
      
      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Content Area */}
        <div className="flex-1 p-8">
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