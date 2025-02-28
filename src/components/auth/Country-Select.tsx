import React from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'

interface CountrySelectProps {
  value: string
  onChange: (country: string) => void
  onCountryChange: (country: string) => void
  error?: string
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange, onCountryChange, error }) => {
  const options = React.useMemo(() => countryList().getData(), [])

  const handleChange = (option: any) => {
    if (option) {
      onChange(option.value)
      onCountryChange(option.value)
    } else {
      onChange('')
      onCountryChange('')
    }
  }

  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-semibold mb-2">Country</label>
      <Select
        options={options}
        value={options.find(option => option.value === value)}
        onChange={handleChange}
        isClearable={true}
        className="text-gray-700"
        styles={{
          control: (provided, state) => ({
            ...provided,
            borderColor: error ? '#EF4444' : state.isFocused ? 'midnightBlue' : '#D1D5DB',
            boxShadow: state.isFocused ? '0 0 0 1px midnightBlue' : 'none',
            '&:hover': {
              borderColor: error ? '#EF4444' : 'midnightBlue',
            },
            borderRadius: '0.375rem',
            padding: '2px',
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#3B82F6' : state.isFocused ? '#E5E7EB' : 'white',
            color: state.isSelected ? 'white' : '#4B5563',
          }),
          placeholder: (provided) => ({
            ...provided,
            color: '#9CA3AF',
          }),
        }}
        placeholder="Select a country"
      />
      {error && <p className="mt-1 text-red-500 text-xs italic">{error}</p>}
    </div>
  )
}

export default CountrySelect

