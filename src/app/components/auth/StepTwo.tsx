import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { stepTwoSchema } from '../../../lib/schemas/schema'
import DatePicker from './Date-Picker'
import CountrySelect from './Country-Select'
import { SignupData } from '@/app/(pages)/(auth)/sign-up/types'
import PhoneInput from './PhoneInput'
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'
import Spinner from '../ui/spinner'

type PhoneError = {
  message: string
  status: boolean
}
interface StepTwoProps {
  onSubmit: (data: any) => void
  onBack: () => void
  initialData: Partial<any>
  setFormData: React.Dispatch<React.SetStateAction<Partial<SignupData>>>
  phoneError: PhoneError
  setPhoneError: React.Dispatch<React.SetStateAction<PhoneError>>
  secondStepLoading: boolean
}

const StepTwo: React.FC<StepTwoProps> = ({
  onSubmit,
  onBack,
  initialData,
  setFormData,
  phoneError,
  setPhoneError,
  secondStepLoading,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(initialData.country || '')
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    resolver: zodResolver(stepTwoSchema),
    mode: 'onSubmit',
    defaultValues: initialData,
  })

  const validatePhoneNumber = (value: string) => {
    if (!value) return 'Phone number is required'
    try {
      const phoneNumber = parsePhoneNumber(value, selectedCountry)
      if (!phoneNumber || !phoneNumber.isValid()) {
        return 'Invalid phone number for the selected country'
      }
    } catch (error) {
      return 'Invalid phone number'
    }
    return true
  }

  useEffect(() => {
    if (phoneError.status) {
      setError('phoneNumber', {
        type: 'manual',
        message: phoneError.message,
      })
      setPhoneError({ message: '', status: false })
    }
  }, [phoneError])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#4F4F4F] mb-6">Complete Your Profile</h2>
      <Controller
        name="dateOfBirth"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <DatePicker
            label="Date of Birth"
            {...field} // @ts-ignore
            error={errors.dateOfBirth?.message}
          />
        )}
      />
      <Controller
        name="country"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <CountrySelect
            {...field}
            onCountryChange={(country) => {
              setSelectedCountry(country)
              setValue('phoneNumber', '') // Reset phone number when country changes
            }} // @ts-ignore
            error={errors.country?.message}
          />
        )}
      />
      <Controller
        name="phoneNumber"
        control={control}
        defaultValue=""
        rules={{ validate: validatePhoneNumber }}
        render={({ field }) => (
          <PhoneInput
            {...field}
            country={selectedCountry}
            error={typeof errors.phoneNumber?.message === 'string' ? errors.phoneNumber.message : undefined}
          />
        )}
      />
      <div className="flex justify-between mt-8 relative top-8">
        <button
          type="button"
          onClick={onBack}
          className="bg-[#F4A261] w-[130px] text-white py-2 px-4 rounded-md hover:bg-[#E76F51] transition-colors font-semibold"
        >
          Back
        </button>
        <button
          disabled={secondStepLoading}
          type="submit"
          className="bg-[#003366] w-[130px] text-white py-2 px-4 rounded-md hover:bg-[#002855] transition-colors font-semibold"
        >
          {secondStepLoading ? <Spinner size="small" /> : 'Next'}
        </button>
      </div>
    </form>
  )
}

export default StepTwo
