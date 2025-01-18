'use client'

import { useState, useRef, useEffect } from 'react'

interface OtpInputProps {
  value: string
  onChange: (value: string) => void
  setError: React.Dispatch<React.SetStateAction<boolean>>
}

export default function OtpInput({ value, onChange,setError }: OtpInputProps) {
  const [individualValues, setIndividualValues] = useState(Array(6).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    setIndividualValues(value.split('').concat(Array(6 - value.length).fill('')))
  }, [value])

  const handleChange = (index: number, newValue: string) => {
    setError(false)
    if (newValue.length > 1) {
      // Handle paste event
      const pastedValue = newValue.slice(0, 6)
      onChange(pastedValue)
      if (pastedValue.length === 6) {
        inputRefs.current[5]?.focus()
      } else {
        inputRefs.current[pastedValue.length]?.focus()
      }
    } else {
      const newIndividualValues = [...individualValues]
      newIndividualValues[index] = newValue
      setIndividualValues(newIndividualValues)
      onChange(newIndividualValues.join(''))
      if (newValue && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !individualValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex justify-between mb-4">
      {individualValues.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={6}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-11 md:w-12    h-12 text-center text-2xl border-[1px] border-midnightBlue rounded-md focus:outline-none focus:border-midnightBlue focus:ring-[2px] focus:ring-midnightBlue"
        />
      ))}
    </div>
  )
}

