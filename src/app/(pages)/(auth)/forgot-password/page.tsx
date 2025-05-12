'use client'

import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import FormInput from '@/components/ui/FormInput'
import Toast from '@/components/auth/Custom-Toast'
import Spinner from '@/components/ui/Spinner'
import { authClient } from '@/lib/auth/authClient'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const forgotPasswordSchema = z.object({
    email: z.string().min(1,"Email is required").email('Invalid email address'),
  })
  
  type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>
  
  export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false)
    const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
      show: false,
      message: '',
      type: 'success'
    })
    
    const router = useRouter();
  
    const { control, handleSubmit, formState: { errors },setError } = useForm<ForgotPasswordData>({
      resolver: zodResolver(forgotPasswordSchema),
    })
  
    const onSubmit = async (data: ForgotPasswordData) => {
      setIsLoading(true)
      // Simulate API call
      try{
        const googleAccount = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/app_auth/checkGoogle`,
          {
          params: {
            email: data.email.toLowerCase()
  
        }
      }).then((response) => {
        if(response.status === 200){
          return false
          
        }
        }

        ).catch((error) => {
          if(error.response.status === 409){
            return true;
          }
          else if(error.response.status === 400){
            return false;
          }
        }
          
        )
        if(googleAccount){
          setIsLoading(false)
          setToast({ show: true, message: 'Account exists with google', type: 'error' })
          return;
        }
        

        

        const { data: Data, error: Error} = await authClient.forgetPassword({
          email: data.email,
          redirectTo: "/reset-password",
        })
        
      if(Data){
        setIsLoading(false)
        alert(JSON.stringify(Data))
      setToast({ show: true, message: 'Password reset link sent to your email', type: 'success' })
      // router.push('/sign-in')
      }
      

      }
      catch(error){
        alert(JSON.stringify(error))
      }
        
    }
  
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
        
  
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md w-[90%]">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 min-h-[500px]">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-[30px]">
          <Logo className="mx-auto text-3xl" />
          <h2 className="mt-7 text-center text-3xl font-bold text-[#4F4F4F] max-[400px]:text-2xl mb-[20px]">Forgot your password?</h2>
          <p className="mt-2 text-center text-sm text-[#4F4F4F]">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormInput
                    label="Email address"
                    type="email"
                    placeholder="Email Address"
                    
                    {...field}
                    error={errors.email?.message}
                  />
                )}
              />
  
              <div>
                <button
                  type="submit"
                  className={`w-[100%] bg-gradient-to-r from-midnight-blue to-ocean-blue text-white py-2 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 font-medium ${isLoading ? "opacity-50 cursor-not-allowed" : " "}`}
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner size="small" /> : 'Send reset link'}
                </button>
              </div>
            </form>
  
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-[#4F4F4F]">Or</span>
                </div>
              </div>
  
              <div className="mt-6 text-center">
                <Link href="/auth/login" className="font-medium hover:text-[#0077B6] text-midnightBlue transition-colors">
                  Return to login
                </Link>
              </div>
            </div>
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
  
  