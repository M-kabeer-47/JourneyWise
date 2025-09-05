import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";
import MyButton from "./MyButton";

interface PasswordConfirmModalProps {
  isOpen: boolean;
  onConfirm: (password: string) => void;
  onClose: () => void;
  title: string;
  description: string;
  loading?: boolean;
  loadingText?: string;
  width?: "large" | "small";
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string>>;
}

export default function PasswordConfirmModal({
  isOpen,
  onConfirm,
  onClose,
  title,
  description,
  loading = false,
  loadingText = "Enabling...",
  width = "small",
  error = "",
  setError,
}: PasswordConfirmModalProps) {
  const [password, setPassword] = useState("");

  const handleConfirm = () => {
    if (password.trim()) {
      
      onConfirm(password);
    }
  };

  const handleClose = () => {
    setPassword(""); // Clear password on close
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && password.trim() && !loading) {
      handleConfirm();
    }
  };

  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80"
          onClick={handleClose}
        />

        {/* Modal Container */}
        <div className="flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`relative bg-white rounded-xl shadow-md w-full ${
              width === "large" ? "max-w-xl" : "max-w-lg"
            }`}
            onKeyDown={handleKeyPress}
          >
            {/* Header with title and close button */}
            <div className="pt-8 px-8 pb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-charcoal">{title}</h2>
              <button
                onClick={handleClose}
                disabled={loading}
                className="text-charcoal hover:text-charcoal transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mx-8"></div>

            {/* Content */}
            <div className="px-8 py-8">
              {/* Description */}
              <p className="text-charcoal text-sm mb-6">{description}</p>

              {/* Password Input */}
              <div className="mb-8">
                <FormInput
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error && setError) setError("");
                  }}
                  placeholder="Enter your password"
                  required
                  icon="lock"
                  disabled={loading}
                  error={error}
                />
              </div>

              {/* Actions */}
              <div className="min-[420px]:flex-row flex flex-col gap-4">
                <button
                  onClick={handleClose}
                  disabled={loading}
                  className="flex-1 py-2 px-4 rounded-md border border-ocean-blue text-charcoal font-medium
                           transition-all duration-200 hover:bg-gray-50 disabled:opacity-50 text-base"
                >
                  Cancel
                </button>

                <MyButton
                  text={loading ? loadingText : "Enable 2FA"}
                  onClick={handleConfirm}
                  disabled={!password.trim() || loading}
                  loading={loading}
                  className="flex-1 font-medium"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
