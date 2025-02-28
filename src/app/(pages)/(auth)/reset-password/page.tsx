'use client'

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Logo from '@/components/ui/Logo'
import Input from '@/components/ui/Input'
import Toast from '@/components/auth/Custom-Toast'
import Spinner from '@/components/ui/Spinner'
import { authClient } from '@/lib/auth/authClient'
import { useRouter } from 'next/navigation'
const resetPasswordSchema = z.object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
   
  type ResetPasswordData = z.infer<typeof resetPasswordSchema>
  
  export default function ResetPassword() {

    const [isLoading, setIsLoading] = useState(false)
    const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
      show: false,
      message: '',
      type: 'success'
    })
    const router = useRouter();
  
    const { control, handleSubmit, formState: { errors }} = useForm<ResetPasswordData>({
      resolver: zodResolver(resetPasswordSchema),
    })
  
    const onSubmit = async (data: ResetPasswordData) => {
      setIsLoading(true)
      // Simulate API call

      const { data: Data, error:Error } = await authClient.resetPassword({
        newPassword: data.password,
      })
      if(Error){
        setIsLoading(false)
        setToast({ show: true, message: Error.message || 'An error occurred', type: 'error' })
        return
      }

      else if(Data){
        setIsLoading(false)
        setToast({ show: true, message: 'Password reset successfully', type: 'success' })
        router.push('/sign-in')
      }


      
    }
  
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
       
  
        <div className="mt-8 sm:mx-auto w-[90%] sm:w-full sm:max-w-md ">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 min-h-[500px]">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-[50px]">
          <Logo className="mx-auto text-3xl " />
          <h2 className="mt-7 text-center text-3xl max-[400px]:text-2xl font-bold text-[#4F4F4F]">Reset your password</h2>
          <p className="mt-2 text-center text-sm text-[#4F4F4F]">
            Enter your new password below.
          </p>
        </div>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    label="New Password"
                    type="password"
                    required
                    {...field}
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
                    label="Confirm New Password"
                    type="password"
                    required
                    {...field}
                    error={errors.confirmPassword?.message}
                  />
                )}
              />
  
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#003366] hover:bg-[#002855] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0077B6] transition-colors mt-[40px]"
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner size="small" /> : 'Reset Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
  
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(prev => ({ ...prev, show: false }))}
          />
        )}
      </div>
    )
  }
  
  