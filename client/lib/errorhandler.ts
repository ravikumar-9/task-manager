import { toast } from "react-toastify";

export const apiErrorHandler = (error: unknown) => {
  if (error instanceof Error) {
    const response = (error as any).response;
    const stautsCode = response?.status;
     if (stautsCode!==401){
      const message =
        response?.data?.message || "An error occurred. Please try again.";
      toast.error(message);
     }
  }
};
