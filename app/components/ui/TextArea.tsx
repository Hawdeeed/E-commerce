import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  helperText?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  fullWidth = false,
  helperText,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all duration-200';
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
  
  return (
    <div className={`${widthClass} ${className} group`}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
          {label}
        </label>
      )}
      <textarea
        className={`${baseStyles} ${widthClass} ${errorClass} min-h-[100px]`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500 animate-fadeIn">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default TextArea;
