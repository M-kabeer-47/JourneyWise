import { useState } from "react";
import { useRouter } from "next/navigation";
import TripDetails from "./components/TripDetails";
import WaypointForm from "./components/WaypointForm";
import HotelForm from "./components/HotelForm";
import Button from "@/components/ui/Button";

export default function PlanTrip() {
  const [tripDetails, setTripDetails] = useState({ name: "", startDate: "", endDate: "" });
  const [waypoints, setWaypoints] = useState([]);
  const [hotels, setHotels] = useState([]);
  const router = useRouter();

  const handleTripDetailsChange = (details) => {
    setTripDetails(details);
  };

  const handleAddWaypoint = (waypoint) => {
    setWaypoints([...waypoints, waypoint]);
  };

  const handleAddHotel = (hotel) => {
    setHotels([...hotels, hotel]);
  };

  const handleSubmit = () => {
    // Logic to save the trip
    // After saving, redirect to the trips page
    router.push("/my-trips");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Plan Your Trip</h1>
      <TripDetails tripDetails={tripDetails} onChange={handleTripDetailsChange} />
      <WaypointForm onAddWaypoint={handleAddWaypoint} />
      <HotelForm onAddHotel={handleAddHotel} />
      <Button onClick={handleSubmit} className="mt-4">Save Trip</Button>
    </div>
  );
}