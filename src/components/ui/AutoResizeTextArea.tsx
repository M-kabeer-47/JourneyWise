import React, { useRef, useEffect, Ref } from 'react';
import { text } from 'stream/consumers';

interface AutoResizeTextareaProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onListChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  type?: string;
  textStyles?: React.CSSProperties;
  index?: number;
  blocksRef?: Ref<HTMLTextAreaElement[]>;
  id?: string;
  listItemIndex?: number;
  listItemsRef?: Ref<Map<string, HTMLTextAreaElement>>;
  currentBlockIndex?: number;

  
}

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
  type,
  value = '',
  onChange,
  placeholder = 'Type here...',
  className = '',
  blocksRef,
  index,
  onFocus,
  onListChange,
  textStyles,
  id,
  listItemIndex,
  listItemsRef,

  currentBlockIndex,
}) => {
  
  
// Adjust height whenever value changes from outside
useEffect(() => {
  adjustHeight();
}, [value]);
useEffect(() => {
  console.log("currentBlockIndex", currentBlockIndex)
}
,[currentBlockIndex])

// Initial adjustment
useEffect(() => {
  adjustHeight();
}, []);

// Also adjust on window resize for responsive layouts
useEffect(() => {
  window.addEventListener('resize', adjustHeight);
  return () => window.removeEventListener('resize', adjustHeight);
}, []);


// Update AutoResizeTextarea.tsx - add this effect to focus the textarea
useEffect(() => {
  // Focus the textarea when it becomes the current block
  if (currentBlockIndex === index && blocksRef && 'current' in blocksRef) {
    const textarea = blocksRef.current[index];
    if (textarea) {
      textarea.focus();
    }
  }
}, [currentBlockIndex, index]);
  // Improved height adjustment function
  const adjustHeight = () => {
    let textarea = null;
    if (blocksRef && 'current' in blocksRef && index !== undefined) {
      textarea = blocksRef.current[index];
    } else if (listItemsRef && 'current' in listItemsRef && listItemIndex !== undefined) {
      textarea = listItemsRef.current.get(`${id}-${listItemIndex}`);
    }
    
    

    if (!textarea) return;
    
    // Reset to minimal height first
    textarea.style.height = '0px';
    
    // Get the actual content height
    const contentHeight = textarea.scrollHeight;
    
    // Set minimum size based on type
    const minSize = type === "list" ? '24px' : '24px';
    
    // Apply the larger of content height or min size
    textarea.style.height = Math.max(parseInt(minSize), contentHeight) + 'px';
  };

  // Handle content changes
  const handleChangeInternal = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
    else if(onListChange) {
      onListChange(e.target.value);
    }
    
    // Adjust height immediately after content changes
    requestAnimationFrame(adjustHeight);
  };

  

  return (
    <textarea
    ref={(el) => {

      // For regular blocks
      if (blocksRef && index !== undefined && el) {
        blocksRef.current[index] = el;
      }
      
      // For list items - use composite key pattern: "blockId-listItemIndex"
      if (listItemsRef && id && listItemIndex !== undefined && el) {
        const key = `${id}-${listItemIndex}`;

        listItemsRef.current.set(key, el);
      }
    }}
      value={value}
      onChange={handleChangeInternal}
      onFocus={onFocus}
      placeholder={placeholder}
      style={{
        resize: 'none',
        overflow: 'hidden',
        boxSizing: 'border-box',
        padding: '4px',
        lineHeight: '1.5',
        ...textStyles
      }}
      className={className}
      
    />
  );
};

export default AutoResizeTextarea;  