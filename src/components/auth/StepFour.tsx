import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepThreeSchema } from "@/lib/schemas/agent";
import FormInput from "@/components/ui/FormInput";
import DocumentUpload from "./Document-Upload";
import ImagePreviewModal from "./ImagePreviewModal";

interface StepThreeProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
  initialData: Partial<any>;
  filePreviews: { [key: string]: string };
}

const StepThree: React.FC<StepThreeProps> = ({
  onSubmit,
  onBack,
  initialData,
  filePreviews,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(stepThreeSchema),
    mode: "onSubmit",
    defaultValues: initialData,
  });

  const [modalImage, setModalImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#4F4F4F] mb-6">
        Agency Information
      </h2>
      <Controller
        name="agencyName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput
            label="Agency Name"
            {...field}
            error={errors.agencyName?.message?.toString()}
            placeholder="Enter your agency name"
          />
        )}
      />
      <Controller
        name="facebookHandle"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput
            label="Facebook Handle"
            {...field}
            error={errors.facebookHandle?.message?.toString()}
            placeholder="https://facebook.com/youragency"
            icon="url"
          />
        )}
      />
      <Controller
        name="instagramHandle"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput
            label="Instagram Handle"
            {...field}
            error={errors.instagramHandle?.message?.toString()}
            placeholder="https://instagram.com/youragency"
            icon="url"
          />
        )}
      />
      <Controller
        name="identityCard"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <DocumentUpload
            label="Identity Card"
            {...field}
            error={errors.identityCard?.message?.toString()}
            onImageClick={handleImageClick}
            preview={filePreviews.identityCard}
          />
        )}
      />
      <Controller
        name="businessRegistration"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <DocumentUpload
            label="Business Registration Document"
            {...field}
            error={errors.businessRegistration?.message?.toString()}
            onImageClick={handleImageClick}
            preview={filePreviews.businessRegistration}
          />
        )}
      />
      <div
        className={`flex justify-between gap-4 relative`}
      >
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg transition-colors font-medium"
        >
          Back
        </button>

        <button
          type="submit"
          className={`flex-1 bg-gradient-to-r from-midnight-blue to-ocean-blue text-white py-3 rounded-lg shadow-md hover:shadow-xl  font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <span>Next Step</span>
        </button>
      </div>
      {modalImage && (
        <ImagePreviewModal imageUrl={modalImage} onClose={closeModal} />
      )}
    </form>
  );
};

export default StepThree;
