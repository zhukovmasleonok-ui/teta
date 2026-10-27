"use client";

import { Instagram, Mail, MapPin, Phone, Send } from "lucide-react";
import {
  GoldDivider,
  OutlineButton,
  PlaceholderNote,
  Reveal,
  SectionHeading,
  WineButton,
  useDocumentTitle,
} from "@/components/site/bits";
import { InstagramCards } from "@/components/site/InstagramCards";
import { useSite } from "@/lib/site-context";

export function ContactsView() {
  const { content } = useSite();
  useDocumentTitle("Контакты и социальные сети");
  const c = content.contacts;

  return (
    <>
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-0 h-[360px] w-[360px] rounded-full bg-cream-deep/70 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-[300px] w-[300px] rounded-full bg-powder/50 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-champagne/50 bg-white/60 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-wine/80">
                Связь
              </span>
            </div>
            <h1 className="font-display text-4xl leading-tight text-balance text-graphite sm:text-5xl">
              Контакты
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-[1.85] text-graphite-soft sm:text-lg">
              Напишите Елене — это самый тёплый и быстрый способ познакомиться, выбрать
              практику или задать вопрос об обучении.
            </p>
            <GoldDivider className="mx-auto mt-8" />
          </Reveal>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Telegram */}
            <Reveal>
              <a
                href={c.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-[1.75rem] border border-wine/20 bg-wine-gradient p-8 text-[#f8efe4] shadow-soft transition-all duration-500 hover:-translate-y-1"
              >
                <Send className="h-7 w-7 text-champagne" />
                <p className="mt-5 font-display text-2xl">Telegram</p>
                <p className="mt-1 text-sm text-[#e8d9c8]/80">{c.telegramHandle}</p>
                <p className="mt-4 text-sm leading-relaxed text-[#e8d9c8]/75">
                  Канал с практиками и мыслями + личные сообщения для подбора обучения и
                  индивидуальной работы.
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-champagne">
                  Открыть Telegram →
                </span>
              </a>
            </Reveal>

            {/* Редактируемые поля */}
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col gap-4">
                <ContactRow
                  icon={<Mail className="h-5 w-5 text-gold" />}
                  label="E-mail"
                  value={c.email}
                  href={c.email ? `mailto:${c.email}` : undefined}
                />
                <ContactRow
                  icon={<Phone className="h-5 w-5 text-gold" />}
                  label="Телефон"
                  value={c.phone}
                  href={c.phone ? `tel:${c.phone.replace(/[^+\d]/g, "")}` : undefined}
                />
                <ContactRow
                  icon={<MapPin className="h-5 w-5 text-gold" />}
                  label="Город / формат"
                  value={c.city}
                />
                <PlaceholderNote className="mt-auto">
                  Пустые поля — редактируемые: администратор заполняет их в панели управления
                  (Настройки → Контакты).
                </PlaceholderNote>
              </div>
            </Reveal>
          </div>

          {/* Соцсети */}
          <Reveal className="mt-10">
            <div className="flex flex-col items-center gap-5 rounded-[1.75rem] border border-line bg-white/70 px-8 py-8 text-center shadow-softer sm:flex-row sm:justify-between sm:text-left">
              <div>
                <p className="font-display text-xl text-graphite">Социальные сети</p>
                <p className="mt-1.5 max-w-md text-sm leading-relaxed text-graphite-soft">
                  Instagram-публикации и Reel — короткие фрагменты живой практики.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {content.socials.instagramProfile ? (
                  <OutlineButton asLink href={content.socials.instagramProfile} className="h-11 px-6">
                    <Instagram className="mr-2 h-4 w-4" /> Профиль
                  </OutlineButton>
                ) : null}
                {content.socials.instagramReel ? (
                  <OutlineButton asLink href={content.socials.instagramReel} className="h-11 px-6">
                    <Instagram className="mr-2 h-4 w-4" /> Reel
                  </OutlineButton>
                ) : null}
                {content.socials.instagramPost ? (
                  <OutlineButton asLink href={content.socials.instagramPost} className="h-11 px-6">
                    <Instagram className="mr-2 h-4 w-4" /> Публикация
                  </OutlineButton>
                ) : null}
              </div>
            </div>
          </Reveal>

          {/* CTA в Telegram */}
          <Reveal className="mt-12 text-center">
            <SectionHeading
              eyebrow="Дальше"
              title="Не знаете, с чего начать?"
              lead="Напишите пару слов о себе — Елена подскажет подходящую практику: от бесплатных материалов до обучения."
            />
            <div className="mt-8">
              <WineButton asLink href={c.telegramUrl} size="lg">
                <Send className="mr-2 h-4 w-4" /> Написать в Telegram
              </WineButton>
            </div>
          </Reveal>
        </div>
      </section>

      <InstagramCards />
    </>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  href?: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-[1.25rem] border border-line bg-white/70 px-6 py-5 shadow-softer">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.18em] text-graphite-soft/70">{label}</p>
        {value ? (
          href ? (
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="block truncate text-[15px] font-medium text-graphite transition-colors hover:text-wine"
            >
              {value}
            </a>
          ) : (
            <p className="truncate text-[15px] font-medium text-graphite">{value}</p>
          )
        ) : (
          <p className="text-[15px] italic text-graphite-soft/60">Уточняется — редактируемое поле</p>
        )}
      </div>
    </div>
  );
}
