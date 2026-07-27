"use client";

import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { listMyAccounts } from "@/lib/maple/client";

interface MapleAccountState {
  accountId: string | null;
  accessToken: string | undefined;
  loading: boolean;
  error: string | null;
}

export function useMapleAccount(): MapleAccountState {
  const auth = useAuth();
  const accessToken = auth.user?.access_token;

  const [accountId, setAccountId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (auth.isLoading) return;

    if (!accessToken) {
      setAccountId(null);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    listMyAccounts(accessToken).then((result) => {
      if (cancelled) return;

      if (!result.ok) {
        setError(result.message);
        setAccountId(null);
      } else {
        setError(result.data.length === 0 ? "No Holler account found." : null);
        setAccountId(result.data[0]?.id ?? null);
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [accessToken, auth.isLoading]);

  return { accountId, accessToken, loading, error };
}
