import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface PhoneInputProps {
  value: string
  onChange: (phoneNumber: string, country: any) => void
  country: string
  error?: string
}

const CustomPhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, country, error }) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-semibold mb-2">Phone Number</label>
      <PhoneInput
        country={country.toLowerCase()}
        value={value}
        onChange={(phone, country) => onChange(phone, country)}
        inputStyle={{
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
      />
      {error && <p className="mt-1 text-red-500 text-xs italic">{error}</p>}
    </div>
  )
}

export default CustomPhoneInput

