import { ButtonHTMLAttributes } from "react";
import { Spinner } from "./spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'google';
}

export function Button({ 
  children, 
  className = "", 
  isLoading = false, 
  variant = 'primary',
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = "relative flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#003366] hover:bg-[#002855] text-white",
    secondary: "bg-[#0077B6] hover:bg-[#006094] text-white",
    google: "bg-white hover:bg-gray-50 text-[#4F4F4F] border border-gray-300"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      
      {children}
    </button>
  );
}

