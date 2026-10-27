"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { SiteContent } from "@/lib/types";

type SiteCtx = {
  content: SiteContent;
  refresh: () => Promise<void>;
  route: string;
  navigate: (path: string) => void;
};

const Ctx = createContext<SiteCtx | null>(null);

export function useSite(): SiteCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}

function parseHash(): string {
  if (typeof window === "undefined") return "/";
  const h = window.location.hash;
  if (!h || h === "#" || h === "#/") return "/";
  const path = h.startsWith("#") ? h.slice(1) : h;
  return path.startsWith("/") ? path : `/${path}`;
}

export function SiteProvider({ initialContent, children }: { initialContent: SiteContent; children: React.ReactNode }) {
  const [content] = useState<SiteContent>(initialContent);
  const [route, setRoute] = useState<string>(() => parseHash());

  const refresh = useCallback(async () => { return; }, []);

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = useCallback((path: string) => {
    const current = parseHash();
    if (current === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = path;
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [route]);

  return <Ctx.Provider value={{ content, refresh, route, navigate }}>{children}</Ctx.Provider>;
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
