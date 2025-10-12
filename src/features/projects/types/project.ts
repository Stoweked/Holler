import { Profile } from "@/features/account/types/account";
import { Business } from "@/features/business/types/business";

export interface Project {
  id: string;
  user_id: string;
  name: string;
  address: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  status: "active" | "completed" | "on hold";
  created_at: string;
  profiles?: Profile[]; // Users associated with the project
  businesses?: Business[]; // Businesses associated with the project
}
