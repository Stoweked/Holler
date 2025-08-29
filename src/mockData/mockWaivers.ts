import { Waiver } from "@/features/waivers/types/waiver";

export const mockWaivers: Waiver[] = [
  {
    id: "1",
    title: "Waiver for J2 Homes - August",
    lastModified: "2 days ago",
    content:
      "<h2>Waiver for J2 Homes - August</h2><p>This is the content for the August waiver for J2 Homes.</p>",
    type: "conditional",
  },
  {
    id: "2",
    title: "Layton Construction Final Waiver",
    lastModified: "1 week ago",
    content:
      "<h2>Layton Construction Final Waiver</h2><p>This is the final waiver content for Layton Construction.</p>",
    type: "unconditional",
  },
  {
    id: "3",
    title: "Wasatch Drywall Progress Payment",
    lastModified: "3 weeks ago",
    content:
      "<h2>Wasatch Drywall Progress Payment</h2><p>Progress payment waiver content for Wasatch Drywall.</p>",
    type: "conditional",
  },
];
