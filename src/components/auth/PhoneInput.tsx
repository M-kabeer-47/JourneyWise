import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Phone, AlertCircle } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { cn } from '@/utils/shadcn/utils';

interface PhoneInputProps {
  value: string
  onChange: (phoneNumber: string, country: any) => void
  country: string
  error?: string
}

const CustomPhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, country, error }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2 mb-6">
      <Label 
        htmlFor="phone" 
        className={cn(
          "text-sm font-medium text-gray-700",
          error && "text-red-500"
        )}
      >
        Phone Number<span className="text-red-500">*</span>
      </Label>
      
      <div className="relative">
        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        
        <PhoneInput
          id="phone"
          type="tel"
          country={country.toLowerCase()}
          value={value}
          onChange={(phone, country) => onChange(phone, country)}
          inputStyle={{
            paddingLeft: '2.5rem',
            width: '100%',
            height: '42px',
            fontSize: '16px',
            borderColor: error ? '#EF4444' : '#D1D5DB',
            borderRadius: '0.375rem',
            backgroundColor: '#FFFFFF',
          }}
          buttonStyle={{
            borderColor: error ? '#EF4444' : '#D1D5DB',
            borderTopLeftRadius: '0.375rem',
            borderBottomLeftRadius: '0.375rem',
            backgroundColor: '#F3F4F6',
          }}
          dropdownStyle={{
            width: '300px',
          }}
          containerStyle={{
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          }}
          placeholder={country ? `Enter phone number for ${country}` : "Select a country first"}
          disabled={!country}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      
      {error && (
        <div className="flex items-center mt-1 text-sm text-red-500">
          <AlertCircle className="h-3 w-3 mr-1" />
          <p>{error}</p>
        </div>
      )}
    </div>
  )
}

export default CustomPhoneInput

