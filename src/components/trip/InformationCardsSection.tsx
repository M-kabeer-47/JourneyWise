import { BanknoteIcon, Clock, DollarSign, MapPin, Train } from "lucide-react";

export default function InformationCardsSection({mockTrip,numberOfWaypoints}: {mockTrip: {routeDistance: string; estimatedDuration: string; estimatedBudget: number;},numberOfWaypoints: number}) {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-midnight-blue mb-2">
            Trip Information
          </h2>
          <p className="text-charcoal">Essential details for your journey</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Distance Card */}
          <div className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-ocean-blue/10 rounded-full flex items-center justify-center">
                <Train className="w-5 h-5 text-ocean-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Distance</h3>
                <p className="text-lg font-bold text-midnight-blue">
                  {mockTrip.routeDistance}
                </p>
              </div>
            </div>
            <p className="text-sm text-charcoal">
              Total journey distance with scenic stops along the way.
            </p>
          </div>

          {/* Duration Card */}
          <div className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-ocean-blue/10 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-ocean-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Duration</h3>
                <p className="text-lg font-bold text-midnight-blue">
                  {mockTrip.estimatedDuration}
                </p>
              </div>
            </div>
            <p className="text-sm text-charcoal">
              Travel time between destinations, add time for sightseeing.
            </p>
          </div>

          {/* Waypoints Card */}
          <div className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-ocean-blue/10 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-ocean-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Stops</h3>
                <p className="text-lg font-bold text-midnight-blue">
                  {numberOfWaypoints} Waypoints
                </p>
              </div>
            </div>
            <p className="text-sm text-charcoal">
              Carefully selected attractions and rest stops.
            </p>
          </div>

          {/* Budget Card */}
          <div className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-ocean-blue/10 rounded-full flex items-center justify-center">
                <BanknoteIcon className="w-5 h-5 text-ocean-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Budget</h3>
                <p className="text-lg font-bold text-midnight-blue">
                  ${mockTrip.estimatedBudget}
                </p>
              </div>
            </div>
            <p className="text-sm text-charcoal">
              Estimated cost for 2 people including fuel and attractions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
