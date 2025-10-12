export interface Profile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  phone_number?: string;
  username?: string;
  avatar_url?: string;
  business_name?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  auth_provider?: string;
  dismissed_business_prompt?: boolean;
}
