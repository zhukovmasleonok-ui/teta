"use client";

import Image from "next/image";
import { ExternalLink, ImageIcon, PlayCircle, Quote, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PlaceholderNote, Reveal } from "@/components/site/bits";
import { useSite } from "@/lib/site-context";
import type { Review } from "@/lib/types";

export const REVIEW_CATEGORIES: Record<string, string> = {
  all: "Все отзывы",
  meditation: "О медитациях",
  training: "О тренингах",
  thetahealing: "Об обучении",
};

/**
 * Карточки отзывов.
 * isPlaceholder=true → аккуратная заглушка (НЕ фиктивный отзыв).
 * Реальные отзывы добавляются в панели администратора: текст, скриншот, видео.
 */
export function ReviewCards({ limit, category = "all" }: { limit?: number; category?: string }) {
  const { content } = useSite();
  let reviews = content.reviews;
  if (category !== "all") reviews = reviews.filter((r) => r.category === category);
  if (limit) reviews = reviews.slice(0, limit);

  if (reviews.length === 0) {
    return (
      <PlaceholderNote className="mx-auto mt-12 max-w-2xl">
        В этой категории пока нет отзывов. Администратор может добавить их в панели управления:
        текст, скриншот или видеоотзыв.
      </PlaceholderNote>
    );
  }

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {reviews.map((r, i) => (
        <Reveal key={r.id} delay={0.06 * i}>
          <ReviewCard review={r} />
        </Reveal>
      ))}
    </div>
  );
}

function ReviewCard({ review: r }: { review: Review }) {
  if (r.isPlaceholder) {
    return (
      <article className="flex h-full flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-champagne/80 bg-white/45 px-8 py-12 text-center">
        <Quote className="h-6 w-6 text-champagne" />
        <p className="mt-4 font-display text-lg italic text-graphite-soft">
          {REVIEW_CATEGORIES[r.category] || "Отзыв"}
        </p>
        <p className="mt-2 max-w-[240px] text-xs leading-relaxed text-graphite-soft/75">
          Место для реального отзыва — добавьте текст, скриншот или видео в панели
          администратора
        </p>
      </article>
    );
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white/75 shadow-softer transition-all duration-500 hover:-translate-y-1 hover:shadow-soft">
      {r.videoUrl ? (
        <a
          href={r.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block aspect-video overflow-hidden"
        >
          {r.imageUrl ? (
            <Image
              src={r.imageUrl}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-powder-gradient" />
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-plum/25">
            <PlayCircle className="h-10 w-10 text-white/90" />
          </span>
        </a>
      ) : r.imageUrl ? (
        <a href={r.imageUrl} target="_blank" rel="noopener noreferrer" className="relative block aspect-video overflow-hidden">
          <Image
            src={r.imageUrl}
            alt={`Скриншот отзыва`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          <span className="absolute bottom-3 right-3 rounded-full bg-white/85 p-1.5 text-wine backdrop-blur">
            <ImageIcon className="h-3.5 w-3.5" />
          </span>
        </a>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        {r.text ? (
          <>
            <Quote className="h-5 w-5 text-champagne" />
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-graphite-soft">
              {r.text}
            </p>
          </>
        ) : (
          <p className="text-sm italic text-graphite-soft/70">Текст отзыва не указан</p>
        )}
        <div className="mt-auto flex items-center gap-3 pt-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-powder/60 text-wine">
            <UserRound className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-graphite">
              {r.authorName || "Имя скрыто"}
            </p>
            <Badge className="mt-0.5 rounded-full border-0 bg-cream px-2.5 py-0 text-[10px] font-medium uppercase tracking-[0.12em] text-wine/80">
              {REVIEW_CATEGORIES[r.category] || r.category}
            </Badge>
          </div>
          {r.videoUrl ? (
            <a
              href={r.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-wine hover:text-wine-deep"
              aria-label="Смотреть видеоотзыв"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
