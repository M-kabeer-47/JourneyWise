"use client";
import { useState, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Compass, Map, Sparkles } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import SearchBar from "@/components/ui/SearchBar";
import SortBy from "@/components/ui/SortBy";

// Sample data with travel-themed blogs
const sampleBlogs = [
  {
    id: "1",
    title: "Hidden Waterfalls of Iceland: A Photographer's Dream Journey",
    coverUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80",
    author: {
      name: "Elena Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop",
    },
    publishedAt: "2024-01-15",
    commentsCount: 34,
    isSaved: false,
  },
  {
    id: "2",
    title: "Street Food Adventures: Exploring Bangkok's Night Markets",
    coverUrl:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&h=600&fit=crop&q=80",
    author: {
      name: "Marcus Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    },
    publishedAt: "2024-01-12",
    commentsCount: 28,
    isSaved: true,
  },
  {
    id: "3",
    title: "Solo Backpacking Through the Scottish Highlands: Lessons Learned",
    // No coverUrl - will use default travel image
    author: {
      name: "Sarah MacLeod",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    },
    publishedAt: "2024-01-10",
    commentsCount: 45,
    isSaved: false,
  },
  {
    id: "4",
    title: "The Art of Slow Travel: Why Less Is More in Modern Tourism",
    coverUrl:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d68bc7?w=800&h=600&fit=crop&q=80",
    author: {
      name: "Alessandro Rossi",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    },
    publishedAt: "2024-01-08",
    commentsCount: 52,
    isSaved: false,
  },
  {
    id: "5",
    title: "Digital Nomad Life: Working from Bali's Rice Terraces",
    coverUrl:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop&q=80",
    author: {
      name: "Jake Morrison",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    },
    publishedAt: "2024-01-05",
    commentsCount: 19,
    isSaved: true,
  },
  {
    id: "6",
    title: "Sustainable Tourism: How to Travel Responsibly in 2024",
    coverUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&q=80",
    author: {
      name: "Dr. Priya Sharma",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    },
    publishedAt: "2024-01-03",
    commentsCount: 67,
    isSaved: false,
  },
];

const sortOptions = [
  { value: "date", label: "Latest" },
  { value: "comments", label: "Most Discussed" },
  { value: "trending", label: "Trending" },
];

export default function BlogsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(searchParams);

  const [searchValue, setSearchValue] = useState(current.get("search") || "");
  const [sortBy, setSortBy] = useState<"date" | "comments" | "trending">(
    (current.get("sort") as "date" | "comments" | "trending") || "date"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    (current.get("order") as "asc" | "desc") || "desc"
  );

  // Filter and sort blogs
  const filteredAndSortedBlogs = useMemo(() => {
    let filtered = sampleBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        blog.author.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      } else if (sortBy === "comments") {
        return sortOrder === "desc"
          ? b.commentsCount - a.commentsCount
          : a.commentsCount - b.commentsCount;
      }
      return 0;
    });
  }, [searchValue, sortBy, sortOrder]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    updateQueryParams({ search: value || null });
  };

  const handleSortChange = useCallback(
    (key: string, direction: "asc" | "desc") => {
      setSortBy(key as "date" | "comments" | "trending");
      setSortOrder(direction);
      updateQueryParams({
        sort: key,
        order: direction,
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
  };

  const handleUnsaveBlog = (blogId: string) => {
    console.log("Unsave blog:", blogId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                <Sparkles className="w-4 h-4 text-yellow-300" />
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
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
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
                <BookOpen className="w-5 h-5 text-yellow-300" />
                <span>{sampleBlogs.length}+ Stories</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-yellow-300" />
                <span>Expert Tips</span>
              </div>
              <div className="flex items-center gap-2">
                <Map className="w-5 h-5 text-yellow-300" />
                <span>Hidden Gems</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Search and Sort Controls */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="w- lg:w-[75%]">
              <SearchBar
                searchTerm={searchValue}
                setSearchTerm={handleSearch}
                placeholder="Search stories, authors..."
              />
            </div>

            {/* Sort Controls */}
            <div className="w-full lg:w-[25%] ">
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
              {filteredAndSortedBlogs.length}{" "}
              {filteredAndSortedBlogs.length === 1 ? "story" : "stories"} found
            </span>
            {searchValue && (
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredAndSortedBlogs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8"
          >
            {filteredAndSortedBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
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
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchValue
                ? `No stories match your search for "${searchValue}". Try different keywords or browse all stories.`
                : "No travel stories have been published yet. Check back soon for amazing adventures!"}
            </p>
            {searchValue && (
              <button
                onClick={() => handleSearch("")}
                className="px-6 py-3 bg-midnight-blue text-white font-medium rounded-lg hover:bg-midnight-blue/90 transition-colors shadow-lg"
              >
                View All Stories
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
