import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import Tabs from "./Tabs";
import NoData from "./NoData";
import SortBy from "@/components/ui/SortBy";
import SavedItemSkeleton from "./SavedItemSkeleton";
import useFetchSavedPosts from "@/hooks/savedPosts/useFetchSavedPosts";

interface SavedTabProps {
  userID: string;
}

export default function SavedTab({ userID }: SavedTabProps) {
  const [activeType, setActiveType] = useState<"all" | "blog" | "trip" | "experience">("all");
  const [sortBy, setSortBy] = useState<{
    value: string;
    direction: "asc" | "desc";
  }>({
    value: "createdAt",
    direction: "desc",
  });

  const sortOptions = [
    { value: "createdAt", label: "Date Saved" },
  ];

  const {savedPosts,isFetchingSavedPosts,isSavedPostsError} = useFetchSavedPosts({userID, type: activeType, sortColumn: sortBy.value, sortOrder: sortBy.direction})

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
      <div className="flex justify-between mb-8">
        <Tabs
          options={[
            { key: "all", label: "All" },
            { key: "experience", label: "Experiences" },
            { key: "trip", label: "Trips" },
            { key: "blog", label: "Blogs" },
          ]}
          activeKey={activeType}
          onChange={(key) => setActiveType(key as "all" | "blog" | "trip" | "experience")}
          className="w-[500px]"
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
          icon={<Bookmark className="sm:w-12 sm:h-12 w-10 h-10 text-midnight-blue" />}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {savedPosts?.map((item:SavedPost) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={
                    item.experience?.imageUrl ||
                    item.trip?.imageUrl ||
                    "/placeholder.jpg"
                  }
                  alt={
                    item.experience?.title ||
                    `${item.trip?.startPoint} → ${item.trip?.endPoint}` ||
                    "Saved item"
                  }
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-ocean-blue/10 text-ocean-blue rounded text-xs font-medium uppercase">
                    {item.type}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-semibold text-midnight-blue mb-1">
                  {item.experience?.title ||
                    `${item.trip?.startPoint} → ${item.trip?.endPoint}` ||
                    "Saved Item"}
                </h3>
                <p className="text-charcoal  text-sm">
                  {item.experience?.location ||
                    `${item.trip?.estimatedDistance}km • $${item.trip?.estimatedBudget}` ||
                    "View details"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
