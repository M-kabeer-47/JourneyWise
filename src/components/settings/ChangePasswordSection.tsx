"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/ui/FormInput";
import MyButton from "../ui/MyButton";
import useChangePassword from "@/hooks/user/useChangePassword";
import {
  changePasswordSchema,
  type ChangePasswordForm,
} from "@/lib/schemas/changePassword";

export default function ChangePasswordSection() {
  const { changePassword, isLoading: isPasswordChanging } = useChangePassword();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    reset,
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    try {
      const response = await changePassword(
        data.currentPassword,
        data.newPassword
      );

      if (response?.data) {
        // Clear form on success
        reset();
      }

      if (response?.error) {
        // Set server error on appropriate field
        setError("currentPassword", {
          type: "manual",
          message: response.error.message,
        });
      }
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-5 sm:p-8 shadow-sm border border-gray-200"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="sm:w-10 sm:h-10 w-9 h-9 bg-ocean-blue/10 rounded-full flex items-center justify-center">
          <Shield className="w-5 h-5 text-midnight-blue" />
        </div>
        <div>
          <h2 className="sm:text-xl text-lg font-bold text-midnight-blue font-raleway">
            Change Password
          </h2>
          <p className="sm:text-sm text-xs text-charcoal font-geist">
            Update your password to keep your account secure
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="currentPassword"
          control={control}
          render={({ field }) => (
            <FormInput
              id="currentPassword"
              label="Current Password"
              type="password"
              placeholder="Enter current password"
              required
              icon="lock"
              disabled={isPasswordChanging}
              error={errors.currentPassword?.message}
              {...field}
            />
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <FormInput
                id="newPassword"
                label="New Password"
                type="password"
                placeholder="Enter new password"
                required
                icon="lock"
                disabled={isPasswordChanging}
                error={errors.newPassword?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <FormInput
                id="confirmPassword"
                label="Confirm New Password"
                type="password"
                placeholder="Confirm new password"
                required
                icon="lock"
                disabled={isPasswordChanging}
                error={errors.confirmPassword?.message}
                {...field}
              />
            )}
          />
        </div>

        {/* Display root/general errors */}
        {errors.root && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
            {errors.root.message}
          </div>
        )}

        <div className="flex justify-end">
          <MyButton
            type="submit"
            text="Update Password"
            className="flex font-geist justify-center items-center gap-2 w-full sm:w-[210px]"
            disabled={isPasswordChanging}
            loading={isPasswordChanging}
          />
        </div>
      </form>
    </motion.div>
  );
}
