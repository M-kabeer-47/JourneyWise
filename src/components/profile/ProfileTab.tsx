import { useState } from "react";
import { motion } from "framer-motion";
import ProfileHeader from "./ProfileHeader";
import BookingCard from "../booking/BookingCard";
import { User } from "@/lib/types/user";
import { Booking } from "@/lib/types/booking";

import { useFetchUserBookings } from "@/hooks/booking/useFetchUserBookings";
import { useFetchUserTrips } from "@/hooks/trip/useFetchUserTrips";
import { useFetchUserBlogs } from "@/hooks/blog/useFetchUserBlogs";
import { useDeleteTrip } from "@/hooks/trip/useDeleteTrip";
import { useDeleteBlog } from "@/hooks/blog/useDeleteBlog";
import TripCard from "../trip/TripCard";
import {BlogCard} from "../blog/BlogCard";
import ConfirmModal from "../ui/ConfirmModal";
import { useRouter } from "next/navigation";
import { ArrowRight, Router } from "lucide-react";
import BookingDetailsModal from "../booking/BookingDetailsModal";
import { TripsSectionSkeleton, BlogsSectionSkeleton, BookingsSectionSkeleton } from "@/components/skeletons/ProfilePageSkeleton";
import {toast} from "@/components/ui/Toast"
import { Blog } from "@/lib/types/blog";
interface ProfileTabProps {
  user: User;
  onTabChange: (tab: string) => void;
}

export default function ProfileTab({
  user,
  onTabChange,
}: ProfileTabProps) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: 'trip' | 'blog';
    id: string;
    title: string;
  }>({ isOpen: false, type: 'trip', id: '', title: '' });
  const router = useRouter();
  const { bookings, isFetchingBookings, isBookingsError } = useFetchUserBookings({
    userID: user.id,
    sortColumn: "updatedAt",
    sortOrder: "desc",
    status: "all",
    page: 1,
  });
  
  const {trips,isFetchingTrips,isTripsError} = useFetchUserTrips({
    userID: user.id,
    sortColumn: "updatedAt",
    sortOrder: "desc",
    page: 1,
  });
  const {blogs,isFetchingBlogs,isBlogsError}= useFetchUserBlogs({
    userID: user.id,
    sortColumn: "updatedAt",
    sortOrder: "desc",
    type: "all",
    page: 1,
  });

  const deleteTrip = useDeleteTrip();
  const deleteBlog = useDeleteBlog();


  const handleTripView = (id: string) => {
    router.push(`/trip/${id}`)
    // Navigate to trip details
  };

  const handleTripEdit = (id: string) => {
    router.push(`/trip/edit/${id}`)
    // Navigate to trip edit
  };

  const handleTripDelete = (id: string, title: string) => {
    setDeleteModal({
      isOpen: true,
      type: 'trip',
      id,
      title
    });
  };

  const handleBlogView = (id: string) => {
    router.push(`/blog/${id}`)
    // Navigate to blog details
  };

  const handleBlogEdit = (id: string) => {
   router.push(`/blog/edit/${id}`)
    // Navigate to blog edit
  };

  const handleBlogDelete = (id: string, title: string) => {
    setDeleteModal({
      isOpen: true,
      type: 'blog',
      id,
      title
    });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.type === 'trip') {
      deleteTrip.mutate(deleteModal.id, {
        onSuccess: () => {
          toast.success("Trip deleted successfully");
          setDeleteModal({ isOpen: false, type: 'trip', id: '', title: '' });
        }
      });
    } else {
      deleteBlog.mutate(deleteModal.id, {
        onSuccess: () => {
          toast.success("Blog deleted successfully");
          setDeleteModal({ isOpen: false, type: 'blog', id: '', title: '' });
        }
      });
    }
  };

  const handleCloseModal = () => {
    setDeleteModal({ isOpen: false, type: 'trip', id: '', title: '' });
  };

  return (
    <>
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
          {trips && trips.length > 3 && (
            <button
              onClick={() => onTabChange("trips")}
              className="flex items-center gap-2 text-ocean-blue hover:text-midnight-blue font-medium"
            >
              View all <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
        {isFetchingTrips ? (
          <TripsSectionSkeleton count={3} />
        ) 
        : isTripsError ? (
          <p className="text-charcoal sm:text-sm text-xs">Failed to load trips.</p>
        )
        : trips.length === 0 ? (
          <p className="text-charcoal sm:text-sm text-xs">No Trips found.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <TripCard
                key={trip.trip.id}
                trip={trip.trip}
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
        {isFetchingBlogs ? (
          <BlogsSectionSkeleton count={3} />
        ) : isBlogsError ? (
          <p className="text-charcoal sm:text-sm text-xs">Failed to load blogs.</p>
        ) : blogs.length === 0 ? (
          <p className="text-charcoal sm:text-sm text-xs">No Blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {blogs.map((blog:Blog ) => (
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
        {isFetchingBookings ? (
          <BookingsSectionSkeleton count={3} />
        ) : isBookingsError ? (
          <p className="text-charcoal sm:text-sm text-xs">Failed to load bookings.</p>
        ) : bookings.length === 0 ? (
          <p className="text-charcoal sm:text-sm text-xs">No Bookings found.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((bookingData:Booking) => (
              <BookingCard
                key={bookingData.booking.id}
                booking={bookingData}
                isPersonal={true}
                setSelectedBooking={setSelectedBooking}
                setShowDetails={setShowDetails}
              />
            ))}
          </div>
        )}
      </div>

      {/* Empty State */}
      
      
    </motion.div>
    {selectedBooking && showDetails && (
      <BookingDetailsModal 
        bookingData={selectedBooking}
        onClose={() => setShowDetails(false)}
      />
    )}
    
    <ConfirmModal
      isOpen={deleteModal.isOpen}
      onConfirm={handleConfirmDelete}
      onClose={handleCloseModal}
      title={`Delete ${deleteModal.type === 'trip' ? 'Trip' : 'Blog'}`}
      description={`Are you sure you want to delete "${deleteModal.title}"? This action cannot be undone.`}
      loading={deleteModal.type === 'trip' ? deleteTrip.isPending : deleteBlog.isPending}
      loadingText={`Deleting ${deleteModal.type}...`}
      width="large"
    />
    </>
  );
}
