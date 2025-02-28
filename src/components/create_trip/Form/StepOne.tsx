import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CircleCheck, Upload, Check, HelpCircle } from "lucide-react"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import axios from "axios"
import type { ExperienceData } from "@/lib/schemas/experience"
import { useForm } from "react-hook-form"
import { stepOneSchema } from "@/lib/schemas/experience"


interface FormStep1Props {
  formData: ExperienceData
  handleInputChange: (field: keyof ExperienceData, value: any) => void
  errors: Partial<ExperienceData>
  onSubmit: (data: Partial<ExperienceData>) => void
  initialData: Partial<ExperienceData>
}

const categories = ["Adventure", "Culture", "Relaxation", "Food & Drink", "Nature"]
const tagOptions = ["Family-friendly", "Romantic", "Group", "Solo", "Budget", "Luxury"]

const CITIES_DATA_URL = "/data/cities.json"

interface Country {
  name: string
  cca2: string
}

interface CityData {
  [countryCode: string]: string[]
}

export default function FormStep1({ formData, handleInputChange, errors, onSubmit, initialData }: FormStep1Props) {
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [countries, setCountries] = useState<Country[]>([])
  const [citiesData, setCitiesData] = useState<CityData>({})
  const { watch } = useForm({ defaultValues: initialData })

  

  const handleFocus = (fieldName: string) => setFocusedField(fieldName)
  const handleBlur = () => setFocusedField(null)

  const handleTagToggle = (tag: string) => {
    const updatedTags = formData.tags.includes(tag)
      ? formData.tags.filter((t: string) => t !== tag)
      : [...formData.tags, tag]
    handleInputChange("tags", updatedTags)
  }

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all")
        const countryData = response.data.map((c: any) => ({
          name: c.name.common,
          cca2: c.cca2,
        }))
        setCountries(countryData.sort((a: Country, b: Country) => a.name.localeCompare(b.name)))
      } catch (error) {
        console.error("Error fetching countries:", error)
      }
    }

    fetchCountries()
  }, [])

  // Load cities data
  useEffect(() => {
    axios
      .get(CITIES_DATA_URL)
      .then((response) => setCitiesData(response.data))
      .catch((error) => console.error("Error loading cities data:", error))
  }, [])

  // Get cities for selected country
  const cities = formData.countryCode ? citiesData[formData.countryCode] || [] : []

  // Watch all form fields
  useEffect(() => {
    const subscription = watch((formValues) => {
      const validationResult = stepOneSchema.safeParse(formValues)
      if (validationResult.success) {
        onSubmit(formValues as Partial<ExperienceData>)
      }
    })

    return () => subscription.unsubscribe?.()
  }, [watch, onSubmit])

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue">Basic Information</h2>
        <p className="mt-2 text-base text-charcoal">Fill in the basic details of your experience</p>
      </div>

      <div className="space-y-6">
        {/* Title and Availability */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <label className="block text-base font-medium text-midnight-blue">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              onFocus={() => handleFocus("title")}
              onBlur={handleBlur}
              className={`w-full px-4 h-11 rounded-lg border text-charcoal text-sm
                         transition-all duration-200 outline-none
                         ${
                           focusedField === "title" ? "border-ocean-blue ring-2 ring-ocean-blue/20" : "border-gray-200"
                         }`}
              placeholder="Enter experience title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-base font-medium text-midnight-blue">Availability Status</label>
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
                                    ${formData.availability === status ? "border-white" : "border-gray-400"}`}
                  >
                    {formData.availability === status && <Check className="w-3 h-3 text-white" />}
                  </span>
                  <span className="text-sm capitalize">{status}</span>
                </label>
              ))}
            </div>
            {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability}</p>}
          </div>
        </div>

        {/* Gig Image Upload */}
        <div className="space-y-2">
          <label className="block text-base font-medium text-midnight-blue">Gig Image</label>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
            <input
              type="file"
              accept="image/*"
             // Change the image upload handler to:
  onChange={async (e) => {
    const file = e.target.files?.[0]
  if (file) {
    handleInputChange("gigImage", file)
    console.log("file",file)
    
    
    
  }
}}
              className="hidden"
              id="gigImageUpload"
            />
            <label
              htmlFor="gigImageUpload"
              className="inline-flex items-center gap-2 px-4 h-10 rounded-lg border-2 border-ocean-blue
                         text-ocean-blue text-sm font-medium transition-all duration-200
                         hover:bg-ocean-blue hover:text-white cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              Upload Image
            </label>
          </div>
          {errors.gigImage && <p className="text-red-500 text-sm mt-1">{errors.gigImage}</p>}
        </div>

        {/* Location */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <label className="block text-base font-medium text-midnight-blue">Country</label>

            <div className="relative">
              <input
                type="text"
                value={formData.country}
                onChange={(e) => {
                  handleInputChange("country", e.target.value)
                  const country = countries.find((c) => c.name.toLowerCase() === e.target.value.toLowerCase())
                  if (country) {
                    handleInputChange("countryCode", country.cca2)
                    handleInputChange("city", "")
                  } else {
                    handleInputChange("countryCode", "")
                    handleInputChange("city", "")
                  }
                }}
                onBlur={() => {
                  const country = countries.find((c) => c.name.toLowerCase() === formData.country.toLowerCase())
                  if (!country) {
                    handleInputChange("country", "")
                    handleInputChange("countryCode", "")
                    handleInputChange("city", "")
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
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </div>

          {/* City Select */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <label className="block text-base font-medium text-midnight-blue">City/District</label>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-white text-midnight-blue border border-gray-200 p-1 rounded-lg text-[13px]">
                    <p className="">If your city is not listed, please enter it manually.</p>
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
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>
        </div>

        {/* Category and Duration */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <label className="block text-base font-medium text-midnight-blue">Category</label>
            <div className="relative">
              <input
                type="text"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                onBlur={(e) => {
                  const category = categories.find((c) => c.toLowerCase() === e.target.value.toLowerCase())
                  if (!category) {
                    handleInputChange("category", "")
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
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-base font-medium text-midnight-blue">Duration (days)</label>
            <input
              type="number"
              value={formData.duration === 0 ? "" : formData.duration}
              onChange={(e) => {
                const value = e.target.value === "" ? 0 : Number(e.target.value)
                handleInputChange("duration", value)
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
            {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label className="block text-base font-medium text-midnight-blue">Tags</label>
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
                               ? "bg-midnight-blue text-white"
                               : "bg-midnight-blue/5 text-midnight-blue hover:bg-midnight-blue/10"
                           }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tag}
                {formData.tags.includes(tag) && <CircleCheck className="w-4 h-4" />}
              </motion.button>
            ))}
          </div>
          {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-base font-medium text-midnight-blue">Description</label>
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
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>
      </div>
    </div>
  )
}

