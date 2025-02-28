import { AnimatePresence, motion } from "framer-motion";
import { Check, Star, User, Users } from "lucide-react";

type Tier = {
    name: string;
    members: number;
    price: number;
    description: string;
};
type LivePreviewProps = {
    requirements: string[];
    tiers: Tier[];
    currency: string;
    activeTierIndex: number;
    setActiveTierIndex: React.Dispatch<React.SetStateAction<number>>;
    agentName: string;
    title: string;
    formatPrice: (price: number) => string;
    itemVariants: any;
    };

export default function StepFour({ itemVariants,activeTierIndex, setActiveTierIndex ,agentName,title, requirements, tiers, currency,formatPrice}: LivePreviewProps) {
  return (
    <>
    
            <div className="space-y-6 md:space-y-8">
              {/* Header Section */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-ocean-blue rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-midnight-blue">{agentName || "Agent Name"}</h2>
                    <h3 className="text-base text-charcoal">{title || "Experience Title"}</h3>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-charcoal">0 (New)</span>
                </div>
              </div>

              {/* Pricing Tiers */}
              <motion.div variants={itemVariants} className="space-y-4 md:space-y-6 mt-4 md:mt-6">
                {/* Tier Tabs */}
                <div className={`flex border-b border-gray-200 ${tiers.length === 1 ? "justify-center" : ""}`}>
                  {tiers.map((tier: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setActiveTierIndex(index)}
                      className={`px-8 py-3 relative ${
                        index === activeTierIndex ? "text-midnight-blue font-semibold" : "text-gray-500"
                      }`}
                    >
                      {tier.name || `Tier ${index + 1}`}
                      {index === activeTierIndex && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-midnight-blue"
                          layoutId="activeTab"
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Active Tier Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTierIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                      {/* Title and Price */}
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-midnight-blue">
                            {tiers[activeTierIndex]?.name || `Tier ${activeTierIndex+1}`} 
                          </h3>
                          <p className="text-sm text-charcoal max-w-sm">
                            {tiers[activeTierIndex]?.description || "Experience description"}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-midnight-blue">
                            {currency} {formatPrice(tiers[activeTierIndex]?.price)}
                          </div>
                        </div>
                      </div>

                      {/* Members */}
                      <div className="flex items-center space-x-2 text-charcoal">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{tiers[activeTierIndex]?.members || 1} members</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3 pt-4">
                        <button className="w-full py-3 bg-midnight-blue text-white rounded-lg font-medium hover:bg-midnight-blue/90 transition-colors duration-200">
                          Request to book
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Requirements Section */}
              <motion.div variants={itemVariants} className="mt-6 md:mt-8 space-y-4">
                <h3 className="text-xl font-semibold text-midnight-blue">Requirements</h3>
                <div className="grid gap-4">
                  {requirements.length > 0 && requirements[0] !== "" ? (
                    requirements.map(
                      (req: string, index: number) =>
                        req && (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
                          >
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                              <Check className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-base text-charcoal flex-1">{req}</span>
                          </motion.div>
                        ),
                    )
                  ) : (
                    // Skeleton/placeholder for requirements
                    <>
                      {[1, 2, 3].map((_, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg animate-pulse">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          
    </>
    );
}