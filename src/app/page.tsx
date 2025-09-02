import HeroSection from "@/components/home/HeroSection";
import FeaturedExperiences from "@/components/home/FeaturedGigs";
import RecommendedExperiences from "@/components/home/RecommendedGigs";
import TripPlanningTools from "@/components/home/TripPlanningTools";
import UserTestimonials from "@/components/home/UserTestimonials";
import DestinationSection from "@/components/home/DestinationSection";
import AgentRegistration from "@/components/home/AgentRegistration";
import PhotoGallery from "@/components/home/PhotoGallery";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";
export default async function Home() {
  return (
    <Suspense fallback={<Spinner />}>
    <main className="bg-gray-100 ">
      <Navbar />
      <HeroSection />
      <FeaturedExperiences />
      <RecommendedExperiences />
      <DestinationSection />
      <TripPlanningTools />
      <AgentRegistration />
      <PhotoGallery />
      <UserTestimonials />
      <Footer />
    </main>
    </Suspense>
  );
}
