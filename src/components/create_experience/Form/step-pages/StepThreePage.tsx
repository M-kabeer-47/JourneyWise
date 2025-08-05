"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepThreeSchema } from "@/lib/schemas/experience";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { updateExperienceData } from "@/lib/redux/slices/experience";
import { useRouter } from "next/navigation";
import Layout from "@/components/create_experience/form/layout/Layout";
import StepThreePreview from "@/components/create_experience/live-preview/StepThree";
import StepThreeForm from "@/components/create_experience/form/steps/StepThree";
import { StepThreeType } from "@/lib/types/create-experience-steps";
import useImageUrls from "@/hooks/experience/useImageUrls";
export default function StepThree({
  nextStepUrl,
  previousStepUrl,
}: {
  nextStepUrl: string;
  previousStepUrl: string;
}) {
  const initialData = useAppSelector((state) => state.experienceData);
  const router = useRouter();
  const {
    handleSubmit,
    watch,
    setValue,
    register,
    control,
    formState: { errors: formErrors },
  } = useForm<StepThreeType>({
    defaultValues: initialData,
    resolver: zodResolver(stepThreeSchema),
  });

  const data = watch();
  const imageUrls = useImageUrls(data.experienceImages);
  const dispatch = useAppDispatch();

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

  const convertImagesToBase64 = async () => {
    let images = await Promise.all(
      data.experienceImages.map(async (image, index) => {
        if (image instanceof File) {
          const base64String = await convertFileToBase64(image);
          return base64String;
        } else {
          return image;
        }
      })
    );
    setValue(
      "experienceImages",
      images.filter((img) => img !== null)
    );
  };

  const handlePrevious = async () => {
    await convertImagesToBase64();
    dispatch(updateExperienceData(watch()));
    router.push(previousStepUrl);
  };

  const onSubmit = async (data: StepThreeType) => {
    try {
      await convertImagesToBase64();
      let latestData = watch();
      dispatch(updateExperienceData(latestData));
      router.push(nextStepUrl);
    } catch (error) {
      // ✅ Now dispatch serializable data

      console.error("Error processing image:", error);
      // Handle error - maybe show toast
    }
  };

  return (
    <Layout
      preview={
        <StepThreePreview
          itemVariants={itemVariants}
          data={data}
          imageUrls={imageUrls}
        />
      }
      form={
        <StepThreeForm
          control={control}
          setValue={setValue}
          errors={formErrors}
          formData={data}
          imageUrls={imageUrls}
          register={register}
        />
      }
      stepKey="step3"
      onNext={handleSubmit(onSubmit)}
      onPrevious={handlePrevious}
    />
  );
}
