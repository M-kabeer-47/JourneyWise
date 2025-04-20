import { useEffect, useState } from "react";
import TripGrid from "./components/TripGrid";
import TripFilters from "./components/TripFilters";
import EmptyState from "./components/EmptyState";
import { Trip } from "@/lib/types/trip";
import { fetchTrips } from "@/lib/api/trips";

export default function MyTripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTrips = async () => {
      setIsLoading(true);
      try {
        const fetchedTrips = await fetchTrips();
        setTrips(fetchedTrips);
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTrips();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (trips.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Planned Trips</h1>
      <TripFilters />
      <TripGrid trips={trips} />
    </div>
  );
}