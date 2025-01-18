import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, Check } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
          >
            <div className="bg-[#003366] text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle size={24} />
                <h2 className="text-xl font-semibold">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-[#F4A261] transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-[#4F4F4F] mb-6">{message}</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-[#4F4F4F] rounded-md hover:bg-gray-300 transition-colors flex items-center space-x-2"
                >
                  <X size={18} />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 bg-[#003366] text-white rounded-md hover:bg-[#002855] transition-colors flex items-center space-x-2"
                >
                  <Check size={18} />
                  <span>Confirm</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal

