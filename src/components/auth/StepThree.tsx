import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepThreeSchema } from "../../lib/schemas/user";
import Spinner from "../ui/Spinner";
import Modal from "../ui/Modal";
import FormInput from "../ui/FormInput";
import { motion, AnimatePresence } from "framer-motion";
import { User, X, Check, Camera } from "lucide-react";
import Image from "next/image";

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
  type,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<any>({});
  const [previewImage, setPreviewImage] = useState<string | null>(
    initialData.profilePicture || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(stepThreeSchema),
    mode: "onSubmit",
    defaultValues: initialData,
  });

  const bio = watch("bio");

  const handleFormSubmit = (data: any) => {
    if (type === "agent") {
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

      setValue("profilePicture", file);
    } catch (error) {
      console.error("Error handling file:", error);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setValue("profilePicture", null);
  };

  return (
    <>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col justify-between h-full"
      >
        {/* Input Section */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-midnight-blue mb-8 text-center">
            Complete Your Profile
          </h2>

          <div className="flex flex-col items-center space-y-6">
            <Controller
              name="profilePicture"
              control={control}
              defaultValue={null}
              render={() => (
                <div className="flex flex-col items-center">
                  {/* Avatar with click to upload */}
                  <div className="relative group">
                    <div
                      className={`w-36 h-36 rounded-full overflow-hidden border-2 transition-all duration-300
                        ${
                          previewImage
                            ? "border-midnight-blue"
                            : "border-gray-200 hover:border-ocean-blue/50"
                        } 
                        flex items-center justify-center bg-gray-50 relative cursor-pointer shadow-lg
                        ${!previewImage ? "hover:bg-gray-100" : ""}`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {previewImage ? (
                        <>
                          <Image
                            src={previewImage}
                            alt="Profile preview"
                            fill
                            className="object-cover"
                          />
                          {/* Overlay for hover */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  fileInputRef.current?.click();
                                }}
                                className="bg-ocean-blue text-white p-2 rounded-full hover:bg-ocean-blue/90 transition-colors"
                              >
                                <Camera size={16} />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeImage();
                                }}
                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center p-4 text-gray-400">
                          <User size={48} className="mb-2" />
                          <span className="text-xs">Click to add photo</span>
                        </div>
                      )}
                    </div>

                    {previewImage && (
                      <div className="absolute -bottom-2 -right-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white shadow-md">
                          <Check size={16} />
                        </span>
                      </div>
                    )}

                    {/* Hidden file input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  {/* Helper text */}
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Upload a profile photo (optional)
                  </p>

                  {errors.profilePicture && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.profilePicture.message as string}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Bio Input */}
            <div className="w-full">
              <Controller
                name="bio"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormInput
                    id="bio"
                    label="Bio"
                    placeholder="Tell us a little about yourself..."
                    isTextArea={true}
                    rows={3}
                    {...field}
                    error={errors.bio?.message as string}
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* Button Section */}
        <div className="flex justify-between gap-4 mt-8">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-200 text-gray-800 py-2.5 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={submitting}
            className={`flex-1 bg-gradient-to-r from-midnight-blue to-ocean-blue text-white py-2.5 rounded-lg shadow-md hover:shadow-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
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
            <Spinner size="small" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StepThree;
