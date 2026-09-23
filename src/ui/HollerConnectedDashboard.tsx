"use client";

import AppLayout from "../components/layout/AppLayout";
import Dashboard from "../features/dashboard/components/Dashboard";

/** Full transactions dashboard, including its shell and feature providers. */
export function HollerConnectedDashboard() {
  return <AppLayout><Dashboard /></AppLayout>;
}
