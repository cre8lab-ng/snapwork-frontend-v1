import React from 'react';
import { Formik, Form as FormikForm, FormikProps, FormikConfig, FormikHelpers, FormikValues } from 'formik';
import { cn } from '../../util/utils';

export interface FormProps<T extends FormikValues = FormikValues> extends Omit<FormikConfig<T>, 'children'> {
  children: React.ReactNode | ((props: FormikProps<T>) => React.ReactNode);
  className?: string;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<void>;
}

export function Form<T extends FormikValues = FormikValues>({ 
  children, 
  className, 
  onSubmit,
  ...formikProps 
}: FormProps<T>) {
  return (
    <Formik {...formikProps} onSubmit={onSubmit}>
      {(formikBag) => (
        <FormikForm className={cn("space-y-6", className)}>
          {typeof children === 'function' ? children(formikBag) : children}
        </FormikForm>
      )}
    </Formik>
  );
}

// Export common form components for easy importing
export { Input } from './input';
export { Textarea } from './textarea';
export { Select } from './select';
export type { InputProps } from './input';
export type { TextareaProps } from './textarea';
export type { SelectProps, SelectOption } from './select';