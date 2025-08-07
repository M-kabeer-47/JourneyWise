
import { parsePhoneNumber } from "libphonenumber-js";
export function validatePhoneNumber(value: string, selectedCountry: string) {
    alert("Value: "+value)
    alert("Selected country: "+selectedCountry)
    if (!value) return "Phone number is required";
    try {
        alert("Selected country: " + selectedCountry);
        alert("Phone number: " + value); //@ts-ignore
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