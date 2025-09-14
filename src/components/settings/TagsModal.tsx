"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tag, X } from "lucide-react";


interface TagSelectorProps {
  tags: TagType[];
  selectedTags: string[];
  onTagToggle: (tagId: string) => void;
  title?: string;
  subtitle?: string;
  maxSelection?: number;
  className?: string;
}

export function TagSelector({
  tags,
  selectedTags,
  onTagToggle,
  title = "Select your preferences",
  subtitle = "Choose topics that interest you",
  maxSelection,
  className = "",
}: TagSelectorProps) {
  const handleTagClick = (tagId: string) => {
    if (maxSelection && selectedTags.length >= maxSelection && !selectedTags.includes(tagId)) {
      return; // Don't allow more selections if limit reached
    }
    onTagToggle(tagId);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-charcoal font-raleway mb-2">
          {title}
        </h2>
        <p className="text-gray-500 text-sm">
          {subtitle}
          {maxSelection && (
            <span className="ml-1">
              ({selectedTags.length}/{maxSelection} selected)
            </span>
          )}
        </p>
      </div>

      {/* Tags Grid */}
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag.id);
          const isDisabled = maxSelection && selectedTags.length >= maxSelection && !isSelected;
          
          return (
            <motion.button
              key={tag.id}
              onClick={() => handleTagClick(tag.id)}
              disabled={isDisabled}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }} // Shorter transition for tags
              className={`
                flex group items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-200
                font-medium text-sm min-h-[40px] disabled:opacity-50 disabled:cursor-not-allowed
                ${
                  isSelected
                    ? "bg-ocean-blue/10 text-midnight-blue border-ocean-blue/30"
                    : "bg-white text-charcoal hover:text-midnight-blue hover:bg-ocean-blue/15 hover:border-ocean-blue/20"
                }
              `}
            >
              {tag.icon && (
                <tag.icon 
                  size={16} 
                  className={isSelected ? "text-midnight-blue" : "text-gray-600 group-hover:text-midnight-blue"} 
                />
              )}
              <span>{tag.label}</span>
            </motion.button>
          );
        })}
      </div>
      
      {/* Selection count */}
      {selectedTags.length > 0 && (
        <div className="mt-4 text-sm text-gray-500">
          {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''} selected
        </div>
      )}
    </div>
  );
}



interface TagType {
  id: string;
  label: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

interface TagSelectorProps {
  tags: TagType[];
  selectedTags: string[];
  onTagToggle: (tagId: string) => void;
  title?: string;
  subtitle?: string;
  maxSelection?: number;
  className?: string;
}



interface InterestTagsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tags: TagType[];
  selectedTags: string[];
  onTagToggle: (tagId: string) => void;
  onSave: () => void;
}

export default function InterestTagsModal({
  isOpen,
  onClose,
  tags,
  selectedTags,
  onTagToggle,
  onSave,
}: InterestTagsModalProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className="bg-white rounded-2xl w-full max-w-4xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-ocean-blue/10 rounded-full flex items-center justify-center">
                  <Tag className="w-4 h-4 text-midnight-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal font-raleway">
                    Travel Interests
                  </h3>
                  <p className="text-sm text-gray-500">
                    Help us personalize your experience
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 max-h-[60vh] overflow-y-auto">
              <TagSelector
                tags={tags}
                selectedTags={selectedTags}
                onTagToggle={onTagToggle}
                title="Select topics that interest you"
                subtitle="Your selections help us recommend the best travel experiences for you"
                maxSelection={10}
              />
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-6 border-t border-gray-100 bg-gray-50 flex justify-end items-center">
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-charcoal font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={onSave}
                  className="px-6 py-2 bg-midnight-blue text-white rounded-lg hover:bg-midnight-blue/90 transition-colors flex items-center gap-2 font-medium"
                >
                  <span>Continue</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}