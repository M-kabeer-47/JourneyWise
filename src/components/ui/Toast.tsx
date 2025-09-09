import { Toaster, toast as Toast } from "sonner";
import {
  FiCheckCircle,
  FiInfo,
  FiAlertTriangle,
  FiAlertOctagon,
  FiLoader,
} from "react-icons/fi";
import { Check, CircleCheck } from "lucide-react";

export function ToastFunction() {
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
          maxWidth: "400px", // max-w-sm equivalent
        },
        className: "sonner-toast",
      }}
      theme="light"
      gap={8}
    />
  );
}

// Custom toast functions with styling inspired by Custom-Toast
export const toast = {
  success: (message: string, options?: any) => {
    return Toast.success(message, {
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
    return Toast.error(message, {
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
    return Toast.info(message, {
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
    return Toast.warning(message, {
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
    return Toast.loading(message, {
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
export const { success, error, info, warning, loading } = toast;

// Also export the main toast for direct usage

