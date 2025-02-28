import { z } from 'zod'

export const stepOneSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const stepTwoSchema = z.object({
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  country: z.string().min(1, 'Country is required'),
  phoneNumber: z.string().min(1, 'Phone number is required')
})

const urlSchema = z.string().url('Invalid URL').refine((url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }, 'Invalid URL')
export const stepThreeSchema = z.object({
    agencyName: z.string().min(1, 'Agency name is required'),
    facebookHandle: urlSchema.refine((url) => url.includes('facebook.com'), 'Must be a valid Facebook URL'),
    instagramHandle: urlSchema.refine((url) => url.includes('instagram.com'), 'Must be a valid Instagram URL'),
    identityCard: z.instanceof(File).nullable(),
    businessRegistration: z.instanceof(File).nullable()
  })
  

export const stepFourSchema = z.object({
  profilePicture: z.instanceof(File).nullable()
})
 
export const signupSchema = z.intersection(stepOneSchema, z.intersection(stepTwoSchema, z.intersection(stepThreeSchema, stepFourSchema)))

export type SignupData = z.infer<typeof signupSchema>

