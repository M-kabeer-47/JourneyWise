import React from "react";
import {
  X,
  MapPin,
  Calendar,
  Users,
  Star,
  CheckCircle,
  XCircle,
  Clock8,
  Banknote,
  PenOff,
  Asterisk,
  User,
  Package,
  CreditCard,
} from "lucide-react";
import AuthorCard from "../ui/AuthorCard";
import ServiceItem from "../ui/ServiceItem";
import { Booking } from "@/lib/types/booking";
import formatDate from "@/utils/functions/formatDate";

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
  bookingData,
  onClose,
}: {
  bookingData: Booking;
  onClose: () => void;
}) {
  const status = statusConfig[bookingData.booking.status];
  const StatusIcon = status.icon;


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
          <h2 className="sm:text-3xl text-xl font-semibold text-charcoal font-raleway">
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
        <div className="flex flex-col-reverse lg:flex-row overflow-hidden">
          {/* Left Column - Experience Details */}
          <div className="w-full lg:w-1/2 p-6 border-b lg:border-b-0 lg:border-r border-gray-100 overflow-y-auto">
            {/* Experience Image */}
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-gray-100 mb-6">
              <img
                src={bookingData.experience.experienceImage}
                alt={bookingData.experience.title}
                className="w-full h-full object-cover"
              />
              {/* Rating Badge */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <span className="text-xs sm:text-sm font-medium text-charcoal font-inter">
                  {bookingData.experience.averageRating}
                </span>
              </div>
            </div>
            {/* Experience Title & Category */}
            <div className="mb-2">
              <h3 className="text-2xl font-bold font-raleway text-charcoal mb-2">
                {bookingData.experience.title}
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 mb-4 text-charcoal">
                  <MapPin className="w-4 h-4 text-ocean-blue" />
                  <span className="text-xs  sm:text-sm font-medium ">
                    {bookingData.experience.location.city +
                      ", " +
                      bookingData.experience.location.country}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-4 text-charcoal">
                  <Calendar className="w-4 h-4 text-ocean-blue" />
                  <span className="text-xs sm:text-sm font-medium">
                    <span className="font-inter">{bookingData.experience.duration}</span>{" "}
                    {bookingData.experience.duration === 1 ? "day" : "days"}
                  </span>
                </div>
              </div>
            </div>

            {bookingData.experience.requirements &&
              bookingData.experience.requirements.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-midnight-blue mb-2 flex items-center gap-2">
                    Requirements
                  </h4>
                  <div className="space-y-1">
                    {bookingData.experience.requirements.map(
                      (requirement, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Asterisk className="w-3 h-3 text-ocean-blue" />

                          <span className="text-xs sm:text-sm text-charcoal flex-1 font-medium">
                            {requirement}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            {/* Included Ser  vices */}
            <div className="grid  sm:grid-cols-2 mt-4">
              {bookingData.experience.includedServices &&
                bookingData.experience.includedServices.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-midnight-blue mb-2 flex items-center gap-2">
                      Included Services
                    </h4>
                    <div className="space-y-1">
                      {bookingData.experience.includedServices.map(
                        (service, index) => (
                          <ServiceItem
                            index={index}
                            key={index}
                            type="included"
                            service={service}
                            size="sm"
                            page="bookingData"
                          />
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Excluded Services */}
              {bookingData.experience.excludedServices &&
                bookingData.experience.excludedServices.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-midnight-blue mb-2 flex items-center gap-2">
                      Excluded Services
                    </h4>
                    <div className="space-y-1">
                      {bookingData.experience.excludedServices.map(
                        (service, index) => (
                          <ServiceItem
                            index={index}
                            key={index}
                            type="excluded"
                            service={service}
                            size="sm"
                            page="bookingData"
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
          <div className="w-full lg:w-1/2 p-6 flex flex-col overflow-y-auto">
            <div className="s">
              {/* Header Section with Agent and Status */}
              <div className="mb-6 pb-4 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between w-full sm:items-start gap-4">
                  <div className="flex-1">
                    <AuthorCard
                      name={bookingData.agent.agencyName}
                      image={bookingData.agent.image}
                      hoverEffect={false}
                      size="lg"
                    />

                    {/* Booking Date - moved here for better positioning */}
                    <div className="flex items-center gap-2 mt-3 text-charcoal">
                      <Calendar className="w-4 h-4 text-ocean-blue" />
                      <span className="text-xs sm:text-sm font-medium">
                        Booked on
                      </span>
                      <span className="text-xs sm:text-sm text-charcoal font-medium font-inter">
                        {formatDate(bookingData.booking.bookingDate)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${status.bgColor}`}
                    >
                      <StatusIcon className={`w-4 h-4 ${status.color}`} />
                      <span
                        className={`${status.color} font-medium text-xs sm:text-sm`}
                      >
                        {status.text}
                      </span>
                    </div>
                    {bookingData.booking.isCustomRequest && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                        Custom Request
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* Trip Dates Section */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-midnight-blue mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-ocean-blue" />
                  Trip Dates
                </h4>
                <div className=" px-4 py-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-medium text-charcoal">
                      Start Date
                    </span>
                    {bookingData.booking.status === "modificationRequested" &&
                    bookingData.booking.modifiedStartDate ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-medium text-gray-400 line-through font-inter">
                          {formatDate(bookingData.booking.startDate)}
                        </span>
                        <span className="text-xs sm:text-sm text-ocean-blue font-medium bg-ocean-blue/10 px-2 py-1 rounded-md font-inter">
                          {formatDate(bookingData.booking.modifiedStartDate)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs sm:text-sm font-medium text-charcoal font-inter">
                        {formatDate(bookingData.booking.startDate)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-medium text-charcoal font-inter">
                      End Date
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-charcoal font-inter">
                      {formatDate(bookingData.booking.endDate)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              {bookingData.booking.customerName && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-midnight-blue mb-3 flex items-center gap-2">
                    <User className="w-5 h-5 text-ocean-blue" />
                    Customer Information
                  </h4>
                  <div className="px-4 py-2 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-medium text-charcoal">
                        Name
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-charcoal">
                        {bookingData.booking.customerName}
                      </span>
                    </div>
                    {bookingData.booking.customerEmail && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-medium text-charcoal">
                          Email
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-charcoal">
                          {bookingData.booking.customerEmail}
                        </span>
                      </div>
                    )}
                    {bookingData.booking.customerPhone && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-medium text-charcoal">
                          Phone
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-charcoal font-inter">
                          {bookingData.booking.customerPhone}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* Package Details */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-midnight-blue mb-3 flex items-center gap-2">
                  <Package className="w-5 h-5 text-ocean-blue" />
                  Package Details
                </h4>
                <div className="px-4 py-2">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-medium text-charcoal">
                        Package
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-charcoal bg-white py-1 rounded-full">
                        {bookingData.booking.tier.name === "custom" ? "Custom" : bookingData.booking.tier.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-medium text-charcoal">
                        Members
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-charcoal">
                        <span className="font-inter">{bookingData.booking.tier.members}</span>{" "}
                        {bookingData.booking.tier.members === 1
                          ? "person"
                          : "people"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-medium text-charcoal">
                        Base Price
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-charcoal font-inter">
                        {bookingData.booking.tier.currency} {bookingData.booking.tier.price.toLocaleString()}
                      </span>
                    </div>
                    {bookingData.booking.noOfPackages &&
                      bookingData.booking.noOfPackages > 1 && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm font-medium text-charcoal">
                            Packages
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-charcoal font-inter">
                            {bookingData.booking.noOfPackages}
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              {bookingData.booking.payment && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-midnight-blue mb-3 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-ocean-blue" />
                    Payment Information
                  </h4>
                  <div className="px-4 py-2 ">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-medium text-charcoal">
                          Amount Paid
                        </span>
                        <span className="text-lg font-bold text-green-600 font-inter">
                          {bookingData.booking.tier.currency}{" "}
                          {bookingData.booking?.payment?.amount.toLocaleString() ||
                            "1000"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-medium text-charcoal">
                          Transaction Date
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-charcoal font-inter">
                          {formatDateTime(
                            bookingData.booking.payment?.transactionDateTime ||
                              ""
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Total Price Section */}
              <div className="mt-8 pt-6 border-t-2 border-gray-100">
                <h4 className="text-lg font-semibold text-midnight-blue mb-4 flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-ocean-blue" />
                  Total Amount
                </h4>
                <div className="rounded-xl p-4">
                  <div className="flex justify-end items-center">
                    {bookingData.booking.status === "modificationRequested" &&
                    bookingData.booking.modifiedTotalPrice ? (
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-lg text-charcoal line-through font-medium font-inter">
                          {bookingData.booking.tier.currency}{" "}
                          {bookingData.booking.totalPrice.toLocaleString()}
                        </span>
                        <span className="text-3xl sm:text-4xl text-midnight-blue font-bold font-inter">
                          {bookingData.booking.tier.currency}{" "}
                          {bookingData.booking.modifiedTotalPrice.toLocaleString()}
                        </span>
                      </div>
                    ) : (
                      <span className="text-3xl sm:text-5xl text-midnight-blue font-bold">
                        {bookingData.booking.tier.currency}{" "}
                        <span className="text-3xl sm:text-5xl text-midnight-blue font-bold font-inter"> 
                          {bookingData.booking.totalPrice.toLocaleString()}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
