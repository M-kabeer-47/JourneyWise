"use client";
import React from "react";
import { motion } from "framer-motion";
import { Settings, Globe, Palette } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface PreferencesTabProps {
  user: User | null;
}

export default function PreferencesTab({ user }: PreferencesTabProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <Settings className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-midnight-blue font-raleway">
            Preferences
          </h2>
          <p className="text-sm text-gray-600">
            Customize your app experience and preferences
          </p>
        </div>
      </div>

      <div className="text-center py-12">
        <Palette className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Preferences Settings
        </h3>
        <p className="text-gray-500">
          Preference options coming soon...
        </p>
      </div>
    </motion.div>
  );
}
