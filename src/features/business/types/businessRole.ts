export interface BusinessRole {
  business_id: string;
  user_id: string;
  role: "owner" | "admin" | "member";
  created_at: string;
}
