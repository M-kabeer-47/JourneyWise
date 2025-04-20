import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  CSSProperties,
  FormEvent,
  ClipboardEvent,
  FocusEvent,
  KeyboardEvent,
  MutableRefObject,
} from "react";

export interface AutoResizeEditableProps {
  value?: string;
  onChange?: (content: string) => void;
  onListChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
  onFocus?: () => void;
  type?: "text" | "list";
  textStyles?: CSSProperties;
  index?: number;
  blocksRef?: MutableRefObject<HTMLDivElement[]>; // Provided from a higher component
  id?: string;
  listItemIndex?: number;
  listItemsRef?: MutableRefObject<Map<string, HTMLDivElement>>; // Provided from a higher component
  currentBlockIndex?: number;
  setCurrentBlockType: (type: "text" | "list") => void;
}

export interface AutoResizeEditableRef {
  applyStyle: (style: "bold" | "italic" | "underline") => void;
}

const AutoResizeEditable = forwardRef<
  AutoResizeEditableRef,
  AutoResizeEditableProps
>(
  (
    {
      value = "",
      onChange,
      onListChange,
      placeholder = "Type here...",
      className = "",
      minHeight,
      onFocus,
      type = "text",
      textStyles,
      index,
      blocksRef,
      id,
      listItemIndex,
      listItemsRef,
      currentBlockIndex,
      setCurrentBlockType,
    },
    ref
  ) => {
    // Get the correct element from refs
    const getEditorElement = (): HTMLDivElement | null => {
      if (type === "text") {
        return blocksRef && index !== undefined
          ? blocksRef.current[index] || null
          : null;
      } else if (type === "list") {
        return listItemsRef && id && listItemIndex !== undefined
          ? listItemsRef.current.get(`${id}-${listItemIndex}`) || null
          : null;
      }
      return null;
    };

    // Set initial content on mount
    useEffect(() => {
      const editorEl = getEditorElement();
      if (editorEl && value) {
        editorEl.innerHTML = value;
      }
    }, []);

    // Adjust height based on content
    const adjustHeight = () => {
      const editorEl = getEditorElement();
      if (!editorEl) return;
      editorEl.style.height = "auto";
      const contentHeight = editorEl.scrollHeight;
      const minSize = minHeight ? parseInt(minHeight) : 24;
      editorEl.style.height = Math.max(minSize, contentHeight) + "px";
    };

    useEffect(() => {
      adjustHeight();
    }, []);

    useEffect(() => {
      window.addEventListener("resize", adjustHeight);
      return () => window.removeEventListener("resize", adjustHeight);
    }, []);

    // Auto-focus current block
    useEffect(() => {
      if (currentBlockIndex === index && blocksRef?.current) {
        const editorEl = blocksRef.current[index];
        if (editorEl) {
          editorEl.focus();
        }
      }
    }, [currentBlockIndex, index, blocksRef]);

    // Update content & notify parent
    const updateContent = () => {
      const editorEl = getEditorElement();
      if (!editorEl) return;
      const updatedContent = editorEl.innerHTML;
      if (type === "list") {
        onListChange?.(updatedContent);
      } else {
        onChange?.(updatedContent);
      }
    };

    // Handle text input
    const handleInput = (e: FormEvent<HTMLDivElement>) => {
      updateContent();
      adjustHeight();
    };

    // **Prevent <div> insertion & enforce <br> for new lines**
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        document.execCommand("insertLineBreak"); // Inserts <br> instead of <div>
      }
    };

    // **Handle pasting - Convert new lines to <br>**
    const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      const editorEl = getEditorElement();
      if (!editorEl) return;

      const pastedText = e.clipboardData.getData("text/plain");
      const formattedText = pastedText.replace(/\n/g, "<br>"); // Replace new lines with <br>
      document.execCommand("insertHTML", false, formattedText);

      updateContent();
      adjustHeight();
    };

    // Set element ref
    const setEditorRef = (el: HTMLDivElement | null) => {
      if (!el) return;
      if (type === "text" && blocksRef && index !== undefined) {
        blocksRef.current[index] = el;
      } else if (type === "list" && listItemsRef && id && listItemIndex !== undefined) {
        listItemsRef.current.set(`${id}-${listItemIndex}`, el);
      }
    };

    return (
      <div
        ref={setEditorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          setCurrentBlockType(type);
          onFocus?.();
        }}
        onClick={() => {
          setCurrentBlockType(type);
          onFocus?.();
        }}
        className={className}
        style={{
          resize: "none",
          overflow: "hidden",
          boxSizing: "border-box",
          padding: "4px",
          lineHeight: "1.5",
          ...textStyles,
        }}
        data-placeholder={index === 0 ? "Enter your title" : placeholder}
      />
    );
  }
);

export default AutoResizeEditable;
