import React, { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepThreeSchema } from '../../lib/schemas/user';
import Spinner from '../ui/Spinner';
import Modal from '../ui/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, User, X, Check } from 'lucide-react';
import Image from 'next/image';

interface StepThreeProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
  initialData: Partial<any>;
  submitting: boolean;
  type: string;
}

const StepThree: React.FC<StepThreeProps> = ({ 
  onSubmit, 
  onBack, 
  initialData, 
  submitting, 
  type 
}) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<any>({});
  const [previewImage, setPreviewImage] = useState<string | null>(initialData.profilePicture || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(stepThreeSchema),
    mode: 'onSubmit',
    defaultValues: initialData
  });

  const handleFormSubmit = (data: any) => {
    if (type === 'agent') {
      setShowModal(true);
      setData(data);
    } else {
      onSubmit(data);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      // Show preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      setValue('profilePicture', file);
    } catch (error) {
      console.error('Error handling file:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    try {
      // Show preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      setValue('profilePicture', file);
    } catch (error) {
      console.error('Error handling dropped file:', error);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setValue('profilePicture', null);
  };

  return (
    <>
      <motion.form 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit(handleFormSubmit)} 
        className="space-y-6 flex flex-col min-h-[450px]"
      >
        <div className="flex-grow flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-midnight-blue mb-8 text-center">Add Your Profile Photo</h2>
          
          <div className="flex flex-col items-center">
            <Controller
              name="profilePicture"
              control={control}
              defaultValue={null}
              render={() => (
                <div className="w-full flex flex-col items-center space-y-8">
                  {/* Avatar preview */}
                  <div className="relative">
                    <div 
                      className={`w-36 h-36 rounded-full overflow-hidden border-4 
                        ${previewImage ? 'border-ocean-blue' : 'border-gray-200'} 
                        flex items-center justify-center bg-gray-50 relative group transition-all duration-300
                        shadow-lg`}
                    >
                      {previewImage ? (
                        <>
                          <Image 
                            src={previewImage} 
                            alt="Profile preview" 
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <button
                              type="button"
                              onClick={removeImage}
                              className="bg-red-500 text-white p-2 rounded-full"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        </>
                      ) : (
                        <User size={64} className="text-gray-300" />
                      )}
                    </div>
                    
                    {previewImage && (
                      <div className="absolute -bottom-2 -right-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white shadow-md">
                          <Check size={16} />
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Upload area */}
                  <div 
                    className={`w-full max-w-md border-2 border-dashed rounded-xl p-8 flex items-center justify-center cursor-pointer transition-all duration-200 
                      ${isDragging ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200 hover:border-ocean-blue/50 hover:bg-gray-50'}
                      ${errors.profilePicture ? 'border-red-400 bg-red-50' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-2 p-3 rounded-full bg-ocean-blue/10 text-ocean-blue">
                        <Upload size={24} />
                      </div>
                      <p className="text-gray-500">
                        Drop your photo here or <span className="text-ocean-blue underline">Upload</span>
                      </p>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>
                  
                  {errors.profilePicture && (
                    <p className="mt-2 text-sm text-red-500">{errors.profilePicture.message as string}</p>
                  )}
                </div>
              )}
            />
          </div>
        </div>
        
        <div className="flex justify-between gap-4 relative top-[100px]">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Back
          </button>
          
          <button
            type="submit"
            disabled={submitting || !previewImage}
            className={`flex-1 bg-gradient-to-r from-midnight-blue to-ocean-blue text-white py-3 rounded-lg shadow-md hover:shadow-xl  font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {submitting ? (
              <span className="flex items-center justify-center">
                <Spinner size="small" />
              </span>
            ) : (
              <span>Complete Registration</span>
            )}
          </button>
        </div>
      </motion.form>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
          onSubmit(data);
        }}
        title="Confirm Submission"
        message="Are you sure you want to submit your profile? This action cannot be undone."
      />

      <AnimatePresence>
        {submitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}
          >
            <Spinner size='small' />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StepThree;