"use client";

import { useState, useEffect } from "react";
import { WaypointTimeline } from "@/components/plan-trip/WaypointTimeline";
import { WaypointForm } from "@/components/plan-trip/WaypointForm";
import { GuideModal } from "@/components/plan-trip/guide-modal/components/GuideModal";
import ThumbnailModal from "@/components/blog/ThumbnailModal";
import { toast } from "@/components/ui/Toast";
import { useFieldArray, useForm } from "react-hook-form";
import {
  TripData,
  tripSchema,
  GuideData,
  WaypointData,
  waypointsSchema,
} from "@/lib/schemas/trip";
import { zodResolver } from "@hookform/resolvers/zod";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useRouter } from "next/navigation";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import useCreateTrip from "@/hooks/trip/useCreateTrip";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface TripPlannerComponentProps {
  initialData?: Partial<TripData>;
  isEditMode?: boolean;
  onSave?: (tripData: TripData) => void;
  onCancel?: () => void;
}

export default function TripPlannerComponent({
  initialData,
  isEditMode = false,
  onSave,
  onCancel,
}: TripPlannerComponentProps) {
  const [showGuide, setShowGuide] = useState(!isEditMode && !initialData?.waypoints?.length);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isThumbnailModalOpen, setIsThumbnailModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isGuideOpen, setIsGuideOpen] = useState(!isEditMode);
  const [guideDetails, setGuideDetails] = useState<GuideData | null>(
    initialData ? {
      numOfPeople: initialData.numOfPeople || 1,
      estimatedBudget: initialData.estimatedBudget || 0,
      estimatedDistance: initialData.estimatedDistance || 0,
      currency: initialData.currency || "USD",
      startLocation: initialData.startLocation,
      endLocation: initialData.endLocation,
    } : null
  );
  const [thumbnailUrl, setThumbnailUrl] = useState<File | string | null>(null);
  const router = useRouter();
  const { createTrip, isCreating } = useCreateTrip();
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<TripData>({
    resolver: zodResolver(waypointsSchema),
    defaultValues: {
      waypoints: initialData?.waypoints || [],
      thumbnailUrl: initialData?.thumbnailUrl || "",
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
  const { isDesktop } = useIsDesktop();

  // Initialize form with initial data
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleConfirm = async () => {
    if (!guideDetails) return;
    
    try {
      const waypointsData = watch("waypoints");
      console.log("Thumbnail URL inside confirm: " + thumbnailUrl);
      
      if (isEditMode && onSave) {
        const tripData: TripData = {
          ...guideDetails,
          waypoints: waypointsData,
          thumbnailUrl: initialData?.thumbnailUrl || "",
          userID: initialData?.userID || "",
        };
        onSave(tripData);
      } else {
        await createTrip({
          guideDetails,
          waypoints: waypointsData,
          thumbnailUrl: thumbnailUrl
        });
        
        setTimeout(() => {
          setGuideDetails(null);
          setThumbnailUrl(null);
          setIsConfirmationModalOpen(false);
          router.push("/success/trip");
        }, 2000);
      }
    } catch (err) {
      setIsConfirmationModalOpen(false);
    }
  };

  const handleGuideComplete = (data: GuideData) => {
    setGuideDetails(data);

    // Only create initial waypoints if not in edit mode or no existing waypoints
    if (!isEditMode || waypoints.length === 0) {
      const startWaypoint: WaypointData = {
        id: "start",
        name: data.startLocation || "Start Location",
        type: "start",
        description: "Starting point of your journey",
        imageUrl: undefined,
        hotels: [],
      };

      const endWaypoint: WaypointData = {
        id: "end",
        name: data.endLocation || "End Location",
        type: "end",
        description: "Final destination of your trip",
        imageUrl: undefined,
        hotels: [],
      };

      replace([startWaypoint, endWaypoint]);
    }
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
    if (data.waypoints.length < 2) {
      toast.error("Please add at least start and end waypoints");
      return;
    }
    
    if (!guideDetails) {
      toast.error("Please complete the trip details first");
      return;
    }
    
    // Merge guide details with form data
    const completeData = {
      ...data,
      ...guideDetails,
    };
    
    console.log("TripPlannerComponent - received data:", completeData);
    setIsThumbnailModalOpen(true);
  };

  const handleThumbnailConfirm = (thumbnailData: {
    category?: string;
    thumbnailUrl: File | string | null;
  }) => {
    console.log("TripPlannerComponent - received thumbnailData:", thumbnailData);
    setThumbnailUrl(thumbnailData.thumbnailUrl);
    console.log("TripPlannerComponent - set thumbnailUrl to:", thumbnailData.thumbnailUrl);
    setIsThumbnailModalOpen(false);
    setIsConfirmationModalOpen(true);
  };

  const handleImageUpload = (file: File) => {
    setValue(`waypoints.${activeIndex}.imageUrl`, file);
  };

  const handleOpenGuideModal = () => {
    setShowGuide(true);
  };

  useEffect(() => {
    setProgress(activeIndex / Math.max(waypoints.length - 1, 1));
  }, [activeIndex, waypoints.length]);

  return (
    <div className={`min-h-screen relative`}>
      <GuideModal 
        isOpen={showGuide} 
        onComplete={handleGuideComplete}
        initialData={guideDetails || undefined}
      />

      {/* Guide Settings Button - Always visible */}
      <Button
        onClick={handleOpenGuideModal}
        className="fixed top-4 right-4 z-50  border-[1px] border-ocean-blue bg-white text-ocean-blue hover:bg-white "
        size="sm"
      >
        <Settings className="w-4 h-4 mr-2" />
        Trip Settings
      </Button>

      {/* Cancel button for edit mode */}
      {isEditMode && onCancel && (
        <Button
          onClick={onCancel}
          variant="outline"
          className="fixed top-4 left-4 z-50"
          size="sm"
        >
          Cancel
        </Button>
      )}

      {isDesktop ? (
        // Desktop Layout
        <div className="grid grid-cols-[65%_35%] h-screen">
          <div className="relative h-full flex flex-col justify-center px-6 py-4 shadow-md border-r border-gray-200">
            <h2 className="text-3xl text-midnight-blue font-bold mb-4 absolute top-[50px] left-[37%] text-center">
              {isEditMode ? "Edit Trip" : "Trip Overview"}
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
                key={
                  watchWaypoints[activeIndex].id +
                  watchWaypoints[activeIndex].type
                }
                isGuideModalOpen={showGuide}
                inValid={focusOnFirstError}
                activeIndex={activeIndex}
                type={watchWaypoints[activeIndex].type}
                form={{
                  errors,
                  control,
                  register,
                  setValue,
                  handleSubmit,
                }}
                onAdd={handleAddWaypoint}
                onFinish={handleFinishPlanning}
                onImageUpload={handleImageUpload}
                onRemove={() => handleRemoveWaypoint(activeIndex)}
                isGuideOpen={isGuideOpen}
                setIsGuideOpen={setIsGuideOpen}
                isEditMode={isEditMode}
              />
            )}
          </div>
        </div>
      ) : (
        // Mobile Layout
        <div className="p-4 pt-16">
          <WaypointTimeline
            waypoints={watchWaypoints}
            activeIndex={activeIndex}
            onWaypointClick={setActiveIndex}
            progress={progress}
          />
          {waypoints.length > 0 && (
            <div className="mt-4 bg-white shadow-md p-4 rounded-lg min-h-[820px]">
              <WaypointForm
                key={
                  watchWaypoints[activeIndex].id +
                  watchWaypoints[activeIndex].type
                }
                inValid={focusOnFirstError}
                isGuideModalOpen={showGuide}
                activeIndex={activeIndex}
                type={watchWaypoints[activeIndex].type}
                form={{
                  errors,
                  control,
                  register,
                  setValue,
                  handleSubmit,
                }}
                onAdd={handleAddWaypoint}
                onFinish={handleFinishPlanning}
                onImageUpload={handleImageUpload}
                onRemove={() => handleRemoveWaypoint(activeIndex)}
                isGuideOpen={isGuideOpen}
                setIsGuideOpen={setIsGuideOpen}
                isEditMode={isEditMode}
              />
            </div>
          )}
        </div>
      )}

      <ThumbnailModal
        isOpen={isThumbnailModalOpen}
        onConfirm={handleThumbnailConfirm}
        onClose={() => setIsThumbnailModalOpen(false)}
        title={isEditMode ? "Update Trip Thumbnail" : "Add Trip Thumbnail"}
        description={isEditMode ? "Update the thumbnail image for your trip." : "Choose a thumbnail image for your trip. This will help you identify your trip later."}
        showCategory={false}
        
      />

      <ConfirmModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleConfirm}
        title="Confirmation"
        description={isEditMode ? "Are you sure you want to update this trip?" : "Are you sure you want to proceed with creating this trip?"}
        loading={isCreating}
        loadingText={isEditMode ? "Updating Trip..." : "Creating Trip..."}
      />
    </div>
  );
}
