import { 
    MapPin, 
    Navigation, 
    Users, 
    DollarSign, 
    Calendar 
  } from "lucide-react";
  
  interface TripOverviewProps {
    startLocation: string;
    endLocation: string;
    numPeople: number;
    budget: number;
    currency: string;
    createdAt: string;
    scrollProgress: number;
  }
  
  export default function TripOverview({
    startLocation,
    endLocation,
    numPeople,
    budget,
    currency,
    createdAt,
    scrollProgress
  }: TripOverviewProps) {
    const formatCurrency = (amount: number, currency: string) => {
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: currency 
      }).format(amount);
    };
  
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-2xl font-bold text-midnight-blue">Journey Overview</h2>
          <p className="text-gray-500 text-sm">Your adventure from {startLocation} to {endLocation}</p>
        </div>
        
        <div className="px-6 pb-6">
          <div className="flex flex-wrap gap-6 items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-ocean-blue/10 flex items-center justify-center">
                <Navigation className="w-6 h-6 text-ocean-blue" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Starting Point</p>
                <p className="font-semibold text-midnight-blue">{startLocation}</p>
              </div>
            </div>
            
            <div className="flex-1 mx-4 hidden md:block">
              <div className="h-1 bg-light-gray rounded-full overflow-hidden">
                <div 
                  className="h-full bg-ocean-blue transition-all duration-300"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-midnight-blue/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-midnight-blue" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Final Destination</p>
                <p className="font-semibold text-midnight-blue">{endLocation}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-light-gray rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-ocean-blue" />
                <span className="text-sm font-medium text-midnight-blue">Travelers</span>
              </div>
              <p className="text-lg font-bold text-midnight-blue">
                {numPeople} {numPeople === 1 ? 'Person' : 'People'}
              </p>
            </div>
            
            <div className="bg-light-gray rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-ocean-blue" />
                <span className="text-sm font-medium text-midnight-blue">Budget</span>
              </div>
              <p className="text-lg font-bold text-midnight-blue">
                {formatCurrency(budget, currency)}
              </p>
            </div>
            
            <div className="bg-light-gray rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-ocean-blue" />
                <span className="text-sm font-medium text-midnight-blue">Created</span>
              </div>
              <p className="text-lg font-bold text-midnight-blue">
                {new Date(createdAt).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }