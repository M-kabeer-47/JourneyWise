import { motion } from "framer-motion";
import { CircleCheck } from "lucide-react";

const tagOptions = [
  "Adventure",
  "Cultural",
  "Food",
  "Nature",
  "Relaxation",
  "Beach",
  "Mountain",
  "City",
  "Historical",
  "Wildlife",
  "Photography",
  "Hiking",
  "Family-friendly",
  "Romantic",
  "Budget",
  "Luxury",
];

interface TagsProps {
  value: string[];
  onChange: (tags: string[]) => void;
  error?: string;
}

export default function Tags({ value, onChange, error }: TagsProps) {
  const handleTagToggle = (tag: string) => {
    const updatedTags = value.includes(tag)
      ? value.filter((t: string) => t !== tag)
      : [...value, tag];
    onChange(updatedTags);
  };

  return (
    <div className="space-y-2">
      <label className="block text-base font-medium text-midnight-blue">
        Tags
      </label>
      <div className="flex flex-wrap gap-2">
        {tagOptions.map((tag) => (
          <motion.button
            key={tag}
            type="button"
            onClick={() => handleTagToggle(tag)}
            className={`px-4 h-9 rounded-lg text-sm font-medium transition-all duration-200
                       flex items-center gap-1.5
                       ${
                         value.includes(tag)
                           ? "bg-ocean-blue text-white"
                           : "bg-midnight-blue/5 text-midnight-blue hover:bg-midnight-blue/10"
                       }`}
          >
            {tag}
            {value.includes(tag) && <CircleCheck className="w-4 h-4" />}
          </motion.button>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}