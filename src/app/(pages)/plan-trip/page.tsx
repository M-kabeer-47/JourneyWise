"use client"

import { useState, useEffect } from "react"
import { WaypointTimeline } from "@/components/plan-trip/WaypointTimeline"
import { WaypointForm } from "@/components/plan-trip/WaypointForm"
import { GuideModal } from "@/components/plan-trip/guide-modal/GuideModal"
import { Toast, toast } from "@/components/ui/Toast"
import { useFieldArray, useForm } from "react-hook-form"
import { tripData, tripSchema } from "@/lib/schemas/trip"
import { zodResolver } from "@hookform/resolvers/zod"
import ConfirmationModal from "@/components/ui/Modal"
import { uploadToCloudinary } from "@/utils/functions/uploadToCloudinary"
import Spinner from "@/components/ui/Spinner"
import axios from "axios"
export default function Home() {
  const [showGuide, setShowGuide] = useState(true)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [guideDetails, setGuideDetails] = useState({
    numPeople: 0,
    estimatedBudget: 0,
    currency: ""
  })
    

  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<tripData>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      waypoints: [
        {
          id: "start",
          name: "Start Location",
          description: "Starting point",
          type: "start",
          imageUrl: "",
          hotels: [],
        },
        {
          id: "end",
          name: "End Location",
          description: "Final destination",
          type: "end",
          imageUrl: "",
          hotels: [],
        },
      ],
    },
    mode: "onSubmit"
  })

  const { fields: waypoints, update: updateWaypoint, remove: removeWaypoint, insert: insertWaypoint } = useFieldArray({
    name: "waypoints",
    control,
  })
  const watchWaypoints = watch("waypoints")

  const handleConfirm = async (data: tripData["waypoints"]) => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 5000))
    await Promise.all(data.map(async (waypoint)=>{
      if(waypoint.imageUrl !== ""){
       waypoint.imageUrl = await uploadToCloudinary(waypoint.imageUrl as string)
      }
    }))
    let formData = {
      userId: "AoZUjvFu9ojeltXIiEbvdUh0hjW6P5cE",
      ...guideDetails,
      waypoints: data
    }
    await axios.post("/api/create-trip",{data:formData}).then((res)=>{
      toast.success("Trip planned successfully")
    }).catch((err)=>{
      toast.error("Trip planning failed")
    })

    setIsSubmitting(false)
    setIsConfirmationModalOpen(false)
  }

  const handleGuideComplete = (tripDetails: {
    numPeople: number
    estimatedBudget: number
    startLocation: string
    endLocation: string
    currency: string
    estimatedDuration: number
  }) => {
    const startWaypoint: tripData["waypoints"][number] = {
      id: "start",
      name: tripDetails.startLocation,
      type: "start",
      description: "Starting point of your journey",
      imageUrl: "",
      hotels: [],
    }

    const endWaypoint: tripData["waypoints"][number] = {
      id: "end",
      name: tripDetails.endLocation,
      type: "end",
      description: "Final destination of your trip",
      imageUrl: "",
      hotels: [],
    }

    setValue("waypoints", [startWaypoint, endWaypoint])
    setGuideDetails({
      numPeople: tripDetails.numPeople,
      estimatedBudget: tripDetails.estimatedBudget,
      
      currency: tripDetails.currency
    })
    setShowGuide(false)
  }

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setTimeout(() => {
        setActiveIndex(activeIndex - 1)
        setProgress((activeIndex - 1) / (waypoints.length - 1))
      }, 200)
    }
  }

  const handleAddWaypoint = () => {
    const newWaypoint = {
      id: `${String(waypoints.length + 1)}`,
      name: "",
      type: "attraction",
      description: "",
      imageUrl: "",
      hotels: [],
    }

    // Insert before the last element (the "end" waypoint)
    insertWaypoint(waypoints.length - 1, newWaypoint as tripData["waypoints"][number])

    // Set the active index to the new waypoint’s position
    setActiveIndex(waypoints.length - 1)
    setProgress((waypoints.length - 1) / (waypoints.length))
  }

  const handleNext = () => {
    if (activeIndex < waypoints.length - 1) {
      setTimeout(() => {
        setActiveIndex(activeIndex + 1)
        setProgress((activeIndex + 1) / (waypoints.length - 1))
      }, 200)
    }
  }

  const handleRemoveWaypoint = (index: number) => {
    if (index === 0 || index === waypoints.length - 1) return
    removeWaypoint(index)
  }

  function focusOnFirstError(errors: any, setActiveIndex: any) {
    alert("Errors: " + JSON.stringify(errors))
    if (errors?.waypoints && Array.isArray(errors.waypoints)) {
      const firstErrorIndex = errors.waypoints.findIndex(
        (waypointError: any) =>
          waypointError && Object.keys(waypointError).length > 0
      )
      if (firstErrorIndex !== -1) {
        setActiveIndex(firstErrorIndex)
        toast.error("Please fill in all fields")
      }
    }
  }

  const handleFinishPlanning = (data: tripData) => {
    console.log("FormData: " + data.waypoints)
    data.waypoints.forEach((waypoint) => {
      console.log(waypoint)
    })
    setIsConfirmationModalOpen(true)
  }

  function inValid(Errors: any) {
    focusOnFirstError(Errors, setActiveIndex)
  }

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string
      setValue(`waypoints.${activeIndex}.imageUrl`, imageUrl)
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    setProgress(activeIndex / (waypoints.length - 1))
    console.log("errors: " + JSON.stringify(errors.waypoints))
  }, [activeIndex, waypoints.length])

  return (
    <>
      {/* Spinner overlay with fixed positioning and high z-index */}
      {isSubmitting && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <Spinner size="large" />
        </div>
      )}
      {/* Main content container with conditional opacity */}
      <div className={`min-h-screen bg-[hsl(var(--background))] ${isSubmitting ? "opacity-50" : "opacity-100"}`}>
        <GuideModal isOpen={showGuide} onComplete={handleGuideComplete} />

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:h-screen">
          {/* Waypoint Timeline */}
          <div className="relative h-full flex flex-col justify-center px-6 py-4 bg-white shadow-md border-r border-gray-200 rounded-lg">
            <h2 className="text-3xl font-bold mb-4 absolute top-[50px] left-[37%] text-center">
              Trip Overview
            </h2>
            <WaypointTimeline
              waypoints={watchWaypoints}
              activeIndex={activeIndex}
              onWaypointClick={setActiveIndex}
              progress={progress}
            />
          </div>

          {/* Waypoint Form */}
          <div className="relative min-h-[800px] p-8 bg-gray-50 shadow-md border-l border-gray-200 rounded-lg">
            {waypoints.length > 0 && (
              <WaypointForm
                isGuideModalOpen={showGuide}
                inValid={inValid}
                activeIndex={activeIndex}
                type={watchWaypoints[activeIndex].type}
                errors={errors}
                control={control}
                register={register}
                setValue={setValue}
                onPrevious={handlePrevious}
                onAdd={handleAddWaypoint}
                onFinish={handleFinishPlanning}
                handleSubmit={handleSubmit}
                canGoPrevious={activeIndex > 0}
                isLastWaypoint={activeIndex === waypoints.length - 2}
                onImageUpload={handleImageUpload}
                onNext={handleNext}
                onRemove={() => handleRemoveWaypoint(activeIndex)}
              />
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden p-4">
          <WaypointTimeline
            waypoints={watchWaypoints}
            activeIndex={activeIndex}
            onWaypointClick={setActiveIndex}
            progress={progress}
          />
          {waypoints.length > 0 && (
            <div className="mt-4 bg-white shadow-md p-4 rounded-lg min-h-[820px]">
              <WaypointForm
                inValid={inValid}
                isGuideModalOpen={showGuide}
                activeIndex={activeIndex}
                type={watchWaypoints[activeIndex].type}
                errors={errors}
                control={control}
                register={register}
                setValue={setValue}
                onPrevious={handlePrevious}
                onAdd={handleAddWaypoint}
                onFinish={handleFinishPlanning}
                handleSubmit={handleSubmit}
                canGoPrevious={activeIndex > 0}
                isLastWaypoint={activeIndex === waypoints.length - 2}
                onImageUpload={handleImageUpload}
                onNext={handleNext}
                onRemove={() => handleRemoveWaypoint(activeIndex)}
              />
            </div>
          )}
        </div>
        <Toast />
        <ConfirmationModal
          data={watchWaypoints}
          isOpen={isConfirmationModalOpen}
          onClose={() => setIsConfirmationModalOpen(false)}
          onConfirm={handleConfirm}
          title="Confirmation"
          description="Are you sure you want to proceed with this action?"
        />
      </div>
    </>
  )
}
