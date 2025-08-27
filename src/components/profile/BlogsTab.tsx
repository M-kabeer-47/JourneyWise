import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit3 } from "lucide-react";
import Tabs from "./Tabs";
import NoData from "./NoData";
import SortBy from "@/components/ui/SortBy";
import Pagination from "@/components/ui/Pagination";
import { useFetchUserBlogs } from "@/hooks/blog/useFetchUserBlogs";
import { BlogCardSkeleton } from "@/components/skeletons/BlogCardSkeleton";
import { BlogCard } from "../blog/BlogCard";
import { Blog } from "@/lib/types/blog";

interface BlogsTabProps {
  userID: string;
}

export default function BlogsTab({ userID }: BlogsTabProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<{
    value: string;
    direction: "asc" | "desc";
  }>({
    value: "updatedAt",
    direction: "desc",
  });

  const { blogs, isFetchingBlogs, isBlogsError, pagination } = useFetchUserBlogs({
    userID,
    sortColumn: sortBy.value,
    sortOrder: sortBy.direction,
    type: activeTab as "all" | "published" | "draft",
    page: currentPage
  });

  // Reset to page 1 when filters change
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string, direction: "asc" | "desc") => {
    setSortBy({ value, direction });
    setCurrentPage(1);
  };

  if (isBlogsError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading blogs. Please try again.</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-[800] font-raleway text-midnight-blue mb-2">
            My Blogs
          </h2>
          <p className="text-charcoal sm:text-sm text-xs">
            Share your travel experiences and insights
          </p>
        </div>
        <button className="relative sm:text-sm text-xs flex items-center gap-2 px-3 w-[110px] sm:w-[120px] py-2  bg-midnight-blue text-white rounded-md hover:shadow-lg transition-all">
          Write Blog
          <Edit3 className="absolute sm:w-5 sm:h-5 h-4 w-4 right-3" />
        </button>
      </div>

      {/* Tabs and SortBy in the same row */}
      <div className="flex justify-between mb-8">
        <Tabs
          options={[
            { key: "all", label: "All" },
            { key: "published", label: "Published" },
            { key: "drafts", label: "Drafts" },
          ]}
          activeKey={activeTab}
          onChange={handleTabChange}
          className="w-[450px]"
        />
        <SortBy
          activeSort={sortBy}
          onSortChange={handleSortChange}
          options={[{ value: "updatedAt", label: "Last Updated" }, { value: "mostDiscussed", label: "Most Discussed" }]}
          size="small"
        />
      </div>

      {isFetchingBlogs ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(5)].map((_, i) => (
            <BlogCardSkeleton key={i} isPersonal={true}/>
          ))}
        </div>
      ) : blogs?.length === 0 ? (
        <NoData
          title={`No ${activeTab} blogs yet`}
          description={
            activeTab === "published"
              ? "Start writing and share your travel stories with the community."
              : "Save your ideas as drafts and publish when ready."
          }
          icon={
            <Edit3 className="sm:w-12 sm:h-12 w-10 h-10 text-midnight-blue" />
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {blogs?.map((blog:Blog) => (
              <BlogCard key={blog.blog.id} blog={blog} isPersonal={true} />
            ))}
          </div>
          
          {pagination && pagination.pages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={pagination.pages}
                onPageChange={setCurrentPage}
                className="justify-center"
              />
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
