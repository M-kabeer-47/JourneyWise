import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepTwoSchema } from "../../lib/schemas/user";
import DatePicker from "./Date-Picker";
import CountrySelect from "./Country-Select";
import { SignupData } from "@/app/(pages)/(auth)/sign-up/types";
import PhoneInput from "../ui/PhoneInput";
import { motion } from "framer-motion";
import { validatePhoneNumber } from "@/utils/functions/validatePhoneNumber";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/Toast";

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

  const handleSubmitForm = (data: any) => {
    const validationResult = validatePhoneNumber(data.phoneNumber, selectedCountry);
    if (validationResult !== true) {
      setPhoneError({
        message: validationResult as string,
        status: true,
      });
      toast.error("Invalid Phone Number");
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
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="space-y-6">
        <div className="space-y-6">
          <Controller
            name="dob"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <DatePicker
                label="Date of Birth"
                error={errors.dob?.message as string}
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
                error={errors.phoneNumber?.message as string}
              />
            )}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 relative top-[30px]">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto sm:flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg 
              font-medium transition-colors flex items-center justify-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit(handleSubmitForm)}
            disabled={secondStepLoading}
            className="w-full sm:w-auto sm:flex-1 group bg-gradient-to-r from-ocean-blue to-midnight-blue text-white py-3 px-6 rounded-lg 
              font-medium shadow-md hover:shadow-lg transition-all duration-300 
              disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {secondStepLoading ? (
              <div className="flex gap-2 items-center">
                <span>Please wait...</span>
                <Loader2 className="animate-spin w-4 h-4 " />
              </div>
            ) : (
              <>
                <span className="mr-2">Continue</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default StepTwo;
