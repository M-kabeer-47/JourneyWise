import HeroSection from "../components/home/HeroSection";
import FeaturedGigs from "../components/home/FeaturedGigs";
import RecommendedGigs from "../components/home/RecommendedGigs";
import TripPlanningTools from "../components/home/TripPlanningTools";
import UserTestimonials from "../components/home/UserTestimonials";
import DestinationSection from "../components/home/DestinationSection";
import AgentRegistration from "../components/home/AgentRegistration";
import PhotoGallery from "../components/home/PhotoGallery";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export default async function Home() {
 

  return (
    <main className="text-charcoal">
      <HeroSection />
      <FeaturedGigs />
      <RecommendedGigs />
      <DestinationSection />
      <TripPlanningTools />
      <AgentRegistration />
      <PhotoGallery />
      <UserTestimonials />
    </main>
  );
}
