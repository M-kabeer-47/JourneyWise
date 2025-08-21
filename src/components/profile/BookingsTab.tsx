import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, DollarSign, Clock } from "lucide-react";
import BookingCard from "./BookingCard";

interface BookingsTabProps {
  bookings: any[];
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

export default function BookingsTab({ bookings }: BookingsTabProps) {
  if (bookings.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-midnight-blue to-ocean-blue rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-midnight-blue mb-2">
          No bookings yet
        </h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Book your first experience and start your adventure.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-midnight-blue">My Bookings</h2>
        <p className="text-gray-600">
          Track your booked experiences and adventures
        </p>
      </div>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </motion.div>
  );
}
