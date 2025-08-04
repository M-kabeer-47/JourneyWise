"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepFourSchema } from "@/lib/schemas/experience";
import Layout from "@/components/create_experience/form/layout/Layout";
import StepFourPreview from "@/components/create_experience/live-preview/StepFour";
import StepFourForm from "@/components/create_experience/form/steps/StepFour";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { setExperienceData } from "@/lib/redux/slices/experience";
import { useRouter } from "next/navigation";
import { StepFourType } from "@/lib/types/create-experience-steps";
import { useState } from "react";
import { toast } from "@/components/ui/Toast";
export default function StepFour() {
  const [activeTierIndex, setActiveTierIndex] = useState(0);
  const initialData = useAppSelector((state) => state.experienceData);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors: formErrors },
  } = useForm<StepFourType>({
    defaultValues: initialData,
    resolver: zodResolver(stepFourSchema),
  });

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const onSubmit = (data: StepFourType) => {
    console.log("Form submitted:", data);
    dispatch(setExperienceData(data));
    toast.success("Experience saved successfully!");
    
  };
  const handlePrevious = () => {
    dispatch(setExperienceData(watch()));
    router.push("/create-experience/step-three");
  };

  function formatPrice(price: number | string | null): string {
    if (price === null) return "0";
    const numericPrice =
      typeof price === "string" ? Number.parseFloat(price) : price;
    if (isNaN(numericPrice)) return "0";
    return numericPrice.toLocaleString("en-US", {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  }

  const data = watch();

  return (
    <Layout
      preview={
        <StepFourPreview
          itemVariants={itemVariants}
          activeTierIndex={activeTierIndex}
          setActiveTierIndex={setActiveTierIndex}
          data={data}
          agentName="John Doe"
          title="Experience Title"
          formatPrice={formatPrice}
        />
      }
      form={
        <StepFourForm
          control={control}
          register={register}
          setValue={setValue}
          errors={formErrors}
          data={data}
          setActiveTierIndex={setActiveTierIndex}
        />
      }
      stepKey="step2"
      onNext={handleSubmit(onSubmit)}
      onPrevious={handlePrevious}
    />
  );
}
