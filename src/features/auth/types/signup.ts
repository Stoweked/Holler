import { UseFormReturnType } from "@mantine/form";

export interface MultiStepSignupFormValues {
  email: string;
  full_name: string;
  password: string;
  confirmPassword: string;
  business_name: string;
  phone_number: string;
}

export type SignupFormType = UseFormReturnType<MultiStepSignupFormValues>;
