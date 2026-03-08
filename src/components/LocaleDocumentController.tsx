"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "@/lib/site-content";

export function LocaleDocumentController() {
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    document.documentElement.lang =
      getLocaleFromPathname(pathname) === "en" ? "en" : "pt-BR";
  }, [pathname]);

  return null;
}
