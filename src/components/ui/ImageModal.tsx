import React from 'react';
import { X } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt?: string;
}

const ImageModal = ({ isOpen, onClose, imageUrl, alt = "Image" }: ImageModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center w-full z-50 top-[50px]">
          <div className="relative rounded-[0px] h-[70] min-[700px]:h-[70%] px-[2%]">
            <div className="flex justify-end">
              <button
                onClick={() => onClose()}
                className="absolute top-[-30px] text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={alt}
              className="w-full h-full object-contain"
            />
            <p className="mt-2 text-sm text-gray-200">
              
            </p>
          </div>
        </div>
  )}


export default ImageModal;