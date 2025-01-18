'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload, FiUser } from 'react-icons/fi'

interface CloudinaryUploadProps {
  value: File | null
  onChange: (file: File | null) => void
  error?: string
}

const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({ value, onChange, error }) => {
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      onChange(file)
      setPreview(URL.createObjectURL(file))
    }
  }, [onChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: false,
    onDrop
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="w-32 h-32 rounded-full bg-[#E6F3FF] border-[3px] border-[#003366] flex items-center justify-center overflow-hidden">
          {preview ? (
            <img src={preview} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <FiUser className="text-[#003366] text-4xl" />
          )}
        </div>
      </div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
          isDragActive ? 'border-[#0077B6] bg-[#E6F3FF]' : 'border-[#003366] hover:bg-[#F0F8FF]'
        }`}
      >
        <input {...getInputProps()} />
        <FiUpload className="text-[#003366] text-3xl mb-2" />
        <p className="text-[#4F4F4F] text-sm text-center">
          {isDragActive ? 'Drop the image here' : 'Drag and drop an image here, or click to select'}
        </p>
      </div>
      {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
    </div>
  )
}

export default CloudinaryUpload

