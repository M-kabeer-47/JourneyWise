import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Settings,
  Share2,
  Camera,
  Check,
  User as UserIcon,
} from "lucide-react";
import { User } from "@/lib/types/user";
interface ProfileHeaderProps {
 user: User;
  isOwnProfile?: boolean;
  userType?: "user" | "agent";
}

export default function ProfileHeader({
  user,
  isOwnProfile = true,
  userType = "user",
}: ProfileHeaderProps) {
  const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Only agents get banner images
  if (userType === "agent") {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Agent Banner */}
        <div className="relative h-32 sm:h-40 md:h-48 bg-midnight-blue overflow-hidden">
          {user.bannerImage ? (
            <img
              src={user.bannerImage}
              alt="Agency banner"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-midnight-blue to-ocean-blue flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 md:mb-2">
                  Creating Amazing Experiences
                </h3>
                <p className="text-sm md:text-base text-blue-100">
                  Crafting unforgettable journeys
                </p>
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-black/20" />

          
        </div>

        {/* Agent Profile Info */}
        <div className="relative px-4 sm:px-6 md:px-8 pb-6 md:pb-8">
          <div className="relative -mt-10 sm:-mt-12 md:-mt-16 mb-4 md:mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 md:border-4 border-white shadow-lg bg-white">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-ocean-blue/10 flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl font-bold">
                  <UserIcon width={50} height={50} className="text-midnight-blue" />
                </div>
              )}
            </div>
           
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                {/* Name with verification badge - Always together */}
                <div className="flex items-center gap-3 mb-3 md:mb-2">
                  <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold text-midnight-blue">
                    {user.name}
                  </h1>
                  {user.emailVerified && (
                    <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full">
                      <Check
                        className="w-3 h-3 md:w-4 md:h-4 text-white"
                        strokeWidth={5}
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-charcoal mb-3 md:mb-4 text-sm md:text-base">
                  {user.country && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-ocean-blue flex-shrink-0" />
                      <span>{user.country}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-ocean-blue flex-shrink-0" />
                    <span>Since {joinDate}</span>
                  </div>
                </div>
                <p className="text-charcoal text-sm md:text-base max-w-2xl">
                  Professional travel agent creating customized experiences for
                  adventurous travelers.
                </p>
              </div>

              {/* Desktop Action Buttons */}
              <div className="hidden lg:flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 lg:flex-shrink-0">
                {isOwnProfile ? (
                  <>
                    <button className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-charcoal hover:border-ocean-blue hover:text-ocean-blue transition-all text-sm">
                      <Settings className="w-4 h-4" />
                      Edit Profile
                    </button>
                    <button className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-midnight-blue text-white rounded-lg hover:bg-midnight-blue transition-all text-sm">
                      <Share2 className="w-4 h-4" />
                      Share Profile
                    </button>
                  </>
                ) : null}
              </div>
            </div>

            {/* Mobile Action Buttons - Always at bottom */}
            <div className="flex lg:hidden flex-col sm:flex-row items-stretch gap-3 pt-4 border-t border-gray-100">
              {isOwnProfile ? (
                <>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-charcoal hover:border-ocean-blue hover:text-ocean-blue transition-all text-sm">
                    <Settings className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-midnight-blue text-white rounded-lg hover:bg-midnight-blue transition-all text-sm">
                    <Share2 className="w-4 h-4" />
                    Share Profile
                  </button>
                </>
              ) : (
                <button className="flex items-center justify-center gap-2 px-6 py-2 bg-midnight-blue text-white rounded-lg hover:bg-midnight-blue transition-all text-sm">
                  Follow
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Clean User Profile (No Banner)
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 md:gap-8">
          {/* User Avatar */}
          <div className="relative flex-shrink-0 self-center sm:self-start">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-white">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-ocean-blue/10 flex items-center justify-center text-midnight-blue text-2xl sm:text-3xl md:text-4xl font-bold">
                  <UserIcon width={50} height={50} className="text-midnight-blue" />
                </div>
              )}
            </div>
           
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-3 md:mb-4">
              <div>
                {/* Name with verification badge - Always together */}
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-2  relative left-[10px] sm:left-0">
                  <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold text-midnight-blue">
                    {user.name}
                  </h1>
                  {user.emailVerified && (
                    <div
                      className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full"
                      title="Verified Account"
                    >
                      <Check
                        className="w-3 h-3 md:w-3 md:h-3 text-white"
                        strokeWidth={5}
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-3 sm:gap-6 text-charcoal text-sm md:text-base">
                  {user.country && (
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <MapPin className="w-4 h-4 text-ocean-blue flex-shrink-0" />
                      <span>{user.country}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Calendar className="w-4 h-4 text-ocean-blue flex-shrink-0" />
                    <span>Joined {joinDate}</span>
                  </div>
                </div>
              </div>

              {/* Desktop Action Buttons */}
              <div className="hidden lg:flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 lg:flex-shrink-0">
                {isOwnProfile ? (
                  <>
                    <button className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 border  rounded-lg  border-ocean-blue text-ocean-blue transition-all text-sm">
                      <Settings className="w-4 h-4" />
                      Edit Profile
                    </button>
                    <button className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-midnight-blue text-white rounded-lg hover:bg-midnight-blue transition-all text-sm">
                      <Share2 className="w-4 h-4" />
                      Share Profile
                    </button>
                  </>
                ) : (
                  <button className="flex items-center justify-center gap-2 px-4 md:px-6 py-2 bg-midnight-blue text-white rounded-lg hover:bg-midnight-blue transition-all text-sm">
                    Follow
                  </button>
                )}
              </div>
            </div>

            <p className="text-charcoal text-xs md:text-sm leading-relaxed max-w-2xl">
              Travel enthusiast exploring the world one adventure at a time.
              Sharing experiences and creating memories.
            </p>
          </div>
        </div>

        {/* Mobile Action Buttons - Always at bottom */}
        <div className="flex lg:hidden flex-row sm:flex-row  gap-3 pt-4 border-t border-gray-100">
          {isOwnProfile ? (
            <>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-charcoal hover:border-ocean-blue hover:text-ocean-blue transition-all sm:text-sm text-xs w-full">
                <Settings className="w-4 h-4" />
                Edit Profile
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-midnight-blue text-white rounded-lg hover:bg-midnight-blue transition-all sm:text-sm text-xs w-full">
                <Share2 className="w-4 h-4" />
                Share Profile
              </button>
            </>
          ) : (
            <button className="flex items-center justify-center gap-2 px-6 py-2 bg-midnight-blue text-white rounded-lg hover:bg-midnight-blue transition-all text-sm">
              Follow
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
