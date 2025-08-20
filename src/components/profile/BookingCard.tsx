import React from "react";
import {
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  ExternalLink,
} from "lucide-react";

interface BookingCardProps {
  booking: {
    id: string;
    status: "pending" | "confirmed" | "cancelled" | "completed";
    startDate: string;
    endDate: string;
    totalPrice: number;
    tier: {
      name: string;
      inclusions?: string[];
    };
    experience: {
      id: string;
      title: string;
      imageUrl: string;
    };
    agent: {
      id: string;
      agencyName: string;
    };
    payment: {
      status: string;
    };
  };
  compact?: boolean;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  confirmed: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
  completed: "bg-blue-100 text-blue-700 border-blue-200",
};

export default function BookingCard({
  booking,
  compact = false,
}: BookingCardProps) {
  const getDuration = () => {
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    const days = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    return days;
  };

  if (compact) {
    return (
      <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all">
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={booking.experience.imageUrl}
            alt={booking.experience.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-midnight-blue mb-1 truncate">
            {booking.experience.title}
          </h4>
          <p className="text-sm text-charcoal mb-2">
            by {booking.agent.agencyName}
          </p>
          <div className="flex items-center gap-4 text-sm text-charcoal">
            <span>{new Date(booking.startDate).toLocaleDateString()}</span>
            <span>${booking.totalPrice}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium border ${
              statusColors[booking.status]
            }`}
          >
            {booking.status}
          </span>
          <button className="p-2 text-ocean-blue hover:bg-ocean-blue/10 rounded-lg transition-all">
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3">
          <div className="aspect-video lg:aspect-square h-full">
            <img
              src={booking.experience.imageUrl}
              alt={booking.experience.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-midnight-blue mb-1">
                {booking.experience.title}
              </h3>
              <p className="text-charcoal">by {booking.agent.agencyName}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${
                statusColors[booking.status]
              }`}
            >
              {booking.status}
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-2 text-charcoal">
              <Calendar className="w-4 h-4 text-ocean-blue" />
              <span className="text-sm">
                {new Date(booking.startDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-charcoal">
              <Clock className="w-4 h-4 text-ocean-blue" />
              <span className="text-sm">{getDuration()} days</span>
            </div>
            <div className="flex items-center gap-2 text-charcoal">
              <DollarSign className="w-4 h-4 text-ocean-blue" />
              <span className="text-sm font-semibold">
                ${booking.totalPrice}
              </span>
            </div>
            <div className="flex items-center gap-2 text-charcoal">
              <span
                className={`w-3 h-3 rounded-full ${
                  booking.payment.status === "completed"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
              />
              <span className="text-sm capitalize">
                {booking.payment.status}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-charcoal">
                <strong>Package:</strong> {booking.tier.name}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-ocean-blue border border-ocean-blue rounded-lg hover:bg-ocean-blue/10 transition-all">
                View Details
              </button>
              {booking.status === "confirmed" && (
                <button className="px-4 py-2 bg-ocean-blue text-white rounded-lg hover:bg-midnight-blue transition-all">
                  Manage
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
