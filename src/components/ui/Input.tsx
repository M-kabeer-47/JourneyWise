import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <input
        type={type}
        className={cn(
          "w-full h-10 rounded-lg text-charcoal text-sm px-3",
          "transition-all duration-200 outline-none border",
          error 
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
            : "border-gray-200 bg-white focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20",
          isFocused && !error ? "border-ocean-blue ring-2 ring-ocean-blue/20" : "",
          props.disabled && "opacity-60 cursor-not-allowed",
          className
        )}
        ref={ref}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
