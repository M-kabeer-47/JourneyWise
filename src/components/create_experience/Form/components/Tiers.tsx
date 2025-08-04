import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StepFourType } from "@/lib/types/create-experience-steps";
import { HelpCircle, Plus, Minus } from "lucide-react";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";
interface TiersProps {
  tiers: StepFourType["tiers"];
  control: Control<StepFourType>;
  register: UseFormRegister<StepFourType>;
  errors: FieldErrors<StepFourType>;
  focusedField: string | null;
  handleFocus: (fieldName: string) => void;
  handleBlur: () => void;
  handleTierFocus: (index: number) => void;
  setActiveTierIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Tiers({
  tiers,
  errors,
  register,
  focusedField,
  handleFocus,
  handleBlur,
  handleTierFocus,
  control,
  setActiveTierIndex,
}: TiersProps) {
  const { append, remove } = useFieldArray({
    control,
    name: "tiers",
  });

  const addTier = () => {
    if (tiers.length < 3) {
      append({ name: "", members: 0, price: 0, description: "" });
      setActiveTierIndex(tiers.length - 1);
    }
  };

  const removeTier = (index: number) => {
    if (tiers.length > 1) {
      remove(index);
      setActiveTierIndex(tiers.length - index - 1);
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-midnight-blue">
          Pricing Tiers
        </h3>
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent className="bg-white text-midnight-blue border border-gray-200 p-1 rounded-lg text-[13px]">
                <p className="text-black">
                  Create up to 3 pricing tiers for your experience
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {tiers.length < 3 && (
            <button
              type="button"
              onClick={addTier}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-ocean-blue hover:bg-ocean-blue/10 rounded-lg transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Tier
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[...tiers].reverse().map((tier, index: number) => (
          <div
            key={index}
            className="p-4 md:p-6 border border-gray-200 rounded-lg space-y-4 bg-white shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between bg-gray-50 -mx-6 -mt-6 px-6 py-3 border-b border-gray-200 mb-4">
              <h4 className="text-lg font-medium text-midnight-blue">
                Tier {tiers.length - index}
              </h4>
              {tiers.length - index - 1 > 0 && (
                <button
                  type="button"
                  onClick={() => removeTier(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <input
                type="text"
                {...register(`tiers.${tiers.length - index - 1}.name`)}
                onFocus={() => {
                  handleTierFocus(index);
                  handleFocus(`tiers.${tiers.length - index - 1}.name`);
                }}
                onBlur={handleBlur}
                className={`w-full px-4 h-11 rounded-lg border text-charcoal text-sm
                                transition-all duration-200 outline-none
                                ${
                                  focusedField ===
                                  `tiers.${tiers.length - index - 1}.name`
                                    ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                                    : "border-gray-200"
                                }`}
                placeholder="Tier name (e.g., Basic, Standard, Premium)"
              />
              {errors.tiers?.[tiers.length - index - 1]?.name && (
                <p className="text-red-500 text-sm relative top-[-8px]">
                  Tier name is required
                </p>
              )}
              <div className="flex gap-2">
                <input
                  type="number"
                  {...register(`tiers.${tiers.length - index - 1}.price`, {
                    valueAsNumber: true,
                    setValueAs: (v) =>
                      v === "" || isNaN(Number(v)) ? 0 : Number(v),
                  })}
                  onFocus={() => {
                    handleTierFocus(index);
                    handleFocus(`tiers.${tiers.length - index - 1}.price`);
                  }}
                  
                  onBlur={handleBlur}
                  className={`w-full px-4 h-11 rounded-lg border text-charcoal text-sm
                                  transition-all duration-200 outline-none
                                  ${
                                    focusedField ===
                                    `tiers.${tiers.length - index - 1}.price`
                                      ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                                      : "border-gray-200"
                                  }`}
                  placeholder="Price"
                  step="0.01"
                />
              </div>
              {errors.tiers?.[tiers.length - index - 1]?.price && (
                <p className="text-red-500 text-sm relative top-[-8px] ">
                  {errors.tiers?.[tiers.length - index - 1]?.price?.message}
                </p>
              )}

              <input
                type="number"
                {...register(`tiers.${tiers.length - index - 1}.members`, {
                  valueAsNumber: true,
                  setValueAs: (v) =>
                    v === "" || isNaN(Number(v)) ? 0 : Number(v),
                })}
                
                onFocus={() => {
                  handleTierFocus(index);
                  handleFocus(`tiers.${tiers.length - index - 1}.members`);
                }}
                onBlur={handleBlur}
                className={`w-full px-4 h-11 rounded-lg border text-charcoal text-sm
                                transition-all duration-200 outline-none
                                ${
                                  focusedField ===
                                  `tiers.${tiers.length - index - 1}.members`
                                    ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                                    : "border-gray-200"
                                }`}
                placeholder="Number of members"
              />
              {errors.tiers?.[tiers.length - index - 1]?.members && (
                <p className="text-red-500 text-sm relative top-[-8px]">
                  {errors.tiers?.[tiers.length - index - 1]?.members?.message}
                </p>
              )}

              <textarea
                {...register(`tiers.${tiers.length - index - 1}.description`)}
                onFocus={() => {    
                  handleTierFocus(index);
                  handleFocus(`tiers.${tiers.length - index - 1}.description`);
                }}
                onBlur={handleBlur}
                maxLength={100}
                className={`w-full px-4 py-3 rounded-lg border text-charcoal text-sm
                                transition-all duration-200 outline-none h-[80px] resize-none
                                ${
                                  focusedField ===
                                  `tiers.${
                                    tiers.length - index - 1
                                  }.description`
                                    ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                                    : "border-gray-200"
                                }`}
                placeholder="Brief description of what's included (max 100 characters)"
              />
              {errors.tiers?.[tiers.length - index - 1]?.description && (
                <p className="text-red-500 text-sm relative top-[-13px] ">
                  Tier description is required
                </p>
              )}
              <div className="text-xs text-gray-500 text-right">
                {tier.description?.length || 0}/100
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
