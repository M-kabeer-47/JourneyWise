"use client";

import { useState } from "react";
import axios from "axios";
import StepOne from "@/components/auth/StepOne";
import StepTwo from "@/components/auth/StepTwo";
import StepThree from "@/components/auth/StepThree";
import ProgressIndicator from "@/components/auth/ProgressIndicator";
import Logo from "@/components/ui/Logo";

import { authClient } from "@/lib/auth/authClient";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SignupData } from "@/lib/schemas/user";
import { uploadToCloudinary } from "@/utils/functions/uploadToCloudinary";
import SignUpLayout from "@/components/auth/signup/SignupLayout";
import { toast } from "@/components/ui/Toast";
import UserSignupForm from "@/components/auth/signup/SignupForm";

export default function Signup() {
  // Keeping all your existing state and handlers
  const [step, setStep] = useState(1);

  // Keeping your existing functions

  // Get the appropriate illustration for each step
  const getStepIllustration = () => {
    switch (step) {
      case 1:
        return "/signup/stepOne.jpg";
      case 2:
        return "/signup/stepTwo.jpg";
      case 3:
        return "/signup/stepThree.jpg";
      default:
        return "/illustrations/stepOne.png";
    }
  };

  // Get the appropriate title for each step
  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Start Your Journey With Us";
      case 2:
        return "Personalize Your Experience";
      case 3:
        return "Add Your Personal Touch";
      default:
        return "Join JourneyWise";
    }
  };

  // Get the appropriate description for each step
  const getStepDescription = () => {
    switch (step) {
      case 1:
        return "Create an account to access personalized travel experiences.";
      case 2:
        return "Help us customize your adventures based on your preferences.";
      case 3:
        return "Add a photo and bio to complete your traveler profile.";
      default:
        return "Discover amazing travel experiences.";
    }
  };

  // Get step-specific accent color

  // Button gradient helper

  // Steps progress information
  const steps = [
    { title: "Account", description: "Create your account" },
    { title: "Profile", description: "Add personal details" },
    { title: "Finish", description: "Complete your profile" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="min-h-screen grid lg:grid-cols-2 overflow-hidden shadow-2xl lg:shadow-none">
        {/* Left Column - Visual Experience */}
        <SignUpLayout
          step={step}
          getStepIllustration={getStepIllustration}
          getStepTitle={getStepTitle}
          getStepDescription={getStepDescription}
          steps={steps}
        />

        {/* Right Column - Form Area */}
        <UserSignupForm
          step={step}
          setStep={setStep}
          getStepDescription={getStepDescription}
          getStepTitle={getStepTitle}
          steps={steps}
        />
      </div>

      {/* Toast notifications */}
    </div>
  );
}
