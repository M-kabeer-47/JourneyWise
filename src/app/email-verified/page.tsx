"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import MyButton from "@/components/ui/MyButton";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { fetchUser } from "@/lib/redux/slices/user";

export default function EmailVerifiedPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    // Refresh user data to update emailVerified status
    dispatch(fetchUser());
  }, [dispatch]);

  const handleContinue = () => {
    router.push("/profile");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-ocean-blue/5 to-midnight-blue/10 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 right-4">
              <Sparkles className="w-8 h-8 text-ocean-blue" />
            </div>
            <div className="absolute bottom-4 left-4">
              <Sparkles className="w-6 h-6 text-midnight-blue" />
            </div>
            <div className="absolute top-1/2 left-1/4">
              <Sparkles className="w-4 h-4 text-ocean-blue" />
            </div>
          </div>

          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative z-10"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <CheckCircle className="w-12 h-12 text-green-600" />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-ocean-blue rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative z-10"
          >
            <h1 className="text-3xl font-bold text-midnight-blue font-raleway mb-4">
              Email Verified Successfully!
            </h1>

            <p className="text-charcoal text-lg mb-6 font-geist">
              Welcome to JourneyWise! Your email has been verified and your
              account is now active.
            </p>

            {user && (
              <div className="bg-ocean-blue/5 border border-ocean-blue/20 rounded-lg p-4 mb-8">
                <p className="text-ocean-blue font-semibold font-geist">
                  Hello, {user.name}! 👋
                </p>
                <p className="text-sm text-charcoal mt-1 font-geist">
                  You can now access all features and start planning your
                  amazing journeys.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <MyButton
                text="Profile"
                onClick={handleContinue}
                className="w-full font-geist"
              />

              <button
                onClick={handleGoHome}
                className="w-full py-3 px-6 border border-ocean-blue text-ocean-blue font-medium rounded-lg hover:bg-ocean-blue/5 transition-colors font-geist"
              >
                Explore JourneyWise
              </button>
            </div>
          </motion.div>

          {/* Features Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 pt-6 border-t border-gray-200 relative z-10"
          >
            <p className="text-sm font-semibold text-charcoal mb-3 font-geist">
              What you can do now:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-geist">Plan trips</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-geist">Book experiences</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-geist">Share stories</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
