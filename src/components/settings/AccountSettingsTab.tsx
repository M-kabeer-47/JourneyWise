"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User as UserIcon,
  Mail,
  CheckCircle,
  AlertCircle,
  Trash2,
  Upload,
} from "lucide-react";
import FormInput from "@/components/ui/FormInput";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { userSchemaPartial } from "@/lib/schemas/user";
import { User as UserType } from "@/lib/types/user";
import useUpdateUser from "@/hooks/user/useupdateUser";
import { toast } from "../ui/Toast";
import MyButton from "@/components/ui/MyButton";
import useChangeEmail from "@/hooks/user/useChangeEmail";
import AccountSettingsTabSkeleton from "@/components/skeletons/AccountSettingsTabSkeleton";

interface AccountSettingsTabProps {
  user: {
    user: UserType | null;
    isLoading: boolean;
    error?: string;
  };
}

export default function AccountSettingsTab({ user: User }: AccountSettingsTabProps) {
  let { user, isLoading, error } = User;

  // Show skeleton while loading
  if (isLoading) {
    return <AccountSettingsTabSkeleton />;
  }

  // Show error state if needed
  if (error) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-midnight-blue mb-2">Error Loading Settings</h3>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-midnight-blue text-white rounded-lg hover:bg-midnight-blue/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show empty state if no user
  if (!user) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserIcon className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-midnight-blue mb-2">No User Data</h3>
          <p className="text-sm text-gray-600">Please log in to access your settings.</p>
        </div>
      </div>
    );
  }

  // Component logic continues here with the existing code...
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    getValues,
    setError,
  } = useForm<UserType>({
    resolver: zodResolver(userSchemaPartial),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || "",
      image: user?.image || "",
    },
  });

  const isSaveButtonDisabled =
    user?.name === watch("name") &&
    user?.email === watch("email") &&
    user?.bio === watch("bio") &&
    user?.image === watch("image");

  const [imagePreview, setImagePreview] = useState<string>(user?.image || "");
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  const { isLoading: isUpdating, updateUser } = useUpdateUser();
  const { changeEmail, isEmailChanging } = useChangeEmail({
    setError,
  });

  // Reusable function to update user profile
  const updateUserProfile = async (data: UserType) => {
    try {
      let updatedUser = await updateUser.mutateAsync({
        ...data,
        id: user?.id as string,
      });
      setValue("image", updatedUser.image);
      toast.success("Profile updated successfully!");
      return updatedUser;
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  };

  const handleProfileUpdate = async (data: UserType) => {
    if (isSaveButtonDisabled) {
      return;
    }
    try {
      if (user?.email === data.email) {
        updateUserProfile({
          name: data.name,
          bio: data.bio,
          image: data.image,
        } as UserType);
      } else if (
        user?.email !== data.email &&
        data.name === user?.name &&
        data.bio === user?.bio &&
        data.image === user?.image
      ) {
        changeEmail(data.email as string);
      } else if (
        user?.email !== data.email &&
        (data.name !== user?.name ||
          data.bio !== user?.bio ||
          data.image !== user?.image)
      ) {
        await updateUserProfile({
          name: data.name,
          bio: data.bio,
          image: data.image,
        } as UserType);
        changeEmail(data.email as string);
      }
    } catch (error) {
      toast.error("Failed to change email address. Please try again.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      let url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  return (
    <>
      <div className="space-y-8">
        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-5 sm:p-8 shadow-sm border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-midnight-blue font-raleway">
                Profile Information
              </h2>
              <p className="text-xs sm:text-sm text-charcoal font-geist">
                Update your personal details and profile information
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(handleProfileUpdate)}
            className="space-y-6"
          >
            {/* Profile Picture Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-ocean-blue/10">
                      <UserIcon className="w-8 h-8 text-midnight-blue" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-medium text-charcoal mb-2">
                  Profile Picture
                </h3>
                <p className="text-xs sm:text-sm text-charcoal mb-3">
                  Upload a new profile picture.
                </p>
                <label
                  htmlFor="profile-image-2"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-charcoal hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Upload className="sm:w-4 sm:h-4 h-3 w-3" />
                  Choose File
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                      <input
                        id="profile-image-2"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => {
                          handleImageChange(e);
                          field.onChange(e.target.files?.[0]);
                        }}
                      />
                    )}
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <FormInput
                    id="name"
                    label="Full Name"
                    type="text"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={errors.name && errors.name.message}
                    placeholder="Enter your full name"
                    required
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <FormInput
                    id="email"
                    label="Email Address"
                    type="email"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder="Enter your email"
                    error={errors.email && errors.email.message}
                    required
                  />
                )}
              />
            </div>

            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <FormInput
                  id="bio"
                  label="Bio"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="Tell us about yourself..."
                  isTextArea={true}
                  error={errors.bio && errors.bio.message}
                  rows={4}
                />
              )}
            />

            <div className="flex justify-end">
              <MyButton
                type="submit"
                text="Save Changes"
                disabled={isSaveButtonDisabled || isUpdating || isEmailChanging}
                loading={isUpdating || isEmailChanging}
                className="w-full sm:w-[170px]"
              />
            </div>
          </form>
        </motion.div>

        {/* Email Verification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-5 sm:p-8 shadow-sm border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="sm:w-10 sm:h-10 w-9 h-9 bg-ocean-blue/10 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-midnight-blue" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-midnight-blue font-raleway">
                Email Verification
              </h2>
              <p className="text-xs sm:text-sm text-charcoal font-geist">
                Verify your email address to secure your account
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg">
            <div className="flex items-center gap-3">
              {user?.emailVerified ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-orange-500" />
              )}
              <div>
                <p className="font-medium text-charcoal">
                  {user?.emailVerified
                    ? "Email Verified"
                    : "Email Not Verified"}
                </p>
                <p className="text-xs sm:text-sm text-charcoal">
                  {user?.email}
                </p>
              </div>
            </div>

            {!user?.emailVerified && (
              <button
                disabled={isUpdating}
                className="px-2 py-2 bg-midnight-blue w-[170px] text-center text-white font-medium rounded-lg hover:bg-midnight-blue/90 transition-colors disabled:opacity-50"
              >
                {isUpdating ? "Sending..." : "Verify Email"}
              </button>
            )}
          </div>
        </motion.div>

        {/* Account Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-5 sm:p-8 shadow-sm border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="sm:w-10 sm:h-10 w-9 h-9 bg-ocean-blue/10 rounded-full flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-midnight-blue" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-midnight-blue font-raleway">
                Account Status
              </h2>
              <p className="text-xs sm:text-sm text-charcoal font-geist">
                Manage your account activation and deactivation
              </p>
            </div>
          </div>
        </motion.div>

        {/* Deactivation Modal */}
        {showDeactivateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-5 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-midnight-blue mb-2">
                  Deactivate Account
                </h3>
                <p className="text-xs sm:text-sm text-charcoal">
                  Are you sure you want to deactivate your account? This action
                  can be reversed by logging in again.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeactivateModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-charcoal font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={isUpdating}
                  className="flex-1 px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isUpdating ? "Deactivating..." : "Deactivate"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Email Verification Modal */}
    </>
  );
}
