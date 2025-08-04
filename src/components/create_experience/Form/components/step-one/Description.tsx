import { StepOneType } from "@/lib/types/create-experience-steps";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface DescriptionProps {
  register: UseFormRegister<StepOneType>;
  errors: FieldErrors<StepOneType>;
  value?: string;
}

export default function Description({
  register,
  errors,
  value,
}: DescriptionProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleFocus = (fieldName: string) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField(null);

  return (
    <div className="space-y-2">
      <label className="block text-base font-medium text-midnight-blue">
        Description
      </label>
      <div className="relative">
        <textarea
          {...register("description")}
          onFocus={() => handleFocus("description")}
          onBlur={handleBlur}
          maxLength={500}
          className={`w-full px-4 py-3 rounded-lg border text-charcoal text-sm
                     transition-all duration-200 outline-none h-[120px]
                     ${
                       focusedField === "description"
                         ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                         : "border-gray-200"
                     }`}
          placeholder="Describe your experience..."
        />
        <span className="absolute bottom-2 right-2 text-xs text-charcoal">
          {value?.length || 0}/500
        </span>
      </div>
      {errors.description && (
        <p className="text-red-500 text-sm mt-1">
          {errors.description.message}
        </p>
      )}
    </div>
  );
}
