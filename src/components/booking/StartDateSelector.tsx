"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle } from "lucide-react";
import { format, addDays } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface StartDateSelectorProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  duration: number;
  onDateSelect: (date: Date | undefined) => void;
  error?: string;
}

export const StartDateSelector = ({
  startDate,
  endDate,
  duration,
  onDateSelect,
  error,
}: StartDateSelectorProps) => {
  const today = new Date();

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onDateSelect(date);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-6 border-t border-gray-100"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-full bg-ocean-blue/20 flex items-center justify-center text-white">
          <Calendar size={16} className="text-midnight-blue" />
        </div>
        <h2 className="text-2xl font-bold text-midnight-blue">Trip Dates</h2>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 hover:bg-white">
          Select Start Date
        </Label>
        <div className="mt-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full pl-3 h-10 text-left font-normal bg-white border-gray-200 text-charcoal text-sm rounded-lg",
                  "transition-all duration-200 outline-none focus:outline-none hover:border-ocean-blue focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20"
                )}
              >
                <Calendar className="mr-2 h-4 w-4 text-midnight-blue" />
                {startDate
                  ? format(startDate, "PPP")
                  : "Select trip start date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 border-ocean-blue"
              align="start"
            >
              <CalendarComponent
                mode="single"
                selected={startDate || undefined}
                onSelect={handleDateSelect}
                disabled={(date) => date < today}
                initialFocus
                classNames={{
                  day_selected:
                    "text-white bg-ocean-blue hover:bg-ocean-blue hover:text-white",
                  day_today: "bg-gray-100 text-midnight-blue",
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {startDate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-lg overflow-hidden border border-green-100"
        >
          <div className="bg-green-50 p-3">
            <h3 className="text-sm font-medium text-green-800 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Trip Date Confirmed
            </h3>
          </div>
          <div className="p-3 space-y-2 bg-white">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Duration:</span>
              <span className="font-medium">{duration} days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Start Date:</span>
              <span className="font-medium">{format(startDate, "PPP")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">End Date:</span>
              <span className="font-medium">
                {endDate ? format(endDate, "PPP") : ""}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </motion.div>
  );
};