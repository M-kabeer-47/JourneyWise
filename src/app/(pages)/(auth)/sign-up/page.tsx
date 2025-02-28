"use client";

import { useState } from "react";
import axios from "axios";
import StepOne from "../../../../components/auth/StepOne";
import StepTwo from "../../../../components/auth/StepTwo";
import StepThree from "../../../../components/auth/StepThree";
import ProgressIndicator from "../../../../components/auth/ProgressIndicator";
import Logo from "../../../../components/ui/Logo";
import { SignupData } from "./types";
import Toast from "../../../../components/auth/Custom-Toast";
import { authClient } from "@/lib/auth/authClient";

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
    if (finalData.profilePicture instanceof File) {
      const uploadedImageUrl = await uploadToCloudinary(
        finalData.profilePicture
      );
      // @ts-ignore
      finalData.profilePicture = uploadedImageUrl;
    }
    setSubmitting(true);
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

        router.push("/sign-in");
      }, 3000);
    } else {
      setToastMessage("Please try again later");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    console.log("file",file)
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
        <Logo className="text-3xl mb-6" />
        <ProgressIndicator currentStep={step} totalSteps={3} />
        <div className="mt-8 min-h-[400px]">
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
  );
}
