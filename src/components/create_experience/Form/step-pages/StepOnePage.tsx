"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepOneSchema } from "@/lib/schemas/experience";
import Layout from "@/components/create_experience/form/layout/Layout";
import StepOnePreview from "@/components/create_experience/live-preview/StepOne";
import StepOneForm from "@/components/create_experience/form/steps/StepOne";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { updateExperienceData } from "@/lib/redux/slices/experience";
import { useRouter } from "next/navigation";
import { StepOneType } from "@/lib/types/create-experience-steps";
import { DevTool } from "@hookform/devtools";
export default function StepOnePage({ nextStepUrl }: { nextStepUrl: string }) {
  const initialData = useAppSelector((state) => state.experienceData);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors: formErrors },
  } = useForm<StepOneType>({
    defaultValues: initialData,
    resolver: zodResolver(stepOneSchema),
  });
  const dispatch = useAppDispatch();
  const data = watch();
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (formData: StepOneType) => {
    try {
      let processedData = { ...formData };

      // ✅ If experienceImage is a  File, convert to Base64
      if (formData.experienceImage instanceof File) {
        const base64String = await convertFileToBase64(
          formData.experienceImage
        );
        processedData.experienceImage = base64String;
      }

      // ✅ Now dispatch serializable data
      dispatch(updateExperienceData(processedData));
      router.push(nextStepUrl);
    } catch (error) {
      console.error("Error processing image:", error);
      // Handle error - maybe show toast
    }
  };

  return (
    <>
      <Layout
        preview={<StepOnePreview itemVariants={itemVariants} data={data} />}
        form={
          <StepOneForm
            register={register}
            setValue={setValue}
            errors={formErrors}
            formData={data}
            control={control}
          />
        }
        stepKey="step1"
        onNext={handleSubmit(onSubmit)}
      />
      <DevTool control={control} /> {/* set up the dev tool */}
    </>
  );
}
