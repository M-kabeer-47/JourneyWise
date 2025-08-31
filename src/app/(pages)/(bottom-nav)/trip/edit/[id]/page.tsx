"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import TripPlannerComponent from "@/components/plan-trip/TripPlannerComponent";
import { TripData } from "@/lib/schemas/trip";
import { toast } from "@/components/ui/Toast";
import useFetchTrip from "@/hooks/trip/useFetchTrip";
import useUpdateTrip from "@/hooks/trip/useUpdateTrip";
import { Loader2 } from "lucide-react";

export default function EditTrip() {
  const params = useParams();
  const router = useRouter();
  const tripId = params?.id as string;
  
  const { data, isLoading, isError } = useFetchTrip({ id: tripId });
  const { updateTrip, isUpdating } = useUpdateTrip();
  const [tripData, setTripData] = useState<TripData | null>(null);

  // Transform the fetched data to match TripData schema
  useEffect(() => {
    if (data?.trip) {
      const { trip } = data;
      
      // Parse waypoints if they're stored as JSON string
      let waypoints = [];
      try {
        waypoints = typeof trip.waypoints === "string" 
          ? JSON.parse(trip.waypoints) 
          : trip.waypoints || [];
      } catch (error) {
        console.error("Error parsing waypoints:", error);
        waypoints = [];
      }

      const transformedData: TripData = {
        userID: trip.userID,
        waypoints: waypoints,
        numOfPeople: trip.numOfPeople,
        estimatedBudget: trip.estimatedBudget,
        estimatedDistance: trip.estimatedDistance,
        currency: trip.currency,
        thumbnailUrl: trip.thumbnailUrl || "",
        startLocation: waypoints[0]?.name || "",
        endLocation: waypoints[waypoints.length - 1]?.name || "",
      };

      setTripData(transformedData);
    }
  }, [data]);

  const handleSave = async (updatedTripData: TripData) => {
    try {
      await updateTrip({ tripId, tripData: updatedTripData });
      router.push(`/trip/${tripId}`); // Redirect back to trip view
    } catch (error) {
      // Error handling is done in the hook
      console.error("Failed to update trip:", error);
    }
  };

  const handleCancel = () => {
    router.push(`/trip/${tripId}`); // Go back to trip view
  };

  // Handle error state
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Error</h1>
          <p className="text-gray-600 mb-4">Failed to load trip data</p>
          <button
            onClick={() => router.push(`/trip/${tripId}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Handle loading state
  if (isLoading || !tripData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">
            {isUpdating ? "Updating trip..." : "Loading trip data..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <TripPlannerComponent
      initialData={tripData}
      isEditMode={true}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}
