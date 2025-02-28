"use client";

import { cn } from "@/lib/auth/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    image: string;
    name: string;
    rating: number;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "h-[400px] scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] flex justify-center items-center",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "grid grid-cols-1 md:grid-cols-3 gap-8 shrink-0 gap-4 py-4 w-max",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
           <li className="flex items-center mb-4 w-[300px] h-[200px] bg-red-500 bg-light-gray rounded-lg p-6 shadow-md" key={idx}>
           <Image src={item.image} alt={item.name} width={60} height={60} className="rounded-full mr-4" />
           <div>
             <h3 className="font-semibold">{item.name}</h3>
             <div className="flex">
               {[...Array(item.rating)].map((_, i) => (
                 <Star key={i} size={16} className="text-accent fill-current" />
               ))}
             </div>
           </div>
         </li>
        ))}
      </ul>
    </div>
  );
};
