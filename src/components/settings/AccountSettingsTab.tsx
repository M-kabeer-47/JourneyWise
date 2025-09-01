"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
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
  
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(user?.image || "");
  const [isLoading, setIsLoading] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    alert("Form Data: " + JSON.stringify(formData));
    // TODO: Implement profile update API call including image upload
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
          {/* Profile Picture Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-ocean-blue/10">
                    <User className="w-8 h-8 text-midnight-blue" />
                  </div>
                )}
              </div>
              <label
                htmlFor="profile-image"
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-ocean-blue rounded-full flex items-center justify-center cursor-pointer hover:bg-ocean-blue/90 transition-colors shadow-lg"
              >
                <Camera className="w-4 h-4 text-white" />
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium text-charcoal mb-2">Profile Picture</h3>
              <p className="text-sm text-gray-600 mb-3">
                Upload a new profile picture. JPG, PNG or GIF (max 5MB).
              </p>
              <label
                htmlFor="profile-image-2"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-charcoal hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                Choose File
                <input
                  id="profile-image-2"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormInput
              id="name"
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
              
              required
            />
            
            <FormInput
              id="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              required
            />
          </div>

          <FormInput
            id="bio"
            label="Bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Tell us about yourself..."
            isTextArea={true}
            rows={4}
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-2 w-[170px] py-2 bg-midnight-blue text-white font-medium rounded-lg hover:bg-midnight-blue/90 transition-colors disabled:opacity-50 mr-3"
            >
             
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
          <div className="w-10 h-10 bg-ocean-blue/10 rounded-full flex items-center justify-center">
            <Mail className="w-5 h-5 text-midnight-blue" />
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
              className="px-2 py-2 bg-midnight-blue w-[170px] text-center  text-white font-medium rounded-lg hover:bg-midnight-blue/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Verify Email"}
            </button>
          )}
        </div>
      </motion.div>

      {/* Account Status */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-ocean-blue/10 rounded-full flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-midnight-blue" />
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
                  className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
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
                className="flex-1 px-6 py-3 border border-gray-300 text-charcoal font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAccountDeactivation}
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
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