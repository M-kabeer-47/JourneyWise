import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  XCircle,
  Clock8,
  Banknote,
  PenOff,
} from "lucide-react";
import AuthorCard from "../ui/AuthorCard";
import { Booking } from "@/lib/types/booking";
import formatDate from "@/utils/functions/formatDate";

interface BookingCardProps {
  booking: Booking;
  isPersonal: boolean;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBooking: React.Dispatch<React.SetStateAction<Booking | null>>;
}
const statusConfig = {
  pending: {
    icon: Clock8,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    text: "Pending",
  },
  modificationRequested: {
    icon: PenOff,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    text: "Modification Requested",
  },
  approved: {
    icon: CheckCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    text: "Approved",
  },
  confirmed: {
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
    text: "Confirmed",
  },
  cancelled: {
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    text: "Cancelled",
  },
  completed: {
    icon: CheckCircle,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    text: "Completed",
  },
};

export default function BookingCard({
  booking,
  isPersonal = false,
  setShowDetails,
  setSelectedBooking,
}: BookingCardProps) {
  const status = statusConfig[booking.booking.status];
  const StatusIcon = status.icon;



  const getLocationString = (location: any) => {
    try {
      const loc =
        typeof location === "string" ? JSON.parse(location) : location;
      return loc?.city || loc?.name || "Location";
    } catch {
      return "Location";
    }
  };

  return (
    <motion.div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 h-auto sm:h-[300px]">
      <div className="flex flex-col sm:flex-row h-full">
        {/* Image */}
        <div className="relative sm:w-[40%] h-auto flex-shrink-0">
          <img
            src={booking.experience.experienceImage}
            alt={booking.experience.title}
            className="w-full h-full object-cover"
          />
          {booking.booking.isCustomRequest && (
            <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-accent rounded-full">
              <span className="text-white font-medium text-xs">
                Custom
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col h-full  justify-between p-4 sm:w-[60%]">
          {/* Header */}
          <div className="w-full h-full">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-[800] text-xl sm:text-2xl font-raleway text-midnight-blue truncate">
                  {booking.experience.title}
                </h3>
                <AuthorCard
                  name={booking.agent.agencyName}
                  image={
                    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                  }
                  hoverEffect={false}
                />
              </div>

              {/* Status */}
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-full ${status.bgColor}`}
              >
                <StatusIcon className={`w-3 h-3 ${status.color}`} />
                <span className={`${status.color} font-medium text-xs`}>
                  {status.text}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold sm:text-base text-sm text-charcoal">
                {booking.booking.tier.name.toLowerCase() !== "custom" ? booking.booking.tier.name : "Custom"}
              </span>
              <div className="flex items-center gap-1">
             
                <span className="text-base font-raleway font-bold text-charcoal">
                  Booked on
                  <span className="font-inter"> {formatDate(booking.booking.bookingDate)}</span>
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 text-charcoal mb-3">
              <MapPin className="w-4 h-4 text-ocean-blue flex-shrink-0" />
              <span className="sm:text-sm text-xs font-medium">
                {booking.experience.location.city + ", " + booking.experience.location.country}
              </span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-ocean-blue" />
                  <span className=" text-xs sm:text-sm">
                    <span className="font-inter">{formatDate(booking.booking.startDate)}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-ocean-blue" />
                  <span className=" text-xs sm:text-sm">
                    <span className="font-inter">{booking.booking.tier.members}</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-2xl sm:text-3xl text-midnight-blue tabular-nums">
                  {booking.booking.tier.currency}{" "}
                    <span className="font-inter">{booking.booking.totalPrice.toLocaleString()}</span>
                </span>
              </div>
            </div>
          </div>
          {/* Package */}

          {/* Actions */}
          <div className="flex gap-2">
            <button
              className="flex-1 px-3 py-2 text-charcoal border border-ocean-blue rounded-lg hover:bg-ocean-blue/5 transition-all text-sm font-medium"
              onClick={() => {
                setSelectedBooking(booking);
                setShowDetails(true);
              }}
            >
              Details
            </button>

            <button className="flex-1 px-3 py-2 bg-midnight-blue text-white rounded-lg hover:bg-midnight-blue/85 transition-all text-sm">
              Manage
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
