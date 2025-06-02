"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Plus, Search } from "lucide-react";
import Pagination from "@/components/ui/Pagination";
import SearchBar from "@/components/ui/SearchBar";
import SortBy from "@/components/ui/SortBy";
import ExperienceGrid from "@/components/experiences/ExperienceGrid";
import useFetchExperiences from "@/hooks/useFetchExperiences";
import { Skeleton } from "@/components/ui/skeleton";

export default function AgentExperiences() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(searchParams);

  // State for search and sort
  const [searchTerm, setSearchTerm] = useState(current.get("search") || "");
  const [currentPage, setCurrentPage] = useState(
    parseInt(current.get("page") || "1")
  );
  const [sortBy, setSortBy] = useState(current.get("sortBy") || "createdAt");
  const [sortOrder, setSortOrder] = useState(
    current.get("sortOrder") || "desc"
  );

  // Use the same fetch hook as experiences page
  const { experiences, isLoading, isFetching, totalPages, totalExperiences } =
    useFetchExperiences();

  // Sort options
  const sortOptions = [
    { value: "createdAt", label: "Date Created" },
    { value: "averageRating", label: "Rating" },
    { value: "minPrice", label: "Price" },
    { value: "duration", label: "Duration" },
  ];

  // Handle sort change
  const handleSortChange = useCallback(
    (key: string, direction: "asc" | "desc") => {
      setSortBy(key);
      setSortOrder(direction);

      updateQueryParams({
        sortBy: key,
        sortOrder: direction,
      });
    },
    []
  );

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    updateQueryParams({ page: page.toString() });
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Handle search
  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    updateQueryParams({ search: value || null, page: "1" });
  }, []);

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    updateQueryParams({ search: null, page: "1" });
  };

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
    router.push(`/agent/experiences${query}`);
  }

  return (
    <div className="min-h-screen bg-light-gray flex flex-col font-sans">
      {/* Main content */}
      <main className="flex-1 pt-16 pb-10">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-midnight-blue to-ocean-blue text-white">
          <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-raleway font-bold tracking-tight">
                  Your Experiences
                </h1>
                <p className="mt-2 text-blue-100">
                  Manage, edit, and track all your travel experiences
                </p>
              </div>
              <Link
                href="/agent/experiences/create"
                className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-white text-midnight-blue font-medium rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
              >
                <Plus size={18} className="mr-2" />
                Create Experience
              </Link>
            </div>

            {/* Stats Overview */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm font-medium text-blue-100">Total</p>
                {isLoading || isFetching ? (
                  <Skeleton className="mt-1 w-[100px] h-10 bg-white/40" />
                ) : (
                  <p className="mt-1 text-2xl font-bold">
                    {totalExperiences || 0}
                  </p>
                )}
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm font-medium text-blue-100">Available</p>
                {isLoading || isFetching ? (
                  <Skeleton className="w-[100px] h-10 bg-white/40 mt-1" />
                ) : (
                  <p className="mt-1 text-2xl font-bold">
                    {(experiences &&
                      experiences.filter((exp) => exp.isAvailable).length) ||
                      0}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className=" px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and sort section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Search component */}
              <div className="flex-1">
                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={handleSearch}
                  placeholder="Search experiences..."
                />
              </div>

              {/* Sort component */}
              <div className="md:w-64">
                <SortBy
                  options={sortOptions}
                  activeSort={{
                    value: sortBy,
                    direction: sortOrder as "asc" | "desc",
                  }}
                  onSortChange={handleSortChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              {!isLoading && (
                <>
                  Showing{" "}
                  <span className="font-medium text-gray-900">
                    {experiences.length === 0 ? 0 : (currentPage - 1) * 9 + 1}-
                    {Math.min(currentPage * 9, totalExperiences || 0)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-gray-900">
                    {totalExperiences || 0}
                  </span>{" "}
                  experiences
                </>
              )}
            </p>
          </div>

          {/* Experience grid */}
          <ExperienceGrid
            experiences={experiences}
            isLoading={isLoading}
            isAgent={true} // Set to true for agent mode
            emptyMessage="No experiences found. Create your first experience!"
            onClearFilters={searchTerm ? clearSearch : undefined}
          />

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
