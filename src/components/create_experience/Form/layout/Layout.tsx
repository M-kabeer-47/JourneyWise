"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface StepLayoutProps {
  preview: ReactNode;
  form: ReactNode;
  stepKey?: string | number;

  // Navigation props
  onPrevious?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;

  // Button states
  showSubmit?: boolean;
  isSubmitting?: boolean;
}

export default function StepLayout({
  preview,
  form,
  stepKey = "default",
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting = false,
}: StepLayoutProps) {
  // use Location to determine if we are on first or last step
  const showPrevious = stepKey !== "step1";
  const showNext = stepKey !== "step4";
  onSubmit = showNext ? onNext : onSubmit;
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      y: -40,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-[50%_50%] gap-6">
          {/* Preview Section */}
          <div className="lg:sticky lg:top-6 h-fit order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={stepKey}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-6 md:gap-8"
              >
                {preview}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 order-1 lg:order-2">
            <form onSubmit={onNext}>
              <AnimatePresence>
                <motion.div
                  key={stepKey}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {form}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons - exactly like create-experience page */}
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={onPrevious}
                  disabled={!showPrevious}
                  className="px-6 h-11 rounded-lg border-2 border-ocean-blue text-ocean-blue font-medium 
                           transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                           hover:bg-ocean-blue hover:text-white"
                >
                  Previous
                </button>

                {showNext ? (
                  <button
                    type="submit"
                    className="px-6 h-11 rounded-lg bg-ocean-blue text-white font-medium
                             transition-all duration-200 hover:bg-midnight-blue"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 h-11 rounded-lg bg-ocean-blue text-white font-medium
                             transition-all duration-200 hover:bg-midnight-blue disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin h-6 w-6 text-white" />
                        <p>Submitting...</p>
                      </div>
                    ) : (
                      <p>Submit</p>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
