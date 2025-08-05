"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepFourSchema } from "@/lib/schemas/experience";
import Layout from "@/components/create_experience/form/layout/Layout";
import StepFourPreview from "@/components/create_experience/live-preview/StepFour";
import StepFourForm from "@/components/create_experience/form/steps/StepFour";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { updateExperienceData } from "@/lib/redux/slices/experience";
import { useRouter } from "next/navigation";
import { StepFourType } from "@/lib/types/create-experience-steps";
import { useState } from "react";
import { useExperienceSubmission } from "@/hooks/experience/useSubmitForm";

export default function StepFour({ type, previousStepUrl }: { type: "create" | "edit", previousStepUrl: string }) {
  const [activeTierIndex, setActiveTierIndex] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [submitData, setsubmitData] = useState<StepFourType | null>(null);
  const initialData = useAppSelector((state) => state.experienceData);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { submitExperience, isSubmitting } = useExperienceSubmission({type});

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
    console.log("Form validated:", data);
    dispatch(updateExperienceData(data));
    setsubmitData(data);
    setShowConfirmModal(true);
  };

  const handleConfirmSubmission = async () => {
    if (!submitData) return;

    const result = await submitExperience(submitData);
    if (result?.success) {
      dispatch(updateExperienceData({})); // Clear experience data after submission
      router.push("/create-experience/success");
    }

    setShowConfirmModal(false);
    // Error handling is done in the hook via toast
  };

  const handlePrevious = () => {
    dispatch(updateExperienceData(watch()));
    router.push(previousStepUrl);
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
    <>
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
        stepKey="step4"
        onNext={handleSubmit(onSubmit)}
        onPrevious={handlePrevious}
      />

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSubmission}
        title="Create Experience"
        description="Are you sure you want to create this experience? Once created, you can edit it later from your dashboard."
        confirmText="Create Experience"
        cancelText="Review Again"
        loading={isSubmitting}
      />
    </>
  );
}
