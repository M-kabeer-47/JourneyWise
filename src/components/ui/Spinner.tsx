import type React from "react"

interface SpinnerProps {
  size?: "small" | "medium" | "large"
}

const Spinner: React.FC<SpinnerProps> = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  }

  const borderClasses = {
    small: "border-2 border-gray-200 border-t-gray-600",
    medium: "border-3 border-gray-200 border-t-midnight-blue",
    large: "border-4 border-gray-200 border-t-midnight-blue",
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div
        className={`${sizeClasses[size]} ${borderClasses[size]} rounded-full animate-spin`}
        style={{ animationDuration: "0.8s" }}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default Spinner

