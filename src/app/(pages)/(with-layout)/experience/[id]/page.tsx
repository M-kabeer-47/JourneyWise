import React from "react";
import { FileText, Compass, Check, Star } from "lucide-react";
import EnhancedTravelHeader from "@/components/tripPage/EnhancedTravelHeader";
import EnhancedLocationInfo from "@/components/tripPage/EnhancedLocationInfo";
import EnhancedCategoryTags from "@/components/tripPage/EnhancedCategoryTags";
import EnhancedDescriptionCard from "@/components/tripPage/EnhancedDescriptionCard";
import EnhancedServicesList from "@/components/tripPage/EnhancedServicesList";
import EnhancedItinerary from "@/components/tripPage/EnhancedItinerary";
import BookingCTA from "@/components/tripPage/BookingCTA";
import PricingTier from "@/components/tripPage/PricingTier";
import MainImage from "@/components/tripPage/MainImage";
import ImagesCarousel from "@/components/tripPage/ImagesCarousel";
import axios from "axios";
import ReviewSection from "@/components/tripPage/ReviewSection";
import ExperiencePageSkeleton from "@/components/skeletons/ExperiencePageSkeleton";
import { reviews } from "@/lib/data/dashboardMockData";
const TripPage = async ({ params }: { params: { id: string } }) => {
  let { id } = await params;
  let isLoading = true;

  const fetchTrip = async () => {
    try {
      let response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/experience/${id}`
      );
      isLoading = false;
      return response.data;
    } catch (error) {
      return null;
    }
  };

  const experienceData = await fetchTrip();

  return (
    <>
      {isLoading ? (
        <ExperiencePageSkeleton />
      ) : (
        // Rest of your component remains unchanged
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section with Full Image */}
          <div className="relative h-[25vh] md:h-[20vh] bg-midnight-blue">
            <img
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
              alt="Standard travel background"
              className="w-full h-full object-cover object-center opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-midnight-blue/40 to-midnight-blue"></div>
          </div>

          <div className="max-w-[1450px] mx-auto px-2 sm:px-3 md:px-4 relative">
            {/* Header Section */}
            <EnhancedTravelHeader
              title={experienceData?.experience.title}
              isAvailable={experienceData?.experience.isAvailable}
              user={experienceData?.agent}
            />

            <div className="bg-white px-3 sm:px-4 md:px-5 pb-6 shadow-sm rounded-b-lg">
              {/* Main Content Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8">
                {/* Left Column - Main content */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Main Image */}
                  <MainImage
                    src={experienceData.experience.experienceImage}
                    alt={experienceData.experience.title}
                    className="h-[250px] sm:h-[450px] mt-6 rounded-xl overflow-hidden"
                  />

                  {/* Quick booking CTA for small screens */}

                  {/* Location and Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <EnhancedLocationInfo
                      city={experienceData.experience.location.city}
                      country={experienceData.experience.location.country}
                      duration={experienceData.experience.duration}
                    />
                    <EnhancedCategoryTags
                      category={experienceData.experience.category}
                      tags={experienceData.experience.tags}
                    />
                  </div>

                  {/* Description */}
                  <EnhancedDescriptionCard
                    title="Experience Overview"
                    content={experienceData.experience.description}
                    icon={<Compass className="w-4 h-4 text-ocean-blue" />}
                  />

                  {/* Trip Highlights */}
                  <div>
                    <h3 className="text-lg font-medium text-midnight-blue mb-4 pl-1">
                      Trip Highlights
                    </h3>
                    <ImagesCarousel
                      images={experienceData.experience.experienceImages}
                    />
                  </div>

                  {/* Requirements */}
                  <div className="rounded-xl py-6 px-6 bg-white shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-4 h-4 text-ocean-blue" />
                      <h3 className="text-lg font-medium text-midnight-blue">
                        Requirements
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {experienceData.experience.requirements.map(
                        (item: string, index: number) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                              <Check className="w-3 h-3 text-emerald-600" />
                            </div>
                            <span className="text-gray-600">{item}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Services */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <EnhancedServicesList
                      title="What's Included"
                      services={experienceData.experience.includedServices}
                      type="included"
                    />
                    <EnhancedServicesList
                      title="What's Not Included"
                      services={experienceData.experience.excludedServices}
                      type="excluded"
                    />
                  </div>
                </div>

                {/* Right Column - Sticky booking panel */}
                <div className="lg:col-span-4 hidden lg:block">
                  <div className="sticky top-6 space-y-6">
                    {/* Pricing Tiers */}
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                      <PricingTier
                        currency={experienceData.experience.tier.currency}
                        tiers={experienceData.experience.tier.tierInfo}
                      />

                      {/* Booking CTA - Desktop */}
                      <div className="mt-6">
                        <BookingCTA variant="card" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full Width Sections */}
              <div className="mt-10 pt-6 border-t border-gray-100">
                <EnhancedItinerary
                  itinerary={experienceData.experience.itineraryDetails}
                />
              </div>

              {/* Rating & Reviews Section */}
              <div className="mt-10 pt-6 border-t border-gray-100 mb-[100px]">
                <ReviewSection
                  rating={experienceData.experience.averageRating}
                  totalReviews={reviews.length}
                  reviews={reviews}
                />
              </div>

              {/* Fixed bottom Booking CTA for mobile */}
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 px-5 z-20 lg:hidden">
                <BookingCTA variant="simple" />
              </div>

              {/* Adding padding at the bottom to account for the fixed CTA on mobile */}
              <div className="h-20 lg:hidden"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TripPage;
