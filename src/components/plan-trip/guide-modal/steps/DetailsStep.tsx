import { motion } from "framer-motion"
import { Users, Wallet } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Currency } from "../../../../lib/data/currencies" 

interface DetailsStepProps {
  numPeople: number
  estimatedBudget: number
  currency: string
  selectedCurrency: Currency
  currencies: Currency[]
  onNumPeopleChange: (value: number) => void
  onEstimatedBudgetChange: (value: number) => void
  onCurrencyChange: (value: string) => void
}

export const DetailsStep = ({
  numPeople,
  estimatedBudget,
  currency,
  selectedCurrency,
  currencies,
  onNumPeopleChange,
  onEstimatedBudgetChange,
  onCurrencyChange,
}: DetailsStepProps) => {
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
          Set your group size and budget to help us customize your trip plan.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-charcoal">Number of People</label>
          <div className="relative">
            <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="number"
              min="1"
              value={numPeople === 0 ? "" : numPeople}
              onChange={(e) => {
                const value = Number.parseInt(e.target.value, 10);
                onNumPeopleChange(isNaN(value) || value < 1 ? 0 : value);
              }}
              className="w-full pl-11 pr-4 h-11 rounded-lg border border-gray-200 text-charcoal text-sm focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all outline-none"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-charcoal">Currency</label>
          <Select value={currency} onValueChange={onCurrencyChange}>
            <SelectTrigger className="w-full h-11 !bg-white">
              <SelectValue>
                {selectedCurrency.code} - {selectedCurrency.name} ({selectedCurrency.symbol})
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {currencies.map((curr) => (
                <SelectItem
                  key={curr.code}
                  value={curr.code}
                  className="focus:bg-ocean-blue focus:text-white"
                >
                  {curr.code} - {curr.name} ({curr.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-charcoal">Estimated Budget</label>
          <div className="relative">
            <Wallet className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <span className="absolute left-11 top-3 text-gray-400">{selectedCurrency.symbol}</span>
            <input
              type="number"
              min="1"
              step="100"
              value={estimatedBudget === 0 ? "" : estimatedBudget}
              onChange={(e) => {
                const value = Number.parseInt(e.target.value, 10)
                onEstimatedBudgetChange(isNaN(value) ? 0 : value)
              }}
              className="w-full pl-16 pr-4 h-11 rounded-lg border border-gray-200 text-charcoal text-sm focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all outline-none"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}