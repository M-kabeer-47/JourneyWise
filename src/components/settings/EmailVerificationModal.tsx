"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, Loader2 } from "lucide-react";
import OTPInput from "@/components/ui/OTPInput";
import MyButton from "@/components/ui/MyButton";
import { authClient } from "@/lib/auth/authClient";
import { toast } from "@/components/ui/Toast";

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerificationSuccess: () => void;
  loading?: boolean;
}

export default function EmailVerificationModal({
  isOpen,
  onClose,
  email,
  onVerificationSuccess,
  loading = false,
}: EmailVerificationModalProps) {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);

  const handleOtpComplete = async (otpValue: string) => {
    setOtp(otpValue);
    setOtpError("");
    setIsVerifying(true);

    try {
      alert("Email: " + email + " OTP: " + otpValue);
      const { data, error } = await authClient.emailOtp.checkVerificationOtp({
        email: email,
        type: "email-verification",
        otp: otpValue,
      });

      if (error) {
        setOtpError(error.message || "Invalid OTP. Please try again.");
        setIsOtpValid(false);
        toast.error("Invalid OTP. Please try again.");
      } else {
        setIsOtpValid(true);
        
      }
    } catch (error) {
      setOtpError("Failed to verify OTP. Please try again.");
      setIsOtpValid(false);
      toast.error("Failed to verify OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleUpdateProfile = () => {
    if (isOtpValid) {
      onVerificationSuccess();
      onClose();
    }
  };

  const handleClose = () => {
    setOtp("");
    setOtpError("");
    setIsOtpValid(false);
    setIsVerifying(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-ocean-blue/10 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-ocean-blue" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-midnight-blue font-raleway">
                  Verify Email Address
                </h3>
                <p className="text-sm text-charcoal font-geist">
                  Enter the verification code
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              disabled={loading}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Email Info */}
          <div className="mb-6 p-4 bg-ocean-blue/5 rounded-lg border border-ocean-blue/20">
            <p className="text-sm text-charcoal text-center">
              We've sent a verification code to
            </p>
            <p className="text-sm font-medium text-midnight-blue text-center mt-1">
              {email}
            </p>
          </div>

          {/* OTP Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-charcoal mb-4 text-center">
              Enter 6-digit verification code
            </label>
            <OTPInput
              length={6}
              onComplete={handleOtpComplete}
              loading={isVerifying}
              error={otpError}
            />

            {isVerifying && (
              <div className="flex items-center justify-center gap-2 mt-4">
                <Loader2 className="w-4 h-4 animate-spin text-ocean-blue" />
                <span className="text-sm text-charcoal">Verifying...</span>
              </div>
            )}

            {isOtpValid && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  OTP Verified Successfully
                </div>
              </motion.div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-charcoal font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <MyButton
              text="Update Profile"
              onClick={handleUpdateProfile}
              disabled={!isOtpValid || loading}
              loading={loading}
              className="flex-1"
            />
          </div>

          {/* Resend Option */}
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                // Add resend OTP logic here
                toast.info("Verification code resent!");
              }}
              disabled={isVerifying || loading}
              className="text-sm text-ocean-blue hover:text-midnight-blue transition-colors disabled:opacity-50"
            >
              Didn't receive the code? Resend
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
