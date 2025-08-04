import { Minus } from "lucide-react";
import { UseFormRegister } from "react-hook-form";
import { stepFourSchema } from "@/lib/schemas/experience";
import { z } from "zod";

type StepFourType = z.infer<typeof stepFourSchema>;

interface TierCardProps {
  index: number;
  register: UseFormRegister<StepFourType>;
  focusedField: string | null;
  onFocus: (field: string) => void;
  onBlur: () => void;
  errors: any;
  onRemove: () => void;
  canRemove: boolean;
  onSetActive: () => void;
  currency: string;
  tier: any;
  isActive: boolean;
}

export default function TierCard({
  index,
  register,
  focusedField,
  onFocus,
  onBlur,
  errors,
  onRemove,
  canRemove,
  onSetActive,
  currency,
  tier,
  isActive,
}: TierCardProps) {
  return (
    <div 
      className={`p-4 md:p-6 border rounded-lg space-y-4 bg-white shadow-sm hover:shadow-md transition-all duration-200
                ${isActive ? "border-ocean-blue ring-1 ring-ocean-blue/20" : "border-gray-200"}`}
      onClick={onSetActive}
    >
      <div className="flex items-center justify-between bg-gray-50 -mx-6 -mt-6 px-6 py-3 border-b border-gray-200 mb-4">
        <h4 className="text-lg font-medium text-midnight-blue">
          Tier {index + 1}
        </h4>
        {canRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="text-red-500 hover:text-red-600"
          >
            <Minus className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            {...register(`tiers.${index}.name`)}
            onFocus={() => onFocus(`tiers.${index}.name`)}
            onBlur={onBlur}
            className={`w-full px-4 h-11 rounded-lg border text-charcoal text-sm
                        transition-all duration-200 outline-none
                        ${
                          focusedField === `tiers.${index}.name`
                            ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                            : "border-gray-200"
                        }`}
            placeholder="Tier name (e.g., Basic, Standard, Premium)"
          />
          {errors.tiers?.[index]?.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.tiers[index]?.name?.message}
            </p>
          )}
        </div>

        <div>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              {...register(`tiers.${index}.price`, {
                setValueAs: (value) => (value === "" ? 0 : Number(value)),
              })}
              onFocus={() => onFocus(`tiers.${index}.price`)}
              onBlur={onBlur}
              min="0"
              step="0.01"
              className={`w-full px-4 h-11 rounded-lg border text-charcoal text-sm
                          transition-all duration-200 outline-none
                          ${
                            focusedField === `tiers.${index}.price`
                              ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                              : "border-gray-200"
                          }`}
              placeholder="Price"
            />
            <span className="text-charcoal">{currency}</span>
          </div>
          {errors.tiers?.[index]?.price && (
            <p className="text-red-500 text-sm mt-1">
              {errors.tiers[index]?.price?.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="number"
            {...register(`tiers.${index}.members`, {
              setValueAs: (value) => (value === "" ? 0 : Number(value)),
            })}
            onFocus={() => onFocus(`tiers.${index}.members`)}
            onBlur={onBlur}
            min="1"
            className={`w-full px-4 h-11 rounded-lg border text-charcoal text-sm
                        transition-all duration-200 outline-none
                        ${
                          focusedField === `tiers.${index}.members`
                            ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                            : "border-gray-200"
                        }`}
            placeholder="Number of members"
          />
          {errors.tiers?.[index]?.members && (
            <p className="text-red-500 text-sm mt-1">
              {errors.tiers[index]?.members?.message}
            </p>
          )}
        </div>

        <div>
          <textarea
            {...register(`tiers.${index}.description`)}
            onFocus={() => onFocus(`tiers.${index}.description`)}
            onBlur={onBlur}
            maxLength={100}
            className={`w-full px-4 py-3 rounded-lg border text-charcoal text-sm
                        transition-all duration-200 outline-none h-[80px] resize-none
                        ${
                          focusedField === `tiers.${index}.description`
                            ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                            : "border-gray-200"
                        }`}
            placeholder="Brief description of what's included (max 100 characters)"
          />
          {errors.tiers?.[index]?.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.tiers[index]?.description?.message}
            </p>
          )}
          <div className="text-xs text-gray-500 text-right">
            {tier?.description?.length || 0}/100
          </div>
        </div>
      </div>
    </div>
  );
}