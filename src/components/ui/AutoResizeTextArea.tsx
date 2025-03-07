import React, { useRef, useEffect, useState } from 'react';

// Auto resize textarea component

const AutoResizeTextarea = ({ 
  value = '', 
  onChange, 
  placeholder = 'Type here...',
  className = '',
  minHeight = '50px',
  handleFocus,
  
}:{
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    placeholder?: string,
    className?: string,
    minHeight?: string
    handleFocus?: () => void
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState(value);

  // Function to adjust height
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';
    
    // Set the height to the scrollHeight to fit the content
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  // Handle content changes
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement> ) => {
    setContent(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  // Adjust height whenever content changes
  useEffect(() => {
    adjustHeight();
  }, [content]);

  // Adjust height on initial render
  useEffect(() => {
    adjustHeight();
  }, []);

  return (
    <textarea
      ref={textareaRef}
      value={content}
      onChange={handleChange}
      onFocus={handleFocus}
      placeholder={placeholder}
      style={{
        resize: 'none',
        overflow: 'hidden',
        minHeight,
        width: '100%',
        boxSizing: 'border-box'
      }}
      className={className}
      
    />
  );
};

export default AutoResizeTextarea;