import React from "react";
import { ChevronDown } from "lucide-react";

interface SettingButtonProps {
  label: string;
  value: string;
  onClick: () => void;
}

export default function SettingButton({
  label,
  value,
  onClick,
}: SettingButtonProps) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-charcoal">{label}</label>
      <button
        onClick={onClick}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none hover:bg-gray-50 flex items-center gap-2 font-medium text-ocean-blue w-48 justify-between"
      >
        <span>{value}</span>
        <ChevronDown size={16} className="text-gray-500" />
      </button>
    </div>
  );
}