"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepOneSchema } from "@/lib/schemas/experience";
import { ExperienceData } from "@/lib/schemas/experience";
import Layout from "@/components/create_experience/form/layout/Layout";
import StepOnePreview from "@/components/create_experience/live-preview/StepOne";
import StepOneForm from "@/components/create_experience/form/steps/StepOne";
const initialData: Partial<ExperienceData> = {
  title: "",
  country: "",
  city: "",
  category: "",
  countryCode: "",
  duration: 0, // This might be changing unexpectedly
  tags: [],
  description: "",
  availability: "available",
  experienceImage: "",
};

export default function StepOne() {
  type StepOneType = z.infer<typeof stepOneSchema>;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors: formErrors },
  } = useForm<StepOneType>({
    defaultValues: initialData,
    resolver: zodResolver(stepOneSchema),
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const onSubmit = (data: StepOneType) => {
    console.log("Form submitted:", data);
  };

  const data = watch();

  return (
    <Layout
      preview={<StepOnePreview itemVariants={itemVariants} data={data} />}
      form={
        <StepOneForm
          register={register}
          setValue={setValue}
          errors={formErrors}
          formData={data}
        />
      }
      stepKey="step1"
      onNext={handleSubmit(onSubmit)}
    />
  );
}
