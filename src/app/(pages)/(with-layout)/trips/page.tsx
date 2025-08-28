"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { X, SlidersHorizontal, Route } from "lucide-react";
import { LocationSelector } from "@/components/experiences/LocationSelector";
import TripFilters from "@/components/trips/TripFilters";
import TripCard from "@/components/trips/TripCard";
import TripSkeleton from "@/components/trips/TripSkeleton";
import Pagination from "@/components/ui/Pagination";
import SortBy from "@/components/ui/SortBy";
import SearchBar from "@/components/ui/SearchBar";
import { TripFilters as TripFiltersType } from "@/lib/types/trip";
import { Trip } from "@/lib/types/trip";
import useFetchTrips from "@/hooks/trips/useFetchTrips";

// Popular locations for country selector
const popularLocations = [
  { name: "United States", code: "US" },
  { name: "Japan", code: "JP" },
  { name: "United Kingdom", code: "GB" },
  { name: "France", code: "FR" },
  { name: "Italy", code: "IT" },
  { name: "Spain", code: "ES" },
  { name: "Australia", code: "AU" },
  { name: "Canada", code: "CA" },
  { name: "Germany", code: "DE" },
  { name: "Brazil", code: "BR" },
  { name: "Mexico", code: "MX" },
  { name: "Thailand", code: "TH" },
  { name: "Indonesia", code: "ID" },
  { name: "Turkey", code: "TR" },
  { name: "Greece", code: "GR" },
  { name: "Egypt", code: "EG" },
  { name: "Pakistan", code: "PK" },
  { name: "India", code: "IN" },
  { name: "China", code: "CN" },
  { name: "Morocco", code: "MA" },
];

// Currency options for filter

// Budget ranges for filter
const budgetRanges = [
  { label: "Under $500", min: 0, max: 500 },
  { label: "$500 - $1,000", min: 500, max: 1000 },
  { label: "$1,000 - $2,500", min: 1000, max: 2500 },
  { label: "$2,500 - $5,000", min: 2500, max: 5000 },
  { label: "$5,000 - $10,000", min: 5000, max: 10000 },
  { label: "$10,000+", min: 10000, max: 100000 },
];

const sortOptions = [
  { value: "createdAt", label: "Date Created" },
  { value: "updatedAt", label: "Last Updated" },
  { value: "estimatedBudget", label: "Budget" },
  { value: "numOfPeople", label: "Group Size" },
  { value: "estimatedDistance", label: "Distance" },
];

