import { useState } from "react";
import { Label } from "@/components/ui/label";
import { 
  User, Mail, Lock, Phone, Calendar, Globe, 
  Eye, EyeOff, AlertCircle,
  Link
} from "lucide-react";
import { cn } from "@/lib/utils";

type InputProps = {
  id?: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  disabled?: boolean;
  icon?: string;
  required?: boolean;
};

export default function FormInput({
  id,
  label,
  type = "text",
  placeholder = "",
  error,
  onChange,
  onBlur,
  value,
  name,
  disabled = false,
  icon,
  required = false,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Handle icon selection based on input type or explicit icon prop
  const getIcon = () => {
    if (icon) {
      switch (icon) {
        case "user": return <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />;
        case "mail": return <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />;
        case "lock": return <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />;
        case "phone": return <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />;
        case "calendar": return <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />;
        case "globe": return <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />;
        case "url": return <Link className="absolute left-3 top-3 h-4 w-4 text-gray-400" />;
        default: return null;
      }
    }

    // Default icons based on input type
    switch (type) {
      case "email": return <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />;
      case "password": return <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />;
      case "tel": return <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />;
      default: return <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-2">
      <Label 
        htmlFor={id || name} 
        className={cn(
          "text-sm font-medium text-gray-700",
          error && "text-red-500"
        )}
      >
        {label}{required && <span className="text-red-500">*</span>}
      </Label>
      
      <div className="relative">
        {getIcon()}
        
        <input
          id={id || name}
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          className={cn(
            "pl-10 w-full h-10 rounded-lg text-charcoal text-sm",
            "transition-all duration-200 outline-none border",
            error 
              ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
              : "border-gray-200 bg-white focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20",
            isFocused ? "border-ocean-blue ring-2 ring-ocean-blue/20" : "",
            disabled && "opacity-60 cursor-not-allowed"
          )}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
          onFocus={() => setIsFocused(true)}
          value={value}
          name={name}
          disabled={disabled}
          {...props}
        />
        
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? 
              <EyeOff className="h-4 w-4" /> : 
              <Eye className="h-4 w-4" />
            }
          </button>
        )}
      </div>
      
      {error && (
        <div className="flex items-center mt-1 text-sm text-red-500">
          <AlertCircle className="h-3 w-3 mr-1" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}