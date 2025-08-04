import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
} from "react-hook-form";
import { Plus, Trash2, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { z } from "zod";
import { stepFourSchema } from "@/lib/schemas/experience";

type StepFourType = z.infer<typeof stepFourSchema>;

interface RequirementsListProps {
  register: UseFormRegister<StepFourType>;
  errors: FieldErrors<StepFourType>;
  focusedField: string | null;
  handleFocus: (field: string) => void;
  handleBlur: () => void;
  requirements: string[];
  setValue: UseFormSetValue<StepFourType>;
}

export default function RequirementsList({
  register,
  errors,
  focusedField,
  handleFocus,
  handleBlur,
  requirements,
  setValue,
}: RequirementsListProps) {
  const addRequirement = () => {
    setValue("requirements", [...requirements, ""]);
  };

  const removeRequirement = (index: number) => {
    const newRequirements = requirements.filter((_, i) => i !== index);
    setValue("requirements", newRequirements);
  };
  // Use field array for requirements

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-midnight-blue">
          Requirements
        </h3>
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent className="bg-white text-midnight-blue border border-gray-200 p-1 rounded-lg text-[13px]">
                <p>List any requirements or prerequisites for participants</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <button
            type="button"
            onClick={addRequirement}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-ocean-blue hover:bg-ocean-blue/10 rounded-lg transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            Add Requirement
          </button>
        </div>
      </div>

      <div className="space-y-3 ">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-start justify-center w-full">
              <input
                type="text"
                value={req}
                {...register(`requirements.${index}`)}
                onFocus={() => handleFocus(`requirements.${index}`)}
                onBlur={handleBlur}
                className={`w-full px-4 h-11 rounded-lg border text-charcoal text-sm
                              transition-all duration-200 outline-none
                              ${
                                focusedField === `requirements.${index}`
                                  ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                                  : "border-gray-200"
                              }`}
                placeholder="Enter a requirement"
              />
              {errors.requirements?.[index] && (
                <p className="text-red-500 text-sm mt-1">
                  Requirement is required
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => removeRequirement(index)}
              disabled={requirements.length <= 1}
              className={`p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 ${
                requirements.length <= 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      
    </div>
  );
}
