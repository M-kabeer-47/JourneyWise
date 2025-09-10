import { motion } from "framer-motion";
import { Users, Wallet, Clock, Route } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GuideData, guideDataSchema } from "@/lib/schemas/trip";
import CurrencySelector from "@/components/ui/CurrencySelector";

import { ALL_CURRENCIES } from "@/lib/constants/currencies";
interface DetailsStepProps {
  initialData?: Partial<GuideData>;
  currencies: any;
  onNext: (data: GuideData) => void;
}

export const DetailsStep = ({ initialData, onNext }: DetailsStepProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<GuideData>({
    resolver: zodResolver(guideDataSchema),
    defaultValues: {
      numOfPeople: initialData?.numOfPeople || undefined,
      estimatedBudget: initialData?.estimatedBudget || undefined,
      estimatedDistance: initialData?.estimatedDistance || undefined,
      currency: initialData?.currency || "USD",
    },
  });

  const selectedCurrency =
    ALL_CURRENCIES.find((c) => c.code === watch("currency")) ||
    ALL_CURRENCIES[0];

  const onSubmit = (data: GuideData) => {
    onNext(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-midnight-blue">Trip Details</h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-2">
          Set your group size, budget, and trip parameters to help us customize
          your trip plan.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        id="details-form"
      >
        {/* Currency */}
        <Controller
          name="currency"
          control={control}
          render={({ field }) => (
            <CurrencySelector
              value={field.value}
              onChange={field.onChange}
              error={errors.currency?.message}
            />
          )}
        />

        {/* Row 1: Number of People + Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-medium text-charcoal">
              Number of People
            </label>
            <div className="relative">
              <Users className="absolute left-3 sm:top-3 top-[13px] sm:w-5 sm:h-5 w-4 h-4 text-gray-400" />
              <input
                type="number"
                {...register("numOfPeople", { valueAsNumber: true })}
                className="w-full pl-11 sm:pl-11 pr-4 h-11 rounded-lg border border-gray-200 text-charcoal text-xs sm:text-sm focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all outline-none"
                placeholder="e.g. 2"
              />
            </div>
            {errors.numOfPeople && (
              <p className="text-red-500 text-xs">
                {errors.numOfPeople.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-xs sm:text-sm  font-medium text-charcoal">
              Estimated Budget
            </label>
            <div className="relative">
              <Wallet className="absolute left-3 sm:top-3 top-[13px] sm:w-5 sm:h-5 w-4 h-4 text-gray-400" />

              <input
                type="number"
                {...register("estimatedBudget", { valueAsNumber: true })}
                className="w-full pl-11 sm:pl-11 pr-4 h-11 rounded-lg border border-gray-200 text-charcoal text-xs sm:text-sm focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all outline-none"
                placeholder="e.g. 1000"
              />
            </div>
            {errors.estimatedBudget && (
              <p className="text-red-500 text-xs">
                {errors.estimatedBudget.message}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Duration + Distance */}

        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-medium text-charcoal">
            Estimated Distance (KM)
          </label>
          <div className="relative">
            <Route className="absolute left-3 sm:top-3 top-[13px] sm:w-5 sm:h-5 w-4 h-4 text-gray-400" />
            <input
              type="number"
              {...register("estimatedDistance", { valueAsNumber: true })}
              className="w-full pl-11 sm:pl-11 pr-4 h-11 rounded-lg border border-gray-200 text-charcoal text-xs sm:text-sm focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all outline-none"
              placeholder="e.g. 250"
            />
          </div>
          {errors.estimatedDistance && (
            <p className="text-red-500 text-xs">
              {errors.estimatedDistance.message}
            </p>
          )}
        </div>
      </form>
    </motion.div>
  );
};
