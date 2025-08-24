import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import BookingCard from "../booking/BookingCard";
import Tabs from "./Tabs";
import NoData from "./NoData";
import SortBy from "@/components/ui/SortBy";
import BookingDetailsModal from "../booking/BookingDetailsModal";
import { Booking } from "@/lib/types/booking";

interface BookingsTabProps {
  userID: string;
}

const statusTabs = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "confirmed", label: "Confirmed" },
  { key: "cancelled", label: "Cancelled" },
  { key: "completed", label: "Completed" },
];

export default function BookingsTab({ bookings }: BookingsTabProps) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [activeStatus, setActiveStatus] = useState("all");
  const [sortBy, setSortBy] = useState<{
    value: string;
    direction: "asc" | "desc";
  }>({
    value: "updatedAt",
    direction: "desc",
  });

  const sortOptions = [{ value: "updatedAt", label: "Last Updated" }];

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

      <div className="flex justify-between mb-8">
        <Tabs
          options={statusTabs}
          activeKey={activeStatus}
          onChange={setActiveStatus}
          className="max-w-[800px]"
        />
        <SortBy
          options={sortOptions}
          activeSort={sortBy}
          onSortChange={(value, direction) => setSortBy({ value, direction })}
          size="small"
        />
      </div>

      {bookings.length === 0 ? (
        // use here
        <NoData
          title="No Bookings found"
          description="Book your first experience and start your adventure."
          icon={
            <Calendar className="sm:w-12 sm:h-12 w-10 h-10 text-midnight-blue" />
          }
        />
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              setSelectedBooking={setSelectedBooking}
              setShowDetails={setShowDetails}
              isPersonal={true}
            />
          ))}
        </div>
      )}
      {selectedBooking && showDetails && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setShowDetails(false)}
        />
      )}
    </motion.div>
  );
}
