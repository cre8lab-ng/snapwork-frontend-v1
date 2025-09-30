"use client";

import { cn } from "../../util/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

const baseStyles = "rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";

const variants = {
  default: "bg-darkblue text-blue-200 p-3 md:block",
  primary: "border p-3 md:block text-darkblue",
  secondary: "bg-white text-darkblue font-semibold py-2 px-6 ",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-12 py-2 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
