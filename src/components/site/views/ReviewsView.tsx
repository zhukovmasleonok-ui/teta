"use client";

import { useState } from "react";
import {
  GoldDivider,
  PlaceholderNote,
  Reveal,
  useDocumentTitle,
} from "@/components/site/bits";
import { ReviewCards, REVIEW_CATEGORIES } from "@/components/site/ReviewCards";
import { useSite } from "@/lib/site-context";
import { cn } from "@/lib/utils";

export function ReviewsView() {
  useDocumentTitle("Отзывы учеников и клиентов");
  const [cat, setCat] = useState("all");
  const hasAnyReal = false; // до добавления реальных отзывов показываем честные заглушки

  const tabs = Object.entries(REVIEW_CATEGORIES);

  return (
    <>
      <section className="relative overflow-hidden py-16 text-center sm:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 top-0 h-[380px] w-[380px] rounded-full bg-powder/50 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-champagne/50 bg-white/60 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-wine/80">
                Доверие
              </span>
            </div>
            <h1 className="font-display text-4xl leading-tight text-balance text-graphite sm:text-5xl">
              Отзывы учеников и клиентов
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-[1.85] text-graphite-soft sm:text-lg">
              Живые истории людей, которые практиковали с Еленой. Здесь нет выдуманных
              отзывов — до загрузки реальных материалов показываются аккуратные заглушки.
            </p>
            <GoldDivider className="mx-auto mt-8" />
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Категории */}
          <Reveal>
            <div className="flex flex-wrap justify-center gap-2.5">
              {tabs.map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCat(key)}
                  className={cn(
                    "rounded-full border px-5 py-2.5 text-sm tracking-wide transition-all",
                    cat === key
                      ? "border-wine bg-wine font-medium text-[#fdf9f3] shadow-soft"
                      : "border-line bg-white/60 text-graphite-soft hover:border-champagne hover:text-wine"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </Reveal>

          <ReviewCards category={cat} />

          <Reveal className="mt-12">
            <PlaceholderNote className="mx-auto max-w-3xl">
              Раздел поддерживает три формата: текстовый отзыв (с именем или псевдонимом —
              по разрешению автора), скриншот и видеоотзыв. Отзывы о медитациях, тренингах и
              обучении разделяются по категориям. Добавление — в панели администратора.
              {!hasAnyReal ? " Пока реальные отзывы не добавлены — здесь честные заглушки." : ""}
            </PlaceholderNote>
          </Reveal>
        </div>
      </section>
    </>
  );
}
