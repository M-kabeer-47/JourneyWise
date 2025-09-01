"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Key } from "lucide-react";
import FormInput from "@/components/ui/FormInput";

export default function SecurityTab() {
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
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Change Password */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-ocean-blue/10 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-midnight-blue" />
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
          <FormInput
            id="currentPassword"
            label="Current Password"
            type={showPasswords.current ? "text" : "password"}
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                currentPassword: e.target.value,
              })
            }
            placeholder="Enter current password"
            required
            icon={"lock"}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormInput
              id="newPassword"
              label="New Password"
              type={showPasswords.new ? "text" : "password"}
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
              placeholder="Enter new password"
              required
              icon={"lock"}
            />

            <FormInput
              id="confirmPassword"
              label="Confirm New Password"
              type={showPasswords.confirm ? "text" : "password"}
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value,
                })
              }
              placeholder="Confirm new password"
              required
              icon={"lock"}
            />
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

      {/* Two-Factor Authentication */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-ocean-blue/10 rounded-full flex items-center justify-center">
            <Key className="w-5 h-5 text-midnight-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-midnight-blue font-raleway">
              Two-Factor Authentication
            </h2>
            <p className="text-sm text-gray-600">
              Add an extra layer of security to your account
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-4">
            Two-factor authentication is currently disabled. Enable it to add an
            extra layer of security to your account.
          </p>
          <button className="px-6 py-3 bg-ocean-blue text-white font-medium rounded-lg hover:bg-ocean-blue/90 transition-colors">
            Enable 2FA
          </button>
        </div>
      </motion.div>
    </div>
  );
}
