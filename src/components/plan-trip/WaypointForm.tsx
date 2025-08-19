"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Hotel, Plus, Trash2, Link, Upload } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
  useFieldArray,
  Control,
  useWatch,
  UseFormHandleSubmit,
} from "react-hook-form";
import { TripData } from "@/lib/schemas/trip";
import { WaypointType } from "@/lib/types/waypoint";
import { ImageUpload } from "../ui/ImageUpload";
import TypeSelector from "./TypeSelector";

interface Hotel {
  id: string;
  name: string;
  detailsLink?: string;
  locationLink?: string;
}

interface WaypointFormProps {
  activeIndex: number;
  type: WaypointType;
  form: {
    register: UseFormRegister<TripData>;
    errors: FieldErrors<TripData>;
    control: Control<TripData>;
    handleSubmit: UseFormHandleSubmit<TripData>;
    setValue: UseFormSetValue<TripData>;
  };
  onAdd: () => void;
  onFinish: (data: TripData) => void;

  onImageUpload: (file: File) => void;
  onRemove: () => void;
  isGuideModalOpen: boolean;
  inValid: (data: TripData) => void;
  isGuideOpen: boolean;
  setIsGuideOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const formVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};



export const WaypointForm = ({
  activeIndex,
  type,
  form,
  onAdd,
  onFinish,
  onImageUpload,
  onRemove,
  isGuideModalOpen,
  isGuideOpen,
  setIsGuideOpen,
}: WaypointFormProps) => {
  const { register, setValue, control, handleSubmit, errors } = form;

  const {
    fields: hotels,
    append: appendHotel,
    remove: removeHotel,
  } = useFieldArray({
    name: `waypoints.${activeIndex}.hotels`,
    control,
  });

  // Watch the entire waypoint for the active index
  const watchedWaypoint = useWatch({
    control,
    name: `waypoints.${activeIndex}`,
  });

  const handleAddHotel = () => {
    const newHotel: Hotel = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: "",
      detailsLink: "",
      locationLink: "",
    };
    appendHotel(newHotel);
  };

  const handleRemoveHotel = (index: number) => {
    removeHotel(index);
  };

  const FormContent = (
    <motion.div
      key={`waypoint-${activeIndex}-${watchedWaypoint.type}`}
      variants={formVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="py-6 space-y-6 z-2"
    >
      <div className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label className="block text-base font-medium text-midnight-blue">
            Name
          </label>
          <input
            type="text"
            {...register(`waypoints.${activeIndex}.name`)}
            className="w-full px-4 h-11 rounded-lg border text-charcoal text-sm transition-all duration-200 outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
            placeholder="Enter waypoint name"
          />
          {errors.waypoints?.[activeIndex]?.name && (
            <p className="text-red-500 text-sm font-medium">
              {errors.waypoints[activeIndex].name.message}
            </p>
          )}
        </div>

        {/* Image Upload for Attraction */}
        {type === "attraction" && (
          <ImageUpload
            onImageUpload={onImageUpload}
            label="Attraction Image"
            placeholder="Click to upload or drag and drop"
            required={true}
            value={watchedWaypoint?.imageUrl}
            onRemove={() => setValue(`waypoints.${activeIndex}.imageUrl`, "")}
          />
        )}

        {/* Stop section - ONE image for the entire stop */}
        {type === "stop" && (
          <div className="space-y-4">
            {/* Location Image */}
            <ImageUpload
              onImageUpload={onImageUpload}
              label="Location Image "
              placeholder="Click to upload or drag and drop"
              required={false}
              value={watchedWaypoint?.imageUrl}
              onRemove={() => setValue(`waypoints.${activeIndex}.imageUrl`, "")}
            />

            {/* Hotels section - NO individual images */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-base font-medium text-midnight-blue">
                  Recommended Hotels
                </label>
                <button
                  onClick={handleAddHotel}
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-ocean-blue text-white hover:bg-ocean-blue/90 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add Hotel
                </button>
              </div>
              <div className="space-y-4">
                {hotels.map((hotel, index) => (
                  <div
                    key={hotel.id}
                    className="space-y-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="relative flex-1">
                        <Hotel className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          {...register(
                            `waypoints.${activeIndex}.hotels.${index}.name`
                          )}
                          className="w-full pl-10 pr-4 h-11 rounded-lg border text-charcoal text-sm transition-all outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
                          placeholder="Hotel name (required)"
                        />
                        {errors.waypoints?.[activeIndex]?.hotels?.[index]
                          ?.name && (
                          <p className="mt-1 text-red-500 text-sm font-medium">
                            {
                              errors.waypoints[activeIndex].hotels[index].name
                                .message
                            }
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveHotel(index)}
                        className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <Link className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="url"
                          {...register(
                            `waypoints.${activeIndex}.hotels.${index}.detailsLink`
                          )}
                          className="w-full pl-10 pr-4 h-11 rounded-lg border border-gray-200 text-charcoal text-sm transition-all outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
                          placeholder="Hotel details link (optional)"
                        />
                      </div>
                      <div className="relative">
                        <Link className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="url"
                          {...register(
                            `waypoints.${activeIndex}.hotels.${index}.locationLink`
                          )}
                          className="w-full pl-10 pr-4 h-11 rounded-lg border border-gray-200 text-charcoal text-sm transition-all outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
                          placeholder="Location link (optional)"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Description Field */}
        <div className="space-y-2">
          <label className="block text-base font-medium text-midnight-blue">
            Description
          </label>
          <textarea
            {...register(`waypoints.${activeIndex}.description`)}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border text-charcoal text-sm transition-all duration-200 outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
            placeholder="Add notes or description..."
          />
          {errors.waypoints?.[activeIndex]?.description && (
            <p className="text-red-500 text-sm font-medium">
              {errors.waypoints[activeIndex].description.message}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="border-t border-gray-200 py-3 flex justify-end">
        <button
          type="submit"
          onClick={() => console.log("data", errors)}
          className="px-6 py-2 rounded-lg text-sm font-medium bg-midnight-blue text-white hover:bg-midnight-blue/90 transition-all "
        >
          Finish Planning
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="h-screen relative">
      {isGuideOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsGuideOpen(false)}
        ></div>
      )}
      {/* Header */}
      <div className="top-0 z-20">
        <div className="py-6">
          <h2 className="text-2xl font-bold text-midnight-blue mb-6">
            Waypoint Details
          </h2>
          <div className="flex items-center justify-between">
            <TypeSelector
              activeIndex={activeIndex}
              watchedWaypoint={watchedWaypoint}
              setValue={setValue}
              type={type}
            />
            <div className="flex gap-[10px] items-center">
              <div className="relative inline-block">
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => {
                          onAdd();
                          setIsGuideOpen(false);
                        }}
                        aria-label="Add a new waypoint"
                        className={`group relative  p-2 ${
                          isGuideOpen && !isGuideModalOpen
                            ? "bg-ocean-blue rounded-full text-white z-[10000]"
                            : "text-ocean-blue"
                        } transition-all`}
                      >
                        <Plus
                          className={`${
                            isGuideOpen && !isGuideModalOpen
                              ? "w-4 h-4"
                              : "w-5 h-5"
                          }`}
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white text-charcoal font-medium border border-gray-200 p-1 rounded-sm text-xs relative left-[-10px]">
                      <p>Add a new waypoint</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {isGuideOpen && !isGuideModalOpen && (
                  <div className="absolute top-full left-[-50px] transform -translate-x-3/4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-[400px]:min-w-[300px]  z-[1000] min-w-[250px]">
                    <button
                      onClick={() => setIsGuideOpen(false)}
                      aria-label="Close guide"
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      ×
                    </button>
                    <h3 className="text-base font-bold text-midnight-blue">
                      Add Waypoint
                    </h3>
                    <p className="text-xs text-charcoal mt-2">
                      Click here to add a new waypoint to your itinerary.
                    </p>
                    <button
                      onClick={() => setIsGuideOpen(false)}
                      className="mt-4 w-full px-4 py-2 rounded-lg bg-midnight-blue text-white text-sm hover:bg-midnight-blue/90 transition-colors"
                    >
                      Got it
                    </button>
                  </div>
                )}
              </div>
              {type !== "start" && type !== "end" && (
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={onRemove}
                        className="group relative p-2 bg-white transition-all"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white text-charcoal font-medium border border-gray-200 p-1 rounded-sm text-xs relative left-[-10px]">
                      <p>Remove waypoint</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onFinish)}>{FormContent}</form>
    </div>
  );
};
