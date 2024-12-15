import React from 'react'

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large'; // Added size prop
}

const Logo: React.FC<LogoProps> = ({ className, size = 'medium' }) => { // Added size prop with default value
  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-3xl',
    large: 'text-4xl',
  };

  return (
    <h1 className={`${sizeClasses[size]} font-bold text-[#003366] ${className}`} style={{ fontFamily: 'Raleway, sans-serif' }}>
      JourneyWise
    </h1>
  )
}

export default Logo

