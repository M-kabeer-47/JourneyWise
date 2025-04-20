import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Spinner from "@/components/ui/Spinner";
import { TripHeader } from "./components/TripHeader";
import { TripOverview } from "./components/TripOverview";
import { WaypointSection } from "./components/WaypointSection";
import { Timeline } from "./components/Timeline";
import { CompletionSection } from "./components/CompletionSection";
import { fetchTripById } from "@/lib/api/trips";
import { Trip } from "@/lib/types/trip";

export default function TripDetail() {
  const { id } = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTrip = async () => {
      setIsLoading(true);
      try {
        const fetchedTrip = await fetchTripById(id);
        setTrip(fetchedTrip);
      } catch (error) {
        console.error("Failed to fetch trip:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getTrip();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-light-gray">
        <Spinner size="large" />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex justify-center items-center text-center p-4 bg-light-gray">
        <h2 className="text-2xl font-bold text-midnight-blue mb-2">Trip Not Found</h2>
        <p className="text-charcoal mb-6">The trip you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-light-gray font-sans">
      <TripHeader trip={trip} />
      <TripOverview trip={trip} />
      <Timeline waypoints={trip.waypoints} />
      {trip.waypoints.map((waypoint, index) => (
        <WaypointSection key={waypoint.id} waypoint={waypoint} />
      ))}
      <CompletionSection trip={trip} />
    </div>
  );
}