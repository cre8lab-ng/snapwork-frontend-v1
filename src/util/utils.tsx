import { toast } from "sonner";

export const notifyError = (errorMessage: string) => {
    return toast.error(errorMessage);
  };
  
  export const notifySuccess = (successMessage: string) => {
    return toast.success(successMessage);
  };