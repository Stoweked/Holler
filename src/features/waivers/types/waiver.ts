export interface Waiver {
  id: string;
  title: string;
  lastModified: string;
  content: string;
  type: "conditional" | "unconditional";
}
