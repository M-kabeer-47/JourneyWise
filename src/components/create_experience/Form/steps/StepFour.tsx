import { useState, useEffect } from "react";

import axios from "axios";

import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { StepFourType } from "@/lib/types/create-experience-steps";
import Tiers from "../components/Tiers";
import RequirementsList from "../components/Requirements";

interface FormStep4Props {
  data: StepFourType;
  setValue: UseFormSetValue<StepFourType>;
  errors: FieldErrors<StepFourType>;
  register: UseFormRegister<StepFourType>;
  control: Control<StepFourType>;
  setActiveTierIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function FormStep4({
  data,
  setValue,
  errors,
  register,
  control,
  setActiveTierIndex,
}: FormStep4Props) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [currencies, setCurrencies] = useState<string[]>([]);
  
  const handleFocus = (fieldName: string) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField(null);

  const handleTierFocus = (index: number) => {
    setActiveTierIndex(data.tiers.length - index - 1);
  };

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          "https://openexchangerates.org/api/currencies.json"
        );
        setCurrencies(Object.keys(response.data));
      } catch (error) {
        console.error("Error fetching currencies:", error);
        setCurrencies(["USD", "EUR", "GBP", "JPY"]); // Fallback currencies
      }
    };
    fetchCurrencies();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue">
          Pricing and Requirements
        </h2>
        <p className="mt-2 text-base text-charcoal">
          Set up your pricing tiers and experience requirements
        </p>
      </div>

      <div className="space-y-8">
        {/* Currency Selection */}
        <div className="space-y-2 mb-6">
          <label className="block text-base font-medium text-midnight-blue">
            Currency
          </label>
          <div className="relative">
            <input
              type="text"
              {...register("currency")}
              onFocus={() => handleFocus("currency")}
              onBlur={() => {
                handleBlur();
                const currency = currencies.find(
                  (currency) => currency === data.currency
                );
                if (!currency) {
                  setValue("currency", "USD");
                }
              }}
              list="currency-list"
              className={`w-full px-4 h-11 rounded-lg border text-charcoal text-sm
                  transition-all duration-200 outline-none
                  ${
                    focusedField === "currency"
                      ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                      : "border-gray-200"
                  }`}
              placeholder="Select currency"
            />
            <datalist id="currency-list">
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </datalist>
          </div>
          {errors.currency && (
            <p className="text-red-500 text-sm mt-1">
              {errors.currency.message}
            </p>
          )}
        </div>

        {/* Pricing Tiers */}
        <Tiers
          tiers={data.tiers}
          register={register}
          focusedField={focusedField}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          errors={errors}
          control={control}
          handleTierFocus={handleTierFocus}
          setActiveTierIndex={setActiveTierIndex}
        />

        {/* Requirements */}
        <RequirementsList
          register={register}
          errors={errors}
          focusedField={focusedField}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          requirements={data.requirements}
          setValue={setValue}
        />
      </div>
    </div>
  );
}
