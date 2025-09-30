import React from 'react';
import { useField } from 'formik';
import { cn } from '../../util/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    name, 
    label, 
    helperText, 
    options,
    placeholder,
    className, 
    containerClassName,
    labelClassName,
    errorClassName,
    helperClassName,
    ...props 
  }, ref) => {
    const [field, meta] = useField(name);
    const hasError = meta.touched && meta.error;

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <label 
            htmlFor={name} 
            className={cn(
              "block text-sm font-medium text-gray-700",
              labelClassName
            )}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <select
            {...field}
            {...props}
            ref={ref}
            id={name}
            className={cn(
              "w-full px-4 py-3 pr-10 border rounded-lg transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:border-transparent",
              "bg-white appearance-none cursor-pointer",
              hasError 
                ? "border-red-300 focus:ring-red-500" 
                : "border-gray-300 focus:ring-blue-500",
              "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
              className
            )}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Dropdown Icon */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg 
              className="w-5 h-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </div>
        </div>
        
        {hasError && (
          <p className={cn("text-sm text-red-600", errorClassName)}>
            {meta.error}
          </p>
        )}
        
        {helperText && !hasError && (
          <p className={cn("text-sm text-gray-500", helperClassName)}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";