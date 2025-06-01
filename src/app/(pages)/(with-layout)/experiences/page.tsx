"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Search, ArrowRight, X, SlidersHorizontal } from "lucide-react";

// Custom Components
import { LocationSelector } from "@/components/experiences/LocationSelector";
import ExperienceFilters from "@/components/experiences/ExperienceFilters";

// App Components
import ExperienceCard from "@/components/experiences/ExperienceCard";
import ExperienceSkeleton from "@/components/skeletons/ExperienceCardSkeleton";
import Pagination from "@/components/ui/Pagination";
import SortBy from "@/components/ui/SortBy";
import useFetchExperiences from "@/hooks/useFetchExperiences";
import { Filters } from "@/lib/types/Experience";
import { Experience } from "@/lib/types/Experience";
import SearchBar from "@/components/ui/SearchBar";
// Data

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

// Tag options for filter
const tagOptions = [
  "Adventure",
  "Cultural",
  "Food",
  "Nature",
  "Relaxation",
  "Beach",
  "Mountain",
  "City",
  "Historical",
  "Wildlife",
  "Photography",
  "Hiking",
  "Family-friendly",
  "Romantic",
  "Budget",
  "Luxury",
];

const sortOptions = [
  { value: "createdAt", label: "Date Added" },
  { value: "averageRating", label: "Rating" },
  { value: "minPrice", label: "Price" },
  { value: "duration", label: "Duration" },
];

export default function ExperiencesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(searchParams);

  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(current.get("page") || "1")
  );
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filters, setFilters] = useState<Filters>({
    isAvailable: current.get("isAvailable") === "true" || true,
    minPrice: parseFloat(current.get("minPrice") || "1"),
    maxPrice: parseFloat(current.get("maxPrice") || "100000"),
    minDuration: parseInt(current.get("minDuration") || "1"),
    maxDuration: parseInt(current.get("maxDuration") || "30"),
    tags: current.get("tags")
      ? current.get("tags")!.split(",").filter(Boolean)
      : [],
    locations: current.get("locations")
      ? current.get("locations")!.split(",").filter(Boolean)
      : [],
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { experiences, isLoading, isFetching, totalPages, totalExperiences } =
    useFetchExperiences();

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleLocationChange = useCallback(
    (selectedLocations: string[]) => {
      setFilters((prev) => ({
        ...prev,
        locations: selectedLocations,
      }));
      updateQueryParams({
        locations:
          selectedLocations.length > 0 ? selectedLocations.join(",") : null,
      });
    },
    [filters.locations]
  );

  const handleSortChange = useCallback(
    (key: string, direction: "asc" | "desc") => {
      setSortBy(key);
      setSortOrder(direction === "asc" ? "asc" : "desc");

      updateQueryParams({
        sortBy: key,
        sortOrder: direction === "asc" ? "asc" : "desc",
      });
    },
    []
  );

  const handleApplyFilters = useCallback(
    (newFilters: {
      isAvailable: boolean;
      minPrice: number;
      maxPrice: number;
      minDuration: number;
      maxDuration: number;
      tags: string[];
    }) => {
      // Update filters state
      setFilters((prev) => ({
        ...prev,
        ...newFilters,
      }));

      // Update URL params
      updateQueryParams({
        isAvailable: newFilters.isAvailable ? "true" : "false",
        minPrice:
          newFilters.minPrice === 1 ? "1" : newFilters.minPrice.toString(),
        maxPrice:
          newFilters.maxPrice === 10000
            ? "10000"
            : newFilters.maxPrice.toString(),
        minDuration:
          newFilters.minDuration === 1
            ? "1"
            : newFilters.minDuration.toString(),
        maxDuration:
          newFilters.maxDuration === 30
            ? "30"
            : newFilters.maxDuration.toString(),
        tags: newFilters.tags.length > 0 ? newFilters.tags.join(",") : null,
        page: "1",
      });
    },
    []
  );

  const handlePageChange = useCallback((page: number) => {
    updateQueryParams({ page: page.toString() });
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const clearAllFilters = useCallback(() => {
    const defaultFilters = {
      isAvailable: false,
      minPrice: 1,
      maxPrice: 10000,
      minDuration: 1,
      maxDuration: 30,
      tags: [],
      locations: [],
    };

    setFilters(defaultFilters);
    setSearchValue("");

    // Clear URL parameters except for page, limit, sort

    console.log("Current: " + current);
    current.set("page", "1");
    current.set("limit", "10");

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`/experiences${query}`);
  }, [router]);

  // Update query parameters helper

  function updateQueryParams(params: Record<string, string | null>) {
    // Update or add new parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });
    // Build the new URL
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`/experiences${query}`);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      current.set("search", searchValue);
      const currentQuery = current.toString();
      const query = currentQuery ? `?${currentQuery}` : "";
      router.push(`/experiences${query}`);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-midnight-blue to-ocean-blue text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center relative top-[40px]">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-raleway font-bold mb-4">
              Discover Amazing Experiences
            </h1>
            <p className="text-xl text-blue-100 mb-4">
              Find and book unique activities led by local experts
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters Card - Full Width */}
        <div className="bg-white rounded-xl shadow-md mb-8 w-full">
          {/* Search Bar, Location selector and Sort in same div */}
          <div className="p-5 border-b border-gray-100 w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
              {/* Simple, minimal search bar */}
              <SearchBar
                searchTerm={searchValue}
                setSearchTerm={handleSearch}
              />

              {/* Full-width location selector */}
              <div className="md:col-span-4">
                <LocationSelector
                  locations={popularLocations}
                  selectedLocations={filters.locations}
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
          {(filters.tags.length > 0 || filters.locations.length > 0) && (
            <div className="px-5 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-midnight-blue font-medium">
                  Active filters:
                </span>

                {/* Location tags */}
                {filters.locations.map((location) => (
                  <div
                    key={location}
                    className="inline-flex items-center gap-1 bg-ocean-blue/20 text-green-800 text-xs px-3 py-1 rounded-full"
                  >
                    <MapPin size={12} className="text-midnight-blue" />
                    <span>
                      {popularLocations.find((loc) => loc.code === location)
                        ?.name || location}
                    </span>
                    <button
                      onClick={() => {
                        const newLocations = filters.locations.filter(
                          (loc) => loc !== location
                        );
                        handleLocationChange(newLocations);
                      }}
                      className="ml-1 rounded-full p-0.5 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}

                {/* Category/Tag tags */}
                {filters.tags.map((tag) => (
                  <div
                    key={tag}
                    className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => {
                        const newTags = filters.tags.filter((t) => t !== tag);
                        setFilters((prev) => ({ ...prev, tags: newTags }));
                        updateQueryParams({
                          tags: newTags.length > 0 ? newTags.join(",") : null,
                        });
                      }}
                      className="ml-1 hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}

                {/* Clear all filters button */}
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <span>Clear all</span>
                  <X size={12} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Toggle button for filters - only visible on mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed left-0 top-1/2 -translate-y-1/2 bg-midnight-blue text-white p-3 rounded-r-lg shadow-lg z-30 flex items-center gap-2"
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

        <div className="relative flex gap-6">
          {/* Filters Sidebar with collapsible behavior */}
          <div
            className={`
              md:w-72 flex-shrink-0 
              fixed md:static left-0 top-0 h-full md:h-auto z-20 
              transform transition-transform duration-300 ease-in-out
              ${
                sidebarOpen
                  ? "translate-x-0"
                  : "-translate-x-full md:translate-x-0"
              }
              bg-white md:bg-transparent
              border-r border-gray-200 md:border-0
            `}
          >
            <div className="p-4 md:p-0 h-full overflow-y-auto overflow-x-hidden">
              {/* Mobile close button - inside the sidebar */}
              <div className="flex justify-between items-center mb-4 md:hidden">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={toggleSidebar} className="p-1">
                  <X size={20} />
                </button>
              </div>

              <ExperienceFilters
                initialValues={{
                  isAvailable: filters.isAvailable,
                  minPrice: filters.minPrice,
                  maxPrice: filters.maxPrice,
                  minDuration: filters.minDuration,
                  maxDuration: filters.maxDuration,
                  tags: filters.tags,
                }}
                tagOptions={tagOptions}
                onApplyFilters={(newFilters) => {
                  handleApplyFilters(newFilters);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
                onClearFilters={clearAllFilters}
              />
            </div>
          </div>

          {/* Overlay to close sidebar on mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
              onClick={toggleSidebar}
            ></div>
          )}

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {totalExperiences > 0 ? (
                  <>
                    Found{" "}
                    <span className="font-medium text-gray-900">
                      {totalExperiences}
                    </span>{" "}
                    experiences
                  </>
                ) : (
                  <>No experiences found with your current filters</>
                )}
              </div>

              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages || 1}
              </div>
            </div>

            {/* Results Grid */}
            {isLoading || isFetching ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <ExperienceSkeleton key={i} />
                  ))}
              </div>
            ) : experiences.length === 0 ? (
              <div className="bg-white rounded-xl p-10 text-center border border-gray-200 shadow-sm">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No experiences found
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
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {experiences.map((experience: Experience) => (
                  <motion.div
                    key={experience.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ExperienceCard experience={experience} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="mt-12 flex justify-center ">
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
