import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiCheckCircle, FiInfo, FiAlertTriangle, FiAlertOctagon } from 'react-icons/fi'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  onClose: () => void
  duration?: number
}

const Toast: React.FC<ToastProps> = ({ message, type , onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [onClose, duration])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <FiAlertOctagon className="h-5 w-5 text-red-500" />
      case 'warning':
        return <FiAlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'info':
      default:
        return <FiInfo className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.5 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 0.6
        }}
        className="fixed bottom-4 right-4 w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden"
        style={{
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {getIcon()}
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">{message}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <FiX className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Toast

