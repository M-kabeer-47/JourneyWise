import { z } from 'zod'

const stepOneSchemaBase = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1,"Email is required").email('Invalid email address'),
  password: z.string().min(1,"Password is required").min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
});

export const stepOneSchema = stepOneSchemaBase.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const stepTwoSchema = z.object({
  dob: z.string().min(1, 'Date of birth is required'),
  country: z.string().min(1, 'Country is required'),
  phoneNumber: z.string().min(1, 'Phone number is required')
})

export const stepThreeSchema = z.object({
  image: z.instanceof(File).nullable(),
  bio: z.string().max(160, 'Bio must be at most 160 characters').optional(),
});

export const signupSchema = stepOneSchemaBase.merge(stepTwoSchema).merge(stepThreeSchema).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const userSchema = stepOneSchemaBase.merge(stepTwoSchema).merge(stepThreeSchema)

export type SignupData = z.infer<typeof signupSchema>
