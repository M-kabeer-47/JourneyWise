import React from 'react';
import { PhoneCall, MessageCircle, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface BookingCTAProps {
  className?: string;
  variant?: 'card' | 'simple';
}

const BookingCTA = ({ className, variant = 'card' }: BookingCTAProps) => {
  if (variant === 'simple') {
    return (
      <div className={cn("flex flex-col sm:flex-row sm:px-1 gap-3 w-full", className)}>
        <Button 
          className="flex-1 bg-gradient-to-r from-midnight-blue to-ocean-blue  text-white h-12 p-2"
          size="lg"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Book Now
        </Button>
        
        <Button 
          className="flex-1 bg-white border border-gray-200 text-midnight-blue hover:bg-gray-50 h-12 p-2"
          size="lg"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Contact Agent
        </Button>
        
        
      </div>
    );
  }

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl bg-gradient-to-r from-midnight-blue to-ocean-blue px-6 py-6",
      className
    )}>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469474968028-56623f02e42e')] bg-cover opacity-20 mix-blend-overlay" />
      
      <div className="relative z-10">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-xl sm:text-2xl font-semibold text-white">Ready to Experience this Journey?</h3>
          <p className="mt-2 text-white/80 max-w-md">
            Connect with our travel specialists to customize this trip to your preferences.
          </p>
          
          <div className="mt-6 w-full flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              className="w-full sm:flex-1 bg-white text-midnight-blue hover:bg-white/90 h-12"
              size="sm"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Now
            </Button>
            
            <Button 
              className="w-full sm:flex-1 bg-white/20 text-white hover:bg-white/30 border border-white/30 h-12"
              size="sm"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Agent
            </Button>
            
            
              
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCTA;