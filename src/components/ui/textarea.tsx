import React from 'react';
import { useField } from 'formik';
import { cn } from '../../util/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    name, 
    label, 
    helperText, 
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
        
        <textarea
          {...field}
          {...props}
          ref={ref}
          id={name}
          className={cn(
            "w-full px-4 py-3 border rounded-lg transition-colors duration-200 resize-none",
            "focus:outline-none focus:ring-2 focus:border-transparent",
            hasError 
              ? "border-red-300 focus:ring-red-500" 
              : "border-gray-300 focus:ring-blue-500",
            "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
            className
          )}
        />
        
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

Textarea.displayName = "Textarea";