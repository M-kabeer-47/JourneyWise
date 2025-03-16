import { useState,useRef,useEffect } from "react";
import Image from "next/image";

const DraggableImage = ({ 
    height,
    src, 
    alt, 
    className, 
    containerHeight = '300px' 
  }: {
    src: string;  
    alt?: string;
    className?: string;
    containerHeight?: string;
    width: number,
    height: number
  }) => {
    // Store the object's position as percentages (initially centered)
    const [objectPosition, setObjectPosition] = useState({ x: 50, y: 50 });
    // Use state only for cursor updates
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);
    // Use a ref for the dragging flag to avoid re-renders on every mouse move
    const dragging = useRef(false);
    // For throttling updates
    const animationFrame = useRef(null);
  
    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault(); // Prevent text selection during drag
      dragging.current = true;
      setIsDragging(true);
    };
  
    const handleMouseMove = (e:React.MouseEvent) => {
      if (!dragging.current || !containerRef.current) return;
      if (animationFrame.current) return;
  
      animationFrame.current = requestAnimationFrame(() => {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // Constrain the values between 0 and 100
        const posX = Math.min(100, Math.max(0, (x / rect.width) * 100));
        const posY = Math.min(100, Math.max(0, (y / rect.height) * 100));
        setObjectPosition({ x: posX, y: posY });
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
      // Attach event listeners to the document so drag events are captured even outside the container
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
  
    // Calculate proper height
    const imageHeight = containerHeight === 'auto' ? 'auto' : containerHeight;
  
    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden ${className}`}
        onMouseDown={handleMouseDown}
        style={{ 
          cursor: isDragging ? 'grabbing' : 'grab',
          height: imageHeight,
          position: 'relative'
        }}
      >
        <Image
          src={src}
          alt={alt || ''}
          width={1200}
          height={height}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          style={{ 
            objectPosition: `${objectPosition.x}% ${objectPosition.y}%`,
            width: height === 300 ? '100%' : 'auto',
            height: height === 300 ? '100%' : 'auto',
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