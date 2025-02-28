import { motion } from "framer-motion"

export const NextStepsStep = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-midnight-blue">Your Journey Continues</h2>
        <p className="text-gray-500 mt-2">
          Here's what you can do next to make your trip even better.
        </p>
      </div>
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 border border-gray-100">
          <div className="grid gap-4">
            {[
              {
                title: "Plan Your Route",
                description: "Add stops and attractions to shape your trip"
              },
              {
                title: "Showcase Attractions",
                description: "Upload images and highlight scenic spots"
              },
              {
                title: "Curate Stays",
                description: "Recommend hotels for a comfy journey"
              },
              
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200"
              >
                <div className="flex-shrink-0 w-1 h-1 rounded-full bg-ocean-blue mt-2.5" />
                <div>
                  <h4 className="text-sm font-medium text-midnight-blue">{item.title}</h4>
                  <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}