"use client";

import { motion } from "framer-motion";
import { User, Mail } from "lucide-react";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import PhoneInput from "@/components/ui/PhoneInput";

interface UserDetailsSectionProps {
  register: any;
  control: any;
  errors: any;
}

export const UserDetailsSection = ({
  register,
  control,
  errors,
}: UserDetailsSectionProps) => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-ocean-blue/20 flex items-center justify-center text-white">
          <User size={14} className="text-midnight-blue sm:h-4 sm:w-4" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-midnight-blue">
          Your Details
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full Name
          </Label>
          <div className="mt-1 relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              id="name"
              {...register("name")}
              className="pl-10 w-full h-10 rounded-lg border-gray-200 text-charcoal text-sm
                       transition-all duration-200 outline-none border border-gray-200 focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
              placeholder="John Doe"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </Label>
          <div className="mt-1 relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              id="email"
              type="email"
              {...register("email")}
              className="pl-10 w-full h-10 rounded-lg border-gray-200 text-charcoal text-sm
                       transition-all duration-200 outline-none border border-gray-200 focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
              placeholder="your@email.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="mt-1 relative">
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <PhoneInput
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.phone?.message as string}
                />
              )}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
