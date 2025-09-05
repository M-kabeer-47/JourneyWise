import { Loader2 } from "lucide-react";

export default function MyButton({ text,className, onClick,disabled,loading}: { text: string, className?: string, onClick?: (data?: any) => void ,disabled?: boolean, loading?: boolean }) {
  return (
     <button className={`px-6 py-2.5 bg-gradient-to-r from-midnight-blue to-ocean-blue text-white font-medium rounded-lg hover:bg-ocean-blue/90 transition-colors disabled:opacity-50 ${className}`} onClick={onClick} disabled={disabled}>
            {loading ? <div className="flex items-center justify-center">
              <span>Please wait...</span>
              <Loader2 className="animate-spin w-4 h-4 inline-block ml-1" />
            </div> : text}
          </button>
  );
}