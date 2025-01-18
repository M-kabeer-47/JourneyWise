import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { stepThreeSchema } from '@/lib/schemas/agent_schema'
import Input from '@/app/components/ui/Input'
import DocumentUpload from './Document-Upload'
import ImagePreviewModal from './ImagePreviewModal'

interface StepThreeProps {
  onSubmit: (data: any) => void
  onBack: () => void
  initialData: Partial<any>
  filePreviews: {[key: string]: string}
}


const StepThree: React.FC<StepThreeProps> = ({ onSubmit, onBack, initialData, filePreviews }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
      resolver: zodResolver(stepThreeSchema),
      mode: 'onSubmit',
      defaultValues: initialData
    })
  
    const [modalImage, setModalImage] = useState<string | null>(null)
  
    const handleImageClick = (imageUrl: string) => {
      setModalImage(imageUrl)
    }
  
    const closeModal = () => {
      setModalImage(null)
    }
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#4F4F4F] mb-6">Agency Information</h2>
        <Controller
          name="agencyName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              label="Agency Name"
              {...field}
              error={errors.agencyName?.message?.toString()}
            />
          )}
        />
        <Controller
          name="facebookHandle"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              label="Facebook Handle"
              {...field}
              error={errors.facebookHandle?.message?.toString()}
              placeholder="https://facebook.com/youragency"
            />
          )}
        />
        <Controller
          name="instagramHandle"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              label="Instagram Handle"
              {...field}
              error={errors.instagramHandle?.message?.toString()}
              placeholder="https://instagram.com/youragency"
            />
          )}
        />
        <Controller
          name="identityCard"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <DocumentUpload
              label="Identity Card"
              {...field}
              error={errors.identityCard?.message?.toString()}
              onImageClick={handleImageClick}
              preview={filePreviews.identityCard}
            />
          )}
        />
        <Controller
          name="businessRegistration"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <DocumentUpload
              label="Business Registration Document"
              {...field}
              error={errors.businessRegistration?.message?.toString()}
              onImageClick={handleImageClick}
              preview={filePreviews.businessRegistration}
            />
          )}
        />
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onBack}
            className="bg-[#F4A261] text-white py-2 px-4 rounded-md hover:bg-[#E76F51] transition-colors font-semibold"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-[#003366] text-white py-2 px-4 rounded-md hover:bg-[#002855] transition-colors font-semibold"
          >
            Next
          </button>
        </div>
        {modalImage && (
          <ImagePreviewModal imageUrl={modalImage} onClose={closeModal} />
        )}
      </form>
    )
  }
  
  export default StepThree
  
  