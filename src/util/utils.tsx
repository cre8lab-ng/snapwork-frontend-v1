import { toast } from "sonner";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const notifyError = (errorMessage: string) => {
  return toast.error(errorMessage);
};

export const notifySuccess = (successMessage: string) => {
  return toast.success(successMessage);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
