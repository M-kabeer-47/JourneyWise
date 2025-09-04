import { Toaster, toast } from "sonner";
import {
  FiCheckCircle,
  FiInfo,
  FiAlertTriangle,
  FiAlertOctagon,
  FiLoader,
} from "react-icons/fi";
import { Check, CircleCheck } from "lucide-react";

export function Toast() {
  return (
    <Toaster
      position="bottom-right"
      expand={false}
      richColors={false}
      closeButton
      toastOptions={{
        duration: 5000,
        style: {
          background: "white",
          color: "#111827", // gray-900
          padding: "16px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: 500,
          border: "none",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          maxWidth: "384px", // max-w-sm equivalent
        },
        className: "sonner-toast",
      }}
      theme="light"
      gap={8}
    />
  );
}

// Custom toast functions with styling inspired by Custom-Toast
export const toasts = {
  success: (message: string, options?: any) => {
    return toast.success(message, {
      style: {
        fontWeight: 600,
        fontFamily: "Inter, sans-serif",
        background: "white",
        color: "#111827",
        border: "none",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      icon: <CircleCheck className="h-5 w-5 text-green-500" />,
      ...options,
    });
  },

  error: (message: string, options?: any) => {
    return toast.error(message, {
      style: {
        fontWeight: 600,
        fontFamily: "Inter, sans-serif",
        background: "white",
        color: "#111827",
        border: "none",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      icon: <FiAlertOctagon className="h-5 w-5 text-red-500" />,
      ...options,
    });
  },

  info: (message: string, options?: any) => {
    return toast.info(message, {
      style: {
        background: "white",
        color: "#111827",
        border: "none",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      icon: <FiInfo className="h-5 w-5 text-blue-500" />,
      ...options,
    });
  },

  warning: (message: string, options?: any) => {
    return toast.warning(message, {
      style: {
        background: "white",
        color: "#111827",
        border: "none",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      icon: <FiAlertTriangle className="h-5 w-5 text-yellow-500" />,
      ...options,
    });
  },

  loading: (message: string, options?: any) => {
    return toast.loading(message, {
      style: {
        background: "white",
        color: "#111827",
        border: "none",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      icon: <FiLoader className="h-5 w-5 text-gray-500 animate-spin" />,
      ...options,
    });
  },
};

// Export individual toast methods for convenience
export const { success, error, info, warning, loading } = toasts;

// Also export the main toast for direct usage
export { toast };
