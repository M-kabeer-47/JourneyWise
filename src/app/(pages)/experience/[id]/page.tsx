
"use client"
import React, { useState, useEffect } from "react";
import { FileText, Compass, Check, Star } from "lucide-react";
import EnhancedTravelHeader from "@/components/tripPage/EnhancedTravelHeader";
import EnhancedLocationInfo from "@/components/tripPage/EnhancedLocationInfo";
import EnhancedCategoryTags from "@/components/tripPage/EnhancedCategoryTags";
import EnhancedDescriptionCard from "@/components/tripPage/EnhancedDescriptionCard";
import EnhancedServicesList from "@/components/tripPage/EnhancedServicesList";
import EnhancedItinerary from "@/components/tripPage/EnhancedItinerary";
import BookingCTA from "@/components/tripPage/BookingCTA";
import PricingTier from "@/components/tripPage/PricingTier";
import { TierInfo } from "@/components/tripPage/PricingTier";
import { ItineraryDay } from "@/components/tripPage/EnhancedItinerary";
import MainImage from "@/components/tripPage/MainImage";
import ImagesCarousel from "@/components/tripPage/ImagesCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {toast}  from "@/components/ui/Toast";
import ReviewSection from "@/components/tripPage/ReviewSection";
import { useParams } from "next/navigation";





const Index = () => {
  const [travelType, setTravelType] = useState<"solo" | "couple" | "family">(
    "solo"
  );
  
  const { id } = useParams();

  const fetchTrip = async () => {
    try{

      let response  = await axios
        .get(`/api/experience/${id}`)
        return response.data   
    }
    catch(error){
      toast.error("Error fetching trip data");
          console.error("Error fetching trip data:", error);
          return null;
    }
        
    
    
  };

  const { isFetching, data: experienceData,isLoading } = useQuery({
    queryKey: ["experienceData", id],
    queryFn: fetchTrip,
    refetchOnWindowFocus: false,
  });
  

  // Pricing tiers data

  const reviewsData = [
    {
      id: "rev1",
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3"
      },
      rating: 5.0,
      content: "This was absolutely the highlight of our trip to Japan! Our guide was incredibly knowledgeable about Kyoto's history and culture. The tea ceremony was so authentic and the accommodation was beautiful. Highly recommend this experience!"
    },
    {
      id: "rev2",
      user: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3"
      },
      rating: 4.5,
      content: "The cultural immersion was fantastic and we learned so much about Japanese traditions. Beautiful temples and excellent organization. The only small issue was that one day felt a bit rushed, but overall an amazing experience."
    },
    {
      id: "rev3",
      user: {
        name: "Emma Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3"
      },
      rating: 5.0,
      content: "The bamboo forest walk was magical, especially early in the morning before the crowds arrived. Our guide arranged everything perfectly and handled all the logistics so we could just enjoy the experience."
    },
    {
      id: "rev4",
      user: {
        name: "David Thompson"
      },
      rating: 4.0,
      content: "Great cultural experience with knowledgeable guides. The food was amazing and accommodations were comfortable. Would have liked a bit more free time to explore on our own, but otherwise very satisfied with this cultural journey."
    }
  ];
  

  if (isFetching || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="space-y-6 w-full max-w-3xl">
          <Skeleton className="h-12 w-3/4 rounded-lg" />
          <Skeleton className="h-64 w-full rounded-xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </div>
          <Skeleton className="h-40 w-full rounded-xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-48 rounded-xl" />
            <Skeleton className="h-48 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // Split requirements into bullet points for check list display
  
if (experienceData){
  

  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Full Image */}
      <div className="relative h-[40vh] md:h-[20vh] bg-midnight-blue">
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
                src={experienceData.experience.gigImage}
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
                <ImagesCarousel images={experienceData.experience.gigImages} />
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
                  {experienceData.experience.requirements.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
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
            <EnhancedItinerary itinerary={experienceData.experience.itineraryDetails} />
          </div>

          {/* Rating & Reviews Section */}
          <div className="mt-10 pt-6 border-t border-gray-100 mb-[100px]">
            <ReviewSection
              rating={experienceData.experience.averageRating}
              totalReviews={reviewsData.length}
              reviews={reviewsData}
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
  );
}

};

export default Index;
