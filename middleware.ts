// middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Refresh session before checking auth. Supabase Auth helpers do this automatically.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const publicPaths = [
    "/",
    "/login",
    "/signup",
    "/signup/multi-step",
    "/auth/confirm",
    "/forgot-password",
    "/reset-password",
  ];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  // if user is signed in and the current path is public, redirect to dashboard
  if (user && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // if user is not signed in and the current path is not public, redirect to landing
  if (!user && !isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
