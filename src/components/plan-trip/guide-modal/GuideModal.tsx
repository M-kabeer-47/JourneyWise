"use client"

import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import { currencies } from "../../../lib/data/currencies"
import { MapPin, Users, CheckCircle2, LucideIcon } from "lucide-react"
import { ModalWrapper } from "./ModalWrapper"
import { ProgressSteps } from "./ProgressStep"
import { LocationStep } from "./steps/LocationStep"
import { DetailsStep } from "./steps/DetailsStep"
import { NextStepsStep } from "./steps/WhatsNextStep"
import { ReviewStep } from "./steps/ReviewStep"

interface Step {
  title: string
  description: string
  icon: LucideIcon
  completed: boolean
}
interface GuideModalProps {
  isOpen: boolean
  onComplete: (tripDetails: {
    numPeople: number
    estimatedBudget: number
    startLocation: string
    endLocation: string
    currency: string
  }) => void
}

export const GuideModal = ({ isOpen, onComplete }: GuideModalProps) => {
  const [step, setStep] = useState(1)
  const [numPeople, setNumPeople] = useState(1)
  const [estimatedBudget, setEstimatedBudget] = useState(1000)
  const [startLocation, setStartLocation] = useState("")
  const [endLocation, setEndLocation] = useState("")
  const [currency, setCurrency] = useState("USD")

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      onComplete({
        numPeople,
        estimatedBudget,
        startLocation,
        endLocation,
        currency,
      })
    }
  }

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
  }

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
  }

  const selectedCurrency = currencies.find((c) => c.code === currency) || currencies[0]

  const steps = [
    {
      title: "Location",
      description: "Where are you heading?",
      icon: MapPin,
      completed: startLocation && endLocation,
    },
    {
      title: "Details",
      description: "Trip essentials",
      icon: Users,
      completed: numPeople > 1 && estimatedBudget > 1 && currency,
    },
    {
      title: "Next Steps",
      description: "What's ahead",
      icon: CheckCircle2,
      completed: false,
    },
    {
      title: "Review",
      description: "Final check",
      icon: CheckCircle2,
      completed: false,
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalWrapper overlayVariants={overlayVariants} modalVariants={modalVariants}>
          <ProgressSteps steps={steps as Step[]} currentStep={step} />

          {step === 1 && (
            <LocationStep
              startLocation={startLocation}
              endLocation={endLocation}
              onStartLocationChange={setStartLocation}
              onEndLocationChange={setEndLocation}
            />
          )}

          {step === 2 && (
            <DetailsStep
              numPeople={numPeople}
              estimatedBudget={estimatedBudget}
              currency={currency}
              selectedCurrency={selectedCurrency}
              currencies={currencies}
              onNumPeopleChange={setNumPeople}
              onEstimatedBudgetChange={setEstimatedBudget}
              onCurrencyChange={setCurrency}
            />
          )}

          {step === 3 && <NextStepsStep />}

          {step === 4 && (
            <ReviewStep
              startLocation={startLocation}
              endLocation={endLocation}
              numPeople={numPeople}
              estimatedBudget={estimatedBudget}
              selectedCurrency={selectedCurrency}
            />
          )}

          <div className="mt-6 sm:mt-8 flex justify-between items-center border-t border-gray-100 pt-4">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-charcoal hover:bg-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-gray-200 active:bg-gray-300"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && (!startLocation || !endLocation)) ||
                (step === 2 && (numPeople < 1 || estimatedBudget < 0 || !currency))
              }
              className="ml-auto px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm font-medium bg-ocean-blue text-white hover:bg-ocean-blue/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ocean-blue/50 active:bg-ocean-blue/80"
            >
              {step === 4 ? "Start Planning" : "Continue"}
            </button>
          </div>
        </ModalWrapper>
      )}
    </AnimatePresence>
  )
}