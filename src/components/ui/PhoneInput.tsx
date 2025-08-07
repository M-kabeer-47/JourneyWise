import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Phone } from "lucide-react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  value: string;
  onChange: (phoneNumber: string) => void;

  error?: string;
}

const CustomPhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,

  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2 mb-6">
      <Label
        htmlFor="phone"
        className={cn("text-sm font-medium text-gray-700")}
      >
        Phone Number
      </Label>

      <div className="relative">
        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

        <PhoneInput
          id="phone"
          type="tel"
          value={value}
          onChange={(value) => onChange(value)}
          inputStyle={{
            paddingLeft: "2.5rem",
            width: "100%",
            height: "42px",
            fontSize: "16px",
            backgroundColor: "#FFFFFF",
          }}
          inputClass="border border-gray-200 focus:border-ocean-blue outline-none focus:ring-2 focus:ring-ocean-blue/20 outline-none "
          buttonClass="border border-gray-200 outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 outline-none"
          buttonStyle={{
            borderTopLeftRadius: "0.375rem",
            borderBottomLeftRadius: "0.375rem",
            backgroundColor: "#F3F4F6",
          }}
          dropdownStyle={{
            width: "300px",
          }}
          placeholder={`Enter your phone number`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>

      {error && (
        <div className="flex items-center mt-1 text-sm text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default CustomPhoneInput;
