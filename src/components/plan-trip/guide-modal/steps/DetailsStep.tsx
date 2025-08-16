import { motion } from "framer-motion";
import { Users, Wallet, Clock, Route } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DetailsStepData, detailsStepSchema } from "@/lib/schemas/trip";
import CurrencySelector from "@/components/ui/CurrencySelector";
import { Currency } from "@/lib/constants/currencies";
import { currencies } from "@/lib/constants/currencies";
interface DetailsStepProps {
  initialData?: Partial<DetailsStepData>;
  currencies: Currency[];
  onNext: (data: DetailsStepData) => void;
}

export const DetailsStep = ({ initialData, onNext }: DetailsStepProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<DetailsStepData>({
    resolver: zodResolver(detailsStepSchema),
    defaultValues: {
      numPeople: initialData?.numPeople || undefined,
      estimatedBudget: initialData?.estimatedBudget || undefined,
      estimatedDurationHours: initialData?.estimatedDurationHours || undefined,
      estimatedDistanceKm: initialData?.estimatedDistanceKm || undefined,
      currency: initialData?.currency || "USD",
    },
  });

  const selectedCurrency =
    currencies.find((c) => c.code === watch("currency")) || currencies[0];

  const onSubmit = (data: DetailsStepData) => {
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
        <p className="text-gray-500 mt-2">
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
            <label className="block text-sm font-medium text-charcoal">
              Number of People
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="number"
                {...register("numPeople", { valueAsNumber: true })}
                className="w-full pl-11 pr-4 h-11 rounded-lg border border-gray-200 text-charcoal text-sm focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all outline-none"
                placeholder="e.g. 2"
              />
            </div>
            {errors.numPeople && (
              <p className="text-red-500 text-xs">{errors.numPeople.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-charcoal">
              Estimated Budget
            </label>
            <div className="relative">
              <Wallet className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              
              <input
                type="number"
                {...register("estimatedBudget", { valueAsNumber: true })}
                className="w-full pl-11 pr-4 h-11 rounded-lg border border-gray-200 text-charcoal text-sm focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all outline-none"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-charcoal">
              Estimated Duration (Hours)
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="number"
                step="0.5"
                {...register("estimatedDurationHours", { valueAsNumber: true })}
                className="w-full pl-11 pr-4 h-11 rounded-lg border border-gray-200 text-charcoal text-sm focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all outline-none"
                placeholder="e.g. 8.5"
              />
            </div>
            {errors.estimatedDurationHours && (
              <p className="text-red-500 text-xs">
                {errors.estimatedDurationHours.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-charcoal">
              Estimated Distance (KM)
            </label>
            <div className="relative">
              <Route className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="number"
                {...register("estimatedDistanceKm", { valueAsNumber: true })}
                className="w-full pl-11 pr-4 h-11 rounded-lg border border-gray-200 text-charcoal text-sm focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all outline-none"
                placeholder="e.g. 250"
              />
            </div>
            {errors.estimatedDistanceKm && (
              <p className="text-red-500 text-xs">
                {errors.estimatedDistanceKm.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </motion.div>
  );
};
