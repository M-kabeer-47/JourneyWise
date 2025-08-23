import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import Tabs from "./Tabs";
import NoData from "./NoData";

interface SavedTabProps {
  savedItems: any[];
}

export default function SavedTab({ savedItems }: SavedTabProps) {
  const [activeType, setActiveType] = useState<string>("all");

  const filteredItems =
    activeType === "all"
      ? savedItems
      : savedItems.filter(
          (item) => item.entityType === activeType.slice(0, -1)
        );

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
      <Tabs
        options={[
          { key: "all", label: "All" },
          { key: "experiences", label: "Experiences" },
          { key: "trips", label: "Trips" },
          { key: "blogs", label: "Blogs" },
        ]}
        activeKey={activeType}
        onChange={setActiveType}
        className="max-w-[600px]"
      />

      {filteredItems.length === 0 ? (
        <NoData
          title="No Saved Items"
          description="Start exploring and save your favorite experiences, trips, and blogs."
          icon={<Bookmark className="sm:w-12 sm:h-12 w-10 h-10 text-midnight-blue" />}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
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
                    {item.entityType}
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
