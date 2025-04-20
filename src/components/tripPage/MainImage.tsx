
import React from 'react';
import { cn } from '@/utils/shadcn/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface MainImageProps {
  src: string;
  alt: string;
  className?: string;
  isLoading?: boolean;
}

const MainImage = ({ src, alt, className, isLoading = false }: MainImageProps) => {
  // Use a standard fallback image for all trips
  const fallbackImage = "https://images.unsplash.com/photo-1469474968028-56623f02e42e";
  
  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-gray-100 w-full", className)}>
      {isLoading ? (
        <Skeleton className="w-full h-full absolute inset-0" />
      ) : (
        <img
          src={src || fallbackImage}
          alt={alt}
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="lazy"
        />
      )}
    </div>
  );
};

export default MainImage;
