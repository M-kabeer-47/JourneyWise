"use client"
import React, { useEffect } from 'react';
import { CheckCircle2, Ban, User, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils'

interface EnhancedTravelHeaderProps {
  title: string;
  isAvailable: boolean;
  className?: string;
  user?: {
    name: string;
    avatar?: string;
    agentId: string;
  };
}

const EnhancedTravelHeader = ({ title, isAvailable, className, user }: EnhancedTravelHeaderProps) => {
  useEffect(() => {
    console.log("User Info:", user);
  }, []); // Log user info when it changes
  
  return (
    <div className={cn(
      "relative z-10 px-4 md:px-6 py-8 -mt-12 rounded-t-2xl bg-white shadow-sm",
      className
    )}>
      <div className="flex flex-col gap-6">
        {/* Title */}
        <h1 className="text-2xl md:text-5xl font-[800] tracking-tight text-midnight-blue animate-fade-in font-raleway">
          {title || "Experience Title"}
        </h1>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Agent Info Card */}
          {user && (
            <Link 
              href={`/agent/${user.agentId}`}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-ocean-blue/10 flex items-center justify-center border-2 border-ocean-blue/20 shadow-sm">
                {user.avatar ? (
                  <img 
                    src={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-ocean-blue" />
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500">Hosted by</p>
                <p className="font-medium text-midnight-blue group-hover:text-ocean-blue transition-colors">
                  {user.name}
                </p>
                <p className="text-xs text-ocean-blue/70 flex items-center mt-0.5">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Contact agent
                </p>
              </div>
            </Link>
          )}
          
          {/* Availability Badge */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gray-50 shadow-sm self-end">
            {isAvailable ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Ban className="w-5 h-5 text-red-500" />
            )}
            
            <span className={cn(
              "font-medium",
              isAvailable ? "text-emerald-600" : "text-gray-500"
            )}>
              {isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTravelHeader;