import { motion } from "framer-motion"
import { ReactNode } from "react"

interface ModalWrapperProps {
  children: ReactNode
  overlayVariants: any
  modalVariants: any
}

export const ModalWrapper = ({ children, overlayVariants, modalVariants }: ModalWrapperProps) => {
  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      />
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative overflow-hidden border border-gray-100">
          <div className="p-4 sm:p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </motion.div>
    </>
  )
}