"use client";
import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Compass, Map, Sparkles } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogCardSkeleton } from "@/components/skeletons/BlogCardSkeleton";
import SearchBar from "@/components/ui/SearchBar";
import SortBy from "@/components/ui/SortBy";
import Pagination from "@/components/ui/Pagination";
import { useFetchBlogs } from "@/hooks/blog/useFetchBlogs";

const sortOptions = [
  { value: "updatedAt", label: "Latest" },
  { value: "commentsCount", label: "Most Discussed" },
];

export default function BlogsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(searchParams);

  const [currentPage, setCurrentPage] = useState(
    Number(current.get("page")) || 1
  );
  const [searchValue, setSearchValue] = useState(current.get("search") || "");
  const [sortBy, setSortBy] = useState<"updatedAt" | "commentsCount">(
    (current.get("sortBy") as "updatedAt" | "commentsCount") || "updatedAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    (current.get("order") as "asc" | "desc") || "desc"
  );

  // Fetch blogs using your hook
  const { data, isLoading, isFetching } = useFetchBlogs();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateQueryParams({ page: page.toString() });
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleSortChange = useCallback(
    (key: string, direction: "asc" | "desc") => {
      setSortBy(key as "updatedAt" | "commentsCount");
      setSortOrder(direction);
      setCurrentPage(1); // Reset to first page when sorting
      updateQueryParams({
        sortBy: key,
        order: direction,
        page: "1",
      });
    },
    []
  );

  const updateQueryParams = (params: Record<string, string | null>) => {
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === "") {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`/blogs${query}`);
  };

  const handleSaveBlog = (blogId: string) => {
    console.log("Save blog:", blogId);
    // TODO: Implement save functionality
  };

  const handleUnsaveBlog = (blogId: string) => {
    console.log("Unsave blog:", blogId);
    // TODO: Implement unsave functionality
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when searching
      updateQueryParams({ search: searchValue || null, page: "1" });
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchValue]);
  // Client-side filtering and sorting (since your API doesn't handle these yet)

  return (
    <div className="min-h-screen bg-gray-50 pb-[200px]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-midnight-blue to-ocean-blue text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-ocean-blue/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">
                  Travel Stories & Adventures
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Discover Amazing
              <span className="block text-transparent text-accent">
                Travel Stories
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Explore inspiring travel tales, hidden gems, and expert tips from
              adventurers around the globe
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center justify-center gap-8 text-sm"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                <span>
                  {isLoading
                    ? "Loading..."
                    : `${data.blogs?.length || 0}+ Stories`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-accent" />
                <span>Expert Tips</span>
              </div>
              <div className="flex items-center gap-2">
                <Map className="w-5 h-5 text-accent" />
                <span>Hidden Gems</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Search and Sort Controls */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="w-full lg:w-[75%]">
              <SearchBar
                searchTerm={searchValue}
                setSearchTerm={handleSearch}
                placeholder="Search stories, authors..."
              />
            </div>

            {/* Sort Controls */}
            <div className="w-full lg:w-[25%]">
              <SortBy
                options={sortOptions}
                activeSort={{
                  value: sortBy,
                  direction: sortOrder,
                }}
                onSortChange={handleSortChange}
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>
              {isLoading ? (
                "Loading stories..."
              ) : (
                <>
                  {data.blogs.length}{" "}
                  {data.blogs.length === 1 ? "story" : "stories"} found
                </>
              )}
              {isFetching && !isLoading && (
                <span className="ml-2 text-ocean-blue">(Updating...)</span>
              )}
            </span>
            {searchValue && !isLoading && (
              <span>
                Searching for:{" "}
                <span className="font-medium text-midnight-blue">
                  "{searchValue}"
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {Array.from({ length: 9 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))}
          </motion.div>
        ) : data.blogs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {data.blogs.map((blog, index) => (
              <motion.div
                key={blog.blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <BlogCard
                  blog={blog}
                  onSave={handleSaveBlog}
                  onUnsave={handleUnsaveBlog}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No stories found
            </h3>
            <p className="text-gray-600 mb-8 text-sm max-w-md mx-auto">
              {searchValue
                ? `No stories match your search for "${searchValue}". Try different keywords or browse all stories.`
                : "No travel stories have been published yet. Check back soon for amazing adventures!"}
            </p>
            {searchValue && (
              <button
                onClick={() => handleSearch("")}
                className="px-6 py-3 bg-midnight-blue text-white font-medium rounded-lg hover:bg-midnight-blue/90 transition-colors shadow-lg text-sm"
              >
                View All Stories
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Pagination - Only show if we have data and it's not loading */}
      {!isLoading && data.blogs.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={data?.pagination.pages} // Calculate based on filtered results
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
