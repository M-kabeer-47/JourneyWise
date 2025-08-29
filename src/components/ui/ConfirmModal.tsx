import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  title: string;
  description: string;
  loading?: boolean;
  loadingText?: string;
  width?: "large" | "small";
}

export default function ConfirmModal({
  isOpen,
  onConfirm,
  onClose,
  title,
  description,
  loading = false,
  loadingText = "Loading...",
  width = "small"
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80"
        />

        {/* Modal Container */}
        <div className="flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`relative bg-white rounded-xl shadow-md w-full ${width === "large" ? "max-w-xl" : "max-w-lg"}`}
          >
            {/* Header with title and close button */}
            <div className="pt-8 px-8 pb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-charcoal">{title}</h2>
              <button
                onClick={handleClose}
                disabled={loading}
                className="text-charcoal hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mx-8"></div>

            {/* Content */}
            <div className="px-8 py-8">
              {/* Description */}
              <p className="text-charcoal text-sm mb-8">{description}</p>

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

                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="flex-1 py-2 px-4 rounded-md text-base font-medium transition-all duration-200
                           bg-midnight-blue text-white disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{loadingText}</span>
                    </div>
                  ) : (
                    "Confirm"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
