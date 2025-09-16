import React from "react";
import { motion } from "framer-motion";
import { MapIcon } from "lucide-react";
import TripCard from "@/components/trips/TripCard";
import NoData from "./NoData";
import SortBy from "@/components/ui/SortBy";
import Pagination from "@/components/ui/Pagination";
import { useState } from "react";
import { useFetchUserTrips } from "@/hooks/trip/useFetchUserTrips";
import { TripCardSkeleton } from "@/components/skeletons/TripCardSkeleton";
import { User } from "@/lib/types/user";
interface TripsTabProps {
  user: {
    user: User | null;
    isLoading: boolean;
  };
}

export default function TripsTab({ user }: TripsTabProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<{
    value: string;
    direction: "asc" | "desc";
  }>({
    value: "updatedAt",
    direction: "desc",
  });

  // Example sort options
  const sortOptions = [
    { value: "updatedAt", label: "Last Updated" },    
  ];

  const { trips, isFetchingTrips, isTripsError, pagination } = useFetchUserTrips({
    userID: user?.user?.id,
    sortColumn: sortBy.value,
    sortOrder: sortBy.direction,
    page: currentPage
  });

  const handleSortChange = (value: string, direction: "asc" | "desc") => {
    setSortBy({ value, direction });
    setCurrentPage(1);
  };

  if (isTripsError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading trips. Please try again.</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-[800] text-midnight-blue mb-2 font-raleway">
            Trips
          </h2>
          <p className="text-charcoal sm:text-sm text-xs">
            Share your travel experiences and insights
          </p>
        </div>
        <button className="relative sm:text-sm text-xs flex items-center gap-2 px-3 w-[110px] sm:w-[120px] py-2 group  bg-midnight-blue text-white rounded-md hover:shadow-lg transition-all">
          Plan a trip
          <MapIcon className="absolute sm:w-5 sm:h-5 h-4 w-4 right-3 " />
        </button>
      </div>

      {/* Sub-tabs */}
      <div className="flex justify-between mb-8">
        {/* If you have sub-tabs, put them here */}
        <div />
        <SortBy
          options={sortOptions}
          activeSort={sortBy}
          onSortChange={handleSortChange}
          size="small"
        />
      </div>

      {isFetchingTrips || user.isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(5)].map((_, i) => (
            <TripCardSkeleton key={i} />
          ))}
        </div>
      ) : trips?.length === 0 ? (
        <NoData
          title="No Trips Yet"
          description="Share your knowledge to guide fellow travelers."
          icon={<MapIcon className="sm:w-12 sm:h-12 w-10 h-10 text-midnight-blue" />}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {trips?.map((trip) => (
              <motion.div
                key={trip.trip.id}
             
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
              >
                <TripCard trip={trip.trip} isPersonal={true} queryKey={"user-trips"} />
              </motion.div>
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
