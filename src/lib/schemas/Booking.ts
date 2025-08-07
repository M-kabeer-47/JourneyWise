import { z } from "zod";
import { parsePhoneNumber } from "libphonenumber-js";

// Phone validation function
const validatePhoneNumber = (value: string) => {
  if (!value || value.trim() === "") {
    return false;
  }

  try {
    // The value from react-phone-input-2 already includes the country code
    const phoneNumber = parsePhoneNumber(`+${value.replace(/^\+/, '')}`);
    
    if (!phoneNumber || !phoneNumber.isValid()) {
      return false;
    }
    
    return true;
  } catch (error) {
    return false;
  }
};

export const bookingFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(validatePhoneNumber, {
      message: "Please enter a valid phone number",
    }),
  startDate: z.date({
    required_error: "Please select a start date",
  }),
  endDate: z.date(),
  packageCount: z
    .number({
      invalid_type_error: "Package count is required",
      required_error: "Package count is required",
    })
    .min(1, "Package count must be at least 1"),
  tier: z.object({
    name: z.string().optional(),
    price: z
      .number({
        invalid_type_error: "Price is required",
      })
      .min(0, "Price must be a positive number"),
    members: z
      .number({
        invalid_type_error: "Members is required",
      })
      .min(1, "Members must be at least 1"),
    description: z.string().optional(),
  }),
  customNotes: z.string().optional(),
  notes: z.string().optional(),
});

export type Booking = z.infer<typeof bookingFormSchema>;