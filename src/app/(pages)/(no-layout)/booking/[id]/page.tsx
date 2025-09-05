"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import BookingForm from "@/components/booking/BookingForm";
import IllustrationSection from "@/components/booking/IllustrationSection";
import { toast } from "@/components/ui/Toast";
import BookingSkeleton from "@/components/skeletons/BookingSkeleton";
import { useState, useEffect } from "react";
import { useCreateBooking } from "@/hooks/booking/useCreateBooking";
import fetchUserFromClient from "@/hooks/fetchUserFromClient";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Booking } from "@/lib/schemas/booking";
import { bookingFormSchema } from "@/lib/schemas/booking";
import { useRouter } from "next/navigation";
export default function BookingPage() {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCustomTierSelected, setIsCustomTierSelected] = useState(false);
  const [customerID, setCustomerID] = useState<string>("");
  const router = useRouter();
  const { id } = useParams();
  const { data: experienceData, isLoading } = useQuery({
    queryKey: ["experience", id],
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/experience/${id}`);
        return res.data;
      } catch (error) {
        toast.error("Failed to load trip information");
        throw error;
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<Booking>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      notes: "", //@ts-ignore
      packageCount: "", //@ts-ignore
      tier: null,
      startDate: undefined,
      customMembers: "",
      customNotes: "",
      endDate: undefined,
    },
  });
  const { createBooking, isSubmitting } = useCreateBooking({
    experienceData,
    customerID,
    isCustomTierSelected,
  });

  const handleBoookingSubmit = async () => {
    setIsConfirmModalOpen(true);
    let submitted = await createBooking(watch());
    if (submitted) {
      setIsConfirmModalOpen(false);
      toast.success("Booking submitted successfully!");
      router.push("/success/booking");
    } else {
      toast.error("Failed to submit booking. Please try again.");
      setIsConfirmModalOpen(false);
    }
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      let customer = await fetchUserFromClient();
      if (customer) {
        setCustomerID((customer as any).id);
      }
    };
    fetchCustomer();
  }, []);

  useEffect(() => {
    if (experienceData?.experience?.tiers?.length) {
      setValue("tier", experienceData.experience.tiers[0]);
    }
  }, [experienceData]);

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 md:py-16 relative top-0 sm:top-[-40px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile header (shown only on small screens) */}
        <div className="sm:hidden mb-6">
          <h1 className="text-2xl font-bold font-raleway bg-gradient-to-r from-midnight-blue to-ocean-blue bg-clip-text text-transparent">
            Book Your Experience
          </h1>
          <p className="text-gray-600 mt-1">
            You're just a few steps away from an unforgettable journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-0 sm:gap-8 bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg">
          {/* Left side - Illustration (hidden on mobile) */}
          <div className="hidden md:block h-full">
            <IllustrationSection />
          </div>

          {/* Right side - Booking form */}
          <div className="p-4 sm:p-6 lg:p-10 overflow-y-auto max-h-screen">
            {/* Desktop header (hidden on mobile) */}
            <div className="hidden sm:block mb-6">
              <h1 className="text-3xl font-bold font-raleway bg-gradient-to-r from-midnight-blue to-ocean-blue bg-clip-text text-transparent">
                Book Your Experience
              </h1>
              <p className="text-gray-600 mt-2">
                You're just a few steps away from an unforgettable journey
              </p>
            </div>

            {isLoading ? (
              <BookingSkeleton />
            ) : (
              <BookingForm
                experienceData={experienceData}
                formFunctions={{
                  register, //@ts-ignore
                  control,
                  errors,
                  setValue,
                  watch,
                }}
                isCustomTierSelected={isCustomTierSelected}
                setIsCustomTierSelected={setIsCustomTierSelected}
                handleSubmit={handleSubmit(() => {
                  setIsConfirmModalOpen(true);
                })}
              />
            )}
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleBoookingSubmit}
        loading={isSubmitting}
        title="Confirm Booking"
        description="Are you sure you want to submit this booking request?"
        loadingText="Processing..."
      />
      
    </div>
  );
}
