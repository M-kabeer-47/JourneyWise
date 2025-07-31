import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Minus, Plus, HelpCircle } from "lucide-react";
interface ServiceSectionProps {
  title: string;
  services: string[];
  onAddService: () => void;
  onRemoveService: (index: number) => void;
  onUpdateService: (index: number, value: string) => void;
  focusedField: string | null;
  onFocus: (field: string) => void;
  onBlur: () => void;
  type: "included" | "excluded";
  error?: string;
}

export default function ServiceSection({
  title,
  services,
  onAddService,
  onRemoveService,
  onUpdateService,
  focusedField,
  onFocus,
  onBlur,
  type,
  error,
}: ServiceSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-midnight-blue">{title}</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent className="bg-white text-midnight-blue border border-gray-200 p-2 rounded-lg text-sm">
              <p>
                List services that are{" "}
                {type === "included" ? "included in" : "not included in"} your
                experience 
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="space-y-3">
        {services.map((service, index) => (
          <div key={`${type}-${index}`} className="flex items-center gap-2">
            <input
              type="text"
              value={service}
              onChange={(e) => onUpdateService(index, e.target.value)}
              onFocus={() => onFocus(`${type}Services.${index}`)}
              onBlur={onBlur}
              className={`flex-grow px-4 h-11 rounded-lg border text-charcoal text-sm
                         transition-all duration-200 outline-none
                         ${
                           focusedField === `${type}Services.${index}`
                             ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                             : "border-gray-200"
                         }`}
              placeholder={`Enter ${
                type === "included" ? "an included" : "an excluded"
              } service`}
            />
            <button
              type="button"
              onClick={() => onRemoveService(index)}
              className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        ))}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <button
          type="button"
          onClick={onAddService}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-ocean-blue hover:bg-ocean-blue/10 rounded-lg transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>
    </div>
  );
}
