import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  CircleCheck,
  Upload,
  Check,
  HelpCircle,
  X,
  ImageIcon,
} from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import axios from "axios";
import type { ExperienceData } from "@/lib/schemas/experience";
import { useForm } from "react-hook-form";
import { stepOneSchema } from "@/lib/schemas/experience";

interface FormStep1Props {
  formData: ExperienceData;
  handleInputChange: (field: keyof ExperienceData, value: any) => void;
  errors: Partial<ExperienceData>;
  initialData: Partial<ExperienceData>;
}

const categories = [
  "Adventure",
  "Culture",
  "Relaxation",
  "Food & Drink",
  "Nature",
];
const tagOptions = [
  "Adventure",
  "Cultural",
  "Food",
  "Nature",
  "Relaxation",
  "Beach",
  "Mountain",
  "City",
  "Historical",
  "Wildlife",
  "Photography",
  "Hiking",
  "Family-friendly",
  "Romantic",
  "Budget",
  "Luxury",
];

const CITIES_DATA_URL = "/data/cities.json";

interface Country {
  name: string;
  cca2: string;
}

interface CityData {
  [countryCode: string]: string[];
}

export default function FormStep1({
  formData,
  handleInputChange,
  errors,
  initialData,
}: FormStep1Props) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [citiesData, setCitiesData] = useState<CityData>({});
  const [isDragOver, setIsDragOver] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFocus = (fieldName: string) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField(null);

  const handleTagToggle = (tag: string) => {
    const updatedTags = formData.tags.includes(tag)
      ? formData.tags.filter((t: string) => t !== tag)
      : [...formData.tags, tag];
    handleInputChange("tags", updatedTags);
  };

  // Handle file selection (both click and drop)
  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      handleInputChange("experienceImage", file); // Changed from gigImage

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Handle drag and drop events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find((file) => file.type.startsWith("image/"));

    if (imageFile) {
      handleFileSelect(imageFile);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    handleInputChange("experienceImage", ""); // Changed from gigImage
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Set initial preview if formData has an image
  useEffect(() => {
    if (formData.experienceImage) {
      // Changed from gigImage
      if (typeof formData.experienceImage === "string") {
        setImagePreview(formData.experienceImage);
      } else if ((formData.experienceImage as any) instanceof File) {
        const previewUrl = URL.createObjectURL(formData.experienceImage);
        setImagePreview(previewUrl);

        // Cleanup function
        return () => URL.revokeObjectURL(previewUrl);
      }
    } else {
      setImagePreview(null);
    }
  }, [formData.experienceImage]); // Changed from gigImage

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryData = response.data.map((c: any) => ({
          name: c.name.common,
          cca2: c.cca2,
        }));
        setCountries(
          countryData.sort((a: Country, b: Country) =>
            a.name.localeCompare(b.name)
          )
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

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
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
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
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-base font-medium text-midnight-blue">
              Availability Status
            </label>
            <div className="flex gap-4">
              {["available", "unavailable"].map((status) => (
                <label
                  key={status}
                  className={`flex items-center gap-2 px-4 h-11 rounded-lg border cursor-pointer
                             transition-all duration-200
                             ${
                               formData.availability === status
                                 ? "border-ocean-blue bg-ocean-blue text-white"
                                 : "border-gray-200 hover:border-ocean-blue/50"
                             }`}
                >
                  <input
                    type="radio"
                    value={status}
                    checked={formData.availability === status}
                    onChange={() => handleInputChange("availability", status)}
                    className="hidden"
                  />
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                                    ${
                                      formData.availability === status
                                        ? "border-white"
                                        : "border-gray-400"
                                    }`}
                  >
                    {formData.availability === status && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </span>
                  <span className="text-sm capitalize">{status}</span>
                </label>
              ))}
            </div>
            {errors.availability && (
              <p className="text-red-500 text-sm mt-1">{errors.availability}</p>
            )}
          </div>
        </div>

        {/* Enhanced Experience Image Upload with Drag & Drop */}
        <div className="space-y-2">
          <label className="block text-base font-medium text-midnight-blue">
            Experience Image
          </label>

          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-lg transition-all duration-200 ${
              isDragOver
                ? "border-ocean-blue bg-ocean-blue/5"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
              id="experienceImageUpload" // Changed from gigImageUpload
            />

            {imagePreview ? (
              // Image Preview
              <div className="relative group">
                <img
                  src={imagePreview}
                  alt="Experience preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                  <div className="flex gap-2">
                    <label
                      htmlFor="experienceImageUpload" // Changed from gigImageUpload
                      className="px-3 py-2 bg-white text-midnight-blue rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      Change
                    </label>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Upload Area
              <label
                htmlFor="experienceImageUpload" // Changed from gigImageUpload
                className="block p-8 text-center cursor-pointer"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${
                      isDragOver
                        ? "bg-ocean-blue text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <div className="text-lg font-medium text-midnight-blue mb-2">
                    {isDragOver ? "Drop image here" : "Upload Experience Image"}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    Drag and drop an image or click to browse
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-ocean-blue text-white rounded-lg text-sm font-medium hover:bg-ocean-blue/90 transition-colors">
                    <Upload className="w-4 h-4" />
                    Choose File
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    Supports: JPG, PNG, WebP (Max 10MB)
                  </div>
                </div>
              </label>
            )}
          </div>

          {errors.experienceImage && ( // Changed from gigImage
            <p className="text-red-500 text-sm mt-1">
              {errors.experienceImage}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <label className="block text-base font-medium text-midnight-blue">
              Country
            </label>

            <div className="relative">
              <input
                type="text"
                value={formData.country}
                onChange={(e) => {
                  handleInputChange("country", e.target.value);
                  const country = countries.find(
                    (c) => c.name.toLowerCase() === e.target.value.toLowerCase()
                  );
                  if (country) {
                    handleInputChange("countryCode", country.cca2);
                    handleInputChange("city", "");
                  } else {
                    handleInputChange("countryCode", "");
                    handleInputChange("city", "");
                  }
                }}
                onBlur={() => {
                  const country = countries.find(
                    (c) =>
                      c.name.toLowerCase() === formData.country.toLowerCase()
                  );
                  if (!country) {
                    handleInputChange("country", "");
                    handleInputChange("countryCode", "");
                    handleInputChange("city", "");
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
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>

          {/* City Select */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <label className="block text-base font-medium text-midnight-blue">
                City/District
              </label>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-white text-midnight-blue border border-gray-200 p-1 rounded-lg text-[13px]">
                    <p className="">
                      If your city is not listed, please enter it manually.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="relative">
              <input
                type="text"
                list="city-list"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="w-full px-4 h-11 rounded-lg border text-charcoal text-sm transition-all duration-200 outline-none border-gray-200 focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
                placeholder="Select city"
                disabled={!formData.countryCode}
              />
              <datalist id="city-list">
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </datalist>
            </div>
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>
        </div>

        {/* Category and Duration */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <label className="block text-base font-medium text-midnight-blue">
              Category
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                onBlur={(e) => {
                  const category = categories.find(
                    (c) => c.toLowerCase() === e.target.value.toLowerCase()
                  );
                  if (!category) {
                    handleInputChange("category", "");
                  }
                }}
                list="category-list"
                className="w-full px-4 h-11 rounded-lg border text-charcoal text-sm transition-all duration-200 outline-none border-gray-200 focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
                placeholder="Select category"
              />
              <datalist id="category-list">
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </datalist>
            </div>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-base font-medium text-midnight-blue">
              Duration (days)
            </label>
            <input
              type="number"
              value={formData.duration === 0 ? "" : formData.duration}
              onChange={(e) => {
                const value =
                  e.target.value === "" ? 0 : Number(e.target.value);
                handleInputChange("duration", value);
              }}
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
              min="1"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label className="block text-base font-medium text-midnight-blue">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {tagOptions.map((tag) => (
              <motion.button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                className={`px-4 h-9 rounded-lg text-sm font-medium transition-all duration-200
                           flex items-center gap-1.5
                           ${
                             formData.tags.includes(tag)
                               ? "bg-ocean-blue text-white"
                               : "bg-midnight-blue/5 text-midnight-blue hover:bg-midnight-blue/10"
                           }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tag}
                {formData.tags.includes(tag) && (
                  <CircleCheck className="w-4 h-4" />
                )}
              </motion.button>
            ))}
          </div>
          {errors.tags && (
            <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-base font-medium text-midnight-blue">
            Description
          </label>
          <div className="relative">
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              onFocus={() => handleFocus("description")}
              onBlur={handleBlur}
              maxLength={500}
              className={`w-full px-4 py-3 rounded-lg border text-charcoal text-sm
                         transition-all duration-200 outline-none h-[120px]
                         ${
                           focusedField === "description"
                             ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                             : "border-gray-200"
                         }`}
              placeholder="Describe your experience..."
            />
            <span className="absolute bottom-2 right-2 text-xs text-charcoal">
              {formData.description?.length || 0}/500
            </span>
          </div>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
