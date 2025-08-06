"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Success page config based on type
const successConfig = {
  experience: {
    title: "Experience Created!",
    description:
      "Your experience has been successfully created and is now live. You can manage or edit it from your dashboard.",
    buttonText: "Go to Dashboard",
    buttonHref: "/dashboard",
  },
  booking: {
    title: "Booking Confirmed!",
    description:
      "Your booking is confirmed. You can view your trip details and itinerary in your bookings.",
    buttonText: "View My Bookings",
    buttonHref: "/bookings",
  },
  update: {
    title: "Experience Updated!",
    description:
      "Your experience has been updated successfully. Check your dashboard for the latest details.",
    buttonText: "Back to Dashboard",
    buttonHref: "/dashboard",
  },
  default: {
    title: "Success!",
    description: "Your action was successful.",
    buttonText: "Go Home",
    buttonHref: "/",
  },
};

export default function SuccessPage() {
  const params = useParams();
  const router = useRouter();
  const type = typeof params.type === "string" ? params.type : "default"; //@ts-ignore
  const config = successConfig[type] || successConfig.default;

  // Trigger confetti on mount
  useEffect(() => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#22c55e", "#bbf7d0", "#a7f3d0", "#4ade80"];
    const frame = () => {
      if (Date.now() > end) return;
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors,
      });
      requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
      >
        {/* Animated Tick Icon */}
        <motion.div
          className="mx-auto mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            className="mx-auto"
          >
            <motion.circle
              cx="12"
              cy="12"
              r="10"
              stroke="#22c55e"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ strokeDasharray: 2 * Math.PI * 10, strokeDashoffset: 0 }}
            />
            <motion.path
              d="M9 12L11 14L15 10"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            />
          </motion.svg>
        </motion.div>
        <h1 className="text-2xl font-bold font-raleway text-charcoal mb-2">
          {config.title}
        </h1>
        <p className="text-charcoal mb-8 text-sm">{config.description}</p>
        <Button
          className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-base transition"
          onClick={() => router.push(config.buttonHref)}
        >
          {config.buttonText}
        </Button>
      </motion.div>
    </div>
  );
}
