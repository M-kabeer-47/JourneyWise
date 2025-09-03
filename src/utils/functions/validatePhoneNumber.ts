
import { parsePhoneNumber } from "libphonenumber-js";
export function validatePhoneNumber(value: string, selectedCountry: string) {
    
    if (!value) return "Phone number is required";
    try {
       
      const phoneNumber = parsePhoneNumber(value, selectedCountry);
      console.log("Parsed phone number:", phoneNumber); // Debug log
      if (!phoneNumber || !phoneNumber.isValid() || phoneNumber.country === undefined) {
        false 
      }
    } catch (error) {
        false
      
    }
    return true;
  };