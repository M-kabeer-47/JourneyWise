export interface SignupData {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
    dateOfBirth: string
    country: string
    phoneNumber: string
    agencyName: string
    facebookHandle: string
    instagramHandle: string
    identityCard: File | string | null
    businessRegistration: File | string | null
    profilePicture: File | string | null
    step:  number
  }
  
  