'use client';

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, z } from "zod";
import dynamic from 'next/dynamic';
import { parsePhoneNumber, isValidPhoneNumber, CountryCode } from "libphonenumber-js";
import { useRouter } from "next/navigation";
import axios from "axios";
import Spinner  from "@/app/components/ui/spinner";
import { authClient } from "@/lib/auth_client";

// Dynamically import client-side components
const DatePicker = dynamic(() => import("@/app/components/auth/Date-Picker"), { ssr: false });
const CountrySelect = dynamic(() => import("@/app/components/auth/Country-Select"), { ssr: false });
const PhoneInput = dynamic(() => import("@/app/components/auth/PhoneInput"), { ssr: false });
const Toast = dynamic(() => import("@/app/components/auth/Custom-Toast"), { ssr: false });

const stepTwoSchema = z.object({
  dateOfBirth: z.string().nonempty("Date of birth is required"),
  country: z.string().nonempty("Country is required"),
  phoneNumber: z.string().nonempty("Phone number is required"),
});

type FormData = z.infer<typeof stepTwoSchema>;

export default function CompleteProfile() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [userId, setUserId] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const getUserId = async () => { 
        let session  =await  authClient.getSession();
        if(session.data){
        
          setUserId(session.data.user.id);
        }
    }
    getUserId();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(stepTwoSchema),
    mode: "onSubmit",
    defaultValues: {
      dateOfBirth: "",
      country: "",
      phoneNumber: "",
    },
  });
  
  const validatePhoneNumber = (value: string) => {
    if (!value) return "Phone number is required";
    try {
      const phoneNumber = parsePhoneNumber(value, selectedCountry as CountryCode);
      if (!phoneNumber || !isValidPhoneNumber(phoneNumber.number, selectedCountry as any)) {
        return "Invalid phone number for the selected country";
      }
    } catch (error) {
      return "Invalid phone number";
    }
    return true;
  };

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted:", data);
    setIsLoading(true);
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/app_auth/checkPhone`, {
        params: { phone: data.phoneNumber },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setError("phoneNumber", {
          type: "manual",
          message: "Phone already exists",
        });
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await axios.post("/api/app_auth/signUp", {
        country: data.country,
        phone: data.phoneNumber,
        dob: data.dateOfBirth,
        userId: userId,
      });

      if (response.status === 201) {
        setToastMessage("Profile completed successfully");
        setToastType("success");
        setShowToast(true);
        setIsLoading(false);
        setTimeout(() => {
        router.push("/dashboard");
        }, 3000);
      }
    } catch (error) {
      setToastMessage("Error completing profile");
      setToastType("error");
      setShowToast(true);
        setIsLoading(false);
    }
  };

  if (!isClient) {
    return <Spinner size="large" />;
  }
else if(isClient){


  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-4 w-full">
      <div className="w-full max-w-[700px] bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#003366] text-center mb-8 md:text-5xl md:mb-[50px]">
          JourneyWise
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-xl font-semibold text-[#4F4F4F] mb-6">
            Complete Your Profile
          </h2>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Date of Birth"
                {...field}
                error={errors.dateOfBirth?.message}
              />
            )}
          />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <CountrySelect
                {...field}
                onCountryChange={(country) => {
                  setSelectedCountry(country);
                  setValue("phoneNumber", "");
                }}
                error={errors.country?.message}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ validate: validatePhoneNumber }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                country={selectedCountry}
                error={errors.phoneNumber?.message}
              />
            )}
          />
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="bg-[#003366] text-white py-2 px-4 rounded-md hover:bg-[#002855] transition-colors font-semibold max-w-[200px] w-[200px]"
            >
              {isLoading ? <Spinner size="small" /> : "Complete profile"}
            </button>
          </div>
        </form>
      </div>
      {showToast && (
        <Toast
          type={toastType}
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
}

