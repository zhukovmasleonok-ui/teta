"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  GoldDivider,
  Reveal,
  useDocumentTitle,
} from "@/components/site/bits";
import { useSite } from "@/lib/site-context";

export function TrainingsView() {
  const { content, navigate } = useSite();
  useDocumentTitle("Тренинги в записи");

  return (
    <>
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-0 h-[380px] w-[380px] rounded-full bg-cream-deep/70 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-[300px] w-[300px] rounded-full bg-powder/50 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 text-center sm:px-8">
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-champagne/50 bg-white/60 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-wine/80">
                Каталог
              </span>
            </div>
            <h1 className="font-display text-4xl leading-tight text-balance text-graphite sm:text-5xl">
              Трансформационные тренинги в записи
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.85] text-graphite-soft sm:text-lg">
              Каждая программа — это бережное пространство для внутренней работы в своём
              темпе. Каталог пополняется: новые тренинги добавляются в панели администратора.
            </p>
            <GoldDivider className="mx-auto mt-8" />
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {content.trainings.map((t, i) => (
              <Reveal key={t.id} delay={0.08 * i}>
                <article
                  className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-line bg-white/75 shadow-softer transition-all duration-500 hover:-translate-y-1 hover:shadow-soft"
                  onClick={() => navigate(`/training/${t.slug}`)}
                >
                  <div className="relative aspect-[16/8] overflow-hidden">
                    <Image
                      src={t.coverUrl || "/images/training-rejection.jpg"}
                      alt={t.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-plum/40 via-transparent to-transparent" />
                    <Badge className="absolute left-5 top-5 rounded-full border-0 bg-white/85 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-wine backdrop-blur">
                      Запись · свой темп
                    </Badge>
                  </div>
                  <div className="flex flex-1 flex-col p-7 sm:p-8">
                    <h2 className="font-display text-2xl leading-snug text-graphite">
                      {t.title}
                    </h2>
                    {t.tagline ? (
                      <p className="mt-2 text-xs italic leading-relaxed text-graphite-soft/80">
                        {t.tagline}
                      </p>
                    ) : null}
                    <p className="mt-4 line-clamp-3 text-[15px] leading-relaxed text-graphite-soft">
                      {t.description}
                    </p>
                    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
                      <span className="rounded-full bg-powder/60 px-4 py-1.5 text-sm font-semibold text-wine">
                        {t.priceText || "Уточняется"}
                      </span>
                      <span className="text-sm text-graphite-soft">{t.formatText}</span>
                      <span className="ml-auto inline-flex items-center gap-2 text-sm font-semibold text-wine transition-transform duration-300 group-hover:translate-x-1">
                        Подробнее <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {content.trainings.length === 0 ? (
            <p className="py-16 text-center text-graphite-soft">
              Каталог наполняется — тренинги появятся совсем скоро.
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}
