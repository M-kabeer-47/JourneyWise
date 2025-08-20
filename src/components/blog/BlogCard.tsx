"use client";
import {
  MessageCircle,
  Bookmark,
  BookmarkCheck,
  Calendar,
  User,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogCardProps {
  blog: {
    blog: {
      id: string;
      title: string;
      content: string;
      coverUrl?: string;
      isPublished: boolean;
      authorID: string;
      createdAt: string;
      updatedAt: string;
      commentsCount: number;
    };
    author: {
      name: string;
      image?: string;
    };
  };
  isPersonal?: boolean;
  onSave?: (blogId: string) => void;
  onUnsave?: (blogId: string) => void;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

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

export function BlogCard({
  blog: blogData,
  isPersonal = false,
  onSave,
  onUnsave,
  onView,
  onEdit,
  onDelete,
}: BlogCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    if (isSaved) {
      onUnsave?.(blogData.blog.id);
      setIsSaved(false);
    } else {
      onSave?.(blogData.blog.id);
      setIsSaved(true);
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
        onView?.(blogData.blog.id);
        setIsDropdownOpen(false);
      },
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onEdit?.(blogData.blog.id);
        setIsDropdownOpen(false);
      },
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onDelete?.(blogData.blog.id);
        setIsDropdownOpen(false);
      },
      danger: true,
    },
  ];

  return (
    <Link href={`/blog/${blogData.blog.id}`}>
      <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-ocean-blue/20 transform">
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
                    className="absolute right-0 top-12 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
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
                                ? "text-red-600 hover:bg-red-50"
                                : "text-gray-700 hover:bg-gray-50"
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
                className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
              >
                {isSaved ? (
                  <Bookmark className="w-4 h-4 text-ocean-blue" fill="currentColor" />
                ) : (
                  <Bookmark className="w-4 h-4 text-gray-600" />
                )}
              </button>
            </div>
          )}

          {/* Author Badge on Image */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
            <div className="relative w-6 h-6 rounded-full overflow-hidden">
              {blogData.author.image ? (
                <Image
                  src={blogData.author.image}
                  alt={blogData.author.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-ocean-blue flex items-center justify-center text-white text-xs font-medium">
                  {blogData.author.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <span className="text-xs font-medium text-gray-700">
              {blogData.author.name}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-4 group-hover:text-midnight-blue transition-colors duration-200 leading-tight">
            {blogData.blog.title.length > 30 ? (
              <>{blogData.blog.title.slice(0, 30)}...</>
            ) : (
              <>{blogData.blog.title}</>
            )}
          </h3>

          {/* Meta Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(blogData.blog.updatedAt)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4" />
                <span>{blogData.blog.commentsCount}</span>
              </div>
            </div>

            {/* Read More Indicator */}
            <div className="flex items-center gap-1 text-ocean-blue text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
          </div>
        </div>
      </div>
    </Link>
  );
}
