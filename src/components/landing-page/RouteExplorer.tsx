"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, TrendingUp, Heart, MessageCircle, Share, Plus } from "lucide-react";

const routes = [
  {
    id: 1,
    title: "Scenic Pacific Coast Highway",
    startPoint: "San Francisco, CA",
    endPoint: "Los Angeles, CA",
    duration: "8 hours",
    difficulty: "Easy",
    upvotes: 234,
    saves: 89,
    comments: 45,
    author: {
      name: "Sarah M.",
      avatar: "/images/users/user1.jpg",
      badge: "Route Specialist"
    },
    waypoints: [
      { name: "Monterey Bay", type: "scenic", time: "1 hour" },
      { name: "Big Sur", type: "photo", time: "2 hours" },
      { name: "Hearst Castle", type: "historic", time: "1.5 hours" }
    ],
    description: "Breathtaking coastal drive with stunning ocean views and charming seaside towns.",
    image: "/images/routes/pch.jpg"
  },
  {
    id: 2,
    title: "Swiss Alpine Route",
    startPoint: "Zurich",
    endPoint: "Interlaken",
    duration: "6 hours",
    difficulty: "Moderate",
    upvotes: 189,
    saves: 67,
    comments: 32,
    author: {
      name: "Marco R.",
      avatar: "/images/users/user2.jpg",
      badge: "Local Expert"
    },
    waypoints: [
      { name: "Lucerne", type: "city", time: "2 hours" },
      { name: "Mount Pilatus", type: "scenic", time: "3 hours" },
      { name: "Brienz Lake", type: "nature", time: "1 hour" }
    ],
    description: "Mountain passes, crystal lakes, and traditional Swiss villages.",
    image: "/images/routes/swiss-alps.jpg"
  },
  {
    id: 3,
    title: "Tuscany Wine Trail",
    startPoint: "Florence",
    endPoint: "Siena",
    duration: "5 hours",
    difficulty: "Easy",
    upvotes: 156,
    saves: 78,
    comments: 29,
    author: {
      name: "Isabella T.",
      avatar: "/images/users/user3.jpg",
      badge: "Wine Expert"
    },
    waypoints: [
      { name: "Chianti Vineyards", type: "wine", time: "2 hours" },
      { name: "San Gimignano", type: "historic", time: "1.5 hours" },
      { name: "Monteriggioni", type: "scenic", time: "1 hour" }
    ],
    description: "Rolling hills, world-class wineries, and medieval hilltop towns.",
    image: "/images/routes/tuscany.jpg"
  }
];

const waypointTypes = {
  scenic: { color: "bg-green-100 text-green-700", icon: "🏞️" },
  photo: { color: "bg-purple-100 text-purple-700", icon: "📸" },
  historic: { color: "bg-blue-100 text-blue-700", icon: "🏛️" },
  city: { color: "bg-orange-100 text-orange-700", icon: "🏙️" },
  nature: { color: "bg-emerald-100 text-emerald-700", icon: "🌲" },
  wine: { color: "bg-red-100 text-red-700", icon: "🍷" }
};

