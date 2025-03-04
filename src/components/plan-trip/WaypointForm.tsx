"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Hotel, Plus, Trash2, Link, HelpCircle, Upload } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
  useFieldArray,
  Control,
  useWatch,
  UseFormHandleSubmit,
} from "react-hook-form";
import { tripData } from "@/lib/schemas/trip";
import { WaypointType } from "@/lib/types/waypoint";

let rerenders = 0;
interface Hotel {
  id: string;
  name: string;
  detailsLink?: string;
  locationLink?: string;
}

interface WaypointFormProps {
  activeIndex: number;
  type: WaypointType;
  register: UseFormRegister<tripData>;
  errors: FieldErrors<tripData>;
  control: Control<tripData>;
  handleSubmit: UseFormHandleSubmit<tripData>;
  onPrevious: () => void;
  onAdd: () => void;
  onFinish: (data: tripData) => void;
  canGoPrevious: boolean;
  isLastWaypoint: boolean;
  setValue: UseFormSetValue<tripData>;
  onImageUpload: (file: File) => void;
  onNext: () => void;
  onRemove: () => void;
  isGuideModalOpen: boolean;
  inValid: (data: tripData) => void;
}

export const WaypointForm = ({
  activeIndex,
  type,
  register,
  setValue,
  control,
  handleSubmit,
  errors,
  onPrevious,
  onAdd,
  onFinish,
  canGoPrevious,
  onImageUpload,
  onNext,
  onRemove,
  isGuideModalOpen,
  inValid,  
}: WaypointFormProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(true);

  const { fields: hotels, append: appendHotel, remove: removeHotel } = useFieldArray({
    name: `waypoints.${activeIndex}.hotels`,
    control,
    
    
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        onImageUpload(acceptedFiles[0]);
        setValue(`waypoints.${activeIndex}.imageUrl`, acceptedFiles[0].name);
      }
    },
    noClick: true,
    disabled: type !== "attraction",
  });

  // Watch the entire waypoint for the active index
  const watchedWaypoint = useWatch({
    control,
    name: `waypoints.${activeIndex}`,
  });
  const nameValue = watchedWaypoint?.name || "";
  const descriptionValue = watchedWaypoint?.description || "";

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

  const formVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const TypeSelector = ({ ActiveIndex }: { ActiveIndex: number }) => (
    <div className="flex gap-2">
      <motion.button
        layout
        onClick={() => {

          if(watchedWaypoint.type === "start" || watchedWaypoint.type === "end"){
            return;
          }
          else{
            setValue(`waypoints.${ActiveIndex}.type`, "attraction")
          }
        }
      }
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${
          type === "attraction"
            ? "text-white bg-ocean-blue"
            : "text-charcoal hover:text-ocean-blue"
        }`}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {type === "attraction" && (
          <motion.div
            layoutId="bubble"
            className="absolute inset-0"
            style={{ borderRadius: 8 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
          />
        )}
        <span className="relative z-10 font-[Open Sans]">Attraction</span>
      </motion.button>
      <motion.button
        layout
        onClick={() =>
        {
          if(watchedWaypoint.type === "start" || watchedWaypoint.type === "end"){
            return;
          }
          else{
            setValue(`waypoints.${ActiveIndex}.type`, "stop")
          }
          
        }          
        }
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${
          type === "stop"
            ? "text-white bg-ocean-blue"
            : "text-charcoal hover:text-ocean-blue"
        }`}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {type === "stop" && (
          <motion.div
            layoutId="bubble"
            className="absolute inset-0 bg-ocean-blue"
            style={{ borderRadius: 8 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
          />
        )}
        <span className="relative z-10">Stop</span>
      </motion.button>
    </div>
  );
  rerenders++;

  const FormContent = (
    <motion.div
      key={`waypoint-${activeIndex}-${watchedWaypoint.type}`}
      variants={formVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="p-8 space-y-6 z-2"
    >
      <div className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label className="block text-base font-medium text-midnight-blue">
            Name
          </label>
          <input
            type="text"
            value={nameValue}
            onChange={(e) =>
              setValue(`waypoints.${activeIndex}.name`, e.target.value)
            }
            className="w-full px-4 h-11 rounded-lg border text-charcoal text-sm transition-all duration-200 outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
            placeholder="Enter waypoint name"
          />
          {errors.waypoints?.[activeIndex]?.name && (
            <p className="text-red-500 text-sm font-medium">
              {errors.waypoints[activeIndex].name.message}
            </p>
          )}
        </div>

        {/* Image Field for "attraction" */}
        {type === "attraction" && (
          <div className="space-y-2">
            <label className="block text-base font-medium text-midnight-blue">
              Image
            </label>
            <div className="relative">
              <div {...getRootProps()} className="group relative">
                <label
                  className={`flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 ${
                    isDragging
                      ? "border-ocean-blue bg-ocean-blue/10"
                      : "border-gray-300"
                  } border-dashed rounded-lg cursor-pointer hover:border-ocean-blue focus:outline-none`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Upload
                      className={`w-6 h-6 ${
                        isDragging ? "text-ocean-blue" : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        isDragging ? "text-ocean-blue" : "text-gray-500"
                      }`}
                    >
                      {isDragging
                        ? "Drag and drop or click to upload image"
                        : "Click to upload or drag and drop"}
                    </span>
                  </div>
                  <input {...getInputProps()} />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Hotels Field for "stop" */}
        {type === "stop" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="block text-base font-medium text-midnight-blue">
                  Hotels
                </label>
                <div className="relative group">
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-64 p-2 bg-white rounded-lg shadow-lg border border-gray-200 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all">
                    <p className="text-sm text-gray-600">
                      If you want to recommend a hotel, please fill the fields below
                    </p>
                  </div>
                </div>
              </div>
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
                        {...register(`waypoints.${activeIndex}.hotels.${index}.name`)}
                        className="w-full pl-10 pr-4 h-11 rounded-lg border text-charcoal text-sm transition-all outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
                        placeholder="Hotel name (required)"
                      />
                      {errors.waypoints?.[activeIndex]?.hotels?.[index]?.name && (
                        <p className="mt-1 text-red-500 text-sm font-medium">
                          {errors.waypoints[activeIndex].hotels[index].name.message}
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
                        {...register(`waypoints.${activeIndex}.hotels.${index}.detailsLink`)}
                        className="w-full pl-10 pr-4 h-11 rounded-lg border border-gray-200 text-charcoal text-sm transition-all outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
                        placeholder="Hotel details link (optional)"
                      />
                    </div>
                    <div className="relative">
                      <Link className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="url"
                        {...register(`waypoints.${activeIndex}.hotels.${index}.locationLink`)}
                        className="w-full pl-10 pr-4 h-11 rounded-lg border border-gray-200 text-charcoal text-sm transition-all outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
                        placeholder="Location link (optional)"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Description Field */}
        <div className="space-y-2">
          <label className="block text-base font-medium text-midnight-blue">
            Description
          </label>
          <textarea
            value={descriptionValue}
            onChange={(e) =>
              setValue(`waypoints.${activeIndex}.description`, e.target.value)
            }
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
      <div className="border-t border-gray-200 p-6 flex justify-between max-[500px]:flex-col max-[500px]:gap-y-[20px]">
        <button
          onClick={onPrevious}
          type="button"
          disabled={!canGoPrevious}
          className="px-6 py-2 rounded-lg text-sm font-medium bg-gray-100 text-charcoal hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Previous
        </button>
        <div className="flex gap-2 max-[410px]:flex-col max-[500px]:justify-between">
          <button
            type="submit"
            className="px-6 py-2 rounded-lg text-sm font-medium bg-midnight-blue text-white hover:bg-midnight-blue/90 transition-all"
          >
            Finish Planning
          </button>
          <button
            onClick={onNext}
            type="button"
            className="px-6 py-2 rounded-lg text-sm font-medium bg-ocean-blue text-white hover:bg-ocean-blue/90 transition-all"
          >
            Next
          </button>
        </div>
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
      <div className="top-0 z-20 bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <h2 className="text-2xl font-bold text-midnight-blue mb-6">
            Waypoint Details
          </h2>
          <div className="flex items-center justify-between">
            <TypeSelector ActiveIndex={activeIndex} />
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
                          className={`${isGuideOpen && !isGuideModalOpen ? "w-4 h-4" : "w-5 h-5"}`}
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white text-midnight-blue border border-gray-200 p-1 rounded-sm text-[13px]">
                      <p>Add a new waypoint</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {isGuideOpen && !isGuideModalOpen && (
                  <div className="absolute top-full left-4/2 transform -translate-x-3/4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-[400px]:min-w-[340px] max-w-[400px] z-[10000] min-w-[250px]">
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
                    <p className="text-sm text-charcoal mt-2">
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
                        <Trash2 className="w-6 h-6 text-red-500" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white text-midnight-blue border border-gray-200 p-1 rounded-sm text-[13px]">
                      <p>Remove waypoint</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onFinish,inValid)}>
        {FormContent}
      </form>
    </div>
  );
};
