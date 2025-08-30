"use client";

import { ActionIcon, Group } from "@mantine/core";
import { Provider } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { AppleLogo, FacebookLogo, GoogleLogo } from "./SocialLogos";

interface OAuthButtonsProps {
  onError?: (error: unknown) => void;
}

export function OAuthButtons({ onError }: OAuthButtonsProps) {
  const supabase = createClient();

  // Handle OAuth sign-in
  const handleOAuthLogin = async (provider: Provider) => {
    console.log("OAuth clicked!");
    // try {
    //   await supabase.auth.signInWithOAuth({
    //     provider,
    //     options: {
    //       redirectTo: `${location.origin}/auth/callback`,
    //     },
    //   });
    // } catch (error) {
    //   console.error("OAuth login failed:", error);
    //   onError?.(error);
    // }
  };

  return (
    <Group grow wrap="nowrap">
      <ActionIcon
        aria-label="Log in with Google"
        size="xl"
        radius="xl"
        variant="default"
        onClick={() => handleOAuthLogin("google")}
      >
        <GoogleLogo />
      </ActionIcon>

      <ActionIcon
        aria-label="Log in with Facebook"
        size="xl"
        radius="xl"
        variant="default"
        onClick={() => handleOAuthLogin("facebook")}
      >
        <FacebookLogo />
      </ActionIcon>

      <ActionIcon
        aria-label="Log in with Apple"
        size="xl"
        radius="xl"
        variant="default"
        onClick={() => handleOAuthLogin("apple")}
      >
        <AppleLogo />
      </ActionIcon>
    </Group>
  );
}
