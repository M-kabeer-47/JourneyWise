"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  MessageSquare,
  Shield,
  CreditCard,
  Headphones,
  TrendingUp,
  Users,
  DollarSign,
  Star,
} from "lucide-react";

const dashboardFeatures = [
  {
    icon: Shield,
    title: "Verified Profiles",
    description: "Get verified status to build trust with travelers",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Track performance, bookings, and revenue trends",
  },
  {
    icon: Calendar,
    title: "Booking Management",
    description: "Manage availability, reservations, and scheduling",
  },
  {
    icon: MessageSquare,
    title: "Direct Communication",
    description: "Connect directly with travelers and build relationships",
  },
  {
    icon: CreditCard,
    title: "Secure Payouts",
    description: "Reliable payment processing with multiple payout options",
  },
  {
    icon: Headphones,
    title: "Agent Support",
    description: "Dedicated support team to help grow your business",
  },
];

const metrics = [
  { label: "Monthly Revenue", value: "$24,500", change: "+12%" },
  { label: "Total Bookings", value: "89", change: "+8%" },
  { label: "Average Rating", value: "4.9", change: "+0.2" },
  { label: "Response Rate", value: "98%", change: "+2%" },
];

export default function AgentDashboard() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Mock Dashboard */}
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Dashboard Header */}
                <div className="bg-midnight-blue text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold font-raleway">
                        Agent Dashboard
                      </h3>
                      <p className="text-ocean-blue/80">Welcome back, Sarah</p>
                    </div>
                    <div className="w-12 h-12 bg-ocean-blue/20 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="p-6 grid grid-cols-2 gap-4">
                  {metrics.map((metric, index) => (
                    <div
                      key={metric.label}
                      className="bg-gray-50 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          {metric.label}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            metric.change.startsWith("+")
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {metric.change}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-midnight-blue">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart Area */}
                <div className="p-6 pt-0">
                  <div className="bg-gradient-to-r from-ocean-blue/10 to-midnight-blue/10 rounded-xl p-4 h-32 flex items-end justify-between">
                    {[40, 65, 45, 80, 55, 90, 70].map((height, index) => (
                      <div
                        key={index}
                        className="bg-ocean-blue rounded-t w-4 opacity-80"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Revenue Trend (Last 7 days)
                  </p>
                </div>

                {/* Recent Messages */}
                <div className="p-6 pt-0 border-t border-gray-100">
                  <h4 className="font-semibold text-charcoal mb-3">
                    Recent Messages
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        name: "John D.",
                        message: "Question about the Alps tour...",
                        time: "2m",
                      },
                      {
                        name: "Maria S.",
                        message: "Booking confirmation needed",
                        time: "1h",
                      },
                    ].map((msg, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-ocean-blue/10 rounded-full flex items-center justify-center text-sm font-medium">
                          {msg.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-charcoal">
                              {msg.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {msg.time}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 truncate">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg"
              >
                <TrendingUp size={20} />
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-midnight-blue mb-4 font-raleway">
                Professional Tools for Travel Agents
              </h2>
              <p className="text-xl text-charcoal font-geist">
                Everything you need to manage and grow your travel business in
                one powerful dashboard.
              </p>
            </div>

            {/* Features Grid */}
            <div className="sm:grid sm:grid-cols-2 flex flex-col-reverse  gap-6 mb-8">
              {dashboardFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-ocean-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-ocean-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust Indicators */}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-midnight-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-midnight-blue/90 transition-colors flex items-center justify-center gap-2">
                <Star size={20} />
                Become an Agent
              </button>
              <button className="border-2 border-midnight-blue text-midnight-blue px-8 py-3 rounded-lg font-semibold hover:bg-midnight-blue/5 transition-colors">
                See Pricing for Agents
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
