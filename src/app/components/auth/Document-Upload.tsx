import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload, FiFile } from 'react-icons/fi'

interface DocumentUploadProps {
  label: string
  value: File | null
  onChange: (file: File | null) => void
  error?: string
  onImageClick: (imageUrl: string) => void
  preview?: string
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ label, value, onChange, error, onImageClick, preview }) => {
  const [localPreview, setLocalPreview] = useState<string | null>(preview || null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      onChange(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLocalPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [onChange, setLocalPreview])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  })

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#4F4F4F]">{label}</label>
      <div
        {...(localPreview ? {} : getRootProps())}
        className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center ${
          localPreview ? '' : 'cursor-pointer'
        } transition-colors ${
          isDragActive ? 'border-[#0077B6] bg-[#E6F3FF]' : 'border-[#003366] hover:bg-[#F0F8FF]'
        }`}
      >
        <input {...getInputProps()} />
        {localPreview ? (
          <>
            <img
              src={localPreview}
              alt="Document preview"
              className="max-h-24 max-w-full object-contain mb-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onImageClick(localPreview);
              }}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLocalPreview(null);
                onChange(null);
              }}
              className="mt-2 text-sm text-[#003366] hover:text-[#0077B6] transition-colors"
            >
              Change
            </button>
          </>
        ) : (
          <>
            <FiUpload className="text-[#003366] text-3xl mb-2" />
            <p className="text-[#4F4F4F] text-sm text-center">
              {isDragActive ? 'Drop the document here' : 'Drag and drop a document here, or click to select'}
            </p>
          </>
        )}
      </div>
      {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
    </div>
  )
}

export default DocumentUpload

