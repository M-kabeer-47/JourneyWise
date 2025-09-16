"use client";
import React from "react";
import Hero from "@/components/landing-page/Hero";
import ValueProps from "@/components/landing-page/ValueProps";
import HowItWorks from "@/components/landing-page/HowItWorks";
import MarketplaceShowcase from "@/components/landing-page/MarketPlace";
import RouteExplorer from "@/components/landing-page/RouteExplorer";
import AgentDashboard from "@/components/landing-page/AgentDashboard";
import CommunityContent from "@/components/landing-page/Community";
import TrustMetrics from "@/components/landing-page/TrustMetrics";
import FAQ from "@/components/landing-page/FAQs";

export default function LandingPage() {
  return (
    <div className="bg-gray-50">
      <Hero />
      <ValueProps />
      <HowItWorks />
      <MarketplaceShowcase />
       <RouteExplorer />
      <AgentDashboard />
      <CommunityContent />
      <TrustMetrics />
      <FAQ /> 
    </div>
  );
}