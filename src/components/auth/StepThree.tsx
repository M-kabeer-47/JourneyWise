import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupData, stepThreeSchema } from "../../lib/schemas/user";
import Spinner from "../ui/Spinner";
import FormInput from "../ui/FormInput";
import { motion, AnimatePresence } from "framer-motion";
import { User, X, ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import ConfirmationModal from "./signup/ConfirmationModal";
import { toast } from "@/components/ui/Toast";

interface StepThreeProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
  initialData: Partial<SignupData>;
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
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(stepThreeSchema),
    mode: "onSubmit",
    defaultValues: initialData,
  });

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
      let url = URL.createObjectURL(file);
      setPreviewImage(url);
      setValue("image", file);
    } catch (error) {
      console.error("Error handling file:", error);
      toast.error("Failed to upload your image. Please try again.");
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setValue("image", "");
  };

  useEffect(() => {
    if (initialData.image instanceof File) {
      let url = URL.createObjectURL(initialData.image);
      setPreviewImage(url);
    }
  }, [initialData.image]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <div className="space-y-8">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center">
            <Controller
              name="image"
              control={control}
              defaultValue={undefined}
              render={() => (
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div
                      className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gradient-to-r from-ocean-blue/5 to-ocean-blue/10
                        transition-all duration-300 shadow-lg cursor-pointer border-4
                        ${
                          previewImage
                            ? "border-white"
                            : "border-gray-100 hover:border-ocean-blue/20"
                        }`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {previewImage ? (
                        <Image
                          src={previewImage}
                          alt="Profile preview"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                          <User
                            size={30}
                            className="text-gray-400 mb-1 sm:mb-2"
                          />
                          <span className="text-[10px] sm:text-xs text-gray-400 text-center px-2">
                            Add Photo
                          </span>
                        </div>
                      )}
                    </div>

                    {previewImage && (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 sm:p-1 shadow-md transform transition-transform hover:scale-110"
                      >
                        <X size={12} className="sm:w-3.5 sm:h-3.5" />
                      </button>
                    )}

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500 text-center">
                    Upload a profile photo (optional)
                  </p>

                  {errors.image && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-500">
                      {errors.image.message as string}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Bio Input */}
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
                rows={4}
                {...field}
                error={errors.bio?.message as string}
              />
            )}
          />

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto sm:flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg 
                font-medium transition-colors flex items-center justify-center"
            >
              <ArrowLeft size={16} className="mr-2" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleSubmit(handleFormSubmit)}
              disabled={submitting}
              className="w-full sm:w-auto sm:flex-1 bg-gradient-to-r from-ocean-blue to-midnight-blue text-white py-3 px-6 rounded-lg 
                font-medium shadow-md hover:shadow-lg transition-all duration-300 
                disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {submitting ? (
                <div className="flex gap-2 items-center">
                  <span>Please wait...</span>
                  <Loader2 className="animate-spin w-4 h-4 " />
                </div>
              ) : (
                <span>Complete Registration</span>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      

      <AnimatePresence>
        {submitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}
          >
            <div className="bg-white rounded-xl p-8 flex flex-col items-center">
              <Spinner size="large" />
              <p className="mt-4 text-midnight-blue font-medium">
                Creating your account...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StepThree;
