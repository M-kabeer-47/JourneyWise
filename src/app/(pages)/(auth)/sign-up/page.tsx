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

export default function Signup() {
  // Keeping all your existing state and handlers
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<SignupData>>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneError, setPhoneError] = useState({ message: "", status: false });
  const [firstStepLoading, setFirstStepLoading] = useState(false);
  const [secondStepLoading, setSecondStepLoading] = useState(false);
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const router = useRouter();

  // Keeping your existing functions
  const emailExists = async (email: string) => {
    // Existing implementation
    let response = await axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/app_auth/checkEmail`, {
        params: {
          email: email.toLowerCase(),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return {
            data: true,
            google: false,
          };
        }
      })
      .catch((error) => {
        if (error.response.status == 409) {
          return {
            data: true,
            google: true,
          };
        } else if (error.response.status == 400) {
          return {
            data: false,
            google: false,
          };
        }
      });
    return response;
  };

  const isValidPhoneNumber = (phone: string) => {
    const phoneRegex = /^[0-9]{12}$/;
    return phoneRegex.test(phone);
  };

  const checkPhone = async (phoneNumber: string) => {
    // Existing implementation
    let isValid = isValidPhoneNumber(phoneNumber);
    if (!isValid) {
      setPhoneError({ message: "Invalid phone number", status: true });
      return true;
    }
    let response = await axios
      .get(`/api/app_auth/checkPhone`, {
        params: {
          phone: phoneNumber,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return false;
        }
      })
      .catch((error) => {
        if (error.response.status == 409) {
          setPhoneError({ message: "Phone already exists", status: true });
          return true;
        } else if (error.response.status == 400) {
          return false;
        }
      });
    return response;
  };

  const handleStepSubmit = async (data: Partial<SignupData>) => {
    // Existing implementation
    if (step === 1) {
      //@ts-ignore
      setFirstStepLoading(true); // @ts-ignore
      let emailExistsCheck = await emailExists(data.email);

      if (
        emailExistsCheck &&
        emailExistsCheck.data === true &&
        emailExistsCheck.google === true
      ) {
        setEmailErrorMessage("Google account already exists");
        setEmailError(true);
        setFirstStepLoading(false);
        return;
      } else if (
        emailExistsCheck &&
        emailExistsCheck.data === true &&
        emailExistsCheck.google === false
      ) {
        setEmailErrorMessage("Email already exists");
        setEmailError(true);
        setFirstStepLoading(false);
        return;
      }
      setFirstStepLoading(false);
    } else if (step === 2) {
      setSecondStepLoading(true);
      let phoneExistsCheck = await checkPhone(data.phoneNumber || "");

      if (phoneExistsCheck) {
        setSecondStepLoading(false);
        return;
      }
      setSecondStepLoading(false);
    }

    setFormData((prev) => ({ ...prev, ...data }));
    nextStep();
  };

  const handleFinalSubmit = async (data: Partial<SignupData>) => {
    // Existing implementation
    const finalData = { ...formData, ...data };
    setSubmitting(true);

    if (finalData.image instanceof File) {
      const uploadedImageUrl = await uploadToCloudinary(
        finalData.image
      );
      finalData.image = uploadedImageUrl;
    }
    console.log("Type of finalData.dateOfBirth:", finalData.dob);
    const { data: Data, error } = await authClient.signUp.email(
      {
        email: finalData.email?.toLowerCase() || "",
        password: finalData.password || "",
        name: finalData.name || "",
        image: finalData.image || "",
        phoneNumber: finalData.phoneNumber || "",
        country: finalData.country || "",
        dob: finalData.dob || "",
      },
      {
        onError: (error) => {
          setSubmitting(false);
          console.log("Error creating account:", error);
        },
      }
    );

    if (Data) {
      setSubmitting(false);
      setToastMessage(
        "Account created successfully, Verification email has been sent"
      );
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        router.push("/login");
      }, 3000);
    } else {
      setToastMessage("Please try again later");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  
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
        <SignUpLayout step={step} getStepIllustration={getStepIllustration} getStepTitle={getStepTitle} getStepDescription={getStepDescription} steps={steps}/>
        
        {/* Right Column - Form Area */}
        <div className="flex flex-col justify-between px-4 sm:px-6 py-6 lg:p-12">
          {/* Mobile header */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <Logo className="text-xl sm:text-2xl" />
              <div className="text-xs sm:text-sm">Step {step} of 3</div>
            </div>

            {/* Mobile progress bar */}
            <div className="w-full h-1.5 sm:h-2 bg-gray-100 rounded-full mb-6 sm:mb-8">
              <div
                className={`h-full rounded-full bg-gradient-to-r from-ocean-blue to-midnight-blue transition-all duration-500 ease-out`}
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>

            <div className="mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-midnight-blue mb-1 sm:mb-2">
                {getStepTitle()}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">
                {getStepDescription()}
              </p>
            </div>
          </div>

          {/* Form container */}
          <div className="flex-grow flex flex-col justify-center w-full max-w-md mx-auto">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <StepOne
                  onSubmit={handleStepSubmit}
                  initialData={formData}
                  emailError={emailError}
                  setEmailError={setEmailError}
                  setFormData={setFormData}
                  firstStepLoading={firstStepLoading}
                  emailErrorMesssage={emailErrorMessage}
                />
              )}
              {step === 2 && (
                <StepTwo
                  onSubmit={handleStepSubmit}
                  onBack={prevStep}
                  initialData={formData}
                  setFormData={setFormData}
                  phoneError={phoneError}
                  setPhoneError={setPhoneError}
                  secondStepLoading={secondStepLoading}
                />
              )}
              {step === 3 && (
                <StepThree
                  onSubmit={handleFinalSubmit}
                  onBack={prevStep}
                  initialData={formData}
                  submitting={submitting}
                  type={"user"}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100 text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-ocean-blue font-medium hover:text-ocean-blue/80 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Toast notifications */}
      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
