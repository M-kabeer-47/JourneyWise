import React from 'react'
import { FiX } from 'react-icons/fi'

interface ImagePreviewModalProps {
  imageUrl: string
  onClose: () => void
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto">
        <div className="flex justify-end mb-2">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>
        <img src={imageUrl} alt="Document preview" className="max-w-full h-auto" />
      </div>
    </div>
  )
}

export default ImagePreviewModal

