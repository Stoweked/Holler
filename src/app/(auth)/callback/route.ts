// src/app/(auth)/callback/route.ts
import { createServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createServer();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // The crucial change is to check for the x-forwarded-host header
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        // We can be sure that there is no load balancer in between
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        // If the forwarded host exists, use it to construct the redirect URL
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        // Fallback to the original origin
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/error`);
}
