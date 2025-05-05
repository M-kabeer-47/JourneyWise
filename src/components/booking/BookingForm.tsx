"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Calendar,
  User,
  Mail,
  Phone,
  CheckCircle,
  Gift,
  Badge,
  MessageSquare,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format, addDays } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/shadcn/utils";
import TierSelectionCard from "./TierSelectionCard";
import { toast } from "@/components/ui/Toast";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  startDate: z.date({
    required_error: "Please select a start date",
  }),
  tier: z.string({
    required_error: "Please select a package tier",
  }),
  notes: z.string().optional(),
  promoCode: z.string().optional(),
});

export default function BookingForm({
  tripData,
  onFormChange,
  onTierSelect,
  onDateUpdate,
  selectedTier,
}) {
  // Don't set initial state from props to avoid circular updates
  const [selectedDate, setSelectedDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPromoField, setShowPromoField] = useState(false);

  // Initialize the form without dependency on selectedTier
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      notes: "",
      promoCode: "",
      // Don't set initial tier value here
    },
  });

  // Set tier value when it changes from parent but avoid circular updates
  useEffect(() => {
    if (selectedTier) {
      setValue("tier", selectedTier);
    } else if (tripData?.experience?.tier?.tierInfo?.length) {
      // Only set default if selectedTier is not provided
      setValue("tier", tripData.experience.tier.tierInfo[0].name);
    }
  }, [setValue, selectedTier, tripData]);

  const today = new Date();

  const handleDateSelect = (date) => {
    setValue("startDate", date);
    setSelectedDate(date);

    // Calculate end date based on duration
    if (date && tripData?.experience?.duration) {
      const calculatedEndDate = addDays(
        new Date(date),
        tripData.experience.duration - 1
      );
      setEndDate(calculatedEndDate);

      // Use local state only, and notify parent ONCE with the final values
      // Remove the continuous update loop
      if (onDateUpdate) {
        // Clone the dates to avoid reference issues
        onDateUpdate(new Date(date), new Date(calculatedEndDate));
      }
    }
  };

  const handleTierSelect = (tierName) => {
    setValue("tier", tierName);

    // Notify parent component
    if (onTierSelect) {
      onTierSelect(tierName);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Get the selected tier data
      const selectedTierData = tripData.experience.tier.tierInfo.find(
        (tier) => tier.name === data.tier
      );

      // Create full booking object
      const booking = {
        ...data,
        tripId: tripData.experience.id,
        endDate: endDate,
        tripName: tripData.experience.title,
        tripPrice: selectedTierData.price,
        people: selectedTierData.members,
        currency: tripData.experience.tier.currency,
        agent: tripData.agent.name,
      };

      console.log("Booking submitted:", booking);
      toast.success(
        "Booking submitted successfully! Redirecting to payment..."
      );
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Watch form values and update parent component
  const formValues = watch();

  // useEffect(() => {
  //   if (onFormChange) {
  //     const { name, email, phone, notes } = formValues;
  //     onFormChange({ name, email, phone, notes });
  //   }
  // }, [formValues, onFormChange]);

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full bg-ocean-blue flex items-center justify-center text-white">
            <User size={16} />
          </div>
          <h2 className="text-2xl font-bold text-midnight-blue">
            Your Details
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name
            </Label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                id="name"
                {...register("name")}
                className="pl-10 w-full h-10 rounded-lg border-gray-200 text-charcoal text-sm
                         transition-all duration-200 outline-none border border-gray-200 focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address
            </Label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                id="email"
                type="email"
                {...register("email")}
                className="pl-10 w-full h-10 rounded-lg border-gray-200 text-charcoal text-sm
                         transition-all duration-200 outline-none border border-gray-200 focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
                placeholder="your@email.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
              Phone Number
            </Label>
            <div className="mt-1 relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                id="phone"
                {...register("phone")}
                className="pl-10 w-full h-10 rounded-lg border-gray-200 text-charcoal text-sm
                         transition-all duration-200 outline-none border border-gray-200 focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
                placeholder="+1 (123) 456-7890"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="pt-6 border-t border-gray-100"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full bg-ocean-blue flex items-center justify-center text-white">
            <Badge size={16} />
          </div>
          <h2 className="text-2xl font-bold text-midnight-blue">
            Experience Package
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {tripData.experience.tier.tierInfo.map((tier) => (
            <TierSelectionCard
              key={tier.name}
              tier={tier}
              currency={tripData.experience.tier.currency}
              isSelected={selectedTier === tier.name}
              onSelect={handleTierSelect}
            />
          ))}
        </div>

        {errors.tier && (
          <p className="mt-1 text-sm text-red-600">{errors.tier.message}</p>
        )}

        {!showPromoField && (
          <div className="mt-4">
            <button
              type="button"
              className="text-ocean-blue hover:underline text-sm flex items-center"
              onClick={() => setShowPromoField(true)}
            >
              <Gift size={14} className="mr-1" />
              Do you have a promo code?
            </button>
          </div>
        )}

        {showPromoField && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <Label
              htmlFor="promoCode"
              className="text-sm font-medium text-gray-700"
            >
              Promo Code
            </Label>
            <div className="mt-1 relative">
              <Gift className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="promoCode"
                {...register("promoCode")}
                className="pl-10 w-full h-10 rounded-lg border-gray-200 text-charcoal text-sm
                         transition-all duration-200 outline-none focus:outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
                placeholder="Enter promo code"
              />
            </div>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="pt-6 border-t border-gray-100"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full bg-ocean-blue flex items-center justify-center text-white">
            <Calendar size={16} />
          </div>
          <h2 className="text-2xl font-bold text-midnight-blue">Trip Dates</h2>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 hover:bg-white">
            Select Start Date
          </Label>
          <div className="mt-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-3 h-10 text-left font-normal bg-white border-gray-200 text-charcoal text-sm rounded-lg",
                    "transition-all duration-200 outline-none focus:outline-none hover:border-ocean-blue focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4 text-ocean-blue" />
                  {selectedDate
                    ? format(selectedDate, "PPP")
                    : "Select trip start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 border-ocean-blue"
                align="start"
              >
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < today}
                  initialFocus
                  classNames={{
                    day_selected:
                      "bg-ocean-blue text-white hover:bg-ocean-blue hover:text-white",
                    day_today: "bg-gray-100 text-midnight-blue",
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-lg overflow-hidden border border-green-100"
          >
            <div className="bg-green-50 p-3">
              <h3 className="text-sm font-medium text-green-800 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Trip Date Confirmed
              </h3>
            </div>
            <div className="p-3 space-y-2 bg-white">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Duration:</span>
                <span className="font-medium">
                  {tripData.experience.duration} days
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Start Date:</span>
                <span className="font-medium">
                  {format(selectedDate, "PPP")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">End Date:</span>
                <span className="font-medium">
                  {endDate ? format(endDate, "PPP") : ""}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {errors.startDate && (
          <p className="mt-2 text-sm text-red-600">
            {errors.startDate.message}
          </p>
        )}
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="pt-6 border-t border-gray-100"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full bg-ocean-blue flex items-center justify-center text-white">
            <MessageSquare size={16} />
          </div>
          <h2 className="text-2xl font-bold text-midnight-blue">
            Additional Information
          </h2>
        </div>

        <div>
          <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
            Special Requests (Optional)
          </Label>
          <textarea
            id="notes"
            {...register("notes")}
            rows={3}
            className="mt-1 block w-full rounded-lg border border-gray-200 p-3 text-charcoal text-sm
           transition-all duration-200 outline-none focus:outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
            placeholder="Any dietary requirements, accessibility needs, or other special requests..."
          />
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="pt-6 border-t border-gray-100"
      >
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-midnight-blue to-ocean-blue text-white py-6 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] hover:from-ocean-blue hover:to-midnight-blue transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              Complete Booking
            </span>
          )}
        </Button>
      </motion.div>
    </form>
  );
}
