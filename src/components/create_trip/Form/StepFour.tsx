  import { useState, useEffect } from "react"

  import { Plus, Minus, HelpCircle, Trash2 } from "lucide-react"
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
  import axios from "axios"
  import type { ExperienceData } from "@/lib/schemas/experience"

  interface FormStep4Props {
    formData: ExperienceData
    handleInputChange: (field: keyof ExperienceData, value: any) => void
    setActiveTierIndex: React.Dispatch<React.SetStateAction<number>>
    errors: Partial<ExperienceData>
    submit: boolean
  }

  export default function FormStep4({ formData, handleInputChange, setActiveTierIndex, errors, submit }: FormStep4Props) {
    const [focusedField, setFocusedField] = useState<string | null>(null)
    const [currencies, setCurrencies] = useState<string[]>([])

    const handleFocus = (fieldName: string) => setFocusedField(fieldName)
    const handleBlur = () => setFocusedField(null)


    const addTier = () => {
      if (formData.tiers.length < 3) {
        const newTiers = [...formData.tiers, { name: "", members: 0,price: 0, description: "" }]
        handleInputChange("tiers", newTiers)
        setActiveTierIndex(newTiers.length - 1)
      }

    }

    const handleTierFocus = (index: number) => {
      setActiveTierIndex(formData.tiers.length - index - 1)
    }

    const removeTier = (index: number) => {
      if (formData.tiers.length > 1) {
        const newTiers = formData.tiers.filter((_, i) => i !== formData.tiers.length - index - 1)
        handleInputChange("tiers", newTiers)
        setActiveTierIndex(formData.tiers.length - index - 1)
      }
    }

    const handleTierChange = (index: number, field: string, value: any) => {
      const newTiers = [...formData.tiers]
      if (field === "price" || field === "members") {
        newTiers[index] = {
          ...newTiers[index],
          [field]: value === "" ? 0 : Number(value),
        }
      } else {
        newTiers[index] = { ...newTiers[index], [field]: value }
      }
      handleInputChange("tiers", newTiers)
    }

    const addRequirement = () => {
      handleInputChange("requirements", [...formData.requirements, ""])
    }

    const removeRequirement = (index: number) => {
      const newRequirements = formData.requirements.filter((_, i) => i !== index)
      handleInputChange("requirements", newRequirements)
    }




    
    useEffect(()=>{
    console.log("Submit",submit)
    console.log("Requirements",formData.requirements)
    },[submit])

    
    useEffect(() => {
      const fetchCurrencies = async () => {
        try {
          const response = await axios.get("https://openexchangerates.org/api/currencies.json")
          setCurrencies(Object.keys(response.data))
        } catch (error) {
          console.error("Error fetching currencies:", error)
          setCurrencies(["USD", "EUR", "GBP", "JPY"]) // Fallback currencies
        }
      }
      fetchCurrencies()
    }, [])

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-midnight-blue">Pricing and Requirements</h2>
          <p className="mt-2 text-base text-charcoal">Set up your pricing tiers and experience requirements</p>
        </div>

        <div className="space-y-8">
          {/* Currency Selection */}
          <div className="space-y-2 mb-6">
            <label className="block text-base font-medium text-midnight-blue">Currency</label>
            <div className="relative">
              <input
                type="text"
                value={formData.currency}
                onChange={(e) =>{handleInputChange("currency", e.target.value)
              }
                }

                onFocus={() => handleFocus("currency")}
                onBlur={()=>{
                  handleBlur()
                  const currency= currencies.find((currency)=> currency === formData.currency)
                  if(!currency){
                    handleInputChange("currency", "USD")
                  }
                }

                }
                list="currency-list"
                className={`w-full px-4 h-11 rounded-lg border text-charcoal text-sm
                  transition-all duration-200 outline-none
                  ${focusedField === "currency" ? "border-ocean-blue ring-2 ring-ocean-blue/20" : "border-gray-200"}`}
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
            {errors.currency && <p className="text-red-500 text-sm mt-1">{errors.currency}</p>}
          </div>

          {/* Pricing Tiers */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-midnight-blue">Pricing Tiers</h3>
              <div className="flex items-center gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-5 h-5 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-white text-midnight-blue border border-gray-200 p-1 rounded-lg text-[13px]">
                      <p className="text-black">Create up to 3 pricing tiers for your experience</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {formData.tiers.length < 3 && (
                  <button
                    type="button"
                    onClick={addTier}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-ocean-blue hover:bg-ocean-blue/10 rounded-lg transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    Add Tier
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[...formData.tiers].reverse().map((tier, index: number) => (
                <div
                  key={index}
                  className="p-4 md:p-6 border border-gray-200 rounded-lg space-y-4 bg-white shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between bg-gray-50 -mx-6 -mt-6 px-6 py-3 border-b border-gray-200 mb-4">
                    <h4 className="text-lg font-medium text-midnight-blue">Tier {formData.tiers.length - index}</h4>
                    {formData.tiers.length - index - 1 > 0 && (
                      <button type="button" onClick={() => removeTier(index)} className="text-red-500 hover:text-red-600">
                        <Minus className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <input
                      type="text"
                      value={tier.name}
                      onChange={(e) => handleTierChange(formData.tiers.length - index - 1, "name", e.target.value)}
                      onFocus={() => {
                        handleTierFocus(index)
                        handleFocus(`tiers.${formData.tiers.length - index - 1}.name`)

                      }}
                      onBlur={handleBlur}
                      className={`w-full px-4 h-11 rounded-lg border text-charcoal text-sm
                                transition-all duration-200 outline-none
                                ${
                                  focusedField === `tiers.${formData.tiers.length - index - 1 }.name`
                                    ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                                    : "border-gray-200"
                                }`}
                      placeholder="Tier name (e.g., Basic, Standard, Premium)"
                    />
                    {formData.tiers?.[formData.tiers.length - index - 1]?.name === "" && submit && (
                      <p className="text-red-500 text-sm mt-1">Tier name is required</p>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={tier.price === 0 ? "" : tier.price}
                        onChange={(e) => handleTierChange(formData.tiers.length - index - 1, "price", 
                          (e.target.value))}
                        onFocus={() => {
                          handleTierFocus(index)
                          handleFocus(`tiers.${formData.tiers.length - index - 1 }.price`)
                        }}
                        min={1}
                        onBlur={handleBlur}
                        className={`w-full px-4 h-11 rounded-lg border text-charcoal text-sm
                                  transition-all duration-200 outline-none
                                  ${
                                    focusedField === `tiers.${formData.tiers.length - index - 1}.price`
                                      ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                                      : "border-gray-200"
                                  }`}
                        placeholder="Price"
                        step="0.01"
                      />
                    </div>
                    {formData.tiers?.[formData.tiers.length - index - 1]?.price === 0 && submit && (
                      <p className="text-red-500 text-sm mt-1">Price is required</p>
                    )}
                    {formData.tiers?.[formData.tiers.length - index - 1]?.price < 1 && formData.tiers[formData.tiers.length- index - 1].price !== 0 && submit && (
                      <p className="text-red-500 text-sm mt-1">Price must be positive</p>
                    )}
                    <input
                      type="number"
                      value={tier.members === 0 ? "" : tier.members}
                      onChange={(e) => handleTierChange(formData.tiers.length - index - 1, "members", (e.target.value))}
                      min={1}
                      onFocus={() => {
                        handleTierFocus(index)
                        handleFocus(`tiers.${formData.tiers.length - index - 1}.members`)
                      }}
                      onBlur={handleBlur}
                      className={`w-full px-4 h-11 rounded-lg border text-charcoal text-sm
                                transition-all duration-200 outline-none
                                ${
                                  focusedField === `tiers.${formData.tiers.length - index - 1}.members`
                                    ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                                    : "border-gray-200"
                                }`}
                      placeholder="Number of members"
                    />
                    {formData.tiers?.[formData.tiers.length - index - 1]?.members === 0 && submit && (
                      <p className="text-red-500 text-sm mt-1">Number of members is required</p>
                    )}
                    {formData.tiers?.[formData.tiers.length- index - 1]?.members < 1 && formData.tiers[formData.tiers.length- index - 1].members !== 0 && submit && (
                      <p className="text-red-500 text-sm mt-1">Number of members must be positive</p>
                    )}
                    <textarea
                      value={tier.description}
                      onChange={(e) => handleTierChange(formData.tiers.length - index - 1, "description", e.target.value)}
                        onFocus={() => {
                        handleTierFocus(index)
                        handleFocus(`tiers.${formData.tiers.length - index - 1}.description`)
                      }}
                      onBlur={handleBlur}
                      maxLength={100}
                      className={`w-full px-4 py-3 rounded-lg border text-charcoal text-sm
                                transition-all duration-200 outline-none h-[80px] resize-none
                                ${
                                  focusedField === `tiers.${formData.tiers.length - index - 1}.description`
                                    ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                                    : "border-gray-200"
                                }`}
                      placeholder="Brief description of what's included (max 100 characters)"
                    />
                    {formData.tiers?.[formData.tiers.length - index - 1]?.description === "" && submit &&   (
                      <p className="text-red-500 text-sm mt-1">Tier description is required</p>
                    )}
                    <div className="text-xs text-gray-500 text-right">{tier.description?.length || 0}/100</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-midnight-blue">Requirements</h3>
              <div className="flex items-center gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-5 h-5 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-white text-midnight-blue border border-gray-200 p-1 rounded-lg text-[13px]">
                      <p>List any requirements or prerequisites for participants</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <button
                  type="button"
                  onClick={addRequirement}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-ocean-blue hover:bg-ocean-blue/10 rounded-lg transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  Add Requirement
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => {
                      const newRequirements = [...formData.requirements]
                      newRequirements[index] = e.target.value
                      handleInputChange("requirements", newRequirements)
                    }}
                    onFocus={() => handleFocus(`requirements.${index}`)}
                    onBlur={handleBlur}
                    className={`flex-grow px-4 h-11 rounded-lg border text-charcoal text-sm
                              transition-all duration-200 outline-none
                              ${
                                focusedField === `requirements.${index}`
                                  ? "border-ocean-blue ring-2 ring-ocean-blue/20"
                                  : "border-gray-200"
                              }`}
                    placeholder="Enter a requirement"
                  />
                  {req === "" && submit && formData.requirements.length > 1 && (
                    <p className="text-red-500 text-sm mt-1">Requirement is required</p>
                  )}


                    
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {submit && formData.requirements.length === 1 && formData.requirements[0] === "" && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                At least one requirement is required
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

