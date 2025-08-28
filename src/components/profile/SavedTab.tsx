import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import Tabs from "./Tabs";
import NoData from "./NoData";
import SortBy from "@/components/ui/SortBy";
import Pagination from "@/components/ui/Pagination";
import SavedItemSkeleton from "./SavedItemSkeleton";
import useFetchSavedPosts from "@/hooks/savedPosts/useFetchSavedPosts";
import ExperienceCard from "../experiences/ExperienceCard";
import TripCard from "../trips/TripCard";
import { BlogCard } from "../blog/BlogCard";
interface SavedTabProps {
  userID: string;
}

export default function SavedTab({ userID }: SavedTabProps) {
  const [activeType, setActiveType] = useState<
    "blog" | "trip" | "experience"
  >("experience");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<{
    value: string;
    direction: "asc" | "desc";
  }>({
    value: "createdAt",
    direction: "desc",
  });

  const sortOptions = [{ value: "createdAt", label: "Date Saved" }];

  const { savedPosts, isFetchingSavedPosts, isSavedPostsError, pagination } =
    useFetchSavedPosts({
      userID,
      type: activeType,
      sortColumn: sortBy.value,
      sortOrder: sortBy.direction,
      page: currentPage,
    });

  const handleTypeChange = (newType: "blog" | "trip" | "experience") => {
    setActiveType(newType);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string, direction: "asc" | "desc") => {
    setSortBy({ value, direction });
    setCurrentPage(1);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-[800] text-midnight-blue mb-2 font-raleway">
            Saved Items
          </h2>
          <p className="text-charcoal sm:text-sm text-xs">
            Your bookmarked experiences, trips, and blogs
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-col sm:flex-row justify-between mb-8">
        <Tabs
          options={[
           
            { key: "experience", label: "Experiences" },
            { key: "trip", label: "Trips" },
            { key: "blog", label: "Blogs" },
          ]}
          activeKey={activeType}
          onChange={(key) =>
            handleTypeChange(key as "blog" | "trip" | "experience")
          }
          className="sm:w-[500px] overflow-auto"
        />
        <SortBy
          options={sortOptions}
          activeSort={sortBy}
          onSortChange={handleSortChange}
          size="small"
          isBold={true}
        />
      </div>

      {isFetchingSavedPosts ? (
        <SavedItemSkeleton count={9} />
      ) : savedPosts && savedPosts.length === 0 ? (
        <NoData
          title="No Saved Items"
          description="Start exploring and save your favorite experiences, trips, and blogs."
          icon={
            <Bookmark className="sm:w-12 sm:h-12 w-10 h-10 text-midnight-blue" />
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {activeType === "blog" ? savedPosts.map((savedPost) => (
              <BlogCard
                key={savedPost.savedPost.id}
                blog={savedPost.blog}
                queryKey="saved-posts"
              />
            )) : activeType === "trip" ? savedPosts.map((savedPost) => (
              <TripCard
                key={savedPost.savedPost.id}
                trip={savedPost.trip}
                queryKey="saved-posts"
               
              />
            )) : activeType === "experience" ? savedPosts.map((savedPost) => (
              <ExperienceCard
                key={savedPost.savedPost.id}
                experience={savedPost.experience}
                queryKey="saved-posts"
              />
            )) : null}
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
