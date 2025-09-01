import React from "react";
import { motion } from "framer-motion";

import axios from "axios";

import InformationCardsSection from "@/components/trip/InformationCardsSection";
import { Waypoint } from "@/lib/types/waypoint";
import {TripInteractive} from "@/components/trip/TripInteractive";
import { redirect } from "next/navigation";
import TripHeroSection from "@/components/trip/TripHeroSection";
async function fetchTripData(id: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-trip/${id}`
    );
    return response.data;
  } catch (error) {
    redirect('/not-found')
  }
}

function parseWaypoints(waypointsData: any): Waypoint[] {
  if (!waypointsData) return [];

  try {
    const parsedWaypoints =
      typeof waypointsData === "string"
        ? JSON.parse(waypointsData)
        : waypointsData;

    return Array.isArray(parsedWaypoints) ? parsedWaypoints : [];
  } catch (error) {
    return [];
  }
}

export default async function TripDisplayPage({ params }: { params: { id: string } }) {
  const Params = await params
  const data = await fetchTripData(Params.id);
  const { trip, user } = data;
  const waypoints = parseWaypoints(trip?.waypoints);

  return (
        <div className="min-h-screen bg-gray-100 pb-[100px]">
      {/* Hero section */}
      <div className="relative top-[30px] pt-20 pb-12 bg-gradient-to-br from-midnight-blue to-ocean-blue text-white">
        <div className="max-w-[1400px] mx-auto px-6">
        <TripHeroSection trip={trip} waypoints={waypoints} user={user} />
        </div>
      </div>

      <InformationCardsSection
        tripData={{
          numOfPeople: trip?.numOfPeople || 1,
          estimatedBudget: trip?.estimatedBudget || 0,
          estimatedDistance: trip?.estimatedDistance || 0,
        }}
        numberOfWaypoints={waypoints.length}
      />

      {/* Interactive Timeline and Modals */}
      <TripInteractive waypoints={waypoints} />
    </div>
  );
}
