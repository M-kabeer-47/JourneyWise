import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { stepThreeSchema } from '../../../lib/schemas/schema'
import CloudinaryUpload from './ImageUpload'
import Spinner from '../ui/spinner'
import Modal from '../ui/Modal'
import { motion, AnimatePresence } from 'framer-motion'

interface StepThreeProps {
  onSubmit: (data: any) => void
  onBack: () => void
  initialData: Partial<any>
  submitting: boolean
  type: string
}

const StepThree: React.FC<StepThreeProps> = ({ onSubmit, onBack, initialData, submitting, type }) => {
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<any>({})
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(stepThreeSchema),
    mode: 'onSubmit',
    defaultValues: initialData
  })

  const handleFormSubmit = (data: any) => {
    if (type === 'agent') {
      setShowModal(true)
      setData(data)
    } else {
      submitForm(data)
    }
  }

  const submitForm = (data: any) => {
    setIsLoading(true)
    onSubmit(data)
  }

  return (
    <>
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
                onChange={field.onChange}
                error={errors.profilePicture?.message as string}
              />
            )}
          />
        </div>
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onBack}
            className="bg-[#F4A261] w-[130px] text-white py-2 px-4 rounded-md hover:bg-[#E76F51] transition-colors font-semibold"
          >
            Back
          </button>
          <button
            type="submit"
            className={`bg-[#003366] text-white py-2 px-4 rounded-md w-[130px] hover:bg-[#002855] transition-colors font-semibold ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Submit
          </button>
        </div>
      </form>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false)
          submitForm(data)
        }}
        title="Confirm Submission"
        message="Are you sure you want to submit your agent profile? This action cannot be undone."
      />

<AnimatePresence>
  {submitting && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      aria-live="assertive"
    >
      <Spinner size='large' />
    </motion.div>
  )}
</AnimatePresence>

    </>
  )
}

export default StepThree

