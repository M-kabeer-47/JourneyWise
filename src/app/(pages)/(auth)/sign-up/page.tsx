"use client";

import { useState } from "react";
import axios from "axios";
import StepOne from "@/components/auth/StepOne";
import StepTwo from "@/components/auth/StepTwo";
import StepThree from "@/components/auth/StepThree";
import ProgressIndicator from "@/components/auth/ProgressIndicator";
import Logo from "@/components/ui/Logo";
import { SignupData } from "./types";
import Toast from "@/components/auth/Custom-Toast";
import { authClient } from "@/lib/auth/authClient";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    
    if (finalData.profilePicture instanceof File) {
      const uploadedImageUrl = await uploadToCloudinary(finalData.profilePicture);
      finalData.profilePicture = uploadedImageUrl;
    }

    const { data: Data, error } = await authClient.signUp.email({
      email: finalData.email?.toLowerCase() || "",
      password: finalData.password || "",
      name: finalData.name || "",
      image: finalData.profilePicture || "",
      phoneNumber: finalData.phoneNumber || "",
      country: finalData.country || "",
      dob: finalData.dateOfBirth || "",
    });

    if (Data) {
      setSubmitting(false);
      setToastMessage("Account created successfully, Verification email has been sent");
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

  const uploadToCloudinary = async (file: File): Promise<string> => {
    // Existing implementation
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
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
  const getStepAccentColor = () => {
    switch (step) {
      case 1: return "from-ocean-blue to-midnight-blue";
      case 2: return "from-ocean-blue to-midnight-blue";
      case 3: return "from-ocean-blue to-midnight-blue";
      default: return "from-ocean-blue to-midnight-blue";
    }
  };
  
  // Button gradient helper
  const getButtonGradient = () => {
    return "bg-gradient-to-r from-ocean-blue to-midnight-blue";
  };

  // Steps progress information
  const steps = [
    { title: "Account", description: "Create your account" },
    { title: "Profile", description: "Add personal details" },
    { title: "Finish", description: "Complete your profile" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-screen-2xl mx-auto min-h-screen grid lg:grid-cols-2 overflow-hidden shadow-2xl lg:shadow-none">
        {/* Left Column - Visual Experience */}
        <div className="relative hidden lg:flex">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 w-full h-full">
            <motion.div 
              key={`image-${step}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full h-full"
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${getStepIllustration()})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-ocean-blue to-midnight-blue opacity-70" />
            </motion.div>
          </div>

          {/* Content Layer */}
          <div className="relative w-full h-full flex flex-col z-10 p-6 md:p-8 lg:p-12">
            {/* Top area - Logo */}
            <div className="flex items-center mb-8">
              <Logo className="text-white text-2xl lg:text-3xl" />
            </div>

            {/* Middle area - Main content */}
            <div className="flex-grow flex flex-col justify-center items-start space-y-6 lg:space-y-8 max-w-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${step}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  {/* Step indicator */}
                  <div className="inline-flex items-center px-3 py-1.5 lg:px-4 lg:py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs lg:text-sm font-medium mb-4 lg:mb-6">
                    <span>Step {step} of 3</span>
                    <span className="w-1 h-1 bg-white rounded-full mx-2 opacity-60"></span>
                    <span>{steps[step-1].title}</span>
                  </div>

                  {/* Title and description */}
                  <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 lg:mb-6 leading-tight">
                    {getStepTitle()}
                  </h1>
                  <p className="text-base lg:text-lg text-white/80 mb-6 lg:mb-8 max-w-md">
                    {getStepDescription()}
                  </p>
                  
                  {/* Feature Box - Responsive */}
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 lg:p-6 border border-white/20 max-w-md">
                    <div className="flex items-start">
                      <div className="bg-white rounded-full p-1.5 lg:p-2 mr-3 lg:mr-4 flex-shrink-0">
                        {/* SVG icons remain the same */}
                        {step === 1 && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 text-ocean-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}
                        {step === 2 && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 text-ocean-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>}
                        {step === 3 && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 text-ocean-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" /></svg>}
                      </div>
                      <div>
                        <h3 className="text-base lg:text-lg font-semibold text-white mb-1 lg:mb-2">
                          {step === 1 && "Secure and Simple"}
                          {step === 2 && "Personalized Journeys"}
                          {step === 3 && "Join Our Community"}
                        </h3>
                        
                        <p className="text-xs lg:text-sm text-white/70">
                          {step === 1 && "Your information is encrypted and secure. Creating an account takes less than 2 minutes."}
                          {step === 2 && "Tell us about yourself so we can recommend experiences tailored just for you."}
                          {step === 3 && "Connect with fellow travelers and share your adventures with our global community."}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom area - Steps progress - more responsive */}
            <div className="pt-6 lg:pt-12">
              <div className="flex flex-wrap items-center gap-x-3 lg:gap-x-4 gap-y-2">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className={`flex items-center ${i < step ? 'text-white' : i === step ? 'text-white' : 'text-white/40'}`}
                  >
                    <div 
                      className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center mr-2 lg:mr-3 border-2
                        ${i < step 
                          ? 'bg-white border-white' 
                          : i === step 
                            ? 'border-white bg-transparent' 
                            : 'border-white/40 bg-transparent'}`}
                    >
                      {i < step ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 lg:h-4 lg:w-4 text-ocean-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                      ) : (
                        <span className={`text-xs lg:text-sm ${i === step ? '' : 'opacity-40'}`}>{i}</span>
                      )}
                    </div>
                    <div className={`${i !== step && 'opacity-80'}`}>
                      <p className="text-xs lg:text-sm font-medium">{steps[i-1].title}</p>
                      <p className="text-[10px] lg:text-xs">{steps[i-1].description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form Area */}
        <div className="flex flex-col justify-between px-4 sm:px-6 py-6 lg:p-12">
          {/* Mobile header */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <Logo className="text-xl sm:text-2xl" />
              <div className="text-xs sm:text-sm">
                Step {step} of 3
              </div>
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