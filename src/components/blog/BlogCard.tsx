"use client";
import {
  MessageCircle,
  Bookmark,
  BookmarkCheck,
  Calendar,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    coverUrl?: string;
    author: {
      name: string;
      avatar?: string;
    };
    publishedAt: string;
    commentsCount: number;
    isSaved?: boolean;
  };
  onSave?: (blogId: string) => void;
  onUnsave?: (blogId: string) => void;
}

export function BlogCard({ blog, onSave, onUnsave }: BlogCardProps) {
  const [isSaved, setIsSaved] = useState(blog.isSaved || false);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      onUnsave?.(blog.id);
      setIsSaved(false);
    } else {
      onSave?.(blog.id);
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

  // Travel-themed default blog cover
  const defaultCoverImage =
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop&q=80";

  return (
    <Link href={`/blog/${blog.id}`}>
      <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-ocean-blue/20 transform hover:-translate-y-1">
        {/* Cover Image with Overlay */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={blog.coverUrl || defaultCoverImage}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Save Button Overlay */}
          <button
            onClick={handleSaveToggle}
            className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
          >
            {isSaved ? (
              <BookmarkCheck className="w-4 h-4 text-ocean-blue" />
            ) : (
              <Bookmark className="w-4 h-4 text-gray-600 hover:text-ocean-blue" />
            )}
          </button>

          {/* Author Badge on Image */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
            <div className="relative w-6 h-6 rounded-full overflow-hidden">
              {blog.author.avatar ? (
                <Image
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-ocean-blue flex items-center justify-center text-white text-xs font-medium">
                  {blog.author.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <span className="text-xs font-medium text-gray-700">
              {blog.author.name}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-4 group-hover:text-midnight-blue transition-colors duration-200 leading-tight">
            {blog.title}
          </h3>

          {/* Meta Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(blog.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4" />
                <span>{blog.commentsCount}</span>
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
