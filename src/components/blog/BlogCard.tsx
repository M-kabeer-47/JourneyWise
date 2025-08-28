"use client";
import {
  MessageCircle,
  Bookmark,
  Calendar,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthorCard from "../ui/AuthorCard";
import { Blog } from "@/lib/types/blog";
import useSavePost from "@/hooks/savedPosts/useSavePost";
import { useAppSelector } from "@/hooks/redux";
import { useDeleteBlog } from "@/hooks/blog/useDeleteBlog";
import { useRouter } from "next/navigation";

const getDefaultCoverImage = (title: string) => {
  const defaults = {
    adventure:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&q=80",
    food: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&h=600&fit=crop&q=80",
    culture:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&q=80",
    nature:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80",
    city: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&q=80",
    default:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop&q=80",
  };

  const titleLower = title.toLowerCase();

  if (
    titleLower.includes("food") ||
    titleLower.includes("restaurant") ||
    titleLower.includes("cuisine")
  ) {
    return defaults.food;
  }
  if (
    titleLower.includes("mountain") ||
    titleLower.includes("nature") ||
    titleLower.includes("forest")
  ) {
    return defaults.nature;
  }
  if (
    titleLower.includes("city") ||
    titleLower.includes("urban") ||
    titleLower.includes("street")
  ) {
    return defaults.city;
  }
  if (
    titleLower.includes("culture") ||
    titleLower.includes("museum") ||
    titleLower.includes("history")
  ) {
    return defaults.culture;
  }
  if (
    titleLower.includes("adventure") ||
    titleLower.includes("hiking") ||
    titleLower.includes("climbing")
  ) {
    return defaults.adventure;
  }

  return defaults.default;
};

interface BlogCardProps {
  blog: Blog;
  isPersonal?: boolean;
  queryKey?: string;
}

export function BlogCard({
  blog: blogData,
  isPersonal = false,
  queryKey = "blogs",
}: BlogCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const { savePost, unsavePost } = useSavePost();
  const deleteBlog = useDeleteBlog();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (blogData.blog.isSaved && user?.id) {
      unsavePost.mutateAsync({ savedPostID: blogData.blog.id, queryKey });
    } else if (user?.id) {
      savePost.mutateAsync({
        postID: blogData.blog.id,
        userID: user.id,
        type: "blog",
        queryKey,
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const defaultCoverImage = getDefaultCoverImage(blogData.blog.title);

  const personalDropdownOptions = [
    {
      label: "View",
      icon: Eye,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/blog/${blogData.blog.id}`);
        setIsDropdownOpen(false);
      },
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/blog/edit/${blogData.blog.id}`);
        setIsDropdownOpen(false);
      },
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        deleteBlog.mutateAsync(blogData.blog.id);
        setIsDropdownOpen(false);
      },
      danger: true,
    },
  ];

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-ocean-blue/20 transform h-[400px]">
      {/* Cover Image with Overlay */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={blogData.blog.coverUrl || defaultCoverImage}
          alt={blogData.blog.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Actions - Personal Mode: Dropdown Menu */}
        {isPersonal && (
          <div className="absolute top-4 right-4" ref={dropdownRef}>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
            >
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-30"
                >
                  <div className="py-1">
                    {personalDropdownOptions.map((option, index) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={index}
                          onClick={option.onClick}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                            option.danger
                              ? "text-red-600 hover:bg-red-30"
                              : "text-gray-700 hover:bg-gray-30"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Actions - Public Mode: Save Button Only */}
        {!isPersonal && (
          <div className="absolute top-4 right-4">
            <button
              onClick={handleSaveToggle}
              className="p-2.5 bg-white/90 backdrop-blur-sm group rounded-full shadow-lg hover:bg-white transition-all duration-200"
            >
              {savePost.isLoading || unsavePost.isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-ocean-blue" />
              ) : blogData.blog.isSaved ? (
                <Bookmark
                  className="w-4 h-4 text-ocean-blue "
                  fill="currentColor"
                />
              ) : (
                <Bookmark className="w-4 h-4 text-gray-600 group-hover:text-ocean-blue" />
              )}
            </button>
          </div>
        )}

        {/* Author Badge on Image */}
        {!isPersonal && (
          <AuthorCard
            name={blogData.author.name}
            image={blogData.author.image}
          />
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-[800] font-raleway text-charcoal line-clamp-2 mb-4 group-hover:text-midnight-blue transition-colors duration-200 leading-tight">
          {blogData.blog.title.length > 30
            ? `${blogData.blog.title.substring(0, 30)}...`
            : blogData.blog.title}
        </h3>

        {/* Excerpt */}
        {blogData.blog.description && (
          <p className="text-sm text-charcoal line-clamp-2 mb-4">
            {blogData.blog.description.length > 50
              ? `${blogData.blog.description.substring(0, 50)}...`
              : blogData.blog.description}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4 text-xs sm:text-sm text-charcoal">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(blogData.blog.updatedAt)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4" />
                <span>{blogData.blog.commentsCount}</span>
              </div>
              {/* Status Badge for Personal Blogs */}
            </div>
            {isPersonal ? (
              <span
                className={`px-2 py-1 w-[80px] flex items-center justify-center rounded-full text-xs font-raleway font-semibold ${
                  blogData.blog.isPublished
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {blogData.blog.isPublished ? "Published" : "Draft"}
              </span>
            ) : null}
          </div>
        </div>

        {/* Read More Indicator */}
        {!isPersonal && (
          <Link href={`/blog/${blogData.blog.id}`}>
            <div className="flex items-center justify-end gap-1 text-ocean-blue text-sm font-medium mt-2">
              <span>Read more</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
