"use client";

import Image from "next/image";
import { ArrowRight, CalendarDays, Leaf, Link2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  GoldDivider,
  PlaceholderNote,
  Reveal,
  SectionHeading,
  VideoEmbed,
  WineButton,
  useDocumentTitle,
} from "@/components/site/bits";
import { useSite } from "@/lib/site-context";
import { seasonArchive, splitLines, type SeasonMethod } from "@/lib/types";

const SEASON_ICONS: Record<string, typeof Leaf> = {
  autumn: Leaf,
  winter: SnowflakeIcon,
  spring: SproutIcon,
  summer: SunIcon,
};

const SEASON_LABELS: Record<string, string> = {
  autumn: "Осень",
  winter: "Зима",
  spring: "Весна",
  summer: "Лето",
};

export function SeasonView() {
  const { content, navigate } = useSite();
  useDocumentTitle("Методика сезона");
  const seasons = content.seasons;

  return (
    <>
      {/* Вводный экран */}
      <section className="relative overflow-hidden py-16 text-center sm:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-0 h-[360px] w-[360px] rounded-full bg-powder/50 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-[300px] w-[300px] rounded-full bg-cream-deep/70 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-champagne/50 bg-white/60 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-wine/80">
                Уникальный обновляемый раздел
              </span>
            </div>
            <h1 className="font-display text-4xl leading-tight text-balance text-graphite sm:text-5xl">
              Методика сезона
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-[1.85] text-graphite-soft sm:text-lg">
              Каждое время года — своя тема внутренней работы. Раздел обновляется
              автоматически по датам или вручную через панель администратора: тема, тексты,
              обложка, видео и материалы.
            </p>
            <GoldDivider className="mx-auto mt-8" />
          </Reveal>
        </div>
      </section>

      {/* Текущая тема */}
      <CurrentSeason season={seasons.length ? activeOrFirst(seasons) : null} />

      {/* Архив */}
      <section className="bg-cream-gradient py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Архив"
            title="Предыдущие темы"
            lead="Прошедшие сезоны остаются в архиве — к практикам можно возвращаться."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {seasonArchive(seasons).map((s, i) => (
              <Reveal key={s.id} delay={0.07 * i}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white/75 shadow-softer transition-all duration-500 hover:-translate-y-1 hover:shadow-soft">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={s.coverUrl || "/images/season-autumn.jpg"}
                      alt={s.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-wine backdrop-blur">
                      {SEASON_LABELS[s.seasonTag] || "Сезон"}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-gold">
                      {s.periodText}
                    </p>
                    <h3 className="mt-2.5 font-display text-lg leading-snug text-graphite">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-graphite-soft">
                      {s.mainIdea || s.authorText}
                    </p>
                    <div className="mt-auto pt-4">
                      <ArchiveToggle season={s} />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function activeOrFirst(seasons: SeasonMethod[]) {
  const now = Date.now();
  const byDate = seasons.find((s) => {
    if (!s.startDate || !s.endDate) return false;
    return now >= new Date(s.startDate).getTime() && now <= new Date(s.endDate).getTime();
  });
  return byDate ?? seasons.find((s) => s.isActive) ?? seasons[0];
}

function CurrentSeason({ season }: { season: SeasonMethod | null }) {
  const { content, navigate } = useSite();
  if (!season) {
    return (
      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <PlaceholderNote>
            Активная тема сезона пока не задана — администратор может создать её в панели
            управления.
          </PlaceholderNote>
        </div>
      </section>
    );
  }

  const Icon = SEASON_ICONS[season.seasonTag] ?? Leaf;
  const materials = splitLines(season.materials);

  return (
    <section className="pb-20 sm:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <article className="overflow-hidden rounded-[2.25rem] border border-line bg-white/75 shadow-soft">
            {/* Обложка */}
            <div className="relative h-[38vh] min-h-[280px] w-full overflow-hidden sm:h-[46vh]">
              <Image
                src={season.coverUrl || "/images/season-autumn.jpg"}
                alt={season.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum/65 via-plum/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl px-6 pb-8 sm:px-10 sm:pb-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-wine backdrop-blur">
                    <Icon className="h-3.5 w-3.5" />
                    {SEASON_LABELS[season.seasonTag] || "Сезон"}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-[11px] font-medium tracking-wide text-graphite-soft backdrop-blur">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {season.periodText}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-3xl leading-tight text-balance text-white drop-shadow sm:text-4xl">
                  {season.title}
                </h2>
              </div>
            </div>

            <div className="p-7 sm:p-10 lg:p-12">
              {/* Авторский текст */}
              <p className="font-display text-lg italic text-gold">Слово Елены</p>
              <p className="mt-4 whitespace-pre-line text-base leading-[1.85] text-graphite-soft sm:text-[17px]">
                {season.authorText}
              </p>

              {/* Основная идея */}
              {season.mainIdea ? (
                <div className="mt-9 rounded-2xl border border-champagne/40 bg-cream/60 px-6 py-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                    Основная идея сезона
                  </p>
                  <p className="mt-3 whitespace-pre-line text-[15px] leading-[1.8] text-graphite">
                    {season.mainIdea}
                  </p>
                </div>
              ) : null}

              {/* Практика */}
              {season.practiceText ? (
                <div className="mt-9">
                  <p className="font-display text-xl text-graphite">Рекомендуемая практика</p>
                  <p className="mt-4 whitespace-pre-line text-[15px] leading-[1.8] text-graphite-soft">
                    {season.practiceText}
                  </p>
                </div>
              ) : null}

              {/* Видео / аудиомедитация */}
              <div className="mt-9">
                <VideoEmbed
                  url={season.mediaUrl}
                  poster={season.coverUrl}
                  label="Видео или аудиомедитация сезона"
                />
              </div>

              {/* Полезные материалы */}
              {materials.length > 0 ? (
                <div className="mt-9">
                  <p className="font-display text-xl text-graphite">Полезные материалы</p>
                  <ul className="mt-4 space-y-3">
                    {materials.map((line, i) => {
                      const [label, target] = line.split("|").map((x) => x.trim());
                      const isInternal = target?.startsWith("/");
                      return (
                        <li key={i}>
                          {isInternal ? (
                            <button
                              type="button"
                              onClick={() => target && navigate(target)}
                              className="group flex w-full items-center gap-3 rounded-xl border border-line bg-white/60 px-5 py-3.5 text-left transition-colors hover:border-champagne"
                            >
                              <Link2 className="h-4 w-4 shrink-0 text-gold" />
                              <span className="text-sm text-graphite-soft group-hover:text-wine">
                                {label || target}
                              </span>
                              <ArrowRight className="ml-auto h-4 w-4 text-champagne transition-transform group-hover:translate-x-1" />
                            </button>
                          ) : target ? (
                            <a
                              href={target}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center gap-3 rounded-xl border border-line bg-white/60 px-5 py-3.5 transition-colors hover:border-champagne"
                            >
                              <Link2 className="h-4 w-4 shrink-0 text-gold" />
                              <span className="text-sm text-graphite-soft group-hover:text-wine">
                                {label || target}
                              </span>
                              <ArrowRight className="ml-auto h-4 w-4 text-champagne transition-transform group-hover:translate-x-1" />
                            </a>
                          ) : (
                            <span className="text-sm text-graphite-soft">{label}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}

              {season.productLink ? (
                <PlaceholderNote className="mt-8">
                  К сезону подключён отдельный продукт — ссылка:{" "}
                  <a href={season.productLink} className="font-medium text-wine underline">
                    {season.productLink}
                  </a>
                </PlaceholderNote>
              ) : null}

              {/* CTA */}
              <div className="mt-10 flex flex-col items-center gap-3.5 border-t border-line pt-8 sm:flex-row sm:justify-center">
                <WineButton asLink href={content.contacts.telegramUrl} size="lg">
                  <Send className="mr-2 h-4 w-4" /> Обсудить практику в Telegram
                </WineButton>
                <Button
                  variant="outline"
                  className="h-12 rounded-full border-wine/30 px-8 text-wine hover:bg-powder/50"
                  onClick={() => navigate("/start")}
                >
                  Бесплатные материалы <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function ArchiveToggle({ season }: { season: SeasonMethod }) {
  const { content } = useSite();
  return (
    <details className="group">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm font-semibold text-wine marker:hidden [&::-webkit-details-marker]:hidden">
        Подробнее о теме
        <span className="transition-transform group-open:rotate-45">+</span>
      </summary>
      <p className="mt-3 text-sm leading-relaxed text-graphite-soft">{season.authorText}</p>
      <a
        href={content.contacts.telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-wine underline decoration-champagne underline-offset-4"
      >
        Запросить практику в Telegram
      </a>
    </details>
  );
}

function SnowflakeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" strokeLinecap="round" />
      <path d="M12 6.5L9.8 4.8M12 6.5l2.2-1.7M12 17.5l-2.2 1.7M12 17.5l2.2 1.7" strokeLinecap="round" />
    </svg>
  );
}

function SproutIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M12 21v-8" strokeLinecap="round" />
      <path d="M12 13C12 9 9 7 4.5 7C4.5 11 7.5 13 12 13Z" strokeLinejoin="round" />
      <path d="M12 13C12 10 14.5 8 19.5 8C19.5 11.5 17 13 12 13Z" strokeLinejoin="round" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8" strokeLinecap="round" />
    </svg>
  );
}
