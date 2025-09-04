import Logo from "@/components/ui/Logo";
import {motion,AnimatePresence} from "framer-motion"
interface SignupLayoutProps {
    step: number;
    getStepIllustration: () => string;
    getStepTitle: () => string;
    getStepDescription: () => string;
    steps: Array<{ title: string; description: string }>;
}
export default function SignUpLayout({step,getStepIllustration,getStepTitle,getStepDescription,steps}:SignupLayoutProps) {
  return (
    <div className="relative hidden lg:flex">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div
          key={`image-${step}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full h-full"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${getStepIllustration()})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-blue to-midnight-blue opacity-70" />
        </motion.div>
      </div>

      {/* Content Layer */}
      <div className="relative w-full h-full flex flex-col z-10 p-6 md:p-8 lg:p-12">
        {/* Top area - Logo */}
        <div className="flex items-center mb-8">
          <Logo className="text-white text-2xl lg:text-3xl" />
        </div>

        {/* Middle area - Main content */}
        <div className="flex-grow flex flex-col justify-center items-start space-y-6 lg:space-y-8 max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${step}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              {/* Step indicator */}
              <div className="flex items-center px-3 py-1.5 lg:px-4 lg:py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs lg:text-sm font-medium mb-4 lg:mb-6 ">
                <span>Step {step} of 3</span>
                <span className="w-1 h-1 bg-white rounded-full mx-2 opacity-60"></span>
                <span>{steps[step - 1].title}</span>
              </div>

              {/* Title and description */}
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 lg:mb-6 leading-tight">
                {getStepTitle()}
              </h1>
              <p className="text-base lg:text-lg text-white/80 mb-6 lg:mb-8 max-w-md">
                {getStepDescription()}
              </p>

              {/* Feature Box - Responsive */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 lg:p-6 border border-white/20 max-w-md">
                <div className="flex items-start">
                  <div className="bg-white rounded-full p-1.5 lg:p-2 mr-3 lg:mr-4 flex-shrink-0 flex items-center justify-center">
                    {/* SVG icons remain the same */}
                    {step === 1 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 lg:h-6 lg:w-6 text-ocean-blue"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    )}
                    {step === 2 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 lg:h-6 lg:w-6 text-ocean-blue"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                        />
                      </svg>
                    )}
                    {step === 3 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 lg:h-6 lg:w-6 text-ocean-blue"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base lg:text-lg font-semibold text-white mb-1 lg:mb-2">
                      {step === 1 && "Secure and Simple"}
                      {step === 2 && "Personalized Journeys"}
                      {step === 3 && "Join Our Community"}
                    </h3>

                    <p className="text-xs lg:text-sm text-white/70">
                      {step === 1 &&
                        "Your information is encrypted and secure. Creating an account takes less than 2 minutes."}
                      {step === 2 &&
                        "Tell us about yourself so we can recommend experiences tailored just for you."}
                      {step === 3 &&
                        "Connect with fellow travelers and share your adventures with our global community."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom area - Steps progress - more responsive */}
        <div className="pt-6 lg:pt-12">
          <div className="flex flex-wrap items-center gap-x-3 lg:gap-x-4 gap-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex items-center ${
                  i < step
                    ? "text-white"
                    : i === step
                    ? "text-white"
                    : "text-white/40"
                }`}
              >
                <div
                  className={`w-6 h-6 font-inter lg:w-8 lg:h-8 rounded-full flex items-center justify-center mr-2 lg:mr-3 border-2
                        ${
                          i < step
                            ? "bg-white border-white"
                            : i === step
                            ? "border-white bg-transparent"
                            : "border-white/40 bg-transparent"
                        }`}
                >
                  {i < step ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 lg:h-4 lg:w-4 text-ocean-blue"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  ) : (
                    <span
                      className={`text-xs lg:text-sm ${
                        i === step ? "" : "opacity-40"
                      }`}
                    >
                      {i}
                    </span>
                  )}
                </div>
                <div className={`${i !== step && "opacity-80"}`}>
                  <p className="text-xs lg:text-sm font-medium">
                    {steps[i - 1].title}
                  </p>
                  <p className="text-[10px] lg:text-xs">
                    {steps[i - 1].description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
