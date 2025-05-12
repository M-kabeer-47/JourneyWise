import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepOneSchema } from '../../lib/schemas/user';
import { SignupData } from '@/app/(pages)/(auth)/sign-up/types';
import FormInput from '@/components/ui/FormInput';
import Spinner from '../ui/Spinner';
import { motion } from 'framer-motion';
import {usePathname} from 'next/navigation';
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
  emailErrorMesssage 
}) => {

  const pathname = usePathname();
  const { control, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(stepOneSchema),
    mode: 'onSubmit',
    defaultValues: initialData
  });
 
  useEffect(() => {
    if(emailError) {
      setError('email', {
        type: 'manual',
        message: emailErrorMesssage
      });
      setEmailError(false);
    }
  }, [emailError, emailErrorMesssage, setEmailError, setError]);

  return (
    <motion.form 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-midnight-blue mb-6">Create Your Account</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormInput
              label="First Name"
              icon="user"
              placeholder="Enter your first name"
              error={errors.firstName?.message as string}
              required
              {...field}
            />
          )}
        />
        
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormInput
              label="Last Name"
              icon="user"
              placeholder="Enter your last name"
              error={errors.lastName?.message as string}
              required
              {...field}
            />
          )}
        />
      </div>
      
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormInput
            label="Email Address"
            type="email"
            icon="mail"
            placeholder="email@example.com"
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
      
      <div className={`flex items-center justify-end mt-6 relative ${pathname.includes("agent") ? "top-0": " top-[60px]"}`}>
        <button
        type="submit"
        disabled={firstStepLoading}
        className={`w-[50%] bg-gradient-to-r from-midnight-blue to-ocean-blue text-white py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 font-medium ${firstStepLoading ? "opacity-50 cursor-not-allowed" : " "}`}
      >
        {firstStepLoading ? (
          <span className="flex items-center justify-center">
            <Spinner size="small" />
          </span>
        ) : (
          <span>Next Step</span>
        )}
      </button>
      </div>
      
    </motion.form>
  );
};

export default StepOne;

