import React from 'react';
import { Clock, MapPin, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils'

export interface Activity {
  id: string;
  name: string;
  time?: string;
  spot?: string;
}

export interface ItineraryDay {
  id: string;
  day: number;
  name: string;
  activities: Activity[];
}

interface EnhancedItineraryProps {
  itinerary: ItineraryDay[];
  className?: string;
}

const EnhancedItinerary = ({ itinerary, className }: EnhancedItineraryProps) => {
  return (
    <div className={cn("py-8 sm:py-12", className)}>
      <div className="max-w-full mb-8 sm:mb-12">
        <div className="inline-flex items-center px-2 sm:px-3 py-1 bg-light-gray rounded-md border border-ocean-blue/20">
          <Calendar className="w-3 sm:w-4 h-3 sm:h-4 text-ocean-blue mr-1.5 sm:mr-2" />
          <span className="text-xs sm:text-sm font-medium text-midnight-blue">Travel Itinerary</span>
        </div>
        <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl font-semibold text-midnight-blue">
          Your Journey Timeline
        </h2>
        <p className="mt-2 sm:mt-3 text-base sm:text-md text-gray-600">
          Experience your meticulously planned adventure, with every moment thoughtfully arranged for an unforgettable journey
        </p>
      </div>
      
      <div className="relative space-y-6 sm:space-y-10">
        {/* Main timeline line */}
        <div className="absolute left-5 xs:left-7 sm:left-10 top-0 bottom-0 w-[2px] bg-ocean-blue/20"></div>
        
        {itinerary.map((day, dayIndex) => (
          <div 
            key={day.id}
            className="relative"
            style={{ animationDelay: `${dayIndex * 150}ms` }}
          >
            <div className="flex items-start gap-6 sm:gap-8">
              {/* Day indicator */}
              <div className="w-10 xs:w-14 sm:w-16 md:w-20 relative z-10">
                <div className={`h-10 w-10 xs:h-14 xs:w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 bg-white border-2 border-ocean-blue shadow-sm rounded-lg overflow-hidden absolute left-1/2 -translate-x-1/2 ${dayIndex!==0 && "top-[70px]"}`}>
                  <div className="h-1/3 bg-ocean-blue flex items-center justify-center">
                    <span className="text-[8px] xs:text-[10px] sm:text-xs text-white uppercase font-medium tracking-wide">Day</span>
                  </div>
                  <div className="h-2/3 flex items-center justify-center">
                    <span className="text-lg xs:text-xl sm:text-2xl font-semibold text-midnight-blue">
                      {day.day}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Content card */}
              <div className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className="px-3 xs:px-4 sm:px-6 py-3 sm:py-5 border-b border-gray-200 bg-light-gray">
                  <h3 className="text-base xs:text-lg sm:text-xl font-medium text-midnight-blue line-clamp-1">{day.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                    {day.activities.length} activities • {day.activities.reduce((acc, curr) => curr.time ? acc + 1 : acc, 0)} scheduled times
                  </p>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {day.activities.map((activity) => (
                    <div 
                      key={activity.id}
                      className="group relative px-3 xs:px-4 sm:px-6 py-3 sm:py-5 hover:bg-light-gray transition-all duration-200"
                    >
                      <div className="flex items-start gap-2 xs:gap-3 sm:gap-4">
                        {/* Activity indicator */}
                        <div className="mt-1.5 flex-shrink-0">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-ocean-blue bg-white group-hover:bg-ocean-blue transition-all duration-200"></div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm xs:text-base font-medium text-midnight-blue group-hover:text-ocean-blue transition-colors duration-200 line-clamp-2 xs:line-clamp-1">
                              {activity.name}
                            </h4>
                          </div>
                          
                          {(activity.time || activity.spot) && (
                            <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-1.5 xs:gap-2">
                              {activity.time && (
                                <div className="flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-md bg-light-gray border border-ocean-blue/10 text-gray-700 text-xs sm:text-sm">
                                  <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-ocean-blue mr-1 sm:mr-1.5" />
                                  <span>{activity.time}</span>
                                </div>
                              )}
                              
                              {activity.spot && (
                                <div className="flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-md bg-light-gray border border-ocean-blue/10 text-gray-700 text-xs sm:text-sm">
                                  <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-ocean-blue mr-1 sm:mr-1.5" />
                                  <span className="truncate max-w-[120px] xs:max-w-none">{activity.spot}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedItinerary;