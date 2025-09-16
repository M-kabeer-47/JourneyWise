"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, CreditCard, MapPin, Plus, Calendar, TrendingUp } from "lucide-react";

const travelerSteps = [
  {
    icon: Search,
    title: "Discover",
    description: "Search and filter professional travel experiences",
    detail: "Browse thousands of verified experiences from licensed travel agents worldwide."
  },
  {
    icon: CreditCard,
    title: "Book",
    description: "Secure checkout with direct agent contact",
    detail: "Complete secure payment and get direct contact with your chosen travel agent."
  },
  {
    icon: MapPin,
    title: "Travel & Save",
    description: "Save routes and write trip journals",
    detail: "Share your experience by creating route guides and writing detailed travel blogs."
  }
];

const agentSteps = [
  {
    icon: Plus,
    title: "List",
    description: "Create professional travel listings",
    detail: "Upload photos, create detailed itineraries, and set your pricing and availability."
  },
  {
    icon: Calendar,
    title: "Manage",
    description: "Handle bookings, calendar, and communication",
    detail: "Track bookings, manage your calendar, and communicate directly with travelers."
  },
  {
    icon: TrendingUp,
    title: "Grow",
    description: "Analytics and featured placements",
    detail: "Access detailed analytics and promote your listings for increased visibility."
  }
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<'traveler' | 'agent'>('traveler');
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const currentSteps = activeTab === 'traveler' ? travelerSteps : agentSteps;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-ocean-blue/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-midnight-blue mb-4 font-raleway">
            How It Works
          </h2>
          <p className="text-xl text-charcoal max-w-3xl mx-auto font-geist">
            Simple workflows for travelers and travel agents
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-2 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab('traveler')}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                activeTab === 'traveler'
                  ? 'bg-midnight-blue text-white'
                  : 'text-charcoal hover:bg-gray-50'
              }`}
            >
              For Travelers
            </button>
            <button
              onClick={() => setActiveTab('agent')}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                activeTab === 'agent'
                  ? 'bg-midnight-blue text-white'
                  : 'text-charcoal hover:bg-gray-50'
              }`}
            >
              For Agents
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {currentSteps.map((step, index) => (
            <motion.div
              key={`${activeTab}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connection Line */}
              {index < currentSteps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-ocean-blue to-transparent -translate-x-4 z-0" />
              )}

              <div
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer relative z-10"
                onClick={() => setExpandedStep(expandedStep === index ? null : index)}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-ocean-blue to-midnight-blue rounded-2xl flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-ocean-blue font-raleway">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-midnight-blue mb-4 font-raleway">
                  {step.title}
                </h3>

                <p className="text-charcoal mb-4 font-geist">
                  {step.description}
                </p>

                <motion.div
                  initial={false}
                  animate={{ 
                    height: expandedStep === index ? 'auto' : 0,
                    opacity: expandedStep === index ? 1 : 0
                  }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-gray-600 pt-4 border-t border-gray-100">
                    {step.detail}
                  </p>
                </motion.div>

                <button className="mt-4 text-sm text-ocean-blue font-semibold hover:underline">
                  {activeTab === 'traveler' ? 'See traveler demo' : 'See agent demo'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}