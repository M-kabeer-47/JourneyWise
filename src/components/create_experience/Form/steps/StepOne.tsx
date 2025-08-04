import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import axios from "axios";
import { stepOneSchema } from "@/lib/schemas/experience";
import z from "zod";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  Controller,
  Control,
} from "react-hook-form";

// Import your new components
import CategoryDropdown from "../components/step-one/Category";
import CountrySelector from "../components/step-one/CountrySelector";
import Tags from "../components/step-one/Tags";
import ImageUpload from "../components/step-one/ImageUpload";
import Description from "../components/step-one/Description";
import City from "../components/step-one/CitySelector";

type stepOneType = z.infer<typeof stepOneSchema>;

interface FormStep1Props {
  formData: stepOneType;
  setValue: UseFormSetValue<stepOneType>;
  control: Control<stepOneType>;
  errors: FieldErrors<stepOneType>;
  register: UseFormRegister<stepOneType>;
}

const categories = [
  "Adventure",
  "Culture",
  "Relaxation",
  "Food & Drink",
  "Nature",
];

const CITIES_DATA_URL = "/data/cities.json";

interface CityData {
  [countryCode: string]: string[];
}

export default function FormStep1({
  formData,
  setValue,
  errors,
  register,
  control,
}: FormStep1Props) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [citiesData, setCitiesData] = useState<CityData>({});

  const handleFocus = (fieldName: string) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField(null);

  // Load cities data
  useEffect(() => {
    axios
      .get(CITIES_DATA_URL)
      .then((response) => setCitiesData(response.data))
      .catch((error) => console.error("Error loading cities data:", error));
  }, []);

  // Get cities for selected country
  const cities = formData.countryCode
    ? citiesData[formData.countryCode] || []
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue">
          Basic Information
        </h2>
        <p className="mt-2 text-base text-charcoal">
          Fill in the basic details of your experience
        </p>
      </div>

      <div className="space-y-6">
        {/* Title and Availability */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <label className="block text-base font-medium text-midnight-blue">
              Title
            </label>
            <input
              type="text"
              {...register("title")}
              onFocus={() => handleFocus("title")}
              onBlur={handleBlur}
              className={`w-full px-4 h-11 rounded-lg border text-charcoal text-sm
                         transition-all duration-200 outline-none
                         ${
                           focusedField === "title"
                             ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                             : "border-gray-200"
                         }`}
              placeholder="Enter experience title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-base font-medium text-midnight-blue">
              Availability Status
            </label>
            <div className="flex gap-4">
              {[true, false].map((status) => (
                <label
                  key={status.toString()}
                  className={`flex items-center gap-2 px-4 h-11 rounded-lg border cursor-pointer
                             transition-all duration-200
                             ${
                               formData.available === status
                                 ? "border-ocean-blue bg-ocean-blue text-white"
                                 : "border-gray-200 hover:border-ocean-blue/50"
                             }`}
                >
                  <input
                    type="radio"
                    onChange={() => setValue("available", status)}
                    checked={formData.available === status}
                    className="hidden"
                  />
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                                    ${
                                      formData.available === status
                                        ? "border-white"
                                        : "border-gray-400"
                                    }`}
                  >
                    {formData.available === status && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </span>
                  <span className="text-sm capitalize">
                    {status ? "available" : "unavailable"}
                  </span>
                </label>
              ))}
            </div>
            {errors.available && (
              <p className="text-red-500 text-sm mt-1">
                {errors.available.message}
              </p>
            )}
          </div>
        </div>

        {/* Enhanced Experience Image Upload with Controller */}
        <Controller
          name="experienceImage"
          control={control}
          render={({ field, fieldState }) => (
            <ImageUpload
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />

        {/* Location */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <CountrySelector
                onChange={field.onChange}
                setValue={setValue}
                errors={errors}
                value={field.value}
              />
            )}
          />

          <City
            register={register}
            errors={errors}
            cities={cities}
            disabled={!formData.countryCode}
            value={formData.city}
          />
        </div>

        {/* Category and Duration */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          <Controller
            name="category"
            control={control}
            render={({ field, fieldState }) => (
              <CategoryDropdown
                label="Category"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                options={categories}
                placeholder="Select category"
                error={fieldState.error?.message}
              />
            )}
          />

          <div className="space-y-2">
            <label className="block text-base font-medium text-midnight-blue">
              Duration (days)
            </label>
            <input
              type="number"
              {...register("duration", {
                valueAsNumber: true,
                setValueAs(value) {
                  return value === "" || isNaN(Number(value))
                    ? 0
                    : Number(value);
                },
              })}
              onFocus={() => handleFocus("duration")}
              onBlur={handleBlur}
              className={`w-full px-4 h-11 rounded-lg border text-charcoal text-sm
                         transition-all duration-200 outline-none
                         ${
                           focusedField === "duration"
                             ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                             : "border-gray-200"
                         }`}
              placeholder="Enter duration"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">
                {errors.duration.message}
              </p>
            )}
          </div>
        </div>

        {/* Tags with Controller */}
        <Controller
          name="tags"
          control={control}
          render={({ field, fieldState }) => (
            <Tags
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />

        {/* Description */}
        <Description
          register={register}
          errors={errors}
          value={formData.description}
        />
      </div>
    </div>
  );
}
