"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Download, Mail, PlayCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  GoldDivider,
  OutlineButton,
  PlaceholderNote,
  Reveal,
  SectionHeading,
  WineButton,
  useDocumentTitle,
} from "@/components/site/bits";
import { ReviewCards } from "@/components/site/ReviewCards";
import { useSite } from "@/lib/site-context";
import type { FreeMaterial } from "@/lib/types";

export function StartView() {
  const { content, navigate } = useSite();
  useDocumentTitle("С чего начать — бесплатные практики");
  const [active, setActive] = useState<FreeMaterial | null>(null);

  return (
    <>
      {/* Вводный экран */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 top-0 h-[380px] w-[380px] rounded-full bg-powder/50 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-champagne/50 bg-white/60 px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-wine/80">
                  Бесплатные материалы
                </span>
              </div>
              <h1 className="font-display text-4xl leading-tight text-balance text-graphite sm:text-5xl">
                С чего начать
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-[1.85] text-graphite-soft sm:text-lg">
                Здесь живут бесплатные практики и материалы — мягкий вход в работу с собой.
                Список пополняется: новые медитации, аудио и уроки добавляются в панели
                администратора без изменения дизайна.
              </p>
              <GoldDivider className="mx-auto mt-8" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Материалы */}
      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-7 md:grid-cols-2">
            {content.materials.map((m, i) => (
              <Reveal key={m.id} delay={0.07 * i}>
                <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-white/75 shadow-softer transition-all duration-500 hover:-translate-y-1 hover:shadow-soft sm:flex-row">
                  <div className="relative min-h-[190px] flex-1 sm:min-h-0">
                    <Image
                      src={m.coverUrl || "/images/money-meditation.jpg"}
                      alt={m.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 320px"
                      className="object-cover"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-wine backdrop-blur">
                      {typeLabel(m.type)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h2 className="font-display text-xl leading-snug text-graphite">{m.title}</h2>
                    {m.subtitle ? (
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-gold">
                        {m.subtitle}
                      </p>
                    ) : null}
                    <p className="mt-3 text-sm leading-relaxed text-graphite-soft">
                      {m.description}
                    </p>
                    <div className="mt-auto pt-6">
                      <WineButton onClick={() => setActive(m)}>
                        {m.type === "video" ? (
                          <PlayCircle className="mr-2 h-4 w-4" />
                        ) : (
                          <Download className="mr-2 h-4 w-4" />
                        )}
                        Получить материал
                      </WineButton>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <PlaceholderNote className="mx-auto max-w-3xl">
              Здесь можно добавлять новые практики, медитации, видео и аудиозаписи — карточки
              создаются в панели администратора, дизайн сайта не меняется. Форму получения по
              e-mail или Telegram можно подключить позже (поле «Ссылка на форму»).
            </PlaceholderNote>
          </Reveal>
        </div>
      </section>

      {/* Отзывы на материалы */}
      <section className="bg-cream-gradient py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Впечатления"
            title="Отзывы о бесплатных практиках"
            lead="Заглушки заменяются реальными отзывами в панели администратора — с текстом, скриншотом или видео."
          />
          <ReviewCards category="meditation" />
          <Reveal className="mt-12 text-center">
            <OutlineButton className="h-11 px-7" onClick={() => navigate("/trainings")}>
              Перейти к тренингам <ArrowRight className="ml-2 h-4 w-4" />
            </OutlineButton>
          </Reveal>
        </div>
      </section>

      {/* Диалог получения материала */}
      <GetMaterialDialog material={active} onClose={() => setActive(null)} />
    </>
  );
}

function GetMaterialDialog({
  material,
  onClose,
}: {
  material: FreeMaterial | null;
  onClose: () => void;
}) {
  const { content } = useSite();
  if (!material) return null;

  const hasLink = Boolean(material.link);
  const hasForm = Boolean(material.formLink);

  return (
    <Dialog open={Boolean(material)} onOpenChange={(v) => (!v ? onClose() : null)}>
      <DialogContent className="rounded-[1.75rem] border-line bg-[#fffdf9] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-graphite">
            {material.title}
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-graphite-soft">
            {hasLink
              ? "Материал готов к прослушиванию или скачиванию — откройте по ссылке ниже."
              : hasForm
                ? "Получение материала настроено через внешнюю форму."
                : "Ссылка на материал пока не подключена — администратор добавит её в панели управления. А пока подписывайтесь на Telegram: там материалы публикуются первыми."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 pt-1">
          {hasLink ? (
            <WineButton asLink href={material.link} className="h-12 w-full">
              <PlayCircle className="mr-2 h-4 w-4" /> Открыть материал
            </WineButton>
          ) : null}
          {hasForm ? (
            <OutlineButton asLink href={material.formLink} className="h-12 w-full">
              <Mail className="mr-2 h-4 w-4" /> Получить по e-mail / Telegram
            </OutlineButton>
          ) : null}
          {!hasLink && !hasForm ? (
            <PlaceholderNote>
              Это честная заглушка: материал существует, ссылка появится после подключения.
              Раздел спроектирован так, что добавить ссылку — одна минута в панели.
            </PlaceholderNote>
          ) : null}
          <Button
            variant="outline"
            asChild
            className="h-12 w-full rounded-full border-wine/30 text-wine hover:bg-powder/50"
          >
            <a
              href={content.contacts.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Send className="mr-2 h-4 w-4" /> Перейти в Telegram
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function typeLabel(t: string) {
  switch (t) {
    case "meditation":
      return "Медитация";
    case "audio":
      return "Аудио";
    case "video":
      return "Видео";
    case "guide":
      return "Материал";
    default:
      return "Практика";
  }
}
