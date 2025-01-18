"use client";

import { useState } from "react";
import StepOne from "@/app/components/auth/StepOne";
import StepTwo from "@/app/components/auth/StepTwo";
import StepThree from "@/app/components/auth/StepThree";
import StepFour from "@/app/components/auth/StepFour";
import ProgressIndicator from "@/app/components/auth/Agent-Progress-Indicator";
import Logo from "@/app/components/ui/Logo";
import { SignupData } from "./types";
import Toast from "@/app/components/auth/Custom-Toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { authClient } from "@/lib/auth_client";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [formData, setFormData] = useState<Partial<SignupData>>({ step: 1 });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneError, setPhoneError] = useState({ message: "", status: false });
  const [firstStepLoading, setFirstStepLoading] = useState(false);
  const [secondStepLoading, setSecondStepLoading] = useState(false);
  const [filePreviews, setFilePreviews] = useState<{ [key: string]: string }>(
    {}
  );
  
  const router = useRouter();

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const isValidPhoneNumber = (phone: string) => {
    
    const phoneRegex = /^[0-9]{12}$/; 
    return phoneRegex.test(phone);
  };


  const emailExists = async (email: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/app_auth/checkEmail`,
        {
          params: {
            email: email.toLowerCase(),
          },
        }
      );
      if (response.status === 200) {
        return { data: true, google: false };
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        return { data: true, google: true };
      } else if (error.response.status === 400) {
        return { data: false, google: false };
      }
    }
  };

  const checkPhone = async (phoneNumber: string) => {

    try {
        if(!isValidPhoneNumber(phoneNumber)){
            setPhoneError({message: "Invalid phone number", status: true});
            return true;
            }

      const response = await axios.get("/api/app_auth/checkPhone", {
        params: {
          phone: phoneNumber,
        },
      });
      if (response.status === 200) {
        return false;
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        setPhoneError({ message: "Phone already exists", status: true });
        return true;
      } else if (error.response.status === 400) {
        return true;
      }
    }
  };

  const handleStepSubmit = async (data: Partial<SignupData>) => {
    if (step === 1) {
      setFirstStepLoading(true);
      const emailExistsCheck = await emailExists(data.email || "");
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
      const phoneExistsCheck = await checkPhone(data.phoneNumber || "");
      if (phoneExistsCheck) {
        
        setSecondStepLoading(false);
        return;
      }
      setSecondStepLoading(false);
    } else if (step === 3) {
      if (data.identityCard === null || data.identityCard === undefined) {
        setToastMessage("Please upload your identity card");
        setShowToast(true);
        setToastType("error");

        return;
      }
      if (
        data.businessRegistration === null ||
        data.businessRegistration === undefined
      ) {
        setToastMessage("Please upload your business registration");
        setShowToast(true);
        setToastType("error");
        return;
      }
      if ("identityCard" in data) {
        handleFilePreview("identityCard", data.identityCard as File);
      }
      if ("businessRegistration" in data) {
        handleFilePreview(
          "businessRegistration",
          data.businessRegistration as File
        );
      }
    }

    setFormData((prev) => ({ ...prev, ...data }));

    nextStep();
  };

  const handleFilePreview = (field: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreviews((prev) => ({
        ...prev,
        [field]: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };
  const handleFinalSubmit = async (Data: Partial<SignupData>) => {
    const finalData = { ...formData, ...Data };
    if (Data.profilePicture === null || Data.profilePicture === undefined) {
      setToastMessage("Please upload your profile picture");
      setShowToast(true);
      setToastType("error");
      return;
    }
    setSubmitting(true);
    try {
      // Upload the profile picture and documents
      if (finalData.profilePicture instanceof File) {
        finalData.profilePicture = await uploadToCloudinary(
          finalData.profilePicture
        );
      }
      if (finalData.identityCard instanceof File) {
        finalData.identityCard = await uploadToCloudinary(
          finalData.identityCard
        );
      }
      if (finalData.businessRegistration instanceof File) {
        finalData.businessRegistration = await uploadToCloudinary(
          finalData.businessRegistration
        );
      }
    } catch (error) {
      setToastMessage("Something went wrong. Please try again later.");
      setShowToast(true);
      setSubmitting(false);
      setTimeout(() => setShowToast(false), 3000);
    }

    // API Call to a final data (adjust according to your backend logic)
    // Replace this with your actual submission logic (e.g., authentication)
    const { data, error } = await authClient.signUp.email({
      email: finalData.email?.toLowerCase() || "",
      password: finalData.password || "",
      name: finalData.firstName + " " + finalData.lastName,
      image:
        typeof finalData.profilePicture === "string"
          ? finalData.profilePicture
          : "", //@ts-ignore
      phoneNumber: finalData.phoneNumber || "",
      country: finalData.country || "",
      dob: finalData.dateOfBirth || "",
    });
    if (error) {
      setToastMessage("Please try again later");
      setShowToast(true);
      setToastType("error");
      setSubmitting(false);
      setTimeout(() => setShowToast(false), 3000);
    }

    let socialMediaHandles = {
      facebook: finalData.facebookHandle || "",
      instagram: finalData.instagramHandle || "",
    };
    let docs = {
      identityCard: finalData.identityCard || "",
      businessRegistration: finalData.businessRegistration || "",
    };

    let twoFactorResponse = await authClient.twoFactor.enable({
      password: finalData.password || "",
    });
    let session = await authClient.getSession();
    alert("session: " + JSON.stringify(session.data?.user.id));
    if (session && typeof session.data?.user.id === "string") {
      let userId = session.data?.user.id;
      alert("data: " + JSON.stringify(data));
      if (twoFactorResponse.data && data) {
        await axios
          .post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/app_auth/agentSignUp`,
            {
              //@ts-ignore
              userId: userId,
              agencyName: finalData.agencyName || "",
              socialMediaHandles: socialMediaHandles,
              docs: docs,
            }
          )
          .then((response) => {
            if (response.status === 201) {
              setSubmitting(false);
              setToastMessage("Account created successfully");
              setShowToast(true);
              setTimeout(() => {
                setShowToast(false);
                router.push("/sign-in");
              }, 3000);
            }
          })
          .catch((error) => {
            setToastMessage("Please try again later");
            setShowToast(true);
            setSubmitting(false);
            setTimeout(() => setShowToast(false), 5000);
          });
      } else {
        setToastMessage("Please try again later");
        setShowToast(true);
        setSubmitting(false);
        setTimeout(() => setShowToast(false), 5000);
      }
    }

    // Simulating successful submission
    setToastMessage("Signup successful!");
    setToastType("success");
    setSubmitting(false);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      // router.push('/sign-in') // Redirect after submission
    }, 3000);
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
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

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl pb-[40px]">
        <Logo className="text-3xl mb-6" />
        <ProgressIndicator currentStep={step} totalSteps={4} />
        <div className="mt-8 min-h-[400px]">
          {step === 1 && (
            <StepOne
              onSubmit={handleStepSubmit}
              initialData={formData}
              emailError={emailError}
              setEmailError={setEmailError}
              emailErrorMesssage={emailErrorMessage}
              firstStepLoading={firstStepLoading} //@ts-ignore
              setFormData={setFormData}
            />
          )}
          {step === 2 && (
            <StepTwo
              onSubmit={handleStepSubmit}
              onBack={prevStep}
              initialData={formData} //@ts-ignore
              setFormData={setFormData}
              phoneError={phoneError}
              setPhoneError={setPhoneError}
              secondStepLoading={secondStepLoading}
            />
          )}
          {step === 3 && (
            <StepFour
              onSubmit={handleStepSubmit}
              onBack={prevStep}
              initialData={formData}
              filePreviews={filePreviews}
            />
          )}
          {step === 4 && (
            <StepThree
              onSubmit={handleFinalSubmit}
              onBack={prevStep}
              initialData={formData}
              submitting={submitting}
              type={"agent"}
            />
          )}
        </div>
      </div>
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
