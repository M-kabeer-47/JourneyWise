import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import BookingCard from "../booking/BookingCard";
import Tabs from "./Tabs";
import NoData from "./NoData";
import SortBy from "@/components/ui/SortBy";
import Pagination from "@/components/ui/Pagination";
import BookingDetailsModal from "../booking/BookingDetailsModal";
import { Booking } from "@/lib/types/booking";
import { useFetchUserBookings } from "@/hooks/booking/useFetchUserBookings";
import { BookingCardSkeleton } from "@/components/skeletons/BookingCardSkeleton";
import { User } from "@/lib/types/user";

interface BookingsTabProps {
user:{
  user: User | null;
  isLoading: boolean;
}
}

const statusTabs = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "confirmed", label: "Confirmed" },
  { key: "cancelled", label: "Cancelled" },
  { key: "completed", label: "Completed" },
];

export default function BookingsTab({ user }: BookingsTabProps) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [activeStatus, setActiveStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<{
    value: string;
    direction: "asc" | "desc";
  }>({
    value: "bookingDate",
    direction: "desc",
  });

  const sortOptions = [{ value: "bookingDate", label: "Booking Date" }, { value: "totalPrice", label: "Total Price" }];

  const { bookings, isFetchingBookings, isBookingsError, pagination } = useFetchUserBookings({
    userID: user?.user?.id,
    sortColumn: sortBy.value,
    sortOrder: sortBy.direction,
    status: activeStatus,
    page: currentPage
  });

  const handleStatusChange = (newStatus: string) => {
    setActiveStatus(newStatus);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string, direction: "asc" | "desc") => {
    setSortBy({ value, direction });
    setCurrentPage(1);
  };

  if (isBookingsError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading bookings. Please try again.</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-[800] text-midnight-blue mb-2 font-raleway">
            My Bookings
          </h2>
          <p className="text-charcoal sm:text-sm text-xs">
            Track your booked experiences and adventures
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 ">
        <Tabs
          options={statusTabs}
          activeKey={activeStatus}
          onChange={handleStatusChange}
          className="sm:w-[800px]"
        />
        <SortBy
          options={sortOptions}
          activeSort={sortBy}
          onSortChange={handleSortChange}
          size="small"
          isSmall={ true}
          className="w-full"
         
        />
      </div>

      {isFetchingBookings || user.isLoading ? (
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <BookingCardSkeleton key={i} />
          ))}
        </div>
      ) : bookings?.length === 0 ? (
        // use here
        <NoData
          title="No Bookings found"
          description="Book your first experience and start your adventure."
          icon={
            <Calendar className="sm:w-12 sm:h-12 w-10 h-10 text-midnight-blue" />
          }
        />
      ) : (
        <>
          <div className="space-y-6">
            {bookings?.map((bookingData:Booking) => (
              <BookingCard
                key={bookingData.booking.id}
                booking={bookingData}
                setSelectedBooking={setSelectedBooking}
                setShowDetails={setShowDetails}
                isPersonal={true}
              />
            ))}
          </div>
          
          {pagination && pagination.pages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={pagination.pages}
                onPageChange={setCurrentPage}
                className="justify-center"
              />
            </div>
          )}
        </>
      )}
      {selectedBooking && showDetails && (
        <BookingDetailsModal
          bookingData={selectedBooking}
          onClose={() => setShowDetails(false)}
        />
      )}
    </motion.div>
  );
}
