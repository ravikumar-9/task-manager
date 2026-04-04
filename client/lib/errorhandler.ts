import { toast } from "react-toastify";

export const apiErrorHandler = (error: unknown) => {
  if (error instanceof Error) {
    const response = (error as any).response;
    const stautsCode = response?.status;
    if (stautsCode === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error(
        response?.data?.message ||
          error.message ||
          "An unexpected error occurred"
      );
    }
  }
};
