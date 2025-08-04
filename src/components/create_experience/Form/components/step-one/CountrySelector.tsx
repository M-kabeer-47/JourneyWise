import { StepOneType } from "@/lib/types/create-experience-steps";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import countries from "@/lib/data/countries";
interface CountrySelectorProps{
    
    onChange: (value: string) => void;
    setValue: UseFormSetValue<StepOneType>;
    errors: FieldErrors<StepOneType>;
    value: string;

}
export default function CountrySelector({
  
  onChange,
  setValue,
  errors,
  value
}: CountrySelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-base font-medium text-midnight-blue">
        Country
      </label>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
            const country = countries.find(
              (c) => c.name.toLowerCase() === e.target.value.toLowerCase()
            );
            if (country) {
              setValue("countryCode", country.cca2);
              setValue("city", "");
            } else {
              setValue("countryCode", "");
              setValue("city", "");
            }
          }}
          onBlur={() => {
            const country = countries.find(
              (c: { name: string }) => c.name.toLowerCase() === value.toLowerCase()
            );
            if (!country) {
              setValue("country", "");
              setValue("countryCode", "");
              setValue("city", "");
            }
          }}
          className="w-full px-4 h-11 rounded-lg border text-charcoal text-sm transition-all duration-200 outline-none border-gray-200 focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
          placeholder="Search for a country"
          list="country-list"
        />
        <datalist id="country-list">
          {countries.map((country) => (
            <option key={country.cca2} value={country.name}>
              {country.name}
            </option>
          ))}
        </datalist>
      </div>
      {errors.country && (
        <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
      )}
    </div>
  );
}
