import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BlockType } from "@/lib/types/block";
const DraggableImage = ({ 
  height,
  src, 
  alt, 
  className, 
  containerHeight = '230px',
  width,
  onUpdate,
  blockId
}: {
  src: string;  
  alt?: string;
  className?: string;
  containerHeight?: string;
  width: number;
  height: number;
  onUpdate: (id: string, updates: Partial<BlockType>) => void;
  blockId: string;
}) => {
  // Initial focus centered
  const [objectPosition, setObjectPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const animationFrame = useRef<number | null>(null);
  // Store initial mouse and image positions
  const dragStart = useRef({ mouseX: 0, mouseY: 0, objectX: 50, objectY: 50 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    setIsDragging(true);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate mouse position in percentage relative to the container
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
    // Save the initial positions to preserve offset during drag
    dragStart.current = { mouseX, mouseY, objectX: objectPosition.x, objectY: objectPosition.y };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.current || !containerRef.current) return;
    if (animationFrame.current) return;

    animationFrame.current = requestAnimationFrame(() => {
      const rect = containerRef.current!.getBoundingClientRect();
      // Get current mouse position as percentage
      const currentMouseX = ((e.clientX - rect.left) / rect.width) * 100;
      const currentMouseY = ((e.clientY - rect.top) / rect.height) * 100;
      // Calculate how far the mouse has moved from the initial position
      const deltaX = currentMouseX - dragStart.current.mouseX;
      const deltaY = currentMouseY - dragStart.current.mouseY;
      // Compute the new object position:
      // - Horizontal: direct addition
      // - Vertical: inverted (drag up moves the focal point down)
      const newX = Math.min(100, Math.max(0, dragStart.current.objectX + deltaX));
      const newY = Math.min(100, Math.max(0, dragStart.current.objectY - deltaY));
      setObjectPosition({ x: newX, y: newY });
      console.log("newX",newX+"newY",newY)
      console.log("blockId",blockId)
      onUpdate(blockId, { imageObjectPosition: { x: newX, y: newY } });
      animationFrame.current = null;
    });
  };

  const handleMouseUp = () => {
    dragging.current = false;
    setIsDragging(false);
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }
  };

  useEffect(() => {
    // Attach events to document so dragging is captured even when cursor is outside container
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const imageHeight = containerHeight === 'auto' ? 'auto' : containerHeight;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseDown={handleMouseDown}
      style={{ 
        cursor: isDragging ? 'grabbing' : 'grab',
        height: imageHeight,
        
        
      }}
    >
      <Image
        src={src}
        alt={alt || ''}
        width={width}
        height={height}
        
        className="object-cover"
        style={{ 
          objectPosition: `${objectPosition.x}% ${objectPosition.y}%`,
          width: '100%',
          height: '100%',
          
          position: 'absolute'
        }}
        draggable={false}
      />
      {isDragging && (
        <div className="absolute inset-0 bg-white/5 pointer-events-none z-10">
          {/* Visual cue for dragging */}
        </div>
      )}
    </div>
  );
};

export default DraggableImage;
