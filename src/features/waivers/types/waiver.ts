export interface Waiver {
  id: string;
  title: string;
  lastModified: string;
  content: string;
  type: "conditional" | "unconditional";
  archived: boolean;
  created_at: string;
  updated_at: string;
}
