import type { ReactNode } from "react";
import { CognitoProvider } from "@/components/providers/CognitoProvider";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <CognitoProvider>{children}</CognitoProvider>;
}
