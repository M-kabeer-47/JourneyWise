import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { stepThreeSchema } from '../../utils/schema'
import CloudinaryUpload from './ImageUpload'

interface StepThreeProps {
  onSubmit: (data: any) => void
  onBack: () => void
  initialData: Partial<any>
  submitting:boolean
}

const StepThree: React.FC<StepThreeProps> = ({ onSubmit, onBack, initialData,submitting }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(stepThreeSchema),
    mode: 'onSubmit',
    defaultValues: initialData
  })

  const handleFormSubmit = (data: any) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#4F4F4F] mb-6">Upload Profile Picture</h2>
      <div className="bg-[#F8F9FA] p-6 rounded-lg">
        <Controller
          name="profilePicture"
          control={control}
          defaultValue={null}
          rules={{ required: "Profile picture is required" }}
          render={({ field }) => (
            <CloudinaryUpload
              value={field.value}
              onChange={field.onChange} // @ts-ignore
              error={errors.profilePicture?.message}
            />
          )}
        />
      </div>
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
          className={`bg-[#003366] text-white py-2 px-4 rounded-md hover:bg-[#002855] transition-colors font-semibold ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  )
}

export default StepThree

