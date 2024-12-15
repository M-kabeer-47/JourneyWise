import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { stepOneSchema } from '../../utils/schema'
import { SignupData } from '@/app/(pages)/(auth)/sign-up/types'
import Input from './ui/Input'

interface StepOneProps {
  onSubmit: (data: any) => void
  initialData: Partial<any>
  emailError:boolean
  setEmailError: React.Dispatch<React.SetStateAction<boolean>>
  setFormData: React.Dispatch<React.SetStateAction<Partial<SignupData>>>
}

const StepOne: React.FC<StepOneProps> = ({ onSubmit, initialData,emailError,setEmailError,setFormData }) => {
  const { control, handleSubmit, formState: { errors },setError} = useForm({
    resolver: zodResolver(stepOneSchema),
    mode: 'onSubmit',
    defaultValues: initialData
  })

  useEffect(() => {
    if(emailError){
      setError('email',{
        type:'manual',
        message:'Email already exists'
      })
      setEmailError(false)
    } 
  }
  , [emailError])
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#4F4F4F] mb-6">Create Your Account</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative top-[15px]">
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              label="First Name"
              {...field} // @ts-ignore
              error={errors.firstName?.message}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              label="Last Name"
              {...field} // @ts-ignore
              error={errors.lastName?.message}
            />
          )}
        />
      </div>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            label="Email"
            type="email" 
            {...field} // @ts-ignore
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            label="Password"
            type="password" 
            {...field} // @ts-ignore
            error={errors.password?.message}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            label="Confirm Password"
            type="password"
            {...field} // @ts-ignore
            error={errors.confirmPassword?.message}
          />
        )}
      />
      <button
        type="submit"
        onClick={()=>{
          setFormData((prev) => ({ ...prev, step: 1 }))
        }}
        className="w-full bg-[#003366] text-white py-3 px-4 rounded-md hover:bg-[#002855] transition-colors text-lg font-semibold"
      >
        Next
      </button>
    </form>
  )
}

export default StepOne

