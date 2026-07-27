import type { components } from "./schema";
import { ok, transportFailure, type Result } from "./result";

export type Account = components["schemas"]["Account"];
export type Transfer = components["schemas"]["Transfer"];
export type Balances = components["schemas"]["GetMyBalancesResponse"];

const BASE_URL =
  process.env.NEXT_PUBLIC_MAPLE_API_URL ?? "http://localhost:8080";
const API_PREFIX = "/api/v1";

async function request<T>(
  path: string,
  accessToken: string | undefined
): Promise<Result<T>> {
  if (!accessToken) {
    return transportFailure<T>("Not signed in.", 401);
  }

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${API_PREFIX}${path}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });
  } catch {
    return transportFailure<T>("Could not reach the Holler service.");
  }

  if (!response.ok) {
    return transportFailure<T>(
      `Holler service returned ${response.status}.`,
      response.status
    );
  }

  try {
    return ok<T>((await response.json()) as T);
  } catch {
    return transportFailure<T>(
      "Holler service returned a malformed response.",
      response.status
    );
  }
}

export async function listMyAccounts(
  accessToken: string | undefined
): Promise<Result<Account[]>> {
  const result = await request<{ data: Account[] }>("/me/accounts", accessToken);
  return result.ok ? ok(result.data.data ?? []) : result;
}

export async function getAccountActivity(
  accountId: string,
  accessToken: string | undefined
): Promise<Result<Transfer[]>> {
  const result = await request<{ data: Transfer[] }>(
    `/accounts/${accountId}/activity`,
    accessToken
  );
  return result.ok ? ok(result.data.data ?? []) : result;
}

export async function getWalletBalances(
  accountId: string,
  accessToken: string | undefined
): Promise<Result<Balances>> {
  return request<Balances>(`/accounts/${accountId}/wallet/balances`, accessToken);
}
