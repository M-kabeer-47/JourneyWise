"use client";
import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Smartphone } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface SecurityTabProps {
  user: User | null;
}

export default function SecurityTab({ user }: SecurityTabProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
          <Shield className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-midnight-blue font-raleway">
            Security Settings
          </h2>
          <p className="text-sm text-gray-600">
            Manage your account security and privacy settings
          </p>
        </div>
      </div>

      <div className="text-center py-12">
        <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Security Settings
        </h3>
        <p className="text-gray-500">
          Security features coming soon...
        </p>
      </div>
    </motion.div>
  );
}
