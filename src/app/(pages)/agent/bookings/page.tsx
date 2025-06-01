"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Calendar,
  ListFilter,
  AlertCircle,
  CheckCircle,
  Clock,
  CheckCircle2,
  Trophy,
} from "lucide-react";
import BookingsTable from "@/components/agent-dashboard/Bookings/BookingsTable";
import { Booking } from "@/lib/types/Booking";

// Sample data - replace with API call later
const mockBookings: Booking[] = [
  {
    id: "1",
    customerName: "Emily Johnson",
    customerEmail: "emily@example.com",
    experienceTitle: "Sunset Beach Tour",
    bookingDate: "2025-06-15T18:30:00",
    status: "approved",
    tier: {
      name: "Premium",
      price: 129,
    },
    experienceId: "",
    startDate: "",
    endDate: "",
  },
  {
    id: "2",
    customerName: "Michael Chen",
    customerEmail: "michael@example.com",
    experienceTitle: "Mountain Hiking Adventure",
    bookingDate: "2025-06-18T09:00:00",
    status: "pending",
    tier: {
      name: "Standard",
      price: 79,
    },
    experienceId: "",
    startDate: "",
    endDate: "",
  },
  {
    id: "3",
    customerName: "Sophia Rodriguez",
    customerEmail: "sophia@example.com",
    experienceTitle: "City Food Tour",
    bookingDate: "2025-06-20T12:00:00",
    status: "cancelled",
    tier: {
      name: "Group",
      price: 49,
    },
    experienceId: "",
    startDate: "",
    endDate: "",
  },
  {
    id: "4",
    customerName: "James Wilson",
    customerEmail: "james@example.com",
    experienceTitle: "Historical Walking Tour",
    bookingDate: "2025-06-12T10:00:00",
    status: "completed",
    tier: {
      name: "Private",
      price: 149,
    },
    experienceId: "",
    startDate: "",
    endDate: "",
  },
  {
    id: "5",
    customerName: "Olivia Miller",
    customerEmail: "olivia@example.com",
    experienceTitle: "Wine Tasting Experience",
    bookingDate: "2025-06-25T16:00:00",
    status: "confirmed",
    tier: {
      name: "Premium",
      price: 119,
    },
    experienceId: "",
    startDate: "",
    endDate: "",
  },
  {
    id: "6",
    customerName: "William Davis",
    customerEmail: "william@example.com",
    experienceTitle: "Kayaking Adventure",
    bookingDate: "2025-07-02T10:00:00",
    status: "pending",
    tier: {
      name: "Standard",
      price: 89,
    },
    experienceId: "",
    startDate: "",
    endDate: "",
  },
  {
    id: "7",
    customerName: "Ava Brown",
    customerEmail: "ava@example.com",
    experienceTitle: "Photography Workshop",
    bookingDate: "2025-06-22T14:00:00",
    status: "confirmed",
    tier: {
      name: "Premium",
      price: 159,
    },
    experienceId: "",
    startDate: "",
    endDate: "",
  },
  {
    id: "8",
    customerName: "Noah Martinez",
    customerEmail: "noah@example.com",
    experienceTitle: "Local Brewery Tour",
    bookingDate: "2025-06-27T16:30:00",
    status: "cancelled",
    tier: {
      name: "Group",
      price: 45,
    },
    experienceId: "",
    startDate: "",
    endDate: "",
  },
  {
    id: "9",
    customerName: "Isabella Thompson",
    customerEmail: "isabella@example.com",
    experienceTitle: "Yoga Retreat",
    bookingDate: "2025-07-05T08:00:00",
    status: "confirmed",
    tier: {
      name: "Standard",
      price: 75,
    },
    experienceId: "",
    startDate: "",
    endDate: "",
  },
  {
    id: "10",
    customerName: "Ethan Garcia",
    customerEmail: "ethan@example.com",
    experienceTitle: "Urban Street Art Tour",
    bookingDate: "2025-06-24T11:00:00",
    status: "completed",
    tier: {
      name: "Private",
      price: 120,
    },
    experienceId: "",
    startDate: "",
    endDate: "",
  },
];

