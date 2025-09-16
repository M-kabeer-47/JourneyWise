"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Users, 
  MapPin, 
  Star, 
  CreditCard, 
  Award,
  Zap,
  Globe
} from "lucide-react";
import Image from "next/image";

const metrics = [
  {
    icon: MapPin,
    value: "10k+",
    label: "Routes Created",
    description: "Community-verified travel routes"
  },
  {
    icon: Shield,
    value: "5k+",
    label: "Verified Agents",
    description: "Licensed travel professionals"
  },
  {
    icon: Users,
    value: "2M+",
    label: "Nights Booked",
    description: "Successful travel experiences"
  },
  {
    icon: Star,
    value: "4.8",
    label: "Average Rating",
    description: "Customer satisfaction score"
  }
];

const trustLogos = [
  {
    name: "Stripe",
    logo: "/images/trust/stripe.png",
    category: "Payment Security"
  },
  {
    name: "IATA",
    logo: "/images/trust/iata.png",
    category: "Travel Association"
  },
  {
    name: "SSL Secured",
    logo: "/images/trust/ssl.png",
    category: "Security"
  },
  {
    name: "Travel Safe",
    logo: "/images/trust/travel-safe.png",
    category: "Safety Certified"
  },
  {
    name: "Forbes",
    logo: "/images/trust/forbes.png",
    category: "Press Mention"
  },
  {
    name: "TechCrunch",
    logo: "/images/trust/techcrunch.png",
    category: "Press Mention"
  }
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Solo Traveler",
    avatar: "/images/testimonials/sarah.jpg",
    rating: 5,
    text: "JourneyWise helped me discover the most amazing hidden routes in Europe. The community recommendations were spot-on, and booking with verified agents gave me peace of mind.",
    location: "New York, USA"
  },
  {
    id: 2,
    name: "Marco Alberti",
    role: "Travel Agent",
    avatar: "/images/testimonials/marco.jpg",
    rating: 5,
    text: "As a travel agent, this platform has transformed my business. The dashboard is intuitive, and I've connected with travelers I never would have reached otherwise.",
    location: "Rome, Italy"
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Adventure Enthusiast",
    avatar: "/images/testimonials/emily.jpg",
    rating: 5,
    text: "The route suggestions saved my trip! I found incredible local stops I never would have discovered. The community here really knows their stuff.",
    location: "San Francisco, USA"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Family Traveler",
    avatar: "/images/testimonials/david.jpg",
    rating: 5,
    text: "Booking family adventures through JourneyWise has been seamless. The agents are professional, and the platform makes everything so easy to manage.",
    location: "London, UK"
  },
  {
    id: 5,
    name: "Ana Rodriguez",
    role: "Travel Blogger",
    avatar: "/images/testimonials/ana.jpg",
    rating: 5,
    text: "I love sharing my travel stories here. The community is engaged, and the platform makes it easy to connect with fellow travel enthusiasts.",
    location: "Barcelona, Spain"
  }
];

export default function TrustMetrics() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-midnight-blue mb-4 font-raleway">
            Trusted by Travelers Worldwide
          </h2>
          <p className="text-xl text-charcoal max-w-3xl mx-auto font-geist mb-12">
            Join thousands of travelers and agents who trust JourneyWise for their adventures
          </p>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-ocean-blue/10 to-midnight-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <metric.icon className="w-8 h-8 text-ocean-blue" />
                </div>
                <div className="text-4xl font-bold text-midnight-blue mb-2 font-raleway">
                  {metric.value}
                </div>
                <div className="text-lg font-semibold text-charcoal mb-1">
                  {metric.label}
                </div>
                <div className="text-sm text-gray-600">
                  {metric.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-charcoal mb-2">
              Trusted Partners & Security
            </h3>
            <p className="text-gray-600">
              We work with industry leaders to ensure your safety and security
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60">
            {trustLogos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.6, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ opacity: 1 }}
                className="text-center grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div className="h-12 flex items-center justify-center mb-2">
                  <Image
                    src={logo.logo}
                    alt={logo.name}
                    width={120}
                    height={48}
                    className="max-h-12 w-auto"
                  />
                </div>
                <div className="text-xs text-gray-500">{logo.category}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-midnight-blue mb-4 font-raleway">
            What Our Community Says
          </h3>
          <p className="text-lg text-charcoal max-w-2xl mx-auto font-geist">
            Real stories from travelers and agents using JourneyWise
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex gap-6 w-[200%]"
          >
            {/* First set */}
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`first-${testimonial.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-ocean-blue/5 rounded-2xl p-6 shadow-sm border border-gray-100 min-w-[350px] flex-shrink-0"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-ocean-blue/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-ocean-blue">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 font-geist leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Globe size={14} />
                  {testimonial.location}
                </div>
              </motion.div>
            ))}

            {/* Second set (duplicate for seamless loop) */}
            {testimonials.map((testimonial, index) => (
              <div
                key={`second-${testimonial.id}`}
                className="bg-gradient-to-br from-gray-50 to-ocean-blue/5 rounded-2xl p-6 shadow-sm border border-gray-100 min-w-[350px] flex-shrink-0"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-ocean-blue/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-ocean-blue">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 font-geist leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Globe size={14} />
                  {testimonial.location}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}