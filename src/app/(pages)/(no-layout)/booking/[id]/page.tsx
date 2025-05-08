'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import BookingForm from '@/components/booking/BookingForm';
import IllustrationSection from '@/components/booking/IllustrationSection';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/components/ui/Toast';
import BookingSkeleton from '@/components/skeletons/BookingSkeleton';

export default function BookingPage() {
  const { id } = useParams();
  
  // Manage local state, not derived from props
  const [formValues, setFormValues] = useState({});
  const [selectedTier, setSelectedTier] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  // Fetch data without depending on stale query check
  const { data: tripData, isLoading } = useQuery({
    queryKey: ['experience', id],
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/experience/${id}`);
        return res.data;
      } catch (error) {
        toast.error('Failed to load trip information');
        console.error('Error loading trip data:', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 10, // Consider data fresh for 10 minutes
  });

  // Set initial tier only once when data is loaded
  useEffect(() => {
    if (tripData?.experience?.tier?.tierInfo?.length && !selectedTier) {
      setSelectedTier(tripData.experience.tier.tierInfo[0].name);
    }
  }, [tripData, selectedTier]);

  // Form update handlers
  const handleFormChange = (values) => {
    setFormValues(values);
  };

  const handleTierSelect = (tierName) => {
    setSelectedTier(tierName);
  };

  // Change this function to prevent circular updates
  const handleDateSelect = (date, calculatedEndDate) => {
    setEndDate(calculatedEndDate);
  };

  if (isLoading) {
    return <BookingSkeleton />;
  }

  // Format dates for display if they exist
  const formattedStartDate = selectedDate ? 
    (typeof selectedDate === 'string' ? selectedDate : format(selectedDate, 'PPP')) 
    : 'Not selected';
    
  const formattedEndDate = endDate ? 
    (typeof endDate === 'string' ? endDate : format(endDate, 'PPP')) 
    : 'Not selected';

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-16 relative top-[-30px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden shadow-lg">
          {/* Left side - Illustration and summary */}
          <IllustrationSection 
            tripData={tripData}
            selectedTier={selectedTier}
            selectedDate={formattedStartDate}
            endDate={formattedEndDate}
            formValues={formValues}
          />
          
          {/* Right side - Booking form */}
          <div className="p-8 lg:p-12 overflow-y-auto h-screen">
            <h1 className="text-3xl font-bold font-raleway bg-gradient-to-r from-midnight-blue to-ocean-blue bg-clip-text text-transparent mb-2">
              Book Your Experience
            </h1>
            <p className="text-gray-600 mb-8">
              You're just a few steps away from an unforgettable journey
            </p>
            
            <BookingForm 
              tripData={tripData} 
              onFormChange={handleFormChange}
              onTierSelect={handleTierSelect}
              onDateUpdate={handleDateSelect}
              selectedTier={selectedTier}
            />
          </div>
        </div>
      </div>
    </div>
  );
}