// src/features/dashboard/components/DashboardViewToggle.tsx
"use client";

import { SegmentedControl } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function DashboardViewToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Only show the toggle on the main dashboard page
  if (pathname !== "/dashboard") {
    return null;
  }

  const projectFilter = searchParams.get("project");
  const currentView = projectFilter
    ? "list"
    : searchParams.get("view") || "projects";

  const handleViewChange = (value: string) => {
    if (value === "list") {
      router.push("/dashboard?view=list");
    } else {
      // "projects" view is the default, so we can clear the view param
      router.push("/dashboard");
    }
  };

  return (
    <SegmentedControl
      radius="xl"
      value={currentView}
      onChange={handleViewChange}
      data={[
        { label: "Projects", value: "projects" },
        { label: "List", value: "list" },
      ]}
      disabled={!!projectFilter}
    />
  );
}
