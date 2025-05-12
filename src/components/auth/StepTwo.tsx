import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepTwoSchema } from "../../lib/schemas/user";
import DatePicker from "./Date-Picker";
import CountrySelect from "./Country-Select";
import { SignupData } from "@/app/(pages)/(auth)/sign-up/types";
import PhoneInput from "./PhoneInput";
import { parsePhoneNumber } from "libphonenumber-js";
import Spinner from "../ui/Spinner";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
type PhoneError = {
  message: string;
  status: boolean;
};

interface StepTwoProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
  initialData: Partial<any>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<SignupData>>>;
  phoneError: PhoneError;
  setPhoneError: React.Dispatch<React.SetStateAction<PhoneError>>;
  secondStepLoading: boolean;
}

const StepTwo: React.FC<StepTwoProps> = ({
  onSubmit,
  onBack,
  initialData,
  phoneError,
  setPhoneError,
  secondStepLoading,
}) => {

  const pathname = usePathname();
  const [selectedCountry, setSelectedCountry] = useState(
    initialData.country || ""
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    resolver: zodResolver(stepTwoSchema),
    mode: "onSubmit",
    defaultValues: initialData,
  });

  const validatePhoneNumber = (value: string) => {
    if (!value) return "Phone number is required";
    try {
      const phoneNumber = parsePhoneNumber(value, selectedCountry);
      if (!phoneNumber || !phoneNumber.isValid()) {
        return "Invalid phone number for the selected country";
        
      }
    } catch (error) {
      
    }
    return true;
  };
  const handleSubmitForm = (data: any) => {
    if (validatePhoneNumber(data.phoneNumber) !== true) {
      setPhoneError({
        message: validatePhoneNumber(data.phoneNumber) as string,
        status: true,
      });
      return;
    }
    
    onSubmit(data);
  };

  useEffect(() => {
    if (phoneError.status) {
      setError("phoneNumber", {
        type: "manual",
        message: phoneError.message,
      });
      setPhoneError({ message: "", status: false });
    }
  }, [phoneError, setError, setPhoneError]);

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(handleSubmitForm)}
      className="space-y-6 flex flex-col min-h-[450px]" // Added flex and min-height to match StepOne
    >
      <div className="flex-grow space-y-6">
        {" "}
        {/* This wrapper will push the buttons to the bottom */}
        <h2 className="text-2xl font-semibold text-midnight-blue mb-6">
          Complete Your Profile
        </h2>
        <Controller
          name="dateOfBirth"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <DatePicker
              label="Date of Birth"
              error={errors.dateOfBirth?.message as string}
              {...field}
            />
          )}
        />
        <Controller
          name="country"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CountrySelect
              {...field}
              onCountryChange={(country) => {
                setSelectedCountry(country);
                setValue("phoneNumber", ""); // Reset phone number when country changes
              }}
              error={errors.country?.message as string}
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          rules={{ validate: validatePhoneNumber }}
          render={({ field }) => (
            <PhoneInput
              {...field}
              country={selectedCountry}
              error={errors.phoneNumber?.message as string}
            />
          )}
        />
      </div>

      {/* Buttons will now be positioned at the bottom */}
      <div className={`flex justify-between gap-4 relative ${pathname.includes("agent") ? "top-0": " top-[100px]"}`}>
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg transition-colors font-medium"
        >
          Back
        </button>

        <button
          disabled={secondStepLoading}
          type="submit"
          className={`flex-1 bg-gradient-to-r from-midnight-blue to-ocean-blue text-white py-3 rounded-lg shadow-md hover:shadow-xl  font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {secondStepLoading ? (
            <span className="flex items-center justify-center">
              <Spinner size="small" />
            </span>
          ) : (
            <span>Next Step</span>
          )}
        </button>
      </div>
    </motion.form>
  );
};

export default StepTwo;
