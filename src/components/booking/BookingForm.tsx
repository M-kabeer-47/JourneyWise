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
  Badge,
  MessageSquare,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format, addDays, set } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/shadcn/utils";
import { TierSelectionCard } from "./TierSelectionCard";
import { toast, Toast } from "@/components/ui/Toast";
import { CustomTierSection } from "./TierSelectionCard";
import { ExperienceResponse } from "@/lib/types/Experience";
import Spinner from "../ui/Spinner";
import fetchUserFromClient from "@/hooks/fetchUserFromClient";
import axios from "axios";
import {bookingFormSchema} from "@/lib/schemas/Booking";



interface BookingFormProps {
  tripData: ExperienceResponse;
}
export default function BookingForm({ tripData }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);
  const [isCustomTierSelected, setIsCustomTierSelected] = useState(false);
  const [customerID, setCustomerID] = useState<string>("");
  // Initialize the form without dependency on selectedTier
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      notes: "",
      tier: tripData.experience.tier.tierInfo[0],

      startDate: undefined,
      customMembers: "",
      customNotes: "",
      endDate: undefined,
    },
  });

  const today = new Date();
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      alert("Selected date: " + date);
      //@ts-ignore
      setValue("startDate", date, {
        shouldValidate: true,
      });

      const calculatedEndDate = addDays(
        new Date(date),
        tripData.experience?.duration - 1
      );
      //@ts-ignore
      setValue("endDate", calculatedEndDate);
    }
  };

  const handleTierSelect = (index: number) => {
    setSelectedTierIndex(index);
    setValue("tier", tripData.experience?.tier?.tierInfo[index]);
    // If a regular tier is selected, uncheck custom tier
    if (
      tripData.experience?.tier?.tierInfo[index]?.name !== "custom" &&
      isCustomTierSelected
    ) {
      setIsCustomTierSelected(false);
    }
  };

  const handleCustomTierSelect = () => {
    setIsCustomTierSelected(!isCustomTierSelected);
    setValue("tier", {
      name: "custom",
      price: 0,
      members: 1,
      description: "",
    });
  };
  const fixDate = (date: Date) => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
  };

  const onSubmit = async (data: any) => {
    console.log("Clicked");
    console.log("trip data", tripData);
    setIsSubmitting(true);
    let booking = {
      ...data,
      tier: {
        ...data.tier,
        currency: tripData.experience.tier.currency,
      },
      agentID: tripData.agent.agentID,
      customerID: customerID,
      customerName: data.name,
      customerEmail: data.email,
      customerPhone: data.phone,
      experienceID: tripData.experience.id,
      tripName: tripData.experience.title,
      agent: tripData.agent.name,
      isCustomRequest: isCustomTierSelected,
      bookingDate: new Date(),
      startDate: fixDate(data.startDate),
      endDate: fixDate(data.endDate),
      status: "pending",
    };

    try {
      // Simulate API call
      await axios.post("/api/create-booking", {
        booking,
      });

      console.log("Custom booking submitted:", booking);
      toast.success(
        "Booking submitted successfully! We will get back to you soon."
      );
    } catch (error) {
      console.log("Error submitting booking:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isCustomTierSelected) {
      setSelectedTierIndex(-1);
    }
  }, [isCustomTierSelected]);

  useEffect(() => {
    const fetchCustomer = async () => {
      let customer = await fetchUserFromClient();
      console.log("Customer data:", customer);
      if (customer) {
        //@ts-ignore
        console.log("Customer ID: " + customer.id);
        //@ts-ignore
        setCustomerID(customer.id);
      }
    };
    fetchCustomer();
  }, []);

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-ocean-blue/20 flex items-center justify-center text-white">
            <User size={14} className="text-midnight-blue sm:h-4 sm:w-4" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-midnight-blue">
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
          <div className="w-8 h-8 rounded-full bg-ocean-blue/20 flex items-center justify-center text-white">
            <Badge size={16} className="text-midnight-blue" />
          </div>
          <h2 className="text-2xl font-bold text-midnight-blue">
            Experience Package
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {tripData.experience.tier.tierInfo.map((tier, index) => (
            <TierSelectionCard
              key={index}
              tier={tier}
              currency={tripData.experience.tier.currency}
              isSelected={selectedTierIndex === index}
              onSelect={() => handleTierSelect(index)}
            />
          ))}
        </div>

        {errors.tier && (
          <p className="mt-1 text-sm text-red-600">{errors.tier.message}</p>
        )}

        {/* Custom Tier Option */}
        <CustomTierSection
          isCustomTierSelected={isCustomTierSelected}
          handleCustomTierSelect={handleCustomTierSelect}
          register={register}
          errors={errors}
        />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="pt-6 border-t border-gray-100"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full bg-ocean-blue/20 flex items-center justify-center text-white">
            <Calendar size={16} className="text-midnight-blue" />
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
                  <Calendar className="mr-2 h-4 w-4 text-midnight-blue" />
                  {startDate
                    ? format(startDate, "PPP")
                    : "Select trip start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 border-ocean-blue"
                align="start"
              >
                <CalendarComponent
                  mode="single"
                  selected={startDate || undefined}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < today}
                  initialFocus
                  classNames={{
                    day_selected:
                      "text-white bg-ocean-blue hover:bg-ocean-blue hover:text-white",
                    day_today: "bg-gray-100 text-midnight-blue",
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {startDate && (
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
                <span className="font-medium">{format(startDate, "PPP")}</span>
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
          <div className="w-8 h-8 rounded-full bg-ocean-blue/20 flex items-center justify-center text-white">
            <MessageSquare size={16} className="text-midnight-blue" />
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
          className="w-full bg-gradient-to-r from-midnight-blue to-ocean-blue text-white py-4 sm:py-6 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] hover:from-ocean-blue hover:to-midnight-blue transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Spinner size="small" />
            </span>
          ) : (
            <span className="flex items-center justify-center text-sm sm:text-base">
              Complete Booking
            </span>
          )}
        </Button>
      </motion.div>
      <Toast />
    </form>
  );
}
