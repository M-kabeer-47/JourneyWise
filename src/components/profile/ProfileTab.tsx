import React, { useState } from "react";
import { motion } from "framer-motion";
import ProfileHeader from "@/components/profile/ProfileHeader";
import TripCard from "@/components/trip/TripCard";
import { BlogCard } from "@/components/blog/BlogCard";
import BookingCard from "@/components/booking/BookingCard";
import { ArrowRight } from "lucide-react";
import BookingDetailsModal from "../booking/BookingDetailsModal";
import { Booking } from "@/lib/types/booking";
import { useFetchUserTrips } from "@/hooks/trip/useFetchUserTrips";
import { useFetchUserBookings } from "@/hooks/booking/useFetchUserBookings";
import { useFetchUserBlogs } from "@/hooks/blog/useFetchUserBlogs";

interface ProfileTabProps {
  user: any;
  
  onTabChange: (tab: string) => void;
}

export default function ProfileTab({
  user,
  
  onTabChange,
}: ProfileTabProps) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const { bookings, isFetchingBookings, isBookingsError } = useFetchUserBookings({
    userID: user.id,
    sortColumn: "createdAt",
    sortOrder: "desc",
    status: "all",
    page: 1,
  });
  
  const {trips,isFetchingTrips,isTripsError} = useFetchUserTrips({
    userID: user.id,
    sortColumn: "createdAt",
    sortOrder: "desc",
    page: 1,
  });
  const {blogs,isFetchingBlogs,isBlogsError}= useFetchUserBlogs({
    userID: user.id,
    sortColumn: "createdAt",
    sortOrder: "desc",
    type: "all",
    page: 1,
  });


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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Profile Header */}
      <ProfileHeader user={user} isOwnProfile={true} userType="user" />

      {/* Recent Trips */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-raleway font-bold text-midnight-blue">
            Recent Trips
          </h3>
          {trips.length > 3 && (
            <button
              onClick={() => onTabChange("trips")}
              className="flex items-center gap-2 text-ocean-blue hover:text-midnight-blue font-medium"
            >
              View all <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
        {trips.length === 0 ? (
          <p className="text-charcoal sm:text-sm text-xs">No Trips found.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {trips.slice(0, 3).map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                isPersonal={true}
                onView={handleTripView}
                onEdit={handleTripEdit}
                onDelete={handleTripDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recent Blogs */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-raleway font-bold text-midnight-blue">
            Recent Blogs
          </h3>
          <button
            onClick={() => onTabChange("blogs")}
            className="flex items-center gap-2 text-ocean-blue  font-medium sm:text-sm text-xs"
          >
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        {blogs.length === 0 ? (
          <p className="text-charcoal sm:text-sm text-xs">No Blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {blogs.slice(0, 3).map((blog) => (
              <BlogCard
                key={blog.blog.id}
                blog={blog}
                isPersonal={true}
                onView={handleBlogView}
                onEdit={handleBlogEdit}
                onDelete={handleBlogDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-raleway font-bold text-midnight-blue">
            Recent Bookings
          </h3>
          <button
            onClick={() => onTabChange("bookings")}
            className="flex items-center gap-2 text-ocean-blue font-medium sm:text-sm text-xs"
          >
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        {bookings.length === 0 ? (
          <p className="text-charcoal sm:text-sm text-xs">No Bookings found.</p>
        ) : (
          <div className="space-y-4">
            {bookings.slice(0, 3).map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                isPersonal={true}
                setSelectedBooking={setSelectedBooking}
                setShowDetails={setShowDetails}
              />
            ))}
          </div>
        )}
      </div>

      {/* Empty State */}
      
      {selectedBooking && showDetails && (
        <BookingDetailsModal 
        
          booking={selectedBooking}
          onClose={() => setShowDetails(false)}
        />
      )}
    </motion.div>
  );
}
