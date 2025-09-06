"use client";

import { ActionIcon, Box, Group } from "@mantine/core";
import { Provider } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import {
  AppleLogoDark,
  AppleLogoLight,
  FacebookLogo,
  GoogleLogo,
} from "./SocialLogos";

export function OAuthButtons() {
  const supabase = createClient();

  // Handle OAuth sign-in
  const handleOAuthLogin = async (provider: Provider) => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    });
  };

  return (
    <Group grow wrap="nowrap">
      {/* Google */}
      <ActionIcon
        aria-label="Log in with Google"
        size="xl"
        radius="xl"
        variant="default"
        onClick={() => handleOAuthLogin("google")}
      >
        <GoogleLogo />
      </ActionIcon>

      {/* Facebook */}
      {/* <ActionIcon
        aria-label="Log in with Facebook"
        size="xl"
        radius="xl"
        variant="default"
        onClick={() => handleOAuthLogin("facebook")}
      >
        <FacebookLogo />
      </ActionIcon> */}

      {/* Apple */}
      {/* <ActionIcon
        aria-label="Log in with Apple"
        size="xl"
        radius="xl"
        variant="default"
        onClick={() => handleOAuthLogin("apple")}
      >
        <Box darkHidden>
          <AppleLogoLight />
        </Box>
        <Box lightHidden>
          <AppleLogoDark />
        </Box>
      </ActionIcon> */}
    </Group>
  );
}
