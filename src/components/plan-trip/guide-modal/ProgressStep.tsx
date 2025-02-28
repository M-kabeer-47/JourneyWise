import { LucideIcon } from "lucide-react"

interface Step {
  title: string
  description: string
  icon: LucideIcon
  completed: boolean
}

interface ProgressStepsProps {
  steps: Step[]
  currentStep: number
}

export const ProgressSteps = ({ steps, currentStep }: ProgressStepsProps) => {
  return (
    <div className="w-full mb-6 sm:mb-8">
      <div className="flex justify-between items-center relative mb-2">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col items-center relative z-10 w-24 sm:w-32">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-2 transition-colors
                ${
                  i + 1 === currentStep
                    ? "bg-ocean-blue text-white"
                    : i + 1 < currentStep || s.completed
                      ? "bg-midnight-blue text-white"
                      : "bg-white text-gray-400 border border-gray-200"
                }`}
            >
              <s.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-charcoal text-center">{s.title}</span>
            <span className="text-[10px] sm:text-xs text-gray-500 text-center hidden sm:block">
              {s.description}
            </span>
          </div>
        ))}
        <div className="absolute top-4 sm:top-5 left-[15%] right-[15%] h-[2px] bg-white border border-gray-200 -z-0">
          <div
            className="h-full bg-midnight-blue transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}