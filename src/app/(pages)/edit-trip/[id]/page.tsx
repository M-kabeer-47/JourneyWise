"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import TripPlannerComponent from "@/components/plan-trip/TripPlannerComponent";
import { TripData } from "@/lib/schemas/trip";
import { toast } from "@/components/ui/Toast";

// Mock function to fetch trip data - replace with your actual API call
const fetchTripData = async (id: string): Promise<TripData | null> => {
  try {
    // Replace this with your actual API call
    const response = await fetch(`/api/trips/${id}`);
    if (!response.ok) throw new Error("Failed to fetch trip");
    return await response.json();
  } catch (error) {
    console.error("Error fetching trip:", error);
    return null;
  }
};

// Mock function to update trip data - replace with your actual API call
const updateTripData = async (id: string, tripData: TripData): Promise<boolean> => {
  try {
    // Replace this with your actual API call
    const response = await fetch(`/api/trips/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripData),
    });
    return response.ok;
  } catch (error) {
    console.error("Error updating trip:", error);
    return false;
  }
};

export default function EditTrip() {
  const params = useParams();
  const router = useRouter();
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tripId = params?.id as string;

  useEffect(() => {
    const loadTripData = async () => {
      if (!tripId) {
        setError("Trip ID not found");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchTripData(tripId);
        if (data) {
          setTripData(data);
        } else {
          setError("Trip not found");
        }
      } catch (err) {
        setError("Failed to load trip data");
      } finally {
        setLoading(false);
      }
    };

    loadTripData();
  }, [tripId]);

  const handleSave = async (updatedTripData: TripData) => {
    try {
      const success = await updateTripData(tripId, updatedTripData);
      if (success) {
        toast.success("Trip updated successfully!");
        router.push("/trips"); // Redirect to trips list or wherever appropriate
      } else {
        toast.error("Failed to update trip");
      }
    } catch (error) {
      toast.error("An error occurred while updating the trip");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading trip data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!tripData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Trip Not Found</h1>
          <p className="text-gray-600 mb-4">The requested trip could not be found.</p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go Back
          </button>
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
