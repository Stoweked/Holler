export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; reason: "transport"; status?: number; message: string };

export function ok<T>(data: T): Result<T> {
  return { ok: true, data };
}

export function transportFailure<T>(
  message: string,
  status?: number
): Result<T> {
  return { ok: false, reason: "transport", status, message };
}
