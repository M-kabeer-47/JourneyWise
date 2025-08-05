import { HelpCircle } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { StepOneType } from "@/lib/types/create-experience-steps";

interface CityProps {
  register: UseFormRegister<StepOneType>;
  errors: FieldErrors<StepOneType>;
  cities: string[];
  disabled: boolean;
  value: string;
}

export default function City({
  register,
  errors,
  cities,
  disabled,
  value,
}: CityProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <label className="block text-base font-medium text-midnight-blue">
          City/District
        </label>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent className="bg-white text-midnight-blue border border-gray-200 p-1 rounded-lg ">
              <p >
                If your city is not listed, please enter it manually.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="relative">
        <input
          type="text"
          list="city-list"
          value={value}
          {...register("city")}
          className="w-full px-4 h-11 rounded-lg border text-charcoal text-sm transition-all duration-200 outline-none border-gray-200 focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
          placeholder="Select city"
          disabled={disabled}
        />
        <datalist id="city-list">
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </datalist>
      </div>
      {errors.city && (
        <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
      )}
    </div>
  );
}
