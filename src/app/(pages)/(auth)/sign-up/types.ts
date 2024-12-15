export interface SignupData {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
    dateOfBirth: string
    country: string
    phoneNumber: string
    profilePicture: File | string | null
    step: number
  }
  
  