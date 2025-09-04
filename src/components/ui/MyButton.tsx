export default function MyButton({ text,className, onClick,disabled,loading}: { text: string, className?: string, onClick?: (data?: any) => void ,disabled?: boolean, loading?: boolean }) {
  return (
     <button className={`px-6 py-2.5 bg-gradient-to-r from-midnight-blue to-ocean-blue text-white font-medium rounded-lg hover:bg-ocean-blue/90 transition-colors ${className}`} onClick={onClick} disabled={disabled}>
            {loading ? "Please wait..." : text}
          </button>
  );
}