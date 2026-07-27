"use client";

import React from "react";
import { AuthProvider } from "react-oidc-context"; // Ensure react-oidc-context is installed

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_VR838DNx9",
  client_id: "ot441lpfl857ucr10cn7ru144",
  redirect_uri:
    process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI ??
    "http://localhost:3000/auth/callback",
  response_type: "code",
  scope: "email openid phone",
};

export function CognitoProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider {...cognitoAuthConfig}>
      {children}
    </AuthProvider>
  );
}
