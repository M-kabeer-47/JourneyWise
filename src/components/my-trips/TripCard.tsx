import { 
    Hotel, 
    MapPin, 
    Navigation, 
    Compass,
    Image as ImageIcon,
    ExternalLink,
    Globe
  } from "lucide-react";
  import { motion } from "framer-motion";
  import { Waypoint } from "@/lib/types/waypoint";
  
  interface WaypointCardProps {
    waypoint: Waypoint;
    index: number;
    isActive: boolean;
    onImageClick: (index: number) => void;
  }
  
  export default function WaypointCard({ 
    waypoint, 
    index, 
    isActive,
    onImageClick
  }: WaypointCardProps) {
    const getWaypointIcon = (type: string) => {
      const iconProps = { className: "w-5 h-5 text-white" };
      switch (type) {
        case "start":
          return <Navigation {...iconProps} />;
        case "attraction":
          return <Compass {...iconProps} />;
        case "stop":
          return <Hotel {...iconProps} />;
        case "end":
          return <MapPin {...iconProps} />;
        default:
          return <MapPin {...iconProps} />;
      }
    };
  
    const getWaypointColor = (type: string) => {
      switch (type) {
        case "start":
          return "bg-ocean-blue";
        case "attraction":
          return "bg-ocean-blue/90";
        case "stop":
          return "bg-ocean-blue/80";
        case "end":
          return "bg-midnight-blue";
        default:
          return "bg-ocean-blue";
      }
    };
  
    const getWaypointLabel = (type: string) => {
      switch (type) {
        case "start":
          return "Starting Point";
        case "attraction":
          return "Attraction";
        case "stop":
          return "Overnight Stop";
        case "end":
          return "Final Destination";
        default:
          return "Waypoint";
      }
    };
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className={`
          bg-white rounded-xl overflow-hidden
          transition-all duration-300
          ${isActive ? 'shadow-md' : 'shadow-sm hover:shadow'}
        `}
      >
        {/* Header */}
        <div
          className={`
            p-4
            bg-gradient-to-r from-ocean-blue to-midnight-blue
            flex items-center gap-3
          `}
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10">
            {getWaypointIcon(waypoint.type)}
          </div>
          <div>
            <p className="text-sm text-white/80">{getWaypointLabel(waypoint.type)}</p>
            <h2 className="text-xl font-bold text-white">{waypoint.name}</h2>
          </div>
        </div>
        
        <div className="p-6">
          {/* Image and description */}
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {waypoint.imageUrl && (
              <div className="lg:w-2/5">
                <div 
                  className="relative aspect-video rounded-lg overflow-hidden shadow-sm cursor-pointer"
                  onClick={() => onImageClick(index)}
                >
                  <img
                    src={waypoint.imageUrl}
                    alt={waypoint.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-black/40 flex items-center justify-center transition-opacity duration-300">
                    <div className="p-2 bg-white rounded-full">
                      <ImageIcon className="w-5 h-5 text-midnight-blue" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className={waypoint.imageUrl ? "lg:w-3/5" : "w-full"}>
              <h3 className="text-lg font-semibold text-midnight-blue mb-3">About this location</h3>
              <p className="text-gray-700 leading-relaxed">
                {waypoint.description}
              </p>
            </div>
          </div>
          
          {/* Hotels for stops */}
          {waypoint.type === "stop" && waypoint.hotels && waypoint.hotels.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-midnight-blue mb-4 flex items-center gap-2">
                <Hotel className="w-5 h-5 text-ocean-blue" />
                <span>Accommodation Options</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {waypoint.hotels.map((hotel) => (
                  <div 
                    key={hotel.id}
                    className="bg-light-gray rounded-lg p-5 shadow-sm hover:shadow transition-shadow duration-200"
                  >
                    <h4 className="font-semibold text-midnight-blue mb-3">{hotel.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {hotel.detailsLink && (
                        <a 
                          href={hotel.detailsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 
                            bg-white text-ocean-blue rounded-md text-xs font-medium 
                            hover:bg-ocean-blue/5 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Hotel Details
                        </a>
                      )}
                      
                      {hotel.locationLink && (
                        <a 
                          href={hotel.locationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 
                            bg-white text-ocean-blue rounded-md text-xs font-medium
                            hover:bg-ocean-blue/5 transition-colors"
                        >
                          <Globe className="w-3 h-3" />
                          View Location
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  }