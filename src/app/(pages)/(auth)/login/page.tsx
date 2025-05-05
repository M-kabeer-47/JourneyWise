"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
import { signInSchema } from "./schema";
import { authClient } from "@/lib/auth/authClient";
import Toast from "@/components/auth/Custom-Toast";
import axios from "axios";
import { signIn } from "@/lib/auth/google";
import { Mail, Lock, User } from "lucide-react";

export type SignInForm = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInForm) => {
    setIsLoading(true);
    // Simulate API call
    let checkEmail = await axios
      .get(`/api/app_auth/checkEmail`, {
        params: {
          email: data.email.toLowerCase(),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return {
            data: true,
            google: false,
          };
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          return {
            data: false,
            google: true,
          };
        } else if (
          error.response.status === 400 &&
          error.response.message === "Email doesn't exist"
        ) {
          return {
            data: false,
            google: false,
          };
        }
      });
    if (checkEmail?.google === true) {
      setError("email", {
        type: "manual",
        message: "Google account already exists",
      });
      setIsLoading(false);
      return;
    }

    const { data: response, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      //@ts-ignore
      setError("password", {
        type: "manual",
        message: "Invalid password",
      });
      setIsLoading(false);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    setIsLoading(false);
  };

  return (
    <div className="max-w-[70%] mx-auto py-4">

    
    <div className="h-screen flex flex-col md:flex-row">

      {/* Left side - Hero Image Section */}
      <div className="hidden md:flex md:w-1/2 relative bg-midnight-blue">
        <div className="absolute inset-0">
          <Image
            src="/hero.avif"
            alt="Travel inspiration"
            layout="fill"
            objectFit="cover"
            className="opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-midnight-blue/80 via-ocean-blue/50 to-midnight-blue/70"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center space-y-6 max-w-md"
          >
            <h1 className="text-4xl md:text-5xl font-bold">Welcome Back</h1>
            <p className="text-lg text-white/80">
              Sign in to continue your journey and explore amazing destinations
              around the world.
            </p>
            <div className="flex -space-x-2 justify-center mt-8">
              <div className="w-10 h-10 rounded-full bg-[#f3d19e] border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-[#94c4a1] border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-[#e38b75] border-2 border-white"></div>
            </div>
            <p className="text-sm text-white/70">
              Join thousands of travelers on their adventures
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col items-center justify-center p-8 bg-[#f8f9fa]"
      >
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Header */}
          <div className="text-center space-y-3">
            <h1 className="font-[raleway] text-4xl font-bold text-midnight-blue">
              JourneyWise
            </h1>
            <p className="text-lg text-gray-600">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 block mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  className="pl-10 w-full h-11 rounded-lg border-gray-200 text-charcoal text-sm
                           transition-all duration-200 outline-none border border-gray-200 focus:outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-ocean-blue hover:text-ocean-blue/80 transition-colors duration-300"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  {...register("password")}
                  className="pl-10 w-full h-11 rounded-lg border-gray-200 text-charcoal text-sm
                           transition-all duration-200 outline-none border border-gray-200 focus:outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[14px] text-gray-500 hover:text-gray-700 text-xs"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-midnight-blue to-ocean-blue text-white rounded-lg shadow-md hover:shadow-xl hover:scale-[1.01] hover:from-ocean-blue hover:to-midnight-blue transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? <Spinner size="small" /> : "Sign in"}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#f8f9fa] text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={() => {
                setIsGoogleLoading(true);
                signIn();
              }}
              disabled={isGoogleLoading}
              className="w-full h-11 flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 font-medium shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ocean-blue/20"
            >
              {!isGoogleLoading ? (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </>
              ) : (
                <Spinner size="small" />
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <span className="text-gray-600 text-sm">
              Don't have an account?{" "}
            </span>
            <Link
              href="/sign-up"
              className="text-ocean-blue font-medium hover:text-ocean-blue/80 transition-colors duration-300"
            >
              Sign up
            </Link>
          </div>
        </div>
      </motion.div>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
    </div>
  );
}
