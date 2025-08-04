import { useState } from "react";
import ServiceSection from "../components/step-three/ServiceSection";
import ImageGallery from "../components/step-three/ImageGallery";
import {
  UseFormSetValue,
  FieldErrors,
  UseFormRegister,
  Control,
  Controller,
} from "react-hook-form";

import { z } from "zod";
import { stepThreeSchema } from "@/lib/schemas/experience";

type StepThreeType = z.infer<typeof stepThreeSchema>;

interface FormStep3Props {
  formData: StepThreeType;
  setValue: UseFormSetValue<StepThreeType>;
  errors: FieldErrors<StepThreeType>;
  imageUrls: string[];
  register: UseFormRegister<StepThreeType>;
  control: Control<StepThreeType>; // Add control prop
}

export default function FormStep3({
  formData,
  setValue,
  errors,
  imageUrls,
  register,
  control, // Add control to destructuring
}: FormStep3Props) {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleBlur = () => setFocusedField(null);
  const handleFocus = (field: string) => setFocusedField(field);

  const addService = (type: "included" | "excluded") => {
    const currentServices =
      formData[type === "included" ? "includedServices" : "excludedServices"];
    setValue(type === "included" ? "includedServices" : "excludedServices", [
      ...currentServices,
      "",
    ]);
  };

  const removeService = (type: "included" | "excluded", index: number) => {
    const currentServices =
      formData[type === "included" ? "includedServices" : "excludedServices"];
    const newServices = currentServices.filter((_, i) => i !== index);
    setValue(
      type === "included" ? "includedServices" : "excludedServices",
      newServices
    );
  };

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue">
          Visual Highlights & Services
        </h2>
        <p className="mt-2 text-base text-charcoal">
          Add experience images and specify included and excluded services
        </p>
      </div>

      <div className="space-y-8">
        {/* Image Gallery with Controller */}
        <Controller
          name="experienceImages"
          control={control}
          render={({ field, fieldState }) => (
            <ImageGallery
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
              imageUrls={imageUrls}
            />
          )}
        />

        {/* Service sections remain the same */}
        <ServiceSection
          key={"included-services"}
          title="Included Services"
          services={formData.includedServices}
          onAddService={() => addService("included")}
          onRemoveService={(index: number) => removeService("included", index)}
          register={register}
          focusedField={focusedField}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="included"
          errors={errors}
        />

        <ServiceSection
          key={"excluded-services"}
          title="Excluded Services"
          services={formData.excludedServices}
          onAddService={() => addService("excluded")}
          onRemoveService={(index: number) => removeService("excluded", index)}
          register={register}
          errors={errors}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="excluded"
          focusedField={focusedField}
        />
      </div>
    </div>
  );
}
