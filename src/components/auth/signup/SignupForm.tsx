import React, { useState } from "react";
import { SignupData } from "@/lib/schemas/user";
import { toast } from "@/components/ui/Toast";
import StepOne from "../StepOne";
import StepTwo from "../StepTwo";
import StepThree from "../StepThree";
import { AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/Logo";
import { useRouter } from "next/navigation";
import axios from "axios";
import { uploadToCloudinary } from "@/utils/functions/uploadToCloudinary";
import { authClient } from "@/lib/auth/authClient";
import Link from "next/link";
interface UserSignupFormProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  getStepTitle: () => string;
  getStepDescription: () => string;
  steps: { title: string; description: string }[];
}

export default function UserSignupForm({
  step,
  setStep,
  getStepTitle,
  getStepDescription,
  steps,
}: UserSignupFormProps) {
  const [formData, setFormData] = useState<Partial<SignupData>>({});
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

  const handleBack = (data: Partial<SignupData>) => {
    prevStep();
    setFormData((prev) => ({ ...prev, ...data }));
  }

  const handleFinalSubmit = async (data: Partial<SignupData>) => {
    // Existing implementation
    const finalData = { ...formData, ...data };
    setSubmitting(true);

    if (finalData.image instanceof File) {
      const uploadedImageUrl = await uploadToCloudinary(finalData.image);
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
        onSuccess: async (data) => {
          toast.success(
            "Account created successfully! Verification email sent."
          );

          setSubmitting(false);
          router.push("/login");
        },
      }
    );
  };

  return (
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
      <div className="flex-grow flex flex-col sm:justify-center w-full max-w-md mx-auto sm:mt-0 mt-[20px]">
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
              onBack={handleBack}
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
              onBack={handleBack}
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
  );
}
