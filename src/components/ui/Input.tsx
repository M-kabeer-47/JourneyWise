import React, { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="mb-6 w-full">
      <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor={props.id || props.name}>
        {label}
      </label>
      <div className="relative">
        <input
          className={`input-field ${error ? 'border-red-500' : 'border-gray-300'}`}
          {...props}
          type={props.type === 'password' && showPassword ? 'text' : props.type}
        />
        {props.type === 'password' && (
          <button
            type="button"
            tabIndex={-1}
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {showPassword ? <FiEyeOff className="text-gray-500" /> : <FiEye className="text-gray-500" />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-red-500 text-xs italic">{error}</p>}
    </div>
  )
}

export default Input

