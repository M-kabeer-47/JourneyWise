import React from "react";
import {
  X,
  Calendar,
  MapPin,
  Users,
  Banknote,
  Building2,
  CheckCircle,
  XCircle,
  Clock8,
  Star,
  Tag,
  Shield,
  Package,
  Check,
  Asterisk,
  PenOff,
} from "lucide-react";
import AuthorCard from "../ui/AuthorCard";
import ServiceItem from "../ui/ServiceItem";
import { Booking } from "@/lib/types/booking";

const statusConfig = {
  pending: {
    icon: Clock8,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    text: "Pending",
  },
  approved: {
    icon: CheckCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    text: "Approved",
  },
  modificationRequested: {
    icon: PenOff,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    text: "Modification Requested",
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

export default function BookingDetailsModal({
  booking,
  onClose,
}: {
  booking: Booking;
  onClose: () => void;
}) {
  const status = statusConfig[booking.status];
  const StatusIcon = status.icon;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatDateTime = (dateString: string) =>
    new Date(dateString).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getCategoryString = (category: any) => {
    try {
      const cat =
        typeof category === "string" ? category : category?.name || "Adventure";
      return cat;
    } catch {
      return "Adventure";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header with Close Button */}
        <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-100">
          <h2 className="sm:text-4xl text-xl font-bold text-charcoal font-raleway">
            Booking Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-charcoal" />
          </button>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col-reverse overflow-y-auto md:flex-row">
          {/* Left Column - Experience Details */}
          <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-gray-100">
            {/* Experience Image */}
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-gray-100 mb-6">
              <img
                src={booking.experience.experienceImage}
                alt={booking.experience.title}
                className="w-full h-full object-cover"
              />
              {/* Rating Badge */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <span className="text-xs sm:text-sm  font-semibold text-charcoal">
                  {booking.experience.averageRating}
                </span>
              </div>
            </div>
            {/* Experience Title & Category */}
            <div className="mb-2">
              <h3 className="text-2xl font-bold font-raleway text-charcoal mb-2">
                {booking.experience.title}
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 mb-4 text-charcoal">
                  <MapPin className="w-4 h-4 text-ocean-blue" />
                  <span className="text-xs sm:text-sm ">
                    {booking.experience.location.city +
                      ", " +
                      booking.experience.location.country}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-4 text-charcoal">
                  <Calendar className="w-4 h-4 text-ocean-blue" />
                  <span className="text-xs sm:text-sm  font-medium">
                    {booking.experience.duration}{" "}
                    {booking.experience.duration === 1 ? "day" : "days"}
                  </span>
                </div>
              </div>
            </div>

            {booking.experience.requirements &&
              booking.experience.requirements.length > 0 && (
                <div className="mb-4">
                  <h4 className="sm text-xs sm:text-sm :sm:text-base text-xs sm:text-sm  font-semibold text-charcoal mb-2 flex items-center gap-2">
                    Requirements
                  </h4>
                  <div className="space-y-1">
                    {booking.experience.requirements.map(
                      (requirement, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Asterisk className="w-3 h-3 text-ocean-blue" />

                          <span className="sm:text-xs sm:text-sm  text-xs text-charcoal flex-1">
                            {requirement}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            {/* Included Ser  vices */}
            <div className="grid  sm:grid-cols-2">
              {booking.experience.includedServices &&
                booking.experience.includedServices.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold sm text-xs sm:text-sm :sm:text-base text-xs sm:text-sm  text-charcoal mb-2 flex items-center gap-2">
                      Included Services
                    </h4>
                    <div className="space-y-1">
                      {booking.experience.includedServices.map(
                        (service, index) => (
                          <ServiceItem
                            index={index}
                            key={index}
                            type="included"
                            service={service}
                            size="sm"
                            page="booking"
                          />
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Excluded Services */}
              {booking.experience.excludedServices &&
                booking.experience.excludedServices.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold sm text-xs sm:text-sm :sm:text-base text-xs sm:text-sm  text-charcoal mb-2 flex items-center gap-2">
                      Excluded Services
                    </h4>
                    <div className="space-y-1">
                      {booking.experience.excludedServices.map(
                        (service, index) => (
                          <ServiceItem
                            index={index}
                            key={index}
                            type="excluded"
                            service={service}
                            size="sm"
                            page="booking"
                          />
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>
            {/* Requirements */}
          </div>

          {/* Right Column - Booking Details */}
          <div className="w-full md:w-1/2 p-6">
            {/* Status Badge */}

            {/* Agency */}
            <div className="flex flex-col justify-between h-full ">
              <div className="flex flex-col sm:flex-row justify-between w-full sm:items-center  ">
                <div className="relative left-[-5px]">
                  <AuthorCard
                    name={booking.agent.agencyName}
                    image={booking.agent.image}
                    hoverEffect={false}
                    size="lg"
                  />
                </div>

                <div
                  className={`flex items-center gap-2  py-2 rounded-full`}
                >
                  <StatusIcon className={`w-5 h-5 ${status.color}`} />
                  <span className={`${status.color} font-semibold text-xs sm:text-sm `}>
                    {status.text}
                  </span>
                  {booking.isCustomRequest && (
                    <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      Custom
                    </span>
                  )}
                </div>
              </div>

              {/* Dates & Members */}
              <div className="flex flex-wrap gap-4 mb-6 mt-4 justify-between pr-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 text-charcoal">
                    <Calendar className="w-4 h-4 text-ocean-blue" />
                    <span className="text-xs sm:text-sm  font-medium">Start Date</span>
                  </div>
                  {booking.status === "modificationRequested" &&
                  booking.modifiedStartDate ? (
                    <span className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm  text-charcoal line-through">
                        {formatDate(booking.startDate)}
                      </span>
                      <span className="text-xs sm:text-sm  text-ocean-blue font-semibold px-2 py-0.5  ml-1">
                        {formatDate(booking.modifiedStartDate)}
                      </span>
                    </span>
                  ) : (
                    <span className="text-xs sm:text-sm  text-charcoal">
                      {formatDate(booking.startDate)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 text-charcoal">
                    <Calendar className="w-4 h-4 text-ocean-blue" />
                    <span className="text-xs sm:text-sm  font-medium">End Date</span>
                  </div>
                  <span className="text-xs sm:text-sm   text-charcoal">
                    {formatDate(booking.endDate)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {booking.customerName && (
                  <div className="mb-4">
                    <h4 className="font-bold text-xs sm:text-sm  sm:text-base text-charcoal mb-2">
                      Customer Information
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs sm:text-sm  text-charcoal font-medium">
                          Name:
                        </span>
                        <span className="text-xs sm:text-sm   text-charcoal">
                          {booking.customerName}
                        </span>
                      </div>
                      {booking.customerEmail && (
                        <div className="flex justify-between">
                          <span className="text-xs sm:text-sm  text-charcoal font-medium">
                            Email:
                          </span>
                          <span className="text-xs sm:text-sm   text-charcoal">
                            {booking.customerEmail}
                          </span>
                        </div>
                      )}
                      {booking.customerPhone && (
                        <div className="flex justify-between">
                          <span className="text-xs sm:text-sm  text-charcoal font-medium">
                            Phone:
                          </span>
                          <span className="text-xs sm:text-sm   text-charcoal">
                            {booking.customerPhone}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* Tier Information */}
                <div className="bg-white mb-6">
                  <h4 className="font-bold  text-xs sm:text-sm  sm:text-base text-charcoal mb-2">
                    Package Details
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs sm:text-sm  text-charcoal font-medium">
                        Package:
                      </span>
                      <span className="text-xs sm:text-sm   text-charcoal">
                        {booking.tier.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs sm:text-sm  text-charcoal font-medium">
                        Members:
                      </span>
                      <span className="text-xs sm:text-sm   text-charcoal">
                        {booking.tier.members}{" "}
                        {booking.tier.members === 1 ? "person" : "people"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs sm:text-sm  text-charcoal font-medium">
                        Base Price:
                      </span>
                      <span className="text-xs sm:text-sm   text-charcoal">
                        {booking.tier.currency} 540
                      </span>
                    </div>
                    {booking.noOfPackages && booking.noOfPackages > 1 && (
                      <div className="flex justify-between text-xs sm:text-sm  text-charcoal">
                        <span>Packages:</span>
                        <span>{booking.noOfPackages}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price Information */}

                {/* Payment Information (for completed/confirmed bookings) */}

                <div className="mb-6">
                  <h4 className="font-bold text-charcoal sm text-xs sm:text-sm :sm:text-base text-xs sm:text-sm  mb-2">
                    Payment Details
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="sm:text-xs sm:text-sm  text-xs text-charcoal font-medium">
                        Amount:
                      </span>
                      <span className="sm:text-xs sm:text-sm  text-xs  text-charcoal">
                        {booking.tier.currency}{" "}
                        {booking?.payment?.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="sm:text-xs sm:text-sm  text-xs text-charcoal font-medium">
                        Transaction Date:
                      </span>
                      <span className="sm:text-xs sm:text-sm  text-xs  text-charcoal">
                        {formatDateTime(booking.payment?.transactionDateTime || "")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer Details */}

                {/* Notes */}
              </div>
              <div className="h-full  flex flex-col justify-end">
                {/* Total Price with currency  */}
                <div className="flex justify-end items-center mb-2">
                  {booking.status === "modificationRequested" &&
                  booking.modifiedTotalPrice ? (
                    <span className="flex items-center gap-2">
                      <span className="text-4xl sm:text-5xl text-charcoal line-through">
                        {booking.tier.currency}{" "}
                        {booking.totalPrice.toLocaleString()}
                      </span>
                      <span className="text-4xl sm:text-5xl text-ocean-blue font-semibold px-2 py-0.5 rounded  ml-1">
                        {booking.tier.currency}
                        {"$"}
                        {booking.modifiedTotalPrice.toLocaleString()}
                      </span>
                    </span>
                  ) : (
                    <div className="flex justify-end">
                      <span className="text-4xl sm:text-5xl text-charcoal font-bold">
                        {booking.tier.currency}{" "}
                        {booking.totalPrice.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