export default function RouteExplorer() {
  const [selectedRoute, setSelectedRoute] = useState(routes[0]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <section id="route-explorer" className="py-20 bg-gradient-to-br from-ocean-blue/5 to-midnight-blue/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-midnight-blue mb-4 font-raleway">
            Route Explorer — Plan from Point A to B
          </h2>
          <p className="text-xl text-charcoal max-w-4xl mx-auto font-geist">
            Discover crowd-sourced routes with perfect stops, voted by the community
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Route Cards */}
          <div className="lg:col-span-1 space-y-4">
            {routes.map((route, index) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedRoute(route)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  selectedRoute.id === route.id
                    ? "bg-midnight-blue text-white shadow-lg"
                    : "bg-white hover:shadow-md border border-gray-100"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`font-bold text-lg mb-2 font-raleway ${
                      selectedRoute.id === route.id ? "text-white" : "text-midnight-blue"
                    }`}>
                      {route.title}
                    </h3>
                    <div className={`flex items-center gap-2 text-sm mb-2 ${
                      selectedRoute.id === route.id ? "text-gray-200" : "text-charcoal"
                    }`}>
                      <Navigation size={14} />
                      {route.startPoint} → {route.endPoint}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1">
                      <TrendingUp size={14} className={selectedRoute.id === route.id ? "text-gray-200" : "text-ocean-blue"} />
                      <span className={`text-sm font-medium ${
                        selectedRoute.id === route.id ? "text-gray-200" : "text-ocean-blue"
                      }`}>
                        {route.upvotes}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`flex items-center gap-4 text-sm mb-4 ${
                  selectedRoute.id === route.id ? "text-gray-200" : "text-gray-600"
                }`}>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {route.duration}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    route.difficulty === "Easy"
                      ? selectedRoute.id === route.id ? "bg-white/20 text-white" : "bg-green-100 text-green-700"
                      : selectedRoute.id === route.id ? "bg-white/20 text-white" : "bg-orange-100 text-orange-700"
                  }`}>
                    {route.difficulty}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-ocean-blue/20 rounded-full flex items-center justify-center text-xs">
                      {route.author.name.charAt(0)}
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${
                        selectedRoute.id === route.id ? "text-white" : "text-charcoal"
                      }`}>
                        {route.author.name}
                      </div>
                      <div className={`text-xs ${
                        selectedRoute.id === route.id ? "text-gray-200" : "text-gray-500"
                      }`}>
                        {route.author.badge}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className={`flex items-center gap-1 text-sm ${
                      selectedRoute.id === route.id ? "text-gray-200" : "text-gray-600"
                    }`}>
                      <Heart size={14} />
                      {route.saves}
                    </button>
                    <button className={`flex items-center gap-1 text-sm ${
                      selectedRoute.id === route.id ? "text-gray-200" : "text-gray-600"
                    }`}>
                      <MessageCircle size={14} />
                      {route.comments}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Create Route Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              onClick={() => setShowCreateModal(true)}
              className="w-full p-6 border-2 border-dashed border-ocean-blue rounded-2xl text-ocean-blue hover:bg-ocean-blue/5 transition-colors flex items-center justify-center gap-3 font-semibold"
            >
              <Plus size={20} />
              Create Your Route
            </motion.button>
          </div>

          {/* Interactive Map/Route Details */}
          <div className="lg:col-span-2">
            <motion.div
              key={selectedRoute.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
            >
              {/* Route Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-midnight-blue mb-2 font-raleway">
                      {selectedRoute.title}
                    </h3>
                    <p className="text-charcoal font-geist">
                      {selectedRoute.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <Heart size={18} className="text-gray-600" />
                    </button>
                    <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <Share size={18} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Mock Map Area */}
              <div className="relative h-64 bg-gradient-to-br from-ocean-blue/10 to-midnight-blue/10 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-ocean-blue mx-auto mb-4" />
                  <p className="text-charcoal font-medium">Interactive Map</p>
                  <p className="text-sm text-gray-600">
                    {selectedRoute.startPoint} → {selectedRoute.endPoint}
                  </p>
                </div>
                
                {/* Floating waypoint pins simulation */}
                <div className="absolute top-4 left-8 bg-white rounded-full p-2 shadow-lg">
                  <MapPin size={16} className="text-green-600" />
                </div>
                <div className="absolute top-12 right-16 bg-white rounded-full p-2 shadow-lg">
                  <MapPin size={16} className="text-blue-600" />
                </div>
                <div className="absolute bottom-8 left-1/3 bg-white rounded-full p-2 shadow-lg">
                  <MapPin size={16} className="text-purple-600" />
                </div>
              </div>

              {/* Waypoints */}
              <div className="p-6">
                <h4 className="text-lg font-bold text-midnight-blue mb-4 font-raleway">
                  Recommended Stops
                </h4>
                
                <div className="space-y-4">
                  {selectedRoute.waypoints.map((waypoint, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="text-2xl">
                        {waypointTypes[waypoint.type as keyof typeof waypointTypes]?.icon}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-charcoal">{waypoint.name}</h5>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            waypointTypes[waypoint.type as keyof typeof waypointTypes]?.color || 'bg-gray-100 text-gray-700'
                          }`}>
                            {waypoint.type}
                          </span>
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <Clock size={12} />
                            {waypoint.time}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  <button className="flex-1 bg-midnight-blue text-white py-3 rounded-lg font-semibold hover:bg-midnight-blue/90 transition-colors">
                    Clone & Customize Route
                  </button>
                  <button className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-charcoal">
                    View Comments ({selectedRoute.comments})
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Create Route Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full"
            >
              <h3 className="text-2xl font-bold text-midnight-blue mb-6 font-raleway">
                Create Your Route
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Starting point..."
                    className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue"
                  />
                  <input
                    type="text"
                    placeholder="Destination..."
                    className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Route title..."
                  className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue"
                />
                <textarea
                  placeholder="Describe your route and why others should take it..."
                  rows={3}
                  className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue resize-none"
                />
              </div>
              
              <div className="flex gap-4">
                <button className="flex-1 bg-midnight-blue text-white p-4 rounded-lg font-semibold hover:bg-midnight-blue/90 transition-colors">
                  Create Route
                </button>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}