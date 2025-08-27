import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import Tabs from "./Tabs";
import NoData from "./NoData";
import SortBy from "@/components/ui/SortBy";
import SavedItemSkeleton from "./SavedItemSkeleton";
import useFetchSavedPosts from "@/hooks/savedPosts/useFetchSavedPosts";
import ExperienceCard from "../experiences/ExperienceCard";
import TripCard from "../trip/TripCard";
import { BlogCard } from "../blog/BlogCard";
interface SavedTabProps {
  userID: string;
}

export default function SavedTab({ userID }: SavedTabProps) {
  const [activeType, setActiveType] = useState<
    "blog" | "trip" | "experience"
  >("experience");
  const [sortBy, setSortBy] = useState<{
    value: string;
    direction: "asc" | "desc";
  }>({
    value: "createdAt",
    direction: "desc",
  });

  const sortOptions = [{ value: "createdAt", label: "Date Saved" }];

  const { savedPosts, isFetchingSavedPosts, isSavedPostsError } =
    useFetchSavedPosts({
      userID,
      type: activeType,
      sortColumn: sortBy.value,
      sortOrder: sortBy.direction,
    });

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
            setActiveType(key as  "blog" | "trip" | "experience")
          }
          className="sm:w-[500px] overflow-auto"
        />
        <SortBy
          options={sortOptions}
          activeSort={sortBy}
          onSortChange={(value, direction) => setSortBy({ value, direction })}
          size="small"
        />
      </div>

      {isFetchingSavedPosts ? (
        <SavedItemSkeleton count={activeType === "all" ? 9 : 6} />
      ) : savedPosts && savedPosts.length === 0 ? (
        <NoData
          title="No Saved Items"
          description="Start exploring and save your favorite experiences, trips, and blogs."
          icon={
            <Bookmark className="sm:w-12 sm:h-12 w-10 h-10 text-midnight-blue" />
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeType === "blog" ? savedPosts.map((savedPost) => (
            <BlogCard
              key={savedPost.savedPost.id}
              blog={savedPost.blog}
            />
          )) : activeType === "trip" ? savedPosts.map((savedPost) => (
            <TripCard
              key={savedPost.savedPost.id}
              trip={savedPost.trip}
              isPersonal={true}
            />
          )) : activeType === "experience" ? savedPosts.map((savedPost) => (
            <ExperienceCard
              key={savedPost.savedPost.id}
              experience={savedPost.experience}
            />
          )) : null}
        </div>
      )}
    </motion.div>
  );
}
