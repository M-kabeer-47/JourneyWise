import Link from "next/link";

interface TripCompletionCardProps {
  waypointsCount: number;
  startLocation: string;
  endLocation: string;
}

export default function TripCompletionCard({
  waypointsCount,
  startLocation,
  endLocation
}: TripCompletionCardProps) {
  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="p-10 text-center">
        <div className="w-16 h-16 mx-auto flex items-center justify-center bg-light-gray rounded-full mb-4">
          <div className="w-10 h-10 rounded-full bg-ocean-blue flex items-center justify-center">
            <span className="text-white text-xl font-bold">✓</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-midnight-blue mb-2">Journey Planned</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Your {waypointsCount}-destination adventure from {startLocation} to {endLocation} is ready to explore.
        </p>
        <Link href="/plan-trip">
          <button className="px-6 py-3 bg-ocean-blue text-white rounded-lg 
            hover:bg-midnight-blue transition-colors shadow-sm">
            Plan Another Journey
          </button>
        </Link>
      </div>
    </div>
  );
}