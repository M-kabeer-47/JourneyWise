"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import Spinner from "@/components/ui/Spinner";
import { signInSchema } from "./schema";
import { authClient } from "@/lib/auth/authClient";
import Toast from "../../../../components/auth/Custom-Toast";
import axios from "axios";
import { signIn } from "@/lib/auth/google";
import Input from "@/components/ui/Input";


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
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {/* Logo and Header */}
        <div className="text-center space-y-6">
          <h1 className="font-[raleway] text-5xl max-[400px]:text-4xl font-bold text-[#003366]">
            JourneyWise
          </h1>
          <h2 className="text-xl text-[#4F4F4F]  font-open-sans">
            Welcome back
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {/* Email Field */}
          <div>
            <Input
              id="email"
              type="email"
              label="Email Address"
              autoComplete="email"
              {...register("email", {})}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className=" relative top-[-15px] text-xs text-red-500 italic">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="relative">
              <Input
                label="Password"
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                {...register("password", {})}
                placeholder="••••••••"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 "
              ></button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 font-open-sans italic relative top-[-15px]">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              tabIndex={-1}
              className="text-sm text-[#0077B6] hover:text-[#006094] transition-colors duration- font-open-sans"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Sign In Button */}
          <Button
            // type="submit"
            isLoading={isLoading}
            className="w-full font-open-sans "
          >
            {isLoading ? <Spinner size="small" /> : "Sign in"}
          </Button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-[#4F4F4F] font-open-sans]">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Sign In */}
          <Button
            type="button"
            variant="google"
            isLoading={isGoogleLoading}
            className="w-full font-open-sans"
            onClick={() => {
              setIsGoogleLoading(true);
              signIn();
            }}
          >
            {" "}
            {!isGoogleLoading && (
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            {isGoogleLoading ? <Spinner size="small" /> : "Sign in with Google"}
          </Button>
          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <span className="text-[#4F4F4F] text-sm font-open-sans">
              Don't have an account?{" "}
            </span>
            <Link
              href="/sign-up"
              className="text-[#0077B6] text-sm hover:text-[#006094] transition-colors duration-300 font-open-sans"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}












































