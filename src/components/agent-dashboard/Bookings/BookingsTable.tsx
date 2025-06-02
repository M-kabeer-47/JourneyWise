import React, { useState } from "react";
import { Booking } from "@/lib/types/Booking";
import { Filter, Search } from "lucide-react";
import SearchBar from "@/components/ui/SearchBar";
import SortBy from "@/components/ui/SortBy";

interface BookingsTableProps {
  bookings: Booking[];
  title?: string;
  isFullPage?: boolean;
}

const BookingsTable: React.FC<BookingsTableProps> = ({
  bookings,
  title = "Bookings",
  isFullPage = false,
}) => {
  const [sortBy, setSortBy] = useState("bookingDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");

  // Sort options for the dropdown
  const sortOptions = [
    { value: "customerName", label: "Customer Name" },
    { value: "experienceTitle", label: "Experience" },
    { value: "bookingDate", label: "Booking Date" },
    { value: "price", label: "Price" },
    { value: "status", label: "Status" },
  ];

  // Handle sort change from SortBy component
  const handleSortChange = (key: string, direction: "asc" | "desc") => {
    setSortBy(key);
    setSortOrder(direction);
  };

  // Get status badge styling
  const getStatusClass = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-700";
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "approved":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Filter bookings based on search term
  const filteredBookings = searchTerm
    ? bookings.filter(
        (booking) =>
          booking.customerName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          booking.experienceTitle
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
    : bookings;

  // Sort bookings
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortBy === "bookingDate") {
      const dateA = new Date(a.bookingDate).getTime();
      const dateB = new Date(b.bookingDate).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortBy === "price") {
      return sortOrder === "asc"
        ? a.tier.price - b.tier.price
        : b.tier.price - a.tier.price;
    } else {
      // Generic string comparison for other fields
      const valueA = a[sortBy as keyof typeof a] || "";
      const valueB = b[sortBy as keyof typeof b] || "";
      return sortOrder === "asc"
        ? valueA.toString().localeCompare(valueB.toString())
        : valueB.toString().localeCompare(valueA.toString());
    }
  });

  return (
    <div
      className={`w-full rounded-xl shadow-sm bg-white ${
        isFullPage ? "h-full w-full" : ""
      }`}
    >
      {/* Header with title, search and sort options */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2
            className={`${
              isFullPage ? "text-2xl" : "text-xl"
            } font-semibold text-midnight-blue`}
          >
            {title}
          </h2>

          {isFullPage && (
            <div className="flex sm:flex-row flex-col items-center gap-4 w-[80%]">
              {/* Search Bar */}
              <div className="w-[80%]">
                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  placeholder="Search bookings..."
                />
              </div>
              
              {/* Sort By */}
              <div className="w-[20%]">
                <SortBy
                  options={sortOptions}
                  activeSort={{
                    value: sortBy,
                    direction: sortOrder,
                  }}
                  onSortChange={handleSortChange}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-ocean-blue/60 text-white">
              <th
                className={`${
                  isFullPage ? "px-8 py-5" : "px-6 py-4"
                } text-left text-xs font-semibold uppercase tracking-wider`}
              >
                Customer
              </th>
              <th
                className={`${
                  isFullPage ? "px-8 py-5" : "px-6 py-4"
                } text-left text-xs font-semibold uppercase tracking-wider`}
              >
                Experience
              </th>
              <th
                className={`${
                  isFullPage ? "px-8 py-5" : "px-6 py-4"
                } text-left text-xs font-semibold uppercase tracking-wider`}
              >
                Booking Date
              </th>
              <th
                className={`${
                  isFullPage ? "px-8 py-5" : "px-6 py-4"
                } text-left text-xs font-semibold uppercase tracking-wider`}
              >
                Price
              </th>
              <th
                className={`${
                  isFullPage ? "px-8 py-5" : "px-6 py-4"
                } text-left text-xs font-semibold uppercase tracking-wider`}
              >
                Status
              </th>
              {isFullPage && (
                <th className="px-8 py-5 text-left text-xs font-semibold uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedBookings.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-gray-50/50 transition-colors duration-150"
              >
                <td
                  className={`${
                    isFullPage ? "px-8 py-6" : "px-6 py-4"
                  } whitespace-nowrap`}
                >
                  <div className="flex items-center">
                    <div
                      className={`${
                        isFullPage ? "w-10 h-10" : "w-8 h-8"
                      } rounded-full bg-ocean-blue/10 flex items-center justify-center text-ocean-blue font-medium mr-3`}
                    >
                      {booking.customerName.charAt(0)}
                    </div>
                    <div>
                      <div
                        className={`${
                          isFullPage ? "text-base" : "text-sm"
                        } font-medium text-gray-900`}
                      >
                        {booking.customerName}
                      </div>
                      <div
                        className={`${
                          isFullPage ? "" : "text-sm"
                        } text-gray-500`}
                      >
                        {booking.customerEmail}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  className={`${
                    isFullPage ? "px-8 py-6" : "px-6 py-4"
                  } whitespace-nowrap`}
                >
                  <span
                    className={`${
                      isFullPage ? "text-base" : "text-sm"
                    } font-medium text-gray-900`}
                  >
                    {booking.experienceTitle}
                  </span>
                  {isFullPage && booking.tier.name && (
                    <div className="text-sm text-gray-500 mt-1">
                      {booking.tier.name} Tier
                    </div>
                  )}
                </td>
                <td
                  className={`${
                    isFullPage ? "px-8 py-6" : "px-6 py-4"
                  } whitespace-nowrap`}
                >
                  <span
                    className={`${
                      isFullPage ? "text-base" : "text-sm"
                    } text-gray-500`}
                  >
                    {new Date(booking.bookingDate).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: isFullPage ? "2-digit" : undefined,
                        minute: isFullPage ? "2-digit" : undefined,
                      }
                    )}
                  </span>
                </td>
                <td
                  className={`${
                    isFullPage ? "px-8 py-6" : "px-6 py-4"
                  } whitespace-nowrap`}
                >
                  <span
                    className={`${
                      isFullPage ? "text-base" : "text-sm"
                    } font-medium text-gray-900`}
                  >
                    ${booking.tier.price}
                  </span>
                </td>
                <td
                  className={`${
                    isFullPage ? "px-8 py-6" : "px-6 py-4"
                  } whitespace-nowrap`}
                >
                  <span
                    className={`flex justify-center items-center font-semibold  rounded-[12px] text-[14px]  w-24 ${getStatusClass(
                      booking.status
                    )}
                    ${isFullPage ? "sm:px-14 sm:py-2.5 px-10 py-2" : "sm:px-14 sm:py-2 px-8 py-1.5"}
                    `}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </span>
                </td>
                {isFullPage && (
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1.5 text-sm font-medium text-ocean-blue bg-ocean-blue/10 rounded-lg hover:bg-ocean-blue/20 transition-colors">
                        View
                      </button>
                      <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        Edit
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination for full page version */}
      {isFullPage && (
        <div className="px-8 py-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {Math.min(1, sortedBookings.length)} to{" "}
            {Math.min(10, sortedBookings.length)} of {sortedBookings.length}{" "}
            bookings
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-ocean-blue rounded-lg hover:bg-ocean-blue/90 disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsTable;
