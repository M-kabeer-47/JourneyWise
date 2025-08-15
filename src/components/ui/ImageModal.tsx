"use client";
import React, { useEffect, useRef, useState } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt?: string;
  caption?: string;
}

const ImageModal = ({ isOpen, onClose, imageUrl, alt = "Image", caption }: ImageModalProps) => {
  const [zoom, setZoom] = useState<1 | 1.5 | 2>(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") setZoom((z) => (z === 2 ? 2 : (z + 0.5) as 1.5 | 2));
      if (e.key === "-" || e.key === "_") setZoom((z) => (z === 1 ? 1 : (z - 0.5) as 1 | 1.5));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) setZoom(1);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Centered modal shell */}
      <div
        role="dialog"
        aria-modal="true"
        className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8"
      >
        <div className="relative max-w-[92vw] max-h-[86vh] bg-white/5 rounded-2xl shadow-2xl ring-1 ring-white/10 overflow-hidden">
          {/* Top controls */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
            <button
              onClick={() => setZoom((z) => (z === 2 ? 2 : (z + 0.5) as 1.5 | 2))}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 hover:bg-white text-midnight-blue shadow transition"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom((z) => (z === 1 ? 1 : (z - 0.5) as 1 | 1.5))}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 hover:bg-white text-midnight-blue shadow transition"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow transition"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Image stage (scrollable when zoomed) */}
          <div
            ref={scrollRef}
            className="relative  flex items-center justify-center overflow-auto"
          >
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={alt}
              className={`w-full h-full object-contain transition-transform duration-300 ${
                zoom === 1 ? "scale-100" : zoom === 1.5 ? "scale-125" : "scale-150"
              }`}
              draggable={false}
            />
          </div>

          {/* Caption */}
          {caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 py-4">
              <p className="text-sm text-white/90">{caption}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;