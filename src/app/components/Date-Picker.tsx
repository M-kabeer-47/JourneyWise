import React, { useState } from 'react'
import { format } from 'date-fns'

interface DatePickerProps {
  label: string
  value: string
  onChange: (date: string) => void
  error?: string
}

const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange, error }) => {
  const [day, setDay] = useState(value ? new Date(value).getDate().toString() : '')
  const [month, setMonth] = useState(value ? (new Date(value).getMonth() + 1).toString() : '')
  const [year, setYear] = useState(value ? new Date(value).getFullYear().toString() : '')

  const updateDate = (newDay: string, newMonth: string, newYear: string) => {
    if (newDay && newMonth && newYear) {
      const date = new Date(parseInt(newYear), parseInt(newMonth) - 1, parseInt(newDay))
      onChange(format(date, 'yyyy-MM-dd'))
    }
  }

  const handleChange = (field: 'day' | 'month' | 'year', value: string) => {
    switch (field) {
      case 'day':
        setDay(value)
        updateDate(value, month, year)
        break
      case 'month':
        setMonth(value)
        updateDate(day, value, year)
        break
      case 'year':
        setYear(value)
        updateDate(day, month, value)
        break
    }
  }

  const generateOptions = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const selectClass = "w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-midnightBlue focus:border-transparent transition-all duration-200"

  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-semibold mb-2">{label}</label>
      <div className="flex space-x-2">
        <select
          value={day}
          onChange={(e) => handleChange('day', e.target.value)}
          className={selectClass}
        >
          <option value="">Day</option>
          {generateOptions(1, 31).map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select
          value={month}
          onChange={(e) => handleChange('month', e.target.value)}
          className={selectClass}
        >
          <option value="">Month</option>
          {generateOptions(1, 12).map(m => (
            <option key={m} value={m}>{format(new Date(2000, m - 1, 1), 'MMMM')}</option>
          ))}
        </select>
        <select
          value={year}
          onChange={(e) => handleChange('year', e.target.value)}
          className={selectClass}
        >
          <option value="">Year</option>
          {generateOptions(1900, new Date().getFullYear()).reverse().map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      {error && <p className="mt-1 text-red-500 text-xs italic">{error}</p>}
    </div>
  )
}

export default DatePicker

