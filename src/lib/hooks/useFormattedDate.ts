// src/lib/hooks/dates/useFormattedDate.ts
import { useMemo } from "react";
import dayjs from "dayjs";

export const useFormattedDate = (date: string | null | undefined) => {
  return useMemo(() => {
    if (!date) return "";
    return dayjs(date).format("MMMM D, YYYY");
  }, [date]);
};
