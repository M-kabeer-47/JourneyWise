"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { useAppSelector } from "@/hooks/redux";
import { authClient } from "@/lib/auth/authClient";
import MyButton from "@/components/ui/MyButton";
import { toast } from "@/components/ui/Toast";
import VerifyEmailSkeleton from "@/components/skeletons/VerifyEmailSkeleton";

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const isUserLoading = useAppSelector((state) => state.user.isLoading);

  const handleSendVerificationEmail = async () => {
    if (!user?.email) {
      toast.error("No email address found. Please login again.");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await authClient.sendVerificationEmail({
        email: user.email,
      });

      if (data) {
        setEmailSent(true);
        toast.success("Verification email sent successfully!");
      } else if (error) {
        toast.error(error.message || "Failed to send verification email");
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Show skeleton while user data is loading
  if (isUserLoading) {
    return <VerifyEmailSkeleton />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-blue/5 to-midnight-blue/10">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-charcoal mb-2">
            No User Found
          </h1>
          <p className="text-gray-600">Please login to verify your email.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-blue/5 to-midnight-blue/10 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-ocean-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
            {emailSent ? (
              <CheckCircle className="w-10 h-10 text-green-600" />
            ) : (
              <Mail className="w-10 h-10 text-ocean-blue" />
            )}
          </div>

          {/* Content */}
          <div>
            <h1 className="text-3xl font-bold text-midnight-blue font-raleway mb-4">
              {emailSent ? "Email Sent!" : "Verify Your Email"}
            </h1>

            <p className="text-charcoal text-lg mb-2 font-geist">
              {emailSent
                ? "We've sent a verification link to:"
                : "Please verify your email address to continue using JourneyWise."}
            </p>

            <p className="text-ocean-blue font-semibold mb-8 font-geist">
              {user.email}
            </p>

            {emailSent ? (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                  <p className="text-green-800 text-sm font-geist">
                    <strong>Check your inbox!</strong> We've sent a verification
                    link to your email. Click the link in the email to verify
                    your account.
                  </p>
                </div>

                <p className="text-sm text-gray-600 font-geist">
                  Didn't receive the email? Check your spam folder or click the
                  button below to resend.
                </p>

                <MyButton
                  text={isLoading ? "Sending..." : "Resend Email"}
                  onClick={handleSendVerificationEmail}
                  disabled={isLoading}
                  loading={isLoading}
                  className="w-full font-geist"
                />
              </div>
            ) : (
              <MyButton
                text={isLoading ? "Sending..." : "Send Verification Email"}
                onClick={handleSendVerificationEmail}
                disabled={isLoading}
                loading={isLoading}
                className="w-full font-geist"
              />
            )}
          </div>

          {/* Additional Info */}
          {!emailSent && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 font-geist">
                By verifying your email, you'll be able to:
              </p>
              <ul className="text-sm text-gray-600 mt-2 space-y-1 font-geist">
                <li>• Access all JourneyWise features</li>
                <li>• Receive important account notifications</li>
                <li>• Secure your account</li>
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
