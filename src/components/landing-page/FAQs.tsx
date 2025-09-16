"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Users, CreditCard, Shield } from "lucide-react";

const faqData = {
  travelers: [
    {
      question: "How do I book a travel experience?",
      answer: "Simply browse our verified agent listings, select your preferred experience, and complete the secure checkout process. You'll receive instant confirmation and direct contact with your chosen agent."
    },
    {
      question: "Are all travel agents verified?",
      answer: "Yes, all agents on our platform go through a rigorous verification process including license checks, background verification, and performance reviews to ensure you're working with qualified professionals."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely through our encrypted payment system."
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Cancellation and modification policies vary by agent and experience. You can view specific terms before booking, and our support team is available to help with any changes."
    },
    {
      question: "How do route suggestions work?",
      answer: "Community members create routes between two waypoints, including recommended stops, timing, and tips. You can vote, save, and customize these routes for your own trips."
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely. We use bank-level encryption and follow strict data protection standards. Your information is never shared without your consent, and you control your privacy settings."
    }
  ],
  agents: [
    {
      question: "How do I become a verified agent?",
      answer: "Submit your travel license, complete our verification process, and set up your profile. Our team typically reviews applications within 48-72 hours."
    },
    {
      question: "What commission does JourneyWise take?",
      answer: "Our commission structure is transparent and competitive, ranging from 8-15% depending on your subscription tier and booking volume. Premium agents enjoy lower commission rates."
    },
    {
      question: "How do I get paid?",
      answer: "We offer multiple payout methods including direct bank transfer, PayPal, and digital wallets. Payments are processed within 2-5 business days after the experience is completed."
    },
    {
      question: "Can I manage my calendar and availability?",
      answer: "Yes, our agent dashboard includes a comprehensive calendar system where you can set availability, manage bookings, block dates, and sync with external calendars."
    },
    {
      question: "Do you provide marketing support?",
      answer: "Premium agents get featured placement, marketing tools, analytics, and promotional opportunities. We also provide SEO optimization for your listings."
    },
    {
      question: "What support is available for agents?",
      answer: "All agents have access to our support team, knowledge base, and agent community forum. Premium agents get priority support and dedicated account management."
    }
  ],
  billing: [
    {
      question: "Are there any hidden fees?",
      answer: "No hidden fees. All costs are clearly displayed before booking. The only fees are the experience price and clearly marked service fees."
    },
    {
      question: "How do refunds work?",
      answer: "Refund policies depend on the specific experience and agent terms. Most bookings offer full refunds within 24-48 hours, with varying terms thereafter."
    },
    {
      question: "Do you offer travel insurance?",
      answer: "We partner with leading travel insurance providers to offer optional coverage. You can add insurance during the booking process or purchase separately."
    },
    {
      question: "What currencies do you support?",
      answer: "We support 50+ currencies with real-time conversion rates. You can view prices and pay in your preferred currency."
    },
    {
      question: "Can I get receipts for my bookings?",
      answer: "Yes, all bookings include detailed receipts sent via email. You can also download receipts from your account dashboard at any time."
    },
    {
      question: "Do you offer group booking discounts?",
      answer: "Many agents offer group discounts for 6+ travelers. Contact agents directly or reach out to our support team for group booking assistance."
    }
  ]
};

const categories = [
  { key: 'travelers', label: 'For Travelers', icon: Users },
  { key: 'agents', label: 'For Agents', icon: Shield },
  { key: 'billing', label: 'Billing & Payments', icon: CreditCard }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<'travelers' | 'agents' | 'billing'>('travelers');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (index: number) => {
    const key = `${activeCategory}-${index}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const currentFAQs = faqData[activeCategory];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-ocean-blue/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-midnight-blue mb-4 font-raleway">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-charcoal max-w-2xl mx-auto font-geist">
            Get answers to common questions about using JourneyWise
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-200 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => {
                  setActiveCategory(category.key as any);
                  setOpenItems({}); // Reset open items when switching categories
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeCategory === category.key
                    ? 'bg-midnight-blue text-white shadow-sm'
                    : 'text-charcoal hover:bg-gray-50'
                }`}
              >
                <category.icon size={18} />
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          {currentFAQs.map((faq, index) => {
            const isOpen = openItems[`${activeCategory}-${index}`];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-midnight-blue font-raleway pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-ocean-blue" />
                    ) : (
                      <Plus className="w-5 h-5 text-ocean-blue" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-gray-700 font-geist leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-midnight-blue mb-4 font-raleway">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6 font-geist">
              Our support team is here to help you get the most out of JourneyWise
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-midnight-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-midnight-blue/90 transition-colors">
                Contact Support
              </button>
              <button className="border-2 border-midnight-blue text-midnight-blue px-6 py-3 rounded-lg font-semibold hover:bg-midnight-blue/5 transition-colors">
                Join Community Forum
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}