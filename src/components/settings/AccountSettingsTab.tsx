"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
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

interface AccountSettingsTabProps {
  user: UserType | null;
}

export default function AccountSettingsTab({ user }: AccountSettingsTabProps) {
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    watch,
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
  const { isLoading, updateUser } = useUpdateUser();

  const handleProfileUpdate = async (data: UserType) => {
    console.log("Form Data:", data);
    console.log("Current User:", user);
    if (isSaveButtonDisabled) {
      return;
    }

    let imageUrl = await updateUser.mutateAsync({
      ...data,
      id: user?.id as string,
    });
    setValue("image", imageUrl);
    alert("Profile updated successfully!");
    alert("Data: " + JSON.stringify(data));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      let url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleEmailVerification = async () => {
    // TODO: Implement email verification API call
  };

  const handleAccountDeactivation = async () => {
    // TODO: Implement account deactivation API call
    setTimeout(() => {
      setShowDeactivateModal(false);
    }, 1000);
  };

  return (
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
            <p className="text-xs sm:text-sm text-charcoal font-geist  ">
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
                    <User className="w-8 h-8 text-midnight-blue" />
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
            <button
              disabled={isSaveButtonDisabled || isLoading}
              type="submit"
              onClick={() => console.log("Errors", errors)}
              className="flex items-center justify-center gap-2 px-2 w-full sm:w-[170px] py-2 bg-gradient-to-r from-midnight-blue to-ocean-blue text-white font-medium rounded-lg hover:bg-midnight-blue/90 transition-colors disabled:opacity-50 mr-3"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
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
            <p className="text-xs sm:text-sm text-charcoal font-geist  ">
              Verify your email address to secure your account
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            {user?.emailVerified ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-orange-500" />
            )}
            <div>
              <p className="font-medium text-charcoal">
                {user?.emailVerified ? "Email Verified" : "Email Not Verified"}
              </p>
              <p className="text-xs sm:text-sm text-charcoal">{user?.email}</p>
            </div>
          </div>

          {!user?.emailVerified && (
            <button
              onClick={handleEmailVerification}
              disabled={isLoading}
              className="px-2 py-2 bg-midnight-blue w-[170px] text-center  text-white font-medium rounded-lg hover:bg-midnight-blue/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Verify Email"}
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
            <p className="text-xs sm:text-sm text-charcoal font-geist  ">
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
                onClick={handleAccountDeactivation}
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Deactivating..." : "Deactivate"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
