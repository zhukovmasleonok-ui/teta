"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/site/bits";
import { useSite } from "@/lib/site-context";

/**
 * Карточки Instagram — переходы к оригинальным публикациям.
 * Официальное встраивание Instagram (iframe) в изолированных средах часто
 * недоступно, поэтому используется надёжный fallback: красивые карточки.
 * Ссылки редактируются в панели администратора (Настройки → Соцсети).
 */
export function InstagramCards() {
  const { content } = useSite();
  const cards = [
    { url: content.socials.instagramReel, label: "Instagram Reel", cover: "/images/season-summer.jpg" },
    { url: content.socials.instagramPost, label: "Instagram Post", cover: "/images/about-portrait.jpg" },
  ].filter((c) => c.url);

  if (cards.length === 0) return null;

  return (
    <section className="bg-cream-gradient py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Социальные сети"
          title="Атмосфера в Instagram"
          lead="Короткие видео и публикации — фрагменты живой практики и вдохновения."
        />
        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={i} delay={0.08 * i}>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line shadow-softer transition-all duration-500 hover:-translate-y-1 hover:shadow-soft"
              >
                <Image
                  src={c.cover}
                  alt={c.label}
                  fill
                  sizes="(max-width: 640px) 100vw, 380px"
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/55 via-plum/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/75">
                      Открыть публикацию
                    </p>
                    <p className="mt-1 font-display text-xl text-white">{c.label}</p>
                  </div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-wine transition-transform group-hover:scale-110">
                    <Instagram className="h-5 w-5" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
