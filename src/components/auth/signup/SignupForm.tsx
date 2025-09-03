import React, { useState } from "react";
import { SignupData } from "@/app/(pages)/(auth)/sign-up/types";
import { toast } from "@/components/ui/Toast";
import StepOne from "../StepOne";
import StepTwo from "../StepTwo";
import StepThree from "../StepThree";
import { AnimatePresence } from "framer-motion";

interface SignupFormProps {
  onSubmit: (data: SignupData) => Promise<void>;
  type?: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, type = "user" }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<SignupData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [firstStepLoading, setFirstStepLoading] = useState(false);
  const [secondStepLoading, setSecondStepLoading] = useState(false);
  const [phoneError, setPhoneError] = useState({
    message: "",
    status: false,
  });
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const handleStepOneSubmit = async (data: Partial<SignupData>) => {
    setFirstStepLoading(true);
    try {
      // Validate email or perform any step one validation
      // For example, check if email already exists
      
      setFormData({ ...formData, ...data });
      setStep(2);
    } catch (error: any) {
      setEmailErrorMessage(error.message || "Email validation failed");
      setEmailError(true);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "An error occurred during validation",
      });
    } finally {
      setFirstStepLoading(false);
    }
  };

  const handleStepTwoSubmit = async (data: Partial<SignupData>) => {
    setSecondStepLoading(true);
    try {
      // Validate phone number or perform any step two validation
      
      setFormData({ ...formData, ...data });
      setStep(3);
    } catch (error: any) {
      setPhoneError({
        message: error.message || "Phone number validation failed",
        status: true,
      });
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "An error occurred during validation",
      });
    } finally {
      setSecondStepLoading(false);
    }
  };

  const handleStepThreeSubmit = async (data: Partial<SignupData>) => {
    setSubmitting(true);
    try {
      const finalData = { ...formData, ...data } as SignupData;
      await onSubmit(finalData);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "An error occurred during registration",
      });
      setSubmitting(false);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <StepOne
            onSubmit={handleStepOneSubmit}
            initialData={formData}
            emailError={emailError}
            setEmailError={setEmailError}
            firstStepLoading={firstStepLoading}
            emailErrorMesssage={emailErrorMessage}
            setFormData={setFormData}
          />
        )}
        {step === 2 && (
          <StepTwo
            onSubmit={handleStepTwoSubmit}
            onBack={goBack}
            initialData={formData}
            setFormData={setFormData}
            phoneError={phoneError}
            setPhoneError={setPhoneError}
            secondStepLoading={secondStepLoading}
          />
        )}
        {step === 3 && (
          <StepThree
            onSubmit={handleStepThreeSubmit}
            onBack={goBack}
            initialData={formData}
            submitting={submitting}
            type={type}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignupForm;
