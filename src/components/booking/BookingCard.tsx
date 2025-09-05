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

  return (
    <motion.div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 h-auto">
      <div className="flex flex-col md:flex-row min-h-[280px] md:h-[340px]">
        {/* Image */}
        <div className="relative md:w-[40%] h-48 md:h-full flex-shrink-0">
          <img
            src={booking.experience.experienceImage}
            alt={booking.experience.title}
            className="w-full h-full object-cover"
          />
          {booking.booking.isCustomRequest && (
            <div className="absolute top-2 left-2 px-2 py-1 bg-accent rounded-full">
              <span className="text-white font-medium text-xs">Custom</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-4 md:p-5 md:w-[60%] min-h-0">
          {/* Header Section */}
          <div className="space-y-3">
            {/* Title and Status */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-[800] text-lg md:text-xl lg:text-2xl font-raleway text-midnight-blue line-clamp-2 leading-tight">
                  {booking.experience.title}
                </h3>
              </div>

              {/* Status Badge */}
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-full ${status.bgColor} flex-shrink-0`}
              >
                <StatusIcon className={`w-3 h-3 ${status.color}`} />
                <span
                  className={`${status.color} font-medium text-xs whitespace-nowrap`}
                >
                  {status.text}
                </span>
              </div>
            </div>

            {/* Agency */}
            <div className="mb-2">
              <AuthorCard
                name={booking.agent.agencyName}
                image={booking.agent.image}
                hoverEffect={false}
              />
            </div>

            {/* Package and Booking Date */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
              <span className="font-semibold text-charcoal">
                Package:{" "}
                <span className="font-normal">
                  {booking.booking.tier.name.toLowerCase() !== "custom"
                    ? booking.booking.tier.name
                    : "Custom"}
                </span>
              </span>
              <span className="font-semibold text-charcoal text-xs sm:text-sm">
                Booked:{" "}
                <span className="font-normal font-geist">
                  {formatDate(booking.booking.bookingDate)}
                </span>
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-charcoal">
              <MapPin className="w-4 h-4 text-ocean-blue flex-shrink-0" />
              <span className="sm:text-sm text-xs  line-clamp-1">
                {booking.experience.location.city},{" "}
                {booking.experience.location.country}
              </span>
            </div>

            {/* Date, Members, and Price */}
            <div className="space-y-3">
              {/* Date and Members Row */}
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-ocean-blue flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-geist">
                    {formatDate(booking.booking.startDate)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-ocean-blue flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-geist">
                    {booking.booking.tier.members}{" "}
                    {booking.booking.tier.members === 1 ? "person" : "people"}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Banknote className="w-4 h-4 text-ocean-blue" />
                  <span className="text-sm font-medium text-charcoal">
                    Total Price
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-xl md:text-2xl lg:text-3xl text-midnight-blue tabular-nums">
                    {booking.booking.tier.currency}
                    <span className="font-geist ml-1">
                      {booking.booking.totalPrice.toLocaleString()}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 mt-auto">
            <button
              className="flex-1 px-3 sm:py-2.5 py-2 text-charcoal border border-ocean-blue rounded-lg hover:bg-ocean-blue/5 transition-all text-sm font-medium"
              onClick={() => {
                setSelectedBooking(booking);
                setShowDetails(true);
              }}
            >
              View Details
            </button>
            <button className="flex-1 px-3 sm:py-2.5 py-2 bg-midnight-blue text-white rounded-lg hover:bg-midnight-blue/85 transition-all text-sm font-medium">
              Manage
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
