import React from 'react';
import { Waypoint } from '@/lib/types/waypoint';

interface TimelineProps {
  waypoints: Waypoint[];
  activeWaypointIndex: number;
  onWaypointClick: (index: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({ waypoints, activeWaypointIndex, onWaypointClick }) => {
  return (
    <div className="relative pl-14">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-[3px] rounded-full bg-light-gray" />
      
      {/* Timeline items */}
      {waypoints.map((waypoint, index) => {
        const isActive = index === activeWaypointIndex;
        const isCompleted = index < activeWaypointIndex;

        return (
          <div key={waypoint.id} className="relative mb-10 last:mb-0">
            <button
              onClick={() => onWaypointClick(index)}
              className={`flex items-start group w-full pl-2 pr-3 py-2 -ml-2 rounded-lg transition-all ${isActive ? 'bg-ocean-blue/10' : 'hover:bg-light-gray'}`}
            >
              <div className="relative z-10 mr-4">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-ocean-blue ring-4 ring-ocean-blue/20' : isCompleted ? 'bg-ocean-blue/60 ring-2 ring-ocean-blue/20' : 'bg-light-gray'}`}
                >
                  {/* Icon can be added here */}
                </div>
              </div>
              
              <div className="flex-1 pt-1">
                <h3 className={`text-base font-semibold ${isActive ? 'text-midnight-blue' : 'text-charcoal'}`}>
                  {waypoint.name}
                </h3>
                <p className="text-xs text-charcoal mb-1">{waypoint.type}</p>
              </div>
            </button>
            
            {/* Connection line for non-last items */}
            {index < waypoints.length - 1 && (
              <div className="absolute left-6 top-10 h-8 w-[1px] transform translate-x-[1px] border-l-2 border-dashed border-light-gray z-0"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;