"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Search, ArrowRight } from "lucide-react";

// Custom Components
import { LocationSelector } from "@/components/experiences/LocationSelector";
import ExperienceFilters from "@/components/experiences/ExperienceFilters";

// App Components
import ExperienceCard from "@/components/home/experiences/ExperienceCard";
import ExperienceSkeleton from "@/components/skeletons/ExperienceCardSkeleton";
import Pagination from "@/components/ui/Pagination";
import SortBy from "@/components/ui/SortBy";
import useFetchExperiences from "@/lib/hooks/useFetchExperiences";
import { Filters } from "@/lib/types/experiences/Filters";
import { Experience } from "@/lib/types/experiences/Experience";
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
  { value: "minPrice", label: "Price: Low to High" },
  { value: "maxPrice", label: "Price: High to Low" },
  { value: "duration", label: "Duration" },
];

export default function ExperiencesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(searchParams);



  const [currentPage, setCurrentPage] = useState<number>(parseInt(current.get('page') || "1"))
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filters, setFilters] = useState<Filters>({
    isAvailable: true,
    minPrice: 1,
    maxPrice: 10000,
    minDuration: 1,
    maxDuration: 30,
    tags: [],
    locations: [],
  });
  
  

  // Filter form state

  const { experiences, isLoading, isFetching, totalPages, totalExperiences } =
    useFetchExperiences();

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

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
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const clearTag = useCallback(
    (tag: string) => {
      const newTags = filters.tags.filter((t) => t !== tag);
      setFilters((prev) => ({
        ...prev,
        tags: newTags,
      }));

      updateQueryParams({
        tags: newTags.length > 0 ? newTags.join(",") : null,
      });
    },
    [filters.tags]
  );

  // const clearLocation = useCallback((location: string) => {
  //   const newLocations = filters.locations.filter(l => l !== location);
  //   setFilters(prev => ({
  //     ...prev,
  //     locations: newLocations
  //   }));

  //   updateQueryParams({
  //     locations: newLocations.length > 0 ? newLocations.join(',') : null
  //   });
  // }, [filters.locations]);

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
    const current = new URLSearchParams(searchParams);

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
      let current = new URLSearchParams(searchParams);
      current.set("search", searchValue);
      const currentQuery = current.toString();
      const query = currentQuery ? `?${currentQuery}` : "";
      router.push(`/experiences${query}`);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    alert("Total Pages: " + totalPages);
  }, [totalPages]);

  // Calculate total pages

  // Show active filters
  const renderActiveFilters = () => {
    const hasActiveFilters =
      filters.isAvailable ||
      filters.minPrice > 1 ||
      filters.maxPrice < 10000 ||
      filters.minDuration > 1 ||
      filters.maxDuration < 30 ||
      filters.tags.length > 0;
    // filters.locations.length > 0;

    if (!hasActiveFilters) return null;

    return (
      <div className="flex flex-wrap gap-2 items-center pt-3 mt-2 border-t border-gray-100">
        {filters.tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center bg-midnight-blue/10 text-midnight-blue rounded-full py-1 pl-3 pr-1.5 text-xs font-medium"
          >
            <span>{tag}</span>
            <button
              onClick={() => clearTag(tag)}
              className="ml-1 p-0.5 rounded-full hover:bg-midnight-blue/20"
              type="button"
            >
              <span>×</span>
            </button>
          </div>
        ))}

        {/* {filters.locations.map(location => (
          <div 
            key={location} 
            className="flex items-center bg-midnight-blue/10 text-midnight-blue rounded-full py-1 pl-3 pr-1.5 text-xs font-medium"
          >
            <span>{location}</span>
            <button 
              onClick={() => clearLocation(location)}
              className="ml-1 p-0.5 rounded-full hover:bg-midnight-blue/20"
              type="button"
            >
              <span>×</span>
            </button>
          </div>
        ))} */}

        {(filters.isAvailable ||
          filters.minPrice > 1 ||
          filters.maxPrice < 10000 ||
          filters.minDuration > 1 ||
          filters.maxDuration < 30) && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-midnight-blue font-medium hover:underline"
            type="button"
          >
            Clear all filters
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-midnight-blue to-ocean-blue text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
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
              <div className="md:col-span-5 relative flex items-center">
                <input
                  type="search"
                  placeholder="Search experiences..."
                  value={searchValue}
                  onChange={(e) => handleSearch(e.target.value)}
                  // onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="block w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-ocean-blue"
                />
                <Search className="absolute right-2 top-3 h-6 w-6 text-gray-400 " />
              </div>

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

            {/* Active filters */}
            {renderActiveFilters()}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar - Now using the new ExperienceFilters component */}
          <div className="md:w-72 flex-shrink-0">
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
              onApplyFilters={handleApplyFilters}
              onClearFilters={clearAllFilters}
            />
          </div>

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
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
