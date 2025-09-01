"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Save,
  Trash2,
  Camera,
  Upload
} from "lucide-react";
import FormInput from "@/components/ui/FormInput";
import Image from "next/image";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  bio?: string;
  isEmailVerified?: boolean;
  isActive?: boolean;
}

interface AccountSettingsTabProps {
  user: User | null;
}

export default function AccountSettingsTab({ user }: AccountSettingsTabProps) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement profile update API call
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match");
      return;
    }
    setIsLoading(true);
    // TODO: Implement password change API call
    setTimeout(() => {
      setIsLoading(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }, 1000);
  };

  const handleEmailVerification = async () => {
    setIsLoading(true);
    // TODO: Implement email verification API call
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleAccountDeactivation = async () => {
    setIsLoading(true);
    // TODO: Implement account deactivation API call
    setTimeout(() => {
      setIsLoading(false);
      setShowDeactivateModal(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Profile Information */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-ocean-blue/10 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-ocean-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-midnight-blue font-raleway">
              Profile Information
            </h2>
            <p className="text-sm text-gray-600">
              Update your personal details and profile information
            </p>
          </div>
        </div>

        <form onSubmit={handleProfileUpdate} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-ocean-blue transition-colors"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-ocean-blue transition-colors"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-ocean-blue transition-colors resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-ocean-blue text-white font-medium rounded-lg hover:bg-ocean-blue/90 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Email Verification */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Mail className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-midnight-blue font-raleway">
              Email Verification
            </h2>
            <p className="text-sm text-gray-600">
              Verify your email address to secure your account
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            {user?.isEmailVerified ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-orange-500" />
            )}
            <div>
              <p className="font-medium text-charcoal">
                {user?.isEmailVerified ? "Email Verified" : "Email Not Verified"}
              </p>
              <p className="text-sm text-gray-600">
                {user?.email}
              </p>
            </div>
          </div>
          
          {!user?.isEmailVerified && (
            <button
              onClick={handleEmailVerification}
              disabled={isLoading}
              className="px-4 py-2 bg-ocean-blue text-white font-medium rounded-lg hover:bg-ocean-blue/90 transition-colors disabled:opacity-50 text-sm"
            >
              {isLoading ? "Sending..." : "Verify Email"}
            </button>
          )}
        </div>
      </motion.div>

      {/* Password Change */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-midnight-blue font-raleway">
              Change Password
            </h2>
            <p className="text-sm text-gray-600">
              Update your password to keep your account secure
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-ocean-blue transition-colors"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-ocean-blue transition-colors"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-ocean-blue transition-colors"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-ocean-blue text-white font-medium rounded-lg hover:bg-ocean-blue/90 transition-colors disabled:opacity-50"
            >
              <Shield className="w-4 h-4" />
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Account Status */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-midnight-blue font-raleway">
              Account Status
            </h2>
            <p className="text-sm text-gray-600">
              Manage your account activation and deactivation
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              {user?.isActive ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
              <div>
                <p className="font-medium text-charcoal">
                  Account Status: {user?.isActive ? "Active" : "Deactivated"}
                </p>
                <p className="text-sm text-gray-600">
                  {user?.isActive 
                    ? "Your account is active and fully functional" 
                    : "Your account is currently deactivated"
                  }
                </p>
              </div>
            </div>
          </div>

          {user?.isActive && (
            <div className="border-t pt-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-medium text-red-800 mb-2">Deactivate Account</h3>
                <p className="text-sm text-red-700 mb-4">
                  Deactivating your account will hide your profile and disable most features. 
                  You can reactivate it anytime by logging in.
                </p>
                <button
                  onClick={() => setShowDeactivateModal(true)}
                  className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Deactivate Account
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Deactivation Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-midnight-blue mb-2">
                Deactivate Account
              </h3>
              <p className="text-sm text-gray-600">
                Are you sure you want to deactivate your account? This action can be reversed by logging in again.
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeactivateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-charcoal font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAccountDeactivation}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Deactivating..." : "Deactivate"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
