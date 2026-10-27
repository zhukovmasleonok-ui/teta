"use client";

import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Monogram } from "@/components/site/bits";
import { useSite } from "@/lib/site-context";
import { NAV_ITEMS } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Header() {
  const { route, navigate, content } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) =>
    path === "/" ? route === "/" : route.startsWith(path);

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "border-b border-line/80 bg-milk/85 shadow-softer backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        {/* Логотип */}
        <button
          type="button"
          onClick={() => go("/")}
          className="group flex items-center gap-3 text-left"
          aria-label="На главную"
        >
          <Monogram />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-lg text-graphite transition-colors group-hover:text-wine">
              Елена Макарова
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-graphite-soft">
              Глубокие практики
            </span>
          </span>
        </button>

        {/* Десктопная навигация */}
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Основная навигация">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => go(item.path)}
              className={cn(
                "rounded-full px-3.5 py-2 text-[13.5px] tracking-wide transition-colors",
                isActive(item.path)
                  ? "bg-powder/70 font-semibold text-wine"
                  : "text-graphite-soft hover:bg-cream hover:text-wine"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {/* CTA */}
          <Button
            onClick={() => go("/start")}
            className="hidden h-10 rounded-full bg-wine px-5 text-[13.5px] font-medium tracking-wide text-[#fdf9f3] shadow-soft hover:bg-wine-deep md:inline-flex"
          >
            Начать знакомство
          </Button>

          {/* Мобильное меню */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-line bg-white/60 xl:hidden"
                aria-label="Открыть меню"
              >
                <Menu className="h-5 w-5 text-wine" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[86vw] max-w-sm border-line bg-milk/95 backdrop-blur-xl"
            >
              <SheetHeader className="border-b border-line/70 pb-4 text-left">
                <SheetTitle className="flex items-center gap-3">
                  <Monogram size={38} />
                  <span className="font-display text-lg text-graphite">Елена Макарова</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-2 flex flex-col gap-1 px-2" aria-label="Мобильная навигация">
                {NAV_ITEMS.map((item) => (
                  <MobileNavItem
                    key={item.path}
                    label={item.label}
                    active={isActive(item.path)}
                    onClick={() => go(item.path)}
                  />
                ))}
                <div className="mt-4 px-2">
                  <Button
                    onClick={() => go("/start")}
                    className="h-12 w-full rounded-full bg-wine text-[15px] font-medium tracking-wide text-[#fdf9f3] shadow-soft hover:bg-wine-deep"
                  >
                    Начать знакомство
                  </Button>
                </div>
                <div className="mt-4 px-2 pb-2">
                  <p className="text-xs leading-relaxed text-graphite-soft">
                    Telegram:{" "}
                    <a
                      href={content.contacts.telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-wine underline decoration-champagne underline-offset-4"
                    >
                      {content.contacts.telegramHandle}
                    </a>
                  </p>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MobileNavItem({
  label,
  active,
  onClick,
}: ComponentProps<"button"> & { label: string; active: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] tracking-wide transition-colors",
        active
          ? "bg-powder/70 font-semibold text-wine"
          : "text-graphite hover:bg-cream hover:text-wine"
      )}
    >
      {label}
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          active ? "bg-wine" : "bg-champagne/50"
        )}
      />
    </button>
  );
}
