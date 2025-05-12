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

export default function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<SignupData>>({ step: 1 });
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

  const emailExists = async (email: string) => {
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
    const finalData = { ...formData, ...data };

    // Upload the profile picture
    setSubmitting(true);
    if (finalData.profilePicture instanceof File) {
      const uploadedImageUrl = await uploadToCloudinary(
        finalData.profilePicture
      );
      // @ts-ignore
      finalData.profilePicture = uploadedImageUrl;
    }
    
    console.log("Form submitted:", finalData);

    const { data: Data, error } = await authClient.signUp.email({
      email: finalData.email?.toLowerCase() || "",
      password: finalData.password || "",
      name: finalData.firstName + " " + finalData.lastName,
      image: finalData.profilePicture || "", //@ts-ignore
      phoneNumber: finalData.phoneNumber || "",
      country: finalData.country || "",
      dob: finalData.dateOfBirth || "",
    });
    const twoFactorResponse = await authClient.twoFactor.enable({
      password: finalData.password || "",
    });

    if (twoFactorResponse.data && Data) {
      setSubmitting(false);
      setToastMessage("Account created successfully");
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
    const formData = new FormData();
    console.log("file", file);
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
        return "Create Your JourneyWise Account";
      case 2:
        return "Complete Your Travel Profile";
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
        return "Start your journey with us by creating your account.";
      case 2:
        return "Help us personalize your travel experiences.";
      case 3:
        return "Add a photo to make your profile complete.";
      default:
        return "Discover amazing travel experiences.";
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex justify-center items-center">
  <div className="flex w-[100%] overflow-hidden bg-white h-screen">

      
      {/* Left column - Illustrations with themed overlay */}
      <div
        className="hidden md:flex md:w-5/12 lg:w-6/12 relative"
        style={{
          backgroundImage: `url(${getStepIllustration()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Theme overlay with gradient blend */}
        <div className="absolute inset-0 bg-gradient-to-br from-midnight-blue/30  to-midnight-blue/50"></div>

        <div className="w-full flex flex-col items-center justify-center p-6 lg:p-12 relative overflow-hidden">
          {/* Logo top left */}
          <div className="absolute top-8 left-8">
            <Logo className="text-white text-2xl" /> {/* Changed to white for better visibility */}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              {/* Illustration */}
              <div className="w-full max-w-[400px] lg:max-w-[500px] mb-12 relative">
              
              </div>

              {/* Text content */}
              <div className="text-center px-6">
                <motion.h2
                  className="text-white text-2xl lg:text-3xl font-bold mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {getStepTitle()}
                </motion.h2>
                <motion.p
                  className="text-white max-w-md mx-auto"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {getStepDescription()}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Enhanced decorative elements */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-ocean-blue/20 to-transparent blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-midnight-blue/25 to-transparent blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-ocean-blue/15 blur-2xl"></div>
        </div>
      </div>

      {/* Right column - Form */}
      <div className="w-full md:w-7/12 lg:w-6/12 flex justify-center sm:py-12 sm:px-[100px] p-10">
        <div className="w-full">
          {/* Mobile logo */}
          <div className="md:hidden mb-8">
            <Logo className="text-2xl" />
          </div>

          <ProgressIndicator currentStep={step} totalSteps={3} />

          <div className="mt-8 min-h-[450px]">
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
        </div>
      </div>
      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
      </div>
    </div>
  );
}
