import React from "react";
import { motion } from "framer-motion";
import ProfileHeader from "@/components/profile/ProfileHeader";
import TripCard from "@/components/trip/TripCard";
import { BlogCard } from "@/components/blog/BlogCard";
import BookingCard from "@/components/profile/BookingCard";
import { ArrowRight, Plus } from "lucide-react";

interface ProfileTabProps {
  user: any;
  recentTrips: any[];
  recentBlogs: any[];
  recentBookings: any[];
  onTabChange: (tab: string) => void;
}

export default function ProfileTab({
  user,
  recentTrips,
  recentBlogs,
  recentBookings,
  onTabChange,
}: ProfileTabProps) {
  const handleTripView = (id: string) => {
    console.log("View trip:", id);
    // Navigate to trip details
  };

  const handleTripEdit = (id: string) => {
    console.log("Edit trip:", id);
    // Navigate to trip edit
  };

  const handleTripDelete = (id: string) => {
    console.log("Delete trip:", id);
    // Show delete confirmation
  };

  const handleBlogView = (id: string) => {
    console.log("View blog:", id);
    // Navigate to blog details
  };

  const handleBlogEdit = (id: string) => {
    console.log("Edit blog:", id);
    // Navigate to blog edit
  };

  const handleBlogDelete = (id: string) => {
    console.log("Delete blog:", id);
    // Show delete confirmation
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <ProfileHeader user={user} isOwnProfile={true} userType="user" />

      {/* Recent Trips */}
      {recentTrips.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-midnight-blue">
              Recent Trips
            </h3>
            <button
              onClick={() => onTabChange("trips")}
              className="flex items-center gap-2 text-ocean-blue hover:text-midnight-blue font-medium"
            >
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {recentTrips.slice(0, 3).map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                showActions={true}
                isPersonal={true} // Added this prop
                onView={handleTripView}
                onEdit={handleTripEdit}
                onDelete={handleTripDelete}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Recent Blogs */}
      {recentBlogs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-midnight-blue">
              Recent Blogs
            </h3>
            <button
              onClick={() => onTabChange("blogs")}
              className="flex items-center gap-2 text-ocean-blue hover:text-midnight-blue font-medium"
            >
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {recentBlogs.slice(0, 3).map((blog) => (
              <BlogCard
                key={blog.blog.id}
                blog={blog}
                isPersonal={true} // Added this prop
                onView={handleBlogView}
                onEdit={handleBlogEdit}
                onDelete={handleBlogDelete}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Recent Bookings */}
      {recentBookings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-midnight-blue">
              Recent Bookings
            </h3>
            <button
              onClick={() => onTabChange("bookings")}
              className="flex items-center gap-2 text-ocean-blue hover:text-midnight-blue font-medium"
            >
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {recentBookings.slice(0, 2).map((booking) => (
              <BookingCard key={booking.id} booking={booking} compact={true} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {recentTrips.length === 0 &&
        recentBlogs.length === 0 &&
        recentBookings.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-200 p-12 text-center"
          >
            <div className="w-20 h-20 bg-ocean-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-10 h-10 text-ocean-blue" />
            </div>
            <h3 className="text-2xl font-bold text-midnight-blue mb-2">
              Start Your Journey
            </h3>
            <p className="text-charcoal mb-8 max-w-md mx-auto">
              Create your first trip, write a blog, or explore experiences to
              get started.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button className="px-6 py-3 bg-ocean-blue text-white rounded-lg hover:bg-midnight-blue transition-all">
                Plan a Trip
              </button>
              <button className="px-6 py-3 border border-gray-300 text-charcoal rounded-lg hover:border-ocean-blue hover:text-ocean-blue transition-all">
                Write a Blog
              </button>
            </div>
          </motion.div>
        )}
    </div>
  );
}
