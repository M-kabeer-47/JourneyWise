"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Key } from "lucide-react";
import FormInput from "@/components/ui/FormInput";
import MyButton from "../ui/MyButton";
import { authClient } from "@/lib/auth/authClient";
import PasswordConfirmModal from "@/components/ui/PasswordConfirmModal";
import useEnable2FA from "@/hooks/user/useEnable2FA";


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
  
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  const {enable2FA, isLoading,error,setError,show2FAModal,setShow2FAModal} = useEnable2FA();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match");
      return;
    }
    setIsPasswordChanging(true);
    // TODO: Implement password change API call
    setTimeout(() => {
      setIsPasswordChanging(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }, 1000);
  };

 

  const handlePasswordConfirm = async (password: string) => {
    
    

     
  };

  return (
    <>
    <div className="space-y-8">
      {/* Change Password */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-5 sm:p-8 shadow-sm border border-gray-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="sm:w-10 sm:h-10 w-9 h-9 bg-ocean-blue/10 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-midnight-blue" />
          </div>
          <div>
            <h2 className="sm:text-xl text-lg font-bold text-midnight-blue font-raleway">
              Change Password
            </h2>
            <p className="sm:text-sm text-xs text-charcoal font-geist">
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
              className="flex font-geist items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-midnight-blue to-ocean-blue text-white font-medium flex justify-center items-center rounded-lg hover:bg-ocean-blue/90 transition-colors disabled:opacity-50 w-full sm:w-[210px]"
            >
              
              {isPasswordChanging ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Two-Factor Authentication */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-5 sm:p-8 shadow-sm border border-gray-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="sm:w-10 sm:h-10 w-9 h-9 bg-ocean-blue/10 rounded-full flex items-center justify-center">
            <Key className="w-5 h-5 text-midnight-blue" />
          </div>
          <div>
            <h2 className="sm:text-xl text-lg font-bold text-midnight-blue font-raleway">
              Two-Factor Authentication
            </h2>
            <p className="sm:text-sm text-xs text-charcoal font-geist ">
              Add an extra layer of security to your account
            </p>
          </div>
        </div>

        <div className="rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <p className="sm:text-sm text-[14px] text-charcoal mb-4 text-left  sm:mb-0 font-geist">
            Two-factor authentication is currently disabled. Enable it to add an
            extra layer of security to your account.
          </p>
          <MyButton
            text="Enable 2FA"
            className="font-geist relative sm:top-[-5px] sm:w-[210px]"
            onClick={()=>setShow2FAModal(true)}
          />
        </div>
      </motion.div>

     
    </div>
     <PasswordConfirmModal
        isOpen={show2FAModal}
        onConfirm={enable2FA}
        error={error}
        onClose={() => setShow2FAModal(false)}
        title="Enable Two-Factor Authentication"
        description="Please enter your password to confirm and enable two-factor authentication for your account."
        loading={isLoading}
        loadingText="Enabling 2FA..."
        setError={setError}
      />
      </>
  );
}
