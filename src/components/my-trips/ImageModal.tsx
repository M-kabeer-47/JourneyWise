import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Waypoint } from "@/lib/types/waypoint";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  waypoint: Waypoint | null;
}

export default function ImageModal({
  isOpen,
  onClose,
  waypoint
}: ImageModalProps) {
  if (!waypoint) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-midnight-blue/95 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white hover:text-light-gray transition-colors z-10
              p-2 rounded-full bg-white/10 backdrop-blur-sm"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="absolute top-6 left-6 text-white z-10">
            <h3 className="text-xl font-bold">{waypoint.name}</h3>
            <p className="text-white/70 text-sm">{waypoint.type.charAt(0).toUpperCase() + waypoint.type.slice(1)}</p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-5xl max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={waypoint.imageUrl || ""}
              alt={waypoint.name || "Image"}
              className="w-full h-full object-contain rounded-lg"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}