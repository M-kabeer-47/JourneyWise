"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LivePreview from "@/components/create_trip/LivePreview/LivePreview"
import FormStep1 from "@/components/create_trip/Form/StepOne"
import FormStep2 from "@/components/create_trip/Form/StepTwo"
import FormStep3 from "@/components/create_trip/Form/StepThree"
import FormStep4 from "@/components/create_trip/Form/StepFour"
import {
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
  stepFourSchema,
  type ExperienceData,
  formSchema,
} from "@/lib/schemas/experience"
import { uploadToCloudinary } from "@/utils/functions/uploadToCloudinary"
import { toast } from "@/components/ui/Toast"
import axios from "axios"
import Overlay from "@/components/ui/Overlay"


export default function CreateExperience() {
  const [currentStep, setCurrentStep] = useState(1)
  const [activeTierIndex, setActiveTierIndex] = useState(0)
  const [submit, setSubmit] = useState(false)
  const [clickedNext, setClickedNext] = useState(false)
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const [formData, setFormData] = useState<ExperienceData>({
    title: "",
    country: "",
    city: "",
    category: "",
    countryCode: "",
    duration: 0,
    tags: [],
    description: "",
    availability: "available",
    gigImage: "",
    currency: "USD",
    tiers: [{ name: "", members: 0, price: 0, description: "" }],
    requirements: [""],
    images: [],
    includedServices: [""],
    excludedServices: [""],
    destinations: [
      {
        id: "1",
        day: 1,
        name: "Start",
        activities: [{ id: "1", name: "Departure" }],
      },
    ],
  })
  const [errors, setErrors] = useState<Partial<ExperienceData>>({})
  const totalSteps = 4

  useEffect(()=>{
    scrollTo(0,0)
  },[currentStep])

  const validateStep = () => {
    let schema
    let imageError = false
    switch (currentStep) {
      case 1:
        schema = stepOneSchema
        break
      case 2:
        schema = stepTwoSchema
        break
      case 3:
        schema = stepThreeSchema
        break
      case 4:
        schema = stepFourSchema
        break
      default:
        schema = formSchema
    }

    try {
      schema.parse(formData)
      setErrors({})
      return true
    } catch (error: any) {
      let errors = setErrors(
        error.errors.reduce((acc: any, curr: any) => {
          acc[curr.path[0]] = curr.message
          // console.log("acc",acc)
          console.log("acc",acc)
          // if the length of acc is 1 and the key is gigImage and the value is Expected string, received object. I
          if(Object.keys(acc).length === 1 && acc.gigImage === "Expected string, received object"){
            imageError = true
            return {gigImage: ""}
            // I want to return true to the function            
          }
          else if(Object.keys(acc).length === 1 && acc.images === "Expected string, received object"){
            imageError = true
            return {images: []}
            // I want to return true to the function            
          }
          return acc
        }, {})
      )
      if(imageError){
        return true
      }
      else{
        return false
      }
      
    }
  }

  const handleNext = () => {
    console.log("handleNext called, currentStep:", currentStep)
    setClickedNext(true)

    // console.log("clickedNext",clickedNext)

    const isValid = validateStep()
    console.log("isValid", isValid)
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
      setClickedNext(false)
    }
    else{
      toast.error("Please fix the errors before proceeding.")
    }
  }

  const handlePrevious = () => {
    setSubmit(false)
    setClickedNext(false)
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleInputChange = (field: keyof ExperienceData, value: any) => {
    
    setClickedNext(false)
    setSubmit(false)
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    console.log("onSubmit called, currentStep:", currentStep)
    e.preventDefault()
    
      setSubmit(true)
      console.log("currentStep", currentStep)

      const isValid = validateStep()
      console.log("isValid", isValid) 
      if (isValid) {
        
        setIsOverlayVisible(true)

        console.log(formData)
          formData.gigImage = await uploadToCloudinary(formData.gigImage)

          formData.images = await Promise.all(formData.images.map(async (image) => {
            return await uploadToCloudinary(image)
          }))

        await axios.post("/api/create_experience", {
          
          data: {...formData, agentId: "4d19d13d-4c4b-4462-98a1-ab88c19aeb32"},
          
        }).then((res)=>{
          if(res.status === 200){
            setSubmit(false)
            setIsOverlayVisible(false)
            toast.success("Experience created successfully!")

          }
        })
        .catch((error)=>{
          setSubmit(false)
          setIsOverlayVisible(false)
          toast.error("Experience creation failed!")
        })
        


        


        
        
        

        // Handle form submission
      }
      else{
        toast.error("Please fix the errors before proceeding.")
      }
    }
  

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-[1fr,1fr] gap-6">
          {/* Preview Section - Now on left */}
          <div className="lg:sticky lg:top-6 h-fit order-2 lg:order-1">
            <LivePreview
              formData={formData}
              currentStep={currentStep}
              activeTierIndex={activeTierIndex}
              setActiveTierIndex={setActiveTierIndex}
            />
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 order-1 lg:order-2">
            <form onSubmit={onSubmit}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 1 && (
                    <FormStep1 formData={formData} handleInputChange={handleInputChange} errors={errors} />
                  )}
                  {currentStep === 2 && (
                    <FormStep2
                      clickedNext={clickedNext}
                      formData={formData}
                      handleInputChange={handleInputChange}
                      errors={errors}
                    />
                  )}
                  {currentStep === 3 && (
                    <FormStep3 formData={formData} handleInputChange={handleInputChange} errors={errors} />
                  )}
                  {currentStep === 4 && (
                    <FormStep4
                      formData={formData}
                      handleInputChange={handleInputChange}
                      setActiveTierIndex={setActiveTierIndex}
                      errors={errors}
                      submit={submit}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="px-6 h-11 rounded-lg border-2 border-ocean-blue text-ocean-blue font-medium 
                           transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                           hover:bg-ocean-blue hover:text-white"
                >
                  Previous
                </button>
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={()=>{
                      handleNext()
                    }}
                    className="px-6 h-11 rounded-lg bg-ocean-blue text-white font-medium
                             transition-all duration-200 hover:bg-midnight-blue"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      if(currentStep === 4){
                        onSubmit(e as React.FormEvent)
                      }
                    }}
                    className="px-6 h-11 rounded-lg bg-ocean-blue text-white font-medium
                             transition-all duration-200 hover:bg-midnight-blue"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <Overlay isVisible={isOverlayVisible} />
    </div>
  )
}



