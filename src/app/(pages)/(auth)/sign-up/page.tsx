'use client'

import { useState } from 'react'
import axios from 'axios'
import StepOne from '../../../components/StepOne'
import StepTwo from '../../../components/StepTwo'
import StepThree from '../../../components/StepThree'
import ProgressIndicator from '../../../components/ProgressIndicator'
import Logo from '../../../components/ui/Logo'
import { SignupData } from './types'
import Toast from '../../../components/Custom-Toast'
import { authClient } from '@/lib/auth_client'
import { set } from 'zod'

export default function Signup() {
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState<Partial<SignupData>>({step: 1})
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))
  const emailExists = async (email: string) => {
    
    let response = await axios.get(`/api/NotBetterAuth/checkEmail`,
      {
      params: {
        email: email

    }
  }).then((response) => {
    if(response.status === 200){
      return false
    }
    }).catch((error) => {
      alert("error.response"+JSON.stringify(error.response))

      if(error.response.status == 409){
        alert("Email already exists")
        return true;
      }
      else if(error.response.status == 400){
        alert("Email doesn't exist")
        return false;
    }
  }

    )
    return response;
    
    
  }

  const checkPhone = async(phoneNumber:string) =>
    {
    let response =await axios.get(`/api/NotBetterAuth/checkPhone`,
 {
 params: {
   phone: phoneNumber
}
}).then((response) => {
if(response.status === 200){
 alert("Phone doesn't exist")
 return false
}
}
).catch((error) => {
 if(error.response.status == 409){
   alert("Phone already exists")
   return true;
 }
 else if(error.response.status == 400){
   alert("Phone doesn't exist")
   return false;
}
}

)
return response;
}



  const handleStepSubmit = async(data: Partial<SignupData>) => {
    setFormData(prev => ({ ...prev, ...data }))
    if (formData.step === 1) { //@ts-ignore
      alert("Email"+data.email) //@ts-ignore
      let emailExistsCheck = await emailExists(data.email)
      alert("emailExistsCheck"+emailExistsCheck) 
      if(emailExistsCheck){
        alert("Email already exists")
        setEmailError(true)
        return;
      }
    }
    else if(formData.step === 2){
      alert("Phone"+data.phoneNumber)
      let phoneExistsCheck = await checkPhone(data.phoneNumber || '')
      alert("phoneExistsCheck"+phoneExistsCheck)
      if(phoneExistsCheck){
        setPhoneError(true)
        return;
      }
      
  }
    
    
    nextStep()
  }

  const handleFinalSubmit = async (data: Partial<SignupData>) => {
    const finalData = { ...formData, ...data }
    
    // Upload the profile picture
    if (finalData.profilePicture instanceof File) {
      
      const uploadedImageUrl = await uploadToCloudinary(finalData.profilePicture)
      // @ts-ignore
      finalData.profilePicture = uploadedImageUrl
    }
    setSubmitting(true)
    console.log('Form submitted:', finalData)
    alert(JSON.stringify(finalData, null, 2))
    
    const {data:Data,error } = await authClient.signUp.email({
      email: finalData.email || '',
      password: finalData.password || '', 
      name: finalData.firstName + ' ' + finalData.lastName, 
      image: finalData.profilePicture || ""
    })
    const twoFactorResponse = await authClient.twoFactor.enable({
      password: finalData.password || '', 
    });

    if(twoFactorResponse.data && Data){
      let response = await axios.post('/api/NotBetterAuth/signUp', {
        country: finalData.country,
        phone: finalData.phoneNumber,
        dob: finalData.dateOfBirth,
        userId: Data.user.id
      })
      setSubmitting(false)
      if(response.status === 201){
        alert(JSON.stringify(Data, null, 2))
        setToastMessage("Account created successfully")
      setShowToast(true)
      setTimeout(() => setShowToast(false), 5000);
      }
      else{
        setToastMessage("Account creation failed, please try again later")
        setShowToast(true)
        setTimeout(() => setShowToast(false), 5000);
      }

      

    }
    
  }

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '')

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )
      const data = await response.json()
      return data.secure_url
    } catch (error) {
      console.error('Upload failed:', error)
      throw error
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
        <Logo className="text-3xl mb-6" />
        <ProgressIndicator currentStep={step} totalSteps={3} />
        <div className="mt-8 min-h-[400px]">
          {step === 1 && <StepOne onSubmit={handleStepSubmit} initialData={formData} emailError={emailError} setEmailError={setEmailError} setFormData={setFormData}/>}
          {step === 2 && <StepTwo onSubmit={handleStepSubmit} onBack={prevStep} initialData={formData} setFormData={setFormData} phoneError={phoneError} setPhoneError={setPhoneError} />}
          {step === 3 && <StepThree onSubmit={handleFinalSubmit} onBack={prevStep} initialData={formData} submitting={submitting}/>}
        </div>
      </div>
      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}

