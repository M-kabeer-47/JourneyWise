'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { cn } from "@/lib/auth/utils"

const testimonials = [
  { id: 1, name: 'David Bowes', image: '/user1.jpg', rating: 5, quote: 'TravelEase made planning my dream vacation a breeze!' },
  { id: 2, name: 'Mike Chen', image: '/user2.jpg', rating: 4, quote: 'The trips I found through this app were unforgettable experiences.' },
  { id: 3, name: 'Shaun Pollock', image: '/user3.jpg', rating: 5, quote: 'I love how easy it is to connect with local guides and plan unique adventures.' },
]

const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: typeof testimonials;
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollerInner = containerRef.current;
    if (!scrollerInner) return;

    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      scrollerInner.appendChild(duplicatedItem);
    });

    const getDirection = () => {
      if (containerRef.current) {
        containerRef.current.style.setProperty(
          "--animation-direction",
          direction === "left" ? "forwards" : "reverse"
        );
      }
    };

    const getSpeed = () => {
      if (containerRef.current) {
        containerRef.current.style.setProperty(
          "--animation-duration",
          speed === "fast" ? "20s" : speed === "normal" ? "60s" : "80s"
        );
      }
    };

    getDirection();
    getSpeed();
  }, [direction, speed]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={containerRef}
        className={cn(
          "flex w-max gap-4 py-4 animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
          className
        )}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="w-[350px] max-w-full relative rounded-lg flex-shrink-0 bg-light-gray px-8 py-6 shadow-md md:w-[450px]"
          >
            <div className="flex items-center mb-4">
              <Image src={item.image} alt={item.name} width={60} height={60} className="rounded-full mr-4" />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <div className="flex">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-accent fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">"{item.quote}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function UserTestimonials() {
  return (
    <section className="py-16 bg-white mb-[100px]">
      <div className="mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">What Our Users Say</h2>
        <InfiniteMovingCards items={testimonials} speed="normal" pauseOnHover={true} />
      </div>
    </section>
  )
}

