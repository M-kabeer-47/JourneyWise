import { RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {cn} from "@/utils/shadcn/utils"
export default function ImageSizeOption({
    value,
    label,
    icon,
    description,
  }: {
    value: string;
    label: string;
    icon: React.ReactNode;
    description?: string;
  }) {
    return (
      <div className="relative">
        <RadioGroupItem value={value} id={value} className="peer sr-only absolute" />
        <Label
          htmlFor={value}
          className={cn(
            "flex flex-col items-center gap-2 rounded-lg border-2 border-light-gray bg-white p-4",
            "hover:border-ocean-blue/50 hover:bg-light-gray/5 transition-all cursor-pointer",
            "peer-data-[state=checked]:border-ocean-blue peer-data-[state=checked]:bg-light-gray text-ocean-blue",
            "peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-ocean-blue/20",
            "min-h-[120px] justify-center",
          )}
        >
          {icon}
          <div className="text-center">
            <p className="text-sm font-medium text-charcoal">{label}</p>
            {description && <p className="text-xs text-charcoal/70">{description}</p>}
          </div>
        </Label>
      </div>
    );
  };