"use client";
import React from "react";
import { motion } from "framer-motion";
import { Shield, Users, BarChart3, ArrowRight } from "lucide-react";

const valueProps = [
  {
    icon: Shield,
    title: "Professional Experiences",
    description: "Agent-verified listings with secure payments and clear itineraries for worry-free travel.",
    bullets: ["Agent-verified listings", "Secure payments", "Clear itineraries"],
    cta: "Browse experiences",
    href: "/experiences"
  },
  {
    icon: Users,
    title: "Community Routes & Guides",
    description: "Waypoint route planner with community voting, saving and sharing capabilities.",
    bullets: ["Waypoint route planner", "Community voting", "Save & share"],
    cta: "Explore routes",
    href: "/routes"
  },
  {
    icon: BarChart3,
    title: "Manage & Grow",
    description: "Complete agent business dashboard with analytics and subscription tools.",
    bullets: ["Agent business dashboard", "Analytics", "Subscription tools"],
    cta: "For agents",
    href: "/agents"
  }
];

export default function ValueProps() {
  return (
    <section className="py-20 ">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-midnight-blue mb-4 font-raleway">
            Why JourneyWise?
          </h2>
          <p className="text-xl text-charcoal max-w-3xl mx-auto font-geist">
            Everything you need for smarter travel planning in one platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 bg-ocean-blue/10 rounded-2xl flex items-center justify-center mb-6">
                <prop.icon className="w-8 h-8 text-midnight-blue" />
              </div>
              
              <h3 className="text-2xl font-bold text-midnight-blue mb-4 font-raleway">
                {prop.title}
              </h3>
              
              <p className="text-charcoal mb-6 font-geist leading-relaxed">
                {prop.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {prop.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-charcoal">
                    <div className="w-2 h-2 bg-ocean-blue rounded-full" />
                    {bullet}
                  </li>
                ))}
              </ul>
              
              <a
                href={prop.href}
                className="inline-flex items-center gap-2 text-ocean-blue font-semibold hover:gap-3 transition-all duration-200"
              >
                {prop.cta}
                <ArrowRight size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}