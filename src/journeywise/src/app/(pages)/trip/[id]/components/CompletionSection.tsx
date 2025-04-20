import Link from "next/link";

const CompletionSection = () => {
  return (
    <div className="text-center py-10 mt-8 rounded-xl bg-white shadow-sm">
      <div className="w-16 h-16 mx-auto flex items-center justify-center bg-ocean-blue rounded-full shadow-md mb-4">
        <span className="text-white text-xl font-bold">✓</span>
      </div>
      <h2 className="text-2xl font-bold text-midnight-blue mb-2">Journey Planned</h2>
      <p className="text-charcoal mb-6 max-w-md mx-auto">
        Your trip is complete! Ready to explore your next adventure?
      </p>
      <Link href="/plan-trip">
        <button className="px-6 py-3 bg-ocean-blue text-white rounded-lg hover:bg-midnight-blue transition-all shadow-md">
          Plan Another Trip
        </button>
      </Link>
    </div>
  );
};

export default CompletionSection;