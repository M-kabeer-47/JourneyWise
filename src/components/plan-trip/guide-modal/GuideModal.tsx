"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { currencies } from "../../../lib/constants/currencies";
import { MapPin, Users, CheckCircle2, LucideIcon, Info } from "lucide-react";
import { ModalWrapper } from "./ModalWrapper";
import { ProgressSteps } from "./ProgressStep";
import { LocationStep } from "./steps/LocationStep";
import { DetailsStep } from "./steps/DetailsStep";
import { NextStepsStep } from "./steps/WhatsNextStep";
import { ReviewStep } from "./steps/ReviewStep";
import { GuideData, LocationStepData, DetailsStepData } from "@/lib/schemas/trip";

interface Step {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface GuideModalProps {
  isOpen: boolean;
  onComplete: (tripDetails: GuideData) => void;
}

export const GuideModal = ({ isOpen, onComplete }: GuideModalProps) => {
  const [step, setStep] = useState(1);
  const [guideData, setGuideData] = useState<Partial<GuideData>>({});

  const handleLocationNext = (data: LocationStepData) => {
    setGuideData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleDetailsNext = (data: DetailsStepData) => {
    const completedData = { ...guideData, ...data } as GuideData;
    setGuideData(completedData);
    setStep(3);
  };

  const handleNext = () => {
    if (step === 1) {
      // Trigger location form submission
      const form = document.getElementById(
        "location-form"
      ) as HTMLFormElement;
      if (form) {
        form.requestSubmit();
      }
    } else if (step === 2) {
      // Trigger details form submission
      const form = document.getElementById(
        "details-form"
      ) as HTMLFormElement;
      if (form) {
        form.requestSubmit();
      }
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      onComplete(guideData as GuideData);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const selectedCurrency =
    currencies.find((c) => c.code === guideData.currency) || currencies[0];

  const steps: Step[] = [
    {
      title: "Location",
      description: "Where are you heading?",
      icon: MapPin,
    },
    {
      title: "Details",
      description: "Trip essentials",
      icon: Users,
    },
    {
      title: "Next Steps",
      description: "What's ahead",
      icon: Info,
    },
    {
      title: "Review",
      description: "Final check",
      icon: CheckCircle2,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalWrapper
          overlayVariants={overlayVariants}
          modalVariants={modalVariants}
        >
          <ProgressSteps steps={steps} currentStep={step} />

          {step === 1 && (
            <LocationStep
              initialData={guideData}
              onNext={handleLocationNext}
            />
          )}

          {step === 2 && (
            <DetailsStep
              initialData={guideData}
              currencies={currencies}
              onNext={handleDetailsNext}
            />
          )}

          {step === 3 && <NextStepsStep />}

          {step === 4 && (
            <ReviewStep
              startLocation={guideData.startLocation || ""}
              endLocation={guideData.endLocation || ""}
              numPeople={guideData.numPeople || undefined}
              estimatedBudget={guideData.estimatedBudget || undefined}
              selectedCurrency={selectedCurrency }
            />
          )}

          <div className="mt-6 sm:mt-8 flex justify-between items-center border-t border-gray-100 pt-4">
            {step > 1 && (
              <button
                onClick={handlePrevious}
                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-charcoal hover:bg-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-gray-200 active:bg-gray-300"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="ml-auto px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm font-medium bg-ocean-blue text-white hover:bg-ocean-blue/90 transition-all focus:outline-none focus:ring-2 focus:ring-ocean-blue/50 active:bg-ocean-blue/80"
            >
              {step === 4 ? "Start Planning" : "Continue"}
            </button>
          </div>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
};
