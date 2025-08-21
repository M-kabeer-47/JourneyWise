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
type Booking = {
  experience: {
    title: string;
    experienceImage: string;
    location: {
      city: string;
      country: string;
    };
    description: string;
    category: any;
    tags: string[];
    includedServices: string[];
    excludedServices: string[];
    requirements: string[];
    duration: number;
    averageRating: number;
  };
  agent: {
    agencyName: string;
  };
  status: keyof typeof statusConfig;
  startDate: string;
  endDate: string;
  tier: {
    name: string;
    description: string;
    members: number;
    price: number;
    currency: string;
  };
  totalPrice: number;
  isCustomRequest: boolean;
  notes?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  payment?: {
    amount: number;
    transactionDateTime: string;
  };
};

interface BookingCardProps {
  booking: Booking;
  isPersonal: boolean;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBooking: React.Dispatch<React.SetStateAction<Booking>>;
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
  const status = statusConfig[booking.status];
  const StatusIcon = status.icon;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });
  };

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
          {booking.isCustomRequest && (
            <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-purple-100 rounded-full">
              <span className="text-purple-700 font-medium text-xs">
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

            <div className="rounded-lg">
              <span className="font-semibold sm:text-base text-sm text-charcoal">
                {booking.tier.name}
              </span>
            </div>
            {/* Details */}
            <div className="flex items-center gap-1 text-charcoal mt-2">
              <MapPin className="w-3 h-3 text-ocean-blue" />
              <span className="sm:text-sm text-xs ">
                {booking.experience.location.city +
                  ", " +
                  booking.experience.location.country}
              </span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-ocean-blue" />
                  <span className=" text-xs sm:text-sm">
                    {formatDate(booking.startDate)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-ocean-blue" />
                  <span className=" text-xs sm:text-sm">
                    {booking.tier.members}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-[800] text-3xl text-charcoal">
                  {booking.tier.currency}{" "}
                  {booking.totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          {/* Package */}

          {/* Actions */}
          <div className="flex gap-2">
            <button
              className="flex-1 px-3 py-2 text-ocean-blue border border-ocean-blue rounded-lg hover:bg-ocean-blue/5 transition-all text-sm"
              onClick={() => {
                setSelectedBooking(booking);
                setShowDetails(true);
              }}
            >
              Details
            </button>

            <button className="flex-1 px-3 py-2 bg-ocean-blue text-white rounded-lg hover:bg-midnight-blue transition-all text-sm">
              Manage
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
