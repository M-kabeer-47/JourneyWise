"use client";
import React, { useRef, useEffect } from "react";

interface AutoResizeListItemProps {
  value: string;
  onChange: (value: string) => void;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const AutoResizeListItem: React.FC<AutoResizeListItemProps> = ({
  value,
  onChange,
  onClick,
  className,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const adjustSize = () => {
    if (ref.current) {
      // Reset to auto so that the scroll sizes are accurate
      ref.current.style.width = "auto";
      ref.current.style.height = "auto";
      const newWidth = ref.current.scrollWidth;
      const newHeight = ref.current.scrollHeight;
      // Add a small buffer (e.g., 4px) for padding
      ref.current.style.width = newWidth + 4 + "px";
      ref.current.style.height = newHeight + 4 + "px";
    }
  };

  useEffect(() => {
    adjustSize();
  }, [value]);

  return (
    <div
      ref={ref}
      contentEditable
      onInput={(e) => onChange(e.currentTarget.textContent || "")}
      onClick={onClick}
      className={className}
      style={style}
      suppressContentEditableWarning={true}
    >
      {value}
    </div>
  );
};