export default function TripsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(searchParams);

  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(current.get("page") || "1")
  );
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filters, setFilters] = useState<TripFiltersType>({
    minBudget: parseFloat(current.get("minBudget") || "0"),
    maxBudget: parseFloat(current.get("maxBudget") || "100000"),
    minGroupSize: parseInt(current.get("minGroupSize") || "1"),
    maxGroupSize: parseInt(current.get("maxGroupSize") || "20"),
    minDistance: parseInt(current.get("minDistance") || "0"),
    maxDistance: parseInt(current.get("maxDistance") || "10000"),
    currencies: current.get("currencies")
      ? current.get("currencies")!.split(",").filter(Boolean)
      : [],
    waypoints: current.get("waypoints")
      ? current.get("waypoints")!.split(",").filter(Boolean)
      : [],
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Use the actual hook
  const { trips, isLoading, isFetching, totalPages, totalTrips } =
    useFetchTrips();

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleLocationChange = 
    (selectedLocations: string[]) => {
      setFilters((prev) => ({
        ...prev,
        waypoints: selectedLocations,
      }));
      updateQueryParams({
        waypoints:
          selectedLocations.length > 0 ? selectedLocations.join(",") : null,
      });
    }

  const handleSortChange = 
    (key: string, direction: "asc" | "desc") => {
      setSortBy(key);
      setSortOrder(direction === "asc" ? "asc" : "desc");

      updateQueryParams({
        sortBy: key,
        sortOrder: direction === "asc" ? "asc" : "desc",
      });
    }

  const handleApplyFilters = (newFilters: TripFiltersType) => {
    setFilters(newFilters);

    updateQueryParams({
      minBudget:
        newFilters.minBudget === 0 ? "0" : newFilters.minBudget.toString(),
      maxBudget:
        newFilters.maxBudget === 100000
          ? "100000"
          : newFilters.maxBudget.toString(),
      minGroupSize:
        newFilters.minGroupSize === 1
          ? "1"
          : newFilters.minGroupSize.toString(),
      maxGroupSize:
        newFilters.maxGroupSize === 20
          ? "20"
          : newFilters.maxGroupSize.toString(),
      minDistance:
        newFilters.minDistance === 0 ? "0" : newFilters.minDistance.toString(),
      maxDistance:
        newFilters.maxDistance === 10000
          ? "10000"
          : newFilters.maxDistance.toString(),
      currencies:
        newFilters.currencies.length > 0
          ? newFilters.currencies.join(",")
          : null,
      waypoints:
        newFilters.waypoints.length > 0 ? newFilters.waypoints.join(",") : null,
      page: "1",
    });
  } 

  const handlePageChange = (page: number) => {
    updateQueryParams({ page: page.toString() });
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const clearAllFilters = () => {
    const defaultFilters = {
      minBudget: 0,
      maxBudget: 100000,
      minGroupSize: 1,
      maxGroupSize: 20,
      minDistance: 0,
      maxDistance: 10000,
      currencies: [],
      waypoints: [],
    };

    setFilters(defaultFilters);
    setSearchValue("");

    Array.from(current.keys()).forEach((key) => current.delete(key));
    let query = current.toString();
    router.push(`/trips${query}`);
  }

  function updateQueryParams(params: Record<string, string | null>) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`/trips${query}`);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      current.set("search", searchValue);
      const currentQuery = current.toString();
      const query = currentQuery ? `?${currentQuery}` : "";
      router.push(`/trips${query}`);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    if(sidebarOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-16">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center bg-gradient-to-r from-midnight-blue to-ocean-blue text-white h-[300px] sm:h-auto top-[70px] sm:top-[70px] mb-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center relative ">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-raleway">
              Explore Amazing
              <span className="text-accent"> Trips</span>
            </h1>
            <p className="text-base text-blue-100 mb-4">
              Discover and plan incredible journeys created by fellow travelers
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters Card */}
        <div className="bg-white rounded-xl shadow-md mb-8 w-full">
          <div className="p-5 border-b border-gray-100 w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
              {/* Search Bar */}
              <div className="md:col-span-5">
                <SearchBar
                  searchTerm={searchValue}
                  setSearchTerm={handleSearch}
                  placeholder="Search trips by destination, waypoints..."
                />
              </div>

              {/* Location Selector */}
              <div className="md:col-span-4">
                <LocationSelector
                  locations={popularLocations}
                  selectedLocations={filters.waypoints}
                  onChange={handleLocationChange}
                />
              </div>

              {/* Sort By */}
              <div className="md:col-span-3">
                <div className="w-full">
                  <SortBy
                    options={sortOptions}
                    activeSort={{
                      value: sortBy,
                      direction: sortOrder === "asc" ? "asc" : "desc",
                    }}
                    onSortChange={handleSortChange}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters Tags */}
        </div>

        {/* Toggle button for filters - mobile */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden fixed left-0 top-1/2 -translate-y-1/2 bg-midnight-blue text-white p-3 rounded-r-lg shadow-lg z-30 flex items-center gap-2"
        >
          {sidebarOpen ? (
            <>
              <X size={16} />
              <span className="text-sm">Close</span>
            </>
          ) : (
            <>
              <SlidersHorizontal size={16} />
              <span className="text-sm">Filters</span>
            </>
          )}
        </button>

        <div className="relative flex gap-6  w-full">
          {/* Filters Sidebar */}
          <div
            className={`
              md:w-72 flex-shrink-0 
              fixed lg:static lg:w-[15%] left-0 top-0 h-full overflow-y-auto lg:h-auto z-20 
              transform transition-transform duration-300 ease-in-out 
              ${
                sidebarOpen
                  ? "translate-x-0"
                  : "-translate-x-full lg:translate-x-0"
              }
              bg-white lg:bg-transparent
              border-r border-gray-200 lg:border-0
            `}
          >
            <div className="md:p-0 h-full overflow-y-auto overflow-x-hidden relative top-[80px] lg:top-0">
              <TripFilters
                initialValues={filters}
                onApplyFilters={(newFilters) => {
                  handleApplyFilters(newFilters);
                  if (window.innerWidth < 1100) setSidebarOpen(false);
                }}
                onClearFilters={clearAllFilters}
              />
            </div>
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
              onClick={toggleSidebar}
            ></div>
          )}

          {/* Main Content Area */}
          <div className="lg:w-[85%] w-full">
            {/* Results Count */}
            <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {totalTrips > 0 ? (
                  <>
                    Found{" "}
                    <span className="font-medium text-gray-900 font-inter">
                      {totalTrips}
                    </span>{" "}
                    trips
                  </>
                ) : (
                  <>No trips found with your current filters</>
                )}
              </div>

              <div className="text-sm text-gray-500 font-inter">
                Page {currentPage} of {totalPages || 1}
              </div>
            </div>

            {/* Results Grid */}
            {isLoading || isFetching ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 min-[1919px]:grid-cols-4 min-[2400px]:grid-cols-5 gap-6">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <TripSkeleton key={i} />
                  ))}
              </div>
            ) : trips.length === 0 ? (
              <div className="bg-white rounded-xl p-10 text-center border border-gray-200 shadow-sm">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Route className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2 font-raleway">
                  No trips found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-midnight-blue text-white font-medium rounded-lg hover:bg-midnight-blue/90 transition-colors shadow-sm"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 min-[1919px]:grid-cols-4 min-[2400px]:grid-cols-5 gap-6"
              >
                {trips.map((trip: Trip) => (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <TripCard trip={trip} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
