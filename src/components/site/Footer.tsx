"use client";

import { Instagram, Send } from "lucide-react";
import { Monogram, OutlineButton, WineButton } from "@/components/site/bits";
import { useSite } from "@/lib/site-context";
import { NAV_ITEMS } from "@/lib/types";

export function Footer() {
  const { content, navigate, route } = useSite();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-cream/70">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr] md:gap-8">
          <div>
            <div className="flex items-center gap-3">
              <Monogram />
              <span className="font-display text-xl text-graphite">Елена Макарова</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-graphite-soft">
              {content.hero.subtitle}. Пространство бережной внутренней работы — от первых бесплатных практик до глубокого обучения.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <WineButton asLink href={content.contacts.telegramUrl} className="h-10 px-5 text-sm">
                <Send className="mr-2 h-4 w-4" /> Telegram
              </WineButton>
              {content.socials.instagramProfile ? (
                <OutlineButton asLink href={content.socials.instagramProfile} className="h-10 px-5 text-sm">
                  <Instagram className="mr-2 h-4 w-4" /> Instagram
                </OutlineButton>
              ) : null}
            </div>
          </div>

          <nav aria-label="Навигация в подвале">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">Разделы</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <button
                    type="button"
                    onClick={() => navigate(item.path)}
                    className={"text-sm transition-colors " + (route === item.path ? "font-semibold text-wine" : "text-graphite-soft hover:text-wine")}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">Связь</p>
            <ul className="mt-4 space-y-2.5 text-sm text-graphite-soft">
              <li>
                <a href={content.contacts.telegramUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-wine">
                  Telegram {content.contacts.telegramHandle}
                </a>
              </li>
              {content.contacts.email ? (
                <li><a href={`mailto:${content.contacts.email}`} className="transition-colors hover:text-wine">{content.contacts.email}</a></li>
              ) : (
                <li className="text-graphite-soft/70">E-mail — редактируемое поле в content.json</li>
              )}
              {content.contacts.phone ? (
                <li><a href={`tel:${content.contacts.phone.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-wine">{content.contacts.phone}</a></li>
              ) : (
                <li className="text-graphite-soft/70">Телефон — редактируемое поле в content.json</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs leading-relaxed text-graphite-soft/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Елена Макарова. Любовь исцеляет всё.</p>
          <p className="max-w-md sm:text-right">
            Практики не заменяют медицинскую помощь и не гарантируют конкретных результатов — это пространство внутренней работы.
          </p>
        </div>
      </div>
    </footer>
  );
}
