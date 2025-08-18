"use client";

import { useState, useEffect } from "react";
import { WaypointTimeline } from "@/components/plan-trip/WaypointTimeline";
import { WaypointForm } from "@/components/plan-trip/WaypointForm";
import { GuideModal } from "@/components/plan-trip/guide-modal/GuideModal";
import { toast } from "@/components/ui/Toast";
import { useFieldArray, useForm } from "react-hook-form";
import {
  TripData,
  tripSchema,
  GuideData,
  WaypointData,
} from "@/lib/schemas/trip";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadToCloudinary } from "@/utils/functions/uploadToCloudinary";
import axios from "axios";
import ConfirmModal from "@/components/ui/ConfirmModal";

// Add a small hook
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)"); // lg breakpoint
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

export default function Home() {
  const [showGuide, setShowGuide] = useState(true);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionData, setSubmissionData] = useState<TripData | null>(null);
  // Guide data state - properly typed

  const [guideDetails, setGuideDetails] = useState<GuideData | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TripData>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      waypoints: [],
    },
    mode: "onSubmit",
  });

  const {
    fields: waypoints,
    remove: removeWaypoint,
    insert: insertWaypoint,
    replace,
  } = useFieldArray({
    name: "waypoints",
    control,
  });
  const watchWaypoints = watch("waypoints");
  const isDesktop = useIsDesktop();

  const handleConfirm = async () => {
    if (!guideDetails) return;
    let waypointsData = watch("waypoints");
    if(waypointsData.length <= 2) {
      toast.error("Please add at least 3 waypoints");
      return;
    }
    setIsSubmitting(true);
    try {
      // Upload images
      await Promise.all(
        waypointsData.map(async (waypoint, index) => {
          if (waypoint.imageUrl && waypoint.imageUrl !== "") {
            let uploadedUrl = await uploadToCloudinary(
              waypoint.imageUrl as File
            );
            URL.revokeObjectURL(waypoint.imageUrl as string); // Clean up URL
            setValue(`waypoints.${index}.imageUrl`, uploadedUrl);
          }
        })
      );
      let waypoints = watch("waypoints");
      // Prepare final data with guide details
      const finalTripData = {
        userID: "AoZUjvFu9ojeltXIiEbvdUh0hjW6P5cE",
        
        ...guideDetails,
        waypoints: waypoints,
      };

      await axios.post("/api/create-trip", { data: finalTripData });
      toast.success("Trip planned successfully");
    } catch (err) {
      console.error("Error creating trip:", err);
      toast.error("Trip planning failed");
    } finally {
      setIsSubmitting(false);
      setIsConfirmationModalOpen(false);
    }
  };

  const handleGuideComplete = (data: GuideData) => {
    setGuideDetails(data);

    // Create initial waypoints with guide data
    const startWaypoint: WaypointData = {
      id: "start",
      name: data.startLocation,
      type: "start",
      description: "Starting point of your journey",
      imageUrl: undefined,
      hotels: [],
    };

    const endWaypoint: WaypointData = {
      id: "end",
      name: data.endLocation,
      type: "end",
      description: "Final destination of your trip",
      imageUrl: undefined,
      hotels: [],
    };

    replace([startWaypoint, endWaypoint]);
    setShowGuide(false);
  };

  const handleAddWaypoint = () => {
    const newWaypoint: WaypointData = {
      id: `waypoint-${Date.now()}`,
      name: "",
      type: "attraction",
      description: "",
      imageUrl: "",
      hotels: [],
    };

    insertWaypoint(waypoints.length - 1, newWaypoint);
    setActiveIndex(waypoints.length - 1);
    setProgress((waypoints.length - 1) / waypoints.length);
  };

  const handleRemoveWaypoint = (index: number) => {
    if (index === 0 || index === waypoints.length - 1) return;
    removeWaypoint(index);
    if (activeIndex >= index && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const focusOnFirstError = (errors: any) => {
    if (errors?.waypoints && Array.isArray(errors.waypoints)) {
      const firstErrorIndex = errors.waypoints.findIndex(
        (waypointError: any) =>
          waypointError && Object.keys(waypointError).length > 0
      );
      if (firstErrorIndex !== -1) {
        setActiveIndex(firstErrorIndex);
        toast.error("Please fill in all required fields");
      }
    }
  };

  const handleFinishPlanning = (data: TripData) => {
    setIsConfirmationModalOpen(true);
    setSubmissionData(data);
  };

  const handleImageUpload = (file: File) => {
    setValue(`waypoints.${activeIndex}.imageUrl`, file);
  };

  useEffect(() => {
    setProgress(activeIndex / (waypoints.length - 1));
  }, [activeIndex, waypoints.length]);

  return (
    <div
      className={`min-h-screen relative`}
    >
      <GuideModal isOpen={showGuide} onComplete={handleGuideComplete} />

      {isDesktop ? (
        // Desktop Layout (only mounted on desktop)
        <div className="grid grid-cols-[65%_35%] h-screen">
          <div className="relative h-full flex flex-col justify-center px-6 py-4 shadow-md border-r border-gray-200">
            <h2 className="text-3xl text-midnight-blue font-bold mb-4 absolute top-[50px] left-[37%] text-center">
              Trip Overview
            </h2>
            <WaypointTimeline
              waypoints={watchWaypoints}
              activeIndex={activeIndex}
              onWaypointClick={setActiveIndex}
              progress={progress}
            />
          </div>

          <div className="relative min-h-[800px] p-8 border-l border-gray-200 rounded-lg">
            {waypoints.length > 0 && (
              <WaypointForm
                isGuideModalOpen={showGuide}
                inValid={focusOnFirstError}
                activeIndex={activeIndex}
                type={watchWaypoints[activeIndex].type}
                errors={errors}
                control={control}
                register={register}
                setValue={setValue}
                onAdd={handleAddWaypoint}
                onFinish={handleFinishPlanning}
                handleSubmit={handleSubmit}
                isLastWaypoint={activeIndex === waypoints.length - 2}
                onImageUpload={handleImageUpload}
                onRemove={() => handleRemoveWaypoint(activeIndex)}
              />
            )}
          </div>
        </div>
      ) : (
        // Mobile Layout (only mounted on mobile)
        <div className="p-4">
          <WaypointTimeline
            waypoints={watchWaypoints}
            activeIndex={activeIndex}
            onWaypointClick={setActiveIndex}
            progress={progress}
          />
          {waypoints.length > 0 && (
            <div className="mt-4 bg-white shadow-md p-4 rounded-lg min-h-[820px]">
              <WaypointForm
                inValid={focusOnFirstError}
                isGuideModalOpen={showGuide}
                activeIndex={activeIndex}
                type={watchWaypoints[activeIndex].type}
                errors={errors}
                control={control}
                register={register}
                setValue={setValue}
                onAdd={handleAddWaypoint}
                onFinish={handleFinishPlanning}
                handleSubmit={handleSubmit}
                isLastWaypoint={activeIndex === waypoints.length - 2}
                onImageUpload={handleImageUpload}
                onRemove={() => handleRemoveWaypoint(activeIndex)}
              />
            </div>
          )}
        </div>
      )}

      <ConfirmModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleConfirm}
        title="Confirmation"
        description="Are you sure you want to proceed with this action?"
        loading={isSubmitting}
        loadingText="Please wait..."
      />
    </div>
  );
}
