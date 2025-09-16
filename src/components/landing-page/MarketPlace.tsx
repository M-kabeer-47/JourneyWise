"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Star, User, MapPin, Clock, DollarSign } from "lucide-react";
import Image from "next/image";

const experiences = [
  {
    id: 1,
    title: "Swiss Alps Adventure",
    location: "Switzerland",
    duration: "3 Days",
    price: 1299,
    rating: 4.9,
    reviews: 127,
    agent: {
      name: "Alpine Tours Pro",
      verified: true,
      avatar: "/images/agents/agent1.jpg"
    },
    tags: ["Hiking", "Adventure", "Mountains"],
    image: "/images/experiences/swiss-alps.jpg"
  },
  {
    id: 2,
    title: "Japanese Cultural Immersion",
    location: "Tokyo, Japan",
    duration: "7 Days",
    price: 2499,
    rating: 4.8,
    reviews: 89,
    agent: {
      name: "Tokyo Cultural Tours",
      verified: true,
      avatar: "/images/agents/agent2.jpg"
    },
    tags: ["Culture", "Food", "History"],
    image: "/images/experiences/tokyo.jpg"
  },
  {
    id: 3,
    title: "Tuscany Wine & Food Tour",
    location: "Tuscany, Italy",
    duration: "5 Days",
    price: 1899,
    rating: 4.9,
    reviews: 156,
    agent: {
      name: "Tuscan Experiences",
      verified: true,
      avatar: "/images/agents/agent3.jpg"
    },
    tags: ["Food & Wine", "Luxury", "Culture"],
    image: "/images/experiences/tuscany.jpg"
  }
];

const filters = [
  { key: "location", label: "Location", options: ["All Locations", "Europe", "Asia", "Americas"] },
  { key: "type", label: "Type", options: ["All Types", "Adventure", "Culture", "Food & Wine", "Luxury"] },
  { key: "price", label: "Price", options: ["Any Price", "$0-500", "$501-1500", "$1501+"] },
  { key: "duration", label: "Duration", options: ["Any Duration", "1-3 Days", "4-7 Days", "8+ Days"] }
];

export default function MarketplaceShowcase() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [comparedItems, setComparedItems] = useState<number[]>([]);

  const toggleCompare = (id: number) => {
    if (comparedItems.includes(id)) {
      setComparedItems(comparedItems.filter(item => item !== id));
    } else if (comparedItems.length < 3) {
      setComparedItems([...comparedItems, id]);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-midnight-blue mb-4 font-raleway">
            Discover Amazing Experiences
          </h2>
          <p className="text-xl text-charcoal max-w-3xl mx-auto font-geist">
            Browse thousands of verified travel experiences from licensed agents worldwide
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="bg-gradient-to-r from-ocean-blue/5 to-midnight-blue/5 rounded-2xl p-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search destinations, experiences, or agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4 overflow-x-auto">
              {filters.map((filter) => (
                <select
                  key={filter.key}
                  value={selectedFilters[filter.key] || filter.options[0]}
                  onChange={(e) => setSelectedFilters({ ...selectedFilters, [filter.key]: e.target.value })}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue min-w-[150px]"
                >
                  {filter.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover"
                />
                
                {/* Compare Checkbox */}
                <div className="absolute top-3 left-3">
                  <input
                    type="checkbox"
                    checked={comparedItems.includes(experience.id)}
                    onChange={() => toggleCompare(experience.id)}
                    className="w-5 h-5 text-ocean-blue border-2 border-white rounded focus:ring-2 focus:ring-ocean-blue"
                  />
                </div>

                {/* Tags */}
                <div className="absolute bottom-3 left-3 flex gap-2">
                  {experience.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-xl text-midnight-blue font-raleway line-clamp-2">
                    {experience.title}
                  </h3>
                  <div className="flex items-center gap-1 ml-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{experience.rating}</span>
                    <span className="text-xs text-gray-500">({experience.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-charcoal mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    {experience.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {experience.duration}
                  </div>
                </div>

                {/* Agent Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-ocean-blue/10 rounded-full flex items-center justify-center">
                    <User size={16} className="text-ocean-blue" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-charcoal">{experience.agent.name}</span>
                      {experience.agent.verified && (
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <DollarSign size={18} className="text-ocean-blue" />
                    <span className="text-2xl font-bold text-ocean-blue">{experience.price.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      View
                    </button>
                    <button className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      Save
                    </button>
                    <button className="px-4 py-2 text-sm bg-midnight-blue text-white rounded-lg hover:bg-midnight-blue/90 transition-colors">
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compare Section */}
        {comparedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-midnight-blue text-white rounded-2xl p-6 text-center"
          >
            <p className="mb-4">
              {comparedItems.length} experience{comparedItems.length !== 1 ? 's' : ''} selected for comparison
            </p>
            <button className="bg-white text-midnight-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Compare Selected ({comparedItems.length})
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}