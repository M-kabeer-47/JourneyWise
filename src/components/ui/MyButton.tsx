import { Loader2 } from "lucide-react";

export default function MyButton({
  type = "button",
  text,
  className,
  onClick,
  disabled,
  loading,
  variant = "primary",
}: {
  text: string;
  className?: string;
  onClick?: (data?: any) => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  variant?: "primary" | "secondary";
}) {
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-midnight-blue to-ocean-blue text-white hover:bg-ocean-blue/90",
    secondary:
      "bg-white border border-ocean-blue text-ocean-blue hover:bg-ocean-blue/10",
  };
  return (
    <button
      type={type}
      className={`px-6 py-2.5  font-medium rounded-lg transition-colors disabled:opacity-50 ${className} ${variantClasses[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <span>Please wait...</span>
          <Loader2 className="animate-spin w-4 h-4 inline-block ml-1" />
        </div>
      ) : (
        text
      )}
    </button>
  );
}
