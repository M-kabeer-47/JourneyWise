'use client'

import { useState, useEffect } from 'react'
import Logo from '../../../../components/ui/Logo'
import OtpInput from '../../../../components/auth/Otp-Input'
import { authClient } from '@/lib/auth/authClient'
import Toast from '@/components/auth/Custom-Toast'
import { useRouter } from 'next/navigation'
export default function OtpVerificationPage() {
  const [otp, setOtp] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [resendTimer, setResendTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const [error, setError] = useState(false)
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success')
    const router = useRouter()
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0 && !canResend) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    } else {
      setCanResend(true)
    }
    return () => clearInterval(interval)
  }, [resendTimer, canResend])

  useEffect(() => {
    authClient.twoFactor.sendOtp()
  }, [])

  const handleOtpChange = async (value: string) => {
    setOtp(value)
    if (value.length === 6) {
      try {
        const { data, error } = await authClient.twoFactor.verifyOtp({ code: value })
        if (data) {
          setToastMessage('OTP verified successfully')
          setToastType('success')
          setShowToast(true)
          setTimeout(() => {
            setShowToast(false)
            router.push("/dashboard")
          }
            ,3000 
            )
            

        } else {
          setOtp('')
          setError(true)
        }
      } catch (e) {
        setError(true)
        setOtp('')
      }
    }
  }

  const resendOtp = async () => {
    try {
      const { data, error } = await authClient.twoFactor.sendOtp()
      if (data) {
        setCanResend(false)
        setToastMessage('OTP resent successfully')
        setToastType('info')
        setShowToast(true)
      } else if (error) {
        alert("Error: " + JSON.stringify(error))
      }
    } catch (error) {
      alert("An unexpected error occurred while resending OTP")
    }
    setOtp('')
    setResendTimer(30)
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center px-4 py-6">
      <div className="w-full max-w-md">
        <Logo className="mb-8 text-center" />
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#4F4F4F] text-center mb-4 md:mb-6">
            Enter Verification Code
          </h2>
          <p className="text-sm md:text-base text-[#4F4F4F] text-center mb-6 md:mb-8">
            We've sent a 6-digit code to your email. Please enter it below.
          </p>
          <OtpInput value={otp} onChange={handleOtpChange} setError={setError} />
          {error && <p className="text-red-500 text-xs md:text-sm mt-2 text-center">Invalid OTP</p>}
          <div className="mt-6 md:mt-8 text-center">
            {canResend ? (
              <button
                onClick={resendOtp}
                className="text-sm md:text-base text-[#0077B6] hover:text-[#003366] transition-colors duration-300"
              >
                Resend OTP
              </button>
            ) : (
              <p className="text-sm md:text-base text-[#4F4F4F]">
                Resend OTP in {resendTimer} seconds
              </p>
            )}
          </div>
        </div>
      </div>
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => {
            setShowToast(false)
            setToastMessage('')
          }}
        />
      )}
    </div>
  )
}

