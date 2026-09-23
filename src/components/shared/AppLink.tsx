"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { useRouter } from "@/lib/navigation/NavigationProvider";

/** Real anchor semantics, with in-app navigation for unmodified internal clicks. */
export const AppLink = forwardRef<HTMLAnchorElement, ComponentPropsWithoutRef<"a">>(
  function AppLink({ href, onClick, target, download, ...props }, ref) {
    const router = useRouter();
    return <a {...props} ref={ref} href={href} target={target} download={download}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
            (target && target !== "_self") || download != null || !href?.startsWith("/") || href.startsWith("//")) return;
        event.preventDefault();
        router.push(href);
      }} />;
  }
);
