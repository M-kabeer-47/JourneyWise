"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LivePreview from "@/components/create_trip/LivePreview/LivePreview";
import FormStep1 from "@/components/create_trip/Form/StepOne";
import FormStep2 from "@/components/create_trip/Form/StepTwo";
import FormStep3 from "@/components/create_trip/Form/StepThree";
import FormStep4 from "@/components/create_trip/Form/StepFour";
import {
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
  stepFourSchema,
  type ExperienceData,
  formSchema,
} from "@/lib/schemas/experience";
import { uploadToCloudinary } from "@/utils/functions/uploadToCloudinary";
import { toast } from "@/components/ui/Toast";
import axios from "axios";

import { Loader, Loader2 } from "lucide-react";

export default function CreateExperience() {
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTierIndex, setActiveTierIndex] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [clickedNext, setClickedNext] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [errors, setErrors] = useState<Partial<ExperienceData>>({});

  // Memoize initial form data
  const initialFormData = useMemo(
    (): ExperienceData => ({
      title: "",
      country: "",
      city: "",
      category: "",
      countryCode: "",
      duration: 0,
      tags: [],
      description: "",
      availability: "available",
      experienceImage: "",
      currency: "USD",
      tiers: [{ name: "", members: 0, price: 0, description: "" }],
      requirements: [""],
      experienceImages: [],
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
    }),
    []
  );

  const [formData, setFormData] = useState<ExperienceData>(initialFormData);
  const totalSteps = 4;

  useEffect(() => {
    scrollTo(0, 0);
  }, [currentStep]);

  // Memoize validation schemas
  const validationSchemas = useMemo(
    () => ({
      1: stepOneSchema,
      2: stepTwoSchema,
      3: stepThreeSchema,
      4: stepFourSchema,
    }),
    []
  );

  const validateStep = useCallback(() => {
    const schema =
      validationSchemas[currentStep as keyof typeof validationSchemas] ||
      formSchema;
    let imageError = false;
    console.log("Current step: " + currentStep);

    try {
      schema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const newErrors = error.errors.reduce((acc: any, curr: any) => {
        acc[curr.path[0]] = curr.message;

        // Handle image validation edge cases
        if (Object.keys(acc).length === 1) {
          if (
            acc.experienceImage === "Expected string, received object" ||
            acc.experienceImages === "Expected string, received object"
          ) {
            imageError = true;
            return acc.experienceImage
              ? { experienceImage: "" }
              : { experienceImages: [] };
          }
        }
        return acc;
      }, {});

      setErrors(newErrors);
      return imageError;
    }
  }, [currentStep, formData, validationSchemas]);

  const handleNext = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault(); // Prevent form submission
      setClickedNext(true);
      const isValid = validateStep();

      if (isValid) {
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
        setClickedNext(false);
      } else {
        toast.error("Please fix the errors before proceeding.");
      }
    },
    [validateStep]
  );

  const handlePrevious = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault(); // Prevent form submission
      setSubmit(false);
      setClickedNext(false);
      setCurrentStep((prev) => Math.max(prev - 1, 1));
    },
    []
  );

  const handleInputChange = useCallback(
    (field: keyof ExperienceData, value: any) => {
      setClickedNext(false);
      setSubmit(false);
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear errors for the field being updated
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const isValid = validateStep();
      if (!isValid) {
        toast.error("Please fix the errors before proceeding.");

        return;
      }

      try {
        setSubmit(true);

        // Upload experienceImages concurrently
        const [uploadedGigImage, uploadedImages] = await Promise.all([
          uploadToCloudinary(formData.experienceImage),
          Promise.all(
            formData.experienceImages.map((image) => uploadToCloudinary(image))
          ),
        ]);
        // extract min Price from tiers in from formData
        let minPrice = formData.tiers[0].price;
        formData.tiers.forEach((tier) => {
          if (minPrice >= tier.price) minPrice = tier.price;
        });

        const submissionData = {
          ...formData,
          experienceImage: uploadedGigImage,
          experienceImages: uploadedImages,
          agentID: "4d19d13d-4c4b-4462-98a1-ab88c19aeb32",
          tier: { ...formData.tiers, currency: formData.currency },
          location: {
            country: formData.country,
            city: formData.city,
          },
          minPrice: minPrice,
          averageRating: 0,
          itineraryDetails:formData.destinations,
          isAvailable: formData.availability === "available" ? true : false

          

        };

        const response = await axios.post("/api/create-experience", {
          data: submissionData,
        });

        if (response.status === 200) {
          toast.success("Experience created successfully!");
          // Reset form or redirect
        }
      } catch (error) {
        console.error("Submission error:", error);
        toast.error("Experience creation failed!");
      } finally {
        setSubmit(false);
        setIsOverlayVisible(false);
      }
    },
    [formData, validateStep]
  );

  // Memoize step components to prevent unnecessary re-renders
  const stepComponents = useMemo(
    () => ({
      1: (
        <FormStep1
          initialData={formData}
          formData={formData}
          handleInputChange={handleInputChange}
          errors={errors}
        />
      ),
      2: (
        <FormStep2
          clickedNext={clickedNext}
          formData={formData}
          handleInputChange={handleInputChange}
          errors={errors}
        />
      ),
      3: (
        <FormStep3
          formData={formData}
          handleInputChange={handleInputChange}
          errors={errors}
        />
      ),
      4: (
        <FormStep4
          formData={formData}
          handleInputChange={handleInputChange}
          setActiveTierIndex={setActiveTierIndex}
          errors={errors}
          submit={submit}
        />
      ),
    }),
    [formData, handleInputChange, errors, clickedNext, submit]
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-[1fr,1fr] gap-6">
          {/* Preview Section */}
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
                  {stepComponents[currentStep as keyof typeof stepComponents]}
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
                    onClick={handleNext}
                    className="px-6 h-11 rounded-lg bg-ocean-blue text-white font-medium
                             transition-all duration-200 hover:bg-midnight-blue"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submit}
                    className="px-6 h-11 rounded-lg bg-ocean-blue text-white font-medium
                             transition-all duration-200 hover:bg-midnight-blue disabled:opacity-50"
                  >
                    {submit ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin h-6 w-6 text-white" />
                        <p>Submitting...</p>
                      </div>
                    ) : (
                      <p>Submit</p>
                    )}{" "}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* <Overlay isVisible={isOverlayVisible} /> */}
    </div>
  );
}
