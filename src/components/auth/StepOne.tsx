import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepOneSchema } from "../../lib/schemas/user";
import { SignupData } from "@/app/(pages)/(auth)/sign-up/types";
import FormInput from "@/components/ui/FormInput";
import Spinner from "../ui/Spinner";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

interface StepOneProps {
  onSubmit: (data: any) => void;
  initialData: Partial<any>;
  emailError: boolean;
  firstStepLoading: boolean;
  emailErrorMesssage: string;
  setEmailError: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<SignupData>>>;
}

const StepOne: React.FC<StepOneProps> = ({
  onSubmit,
  initialData,
  emailError,
  setEmailError,
  firstStepLoading,
  emailErrorMesssage,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm({
    resolver: zodResolver(stepOneSchema),
    mode: "onSubmit",
    defaultValues: initialData,
  });

  useEffect(() => {
    if (emailError) {
      setError("email", {
        type: "manual",
        message: emailErrorMesssage,
      });
      setEmailError(false);
    }
  }, [emailError, emailErrorMesssage, setEmailError, setError]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="space-y-6 w-full">
        <div className="space-y-6">
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormInput
                label="Full Name"
                icon="user"
                placeholder="Enter your full name"
                error={errors.name?.message as string}
                required
                {...field}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormInput
                label="Email Address"
                type="email"
                icon="mail"
                placeholder="you@example.com"
                error={errors.email?.message as string}
                required
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormInput
                label="Password"
                type="password"
                icon="lock"
                placeholder="Create a strong password"
                error={errors.password?.message as string}
                required
                {...field}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormInput
                label="Confirm Password"
                type="password"
                icon="lock"
                placeholder="Confirm your password"
                error={errors.confirmPassword?.message as string}
                required
                {...field}
              />
            )}
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={firstStepLoading}
          className="group w-full bg-midnight-blue text-white py-3 px-6 rounded-lg relative top-[30px]
            font-medium shadow-md hover:shadow-lg transition-all duration-300
            disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {firstStepLoading ? (
            <div className="flex gap-2 items-center">
              <span>Please wait...</span>
              <Loader2 className="animate-spin w-4 h-4" />
            </div>
          ) : (
            <>
              <span className="mr-2">Continue</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default StepOne;
