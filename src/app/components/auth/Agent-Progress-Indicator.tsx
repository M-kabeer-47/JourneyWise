import React from 'react'

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-between items-center">
      {Array.from({ length: totalSteps }, (_, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                i + 1 <= currentStep ? 'bg-[#003366] text-white' : 'bg-[#E6F3FF] text-[#003366]'
              }`}
            >
              {i + 1}
            </div>
            <span className="mt-2 text-xs text-[#4F4F4F]">
              {i === 0 ? 'Account' : i === 1 ? 'Profile' : i === 2 ? 'Agency' : 'Picture'}
            </span>
          </div>
          {i < totalSteps - 1 && (
            <div
              className={`flex-1 h-1 mx-2 ${
                i + 1 < currentStep ? 'bg-[#003366]' : 'bg-[#E6F3FF]'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default ProgressIndicator

