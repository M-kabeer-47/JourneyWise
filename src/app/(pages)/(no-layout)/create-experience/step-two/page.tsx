"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepTwoSchema } from "@/lib/schemas/experience";
import Layout from "@/components/create_experience/form/layout/Layout";
import StepTwoPreview from "@/components/create_experience/live-preview/StepTwo";
import StepTwoForm from "@/components/create_experience/form/steps/StepTwo";
import { useAppSelector } from "@/hooks/redux";
type StepTwoType = z.infer<typeof stepTwoSchema>;

export default function StepTwo() {
  const duration = useAppSelector((state) => state.experienceData.duration);
  const initialData = useAppSelector((state) => state.experienceData);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors: formErrors },
  } = useForm<StepTwoType>({
    defaultValues: initialData,
    resolver: zodResolver(stepTwoSchema),
  });

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const onSubmit = (data: StepTwoType) => {
    console.log("Form submitted:", data);
  };

  const data = watch();

  return (
    <Layout
      preview={
        <StepTwoPreview
          itemVariants={itemVariants}
          destinations={data.destinations}
        />
      }
      form={
        <StepTwoForm
          duration={duration}
          register={register}
          setValue={setValue}
          control={control}
          errors={formErrors}
          data={data}
        />
      }
      stepKey="step2"
      onNext={handleSubmit(onSubmit)}
      onPrevious={() => {
        window.history.back();
      }}
    />
  );
}
