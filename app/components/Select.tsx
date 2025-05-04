import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  helperText?: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
  isMulti?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  fullWidth = false,
  helperText,
  options,
  className = '',
  onChange,
  value,
  isMulti,
  ...props
}) => {
  const baseStyles = 'rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all duration-200';
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  
  return (
    <div className={`${widthClass} ${className} group`}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
          {label}
        </label>
      )}
      <select
        className={`${baseStyles} ${widthClass} ${errorClass} appearance-none bg-no-repeat bg-right pr-8`}
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundSize: '1.5em 1.5em'
        }}
        value={value}
        onChange={handleChange}
        multiple={isMulti}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-xs text-red-500 animate-fadeIn">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Select;