export default function BookingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(searchParams);

  // State
  const [statusFilter, setStatusFilter] = useState(
    current.get("status") || "all"
  );
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Filter bookings based on status
  useEffect(() => {
    setIsLoading(true);
    // Simulate API delay
    const timer = setTimeout(() => {
      try {
        const filteredBookings =
          statusFilter === "all"
            ? mockBookings
            : mockBookings.filter((booking) => booking.status === statusFilter);

        setBookings(filteredBookings);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [statusFilter]);

  // Calculate counts
  const counts = {
    all: mockBookings.length,
    pending: mockBookings.filter((b) => b.status === "pending").length,
    confirmed: mockBookings.filter((b) => b.status === "confirmed").length,
    approved: mockBookings.filter((b) => b.status === "approved").length,
    cancelled: mockBookings.filter((b) => b.status === "cancelled").length,
    completed: mockBookings.filter((b) => b.status === "completed").length,
  };

  // Handle status filter change
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);

    // Update URL
    const params = new URLSearchParams(current.toString());
    if (status === "all") {
      params.delete("status");
    } else {
      params.set("status", status);
    }

    const query = params.toString();
    const url = `/agent/bookings${query ? `?${query}` : ""}`;
    router.push(url);
  };

  return (
    <div className="min-h-screen bg-light-gray pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-midnight-blue to-ocean-blue text-white">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Manage Bookings
              </h1>
              <p className="mt-1 text-blue-100">
                View and manage all your experience bookings
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mt-6">
            <nav className="flex space-x-4 overflow-x-auto pb-1">
              <button
                onClick={() => handleStatusFilterChange("all")}
                className={`px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors
                  ${
                    statusFilter === "all"
                      ? "bg-white text-midnight-blue"
                      : "text-blue-100 hover:bg-white/10"
                  }`}
              >
                All Bookings
                <span className="ml-2 px-2 py-0.5 bg-blue-100/20 text-white text-xs rounded-full">
                  {counts.all}
                </span>
              </button>

              <button
                onClick={() => handleStatusFilterChange("pending")}
                className={`px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors flex items-center
                  ${
                    statusFilter === "pending"
                      ? "bg-white text-amber-600"
                      : "text-blue-100 hover:bg-white/10"
                  }`}
              >
                <Clock className="mr-1.5 h-4 w-4" />
                Pending
                <span className="ml-2 px-2 py-0.5 bg-blue-100/20 text-white text-xs rounded-full">
                  {counts.pending}
                </span>
              </button>

              <button
                onClick={() => handleStatusFilterChange("approved")}
                className={`px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors flex items-center
                  ${
                    statusFilter === "approved"
                      ? "bg-white text-blue-600"
                      : "text-blue-100 hover:bg-white/10"
                  }`}
              >
                <CheckCircle2 className="mr-1.5 h-4 w-4" />
                Approved
                <span className="ml-2 px-2 py-0.5 bg-blue-100/20 text-white text-xs rounded-full">
                  {counts.approved}
                </span>
              </button>

              <button
                onClick={() => handleStatusFilterChange("confirmed")}
                className={`px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors flex items-center
                  ${
                    statusFilter === "confirmed"
                      ? "bg-white text-emerald-600"
                      : "text-blue-100 hover:bg-white/10"
                  }`}
              >
                <CheckCircle className="mr-1.5 h-4 w-4" />
                Confirmed
                <span className="ml-2 px-2 py-0.5 bg-blue-100/20 text-white text-xs rounded-full">
                  {counts.confirmed}
                </span>
              </button>

              <button
                onClick={() => handleStatusFilterChange("cancelled")}
                className={`px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors flex items-center
                  ${
                    statusFilter === "cancelled"
                      ? "bg-white text-red-600"
                      : "text-blue-100 hover:bg-white/10"
                  }`}
              >
                <AlertCircle className="mr-1.5 h-4 w-4" />
                Cancelled
                <span className="ml-2 px-2 py-0.5 bg-blue-100/20 text-white text-xs rounded-full">
                  {counts.cancelled}
                </span>
              </button>

              <button
                onClick={() => handleStatusFilterChange("completed")}
                className={`px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors flex items-center
                  ${
                    statusFilter === "completed"
                      ? "bg-white text-green-600"
                      : "text-blue-100 hover:bg-white/10"
                  }`}
              >
                <Trophy className="mr-1.5 h-4 w-4" />
                Completed
                <span className="ml-2 px-2 py-0.5 bg-blue-100/20 text-white text-xs rounded-full">
                  {counts.completed}
                </span>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          // Loading state
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-slate-200 h-12 w-12 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              <div className="mt-6 grid grid-cols-3 gap-4 w-full">
                <div className="h-8 bg-slate-200 rounded col-span-1"></div>
                <div className="h-8 bg-slate-200 rounded col-span-2"></div>
              </div>
            </div>
          </div>
        ) : error ? (
          // Error state
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <div className="flex flex-col items-center">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Unable to load bookings
              </h3>
              <p className="text-gray-500">
                Please try again later or contact support.
              </p>
              <button className="mt-4 px-4 py-2 bg-ocean-blue text-white rounded-lg hover:bg-ocean-blue/90">
                Retry
              </button>
            </div>
          </div>
        ) : bookings.length > 0 ? (
          // Bookings table
          <BookingsTable
            bookings={bookings}
            title={`${
              statusFilter === "all"
                ? "All"
                : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)
            } Bookings`}
            isFullPage={true}
          />
        ) : (
          // Empty state
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <div className="flex flex-col items-center">
              <Calendar className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No bookings found
              </h3>
              <p className="text-gray-500">
                {statusFilter === "all"
                  ? "You don't have any bookings yet."
                  : `No ${statusFilter} bookings at the moment.`}
              </p>
              {statusFilter !== "all" && (
                <button
                  onClick={() => handleStatusFilterChange("all")}
                  className="mt-4 px-4 py-2 bg-ocean-blue text-white rounded-lg hover:bg-ocean-blue/90"
                >
                  View All Bookings
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
