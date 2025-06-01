"use client";

import useFetchExperiences from "@/hooks/useFetchExperiences";
import GigCarousel from "../experiences/ExperienceCarousel";

export default function FeaturedGigs() {
  const { experiences, isLoading, isFetching } = useFetchExperiences();

  if (isLoading || isFetching) {
    return (
      <GigCarousel
        title="Recommended Experiences"
        experiences={[]}
        isLoading={isFetching}
      />
    );
  }

  return (
    <GigCarousel
      title="Featured Experiences"
      experiences={experiences}
      isLoading={isLoading}
    />
  );
}
