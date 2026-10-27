"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  HeartHandshake,
  PlayCircle,
  Send,
  Sparkles,
  Users,
} from "lucide-react";
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
  Tbd,
  VideoEmbed,
  WineButton,
  useDocumentTitle,
} from "@/components/site/bits";
import { ReviewCards } from "@/components/site/ReviewCards";
import { useSite } from "@/lib/site-context";
import { splitLines } from "@/lib/types";

export function TrainingDetailView({ slug }: { slug: string }) {
  const { content, navigate } = useSite();
  const training = content.trainings.find((t) => t.slug === slug);
  const [payOpen, setPayOpen] = useState(false);

  useDocumentTitle(training ? training.title : "Тренинг не найден");

  if (!training) {
    return (
      <section className="py-28 text-center">
        <p className="font-display text-2xl text-graphite">Тренинг не найден</p>
        <p className="mt-3 text-graphite-soft">
          Возможно, ссылка устарела — посмотрите весь каталог.
        </p>
        <Button
          onClick={() => navigate("/trainings")}
          className="mt-6 rounded-full bg-wine text-[#fdf9f3] hover:bg-wine-deep"
        >
          Ко всем тренингам
        </Button>
      </section>
    );
  }

  const forWhom = splitLines(training.forWhom);
  const workWith = splitLines(training.workWith);
  const program = splitLines(training.program);
  const priceTbd = !training.priceText || training.priceText === "Уточняется";
  const hasPayment = Boolean(training.paymentLink);

  return (
    <>
      {/* Обложка */}
      <section className="relative">
        <div className="relative h-[46vh] min-h-[340px] w-full overflow-hidden sm:h-[54vh]">
          <Image
            src={training.coverUrl || "/images/training-rejection.jpg"}
            alt={training.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-plum/70 via-plum/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-7xl px-5 pb-10 sm:px-8 sm:pb-14">
              <Reveal>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/trainings")}
                  className="mb-5 rounded-full px-4 text-white/85 hover:bg-white/10 hover:text-white"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Все тренинги
                </Button>
                <h1 className="max-w-3xl font-display text-3xl leading-tight text-balance text-white drop-shadow-sm sm:text-5xl">
                  {training.title}
                </h1>
                {training.tagline ? (
                  <p className="mt-3 max-w-2xl text-sm italic leading-relaxed text-white/80">
                    {training.tagline}
                  </p>
                ) : null}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Описание + видео */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="font-display text-2xl text-graphite sm:text-3xl">
                Об этом тренинге
              </h2>
              <p className="mt-5 whitespace-pre-line text-base leading-[1.85] text-graphite-soft sm:text-[17px]">
                {training.description}
              </p>
            </Reveal>

            {/* Для кого */}
            {forWhom.length > 0 ? (
              <Reveal delay={0.08} className="mt-12">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gold" />
                  <h3 className="font-display text-xl text-graphite">Для кого этот тренинг</h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {forWhom.map((line, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-graphite-soft">
                      <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-rose-soft" />
                      {line}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            {/* С чем работать */}
            {workWith.length > 0 ? (
              <Reveal delay={0.12} className="mt-12">
                <div className="flex items-center gap-3">
                  <HeartHandshake className="h-5 w-5 text-gold" />
                  <h3 className="font-display text-xl text-graphite">С чем будем работать</h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {workWith.map((line, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-graphite-soft">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
                      {line}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </div>

          {/* Карточка доступа */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-[2rem] border border-line bg-white/80 shadow-soft backdrop-blur">
                <VideoEmbed
                  url={training.videoUrl}
                  poster="/images/theta-hero.jpg"
                  label="Видео-презентация тренинга"
                  className="rounded-none border-0 border-b border-line"
                />
                <div className="p-7 sm:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                      Стоимость и доступ
                    </p>
                    {priceTbd ? <Tbd /> : null}
                  </div>
                  <p className="mt-3 font-display text-3xl text-graphite">
                    {training.priceText || "Уточняется"}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-graphite-soft">
                    {training.formatText}
                  </p>
                  <div className="mt-6 flex flex-col gap-3">
                    {hasPayment ? (
                      <WineButton asLink href={training.paymentLink} size="lg" className="w-full">
                        <PlayCircle className="mr-2 h-4 w-4" /> Получить доступ
                      </WineButton>
                    ) : (
                      <WineButton size="lg" className="w-full" onClick={() => setPayOpen(true)}>
                        Пройти тренинг
                      </WineButton>
                    )}
                    <OutlineButton
                      asLink
                      href={content.contacts.telegramUrl}
                      className="h-12 w-full"
                    >
                      <Send className="mr-2 h-4 w-4" /> Вопрос в Telegram
                    </OutlineButton>
                  </div>
                  <p className="mt-5 text-xs leading-relaxed text-graphite-soft/75">
                    Оплата подключается внешней ссылкой (платёжная система, форма, bot-платёж) —
                    ссылку указывает администратор в панели управления.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Программа */}
      {program.length > 0 ? (
        <section className="bg-cream-gradient py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <Reveal>
              <div className="flex items-center gap-3">
                <ClipboardList className="h-5 w-5 text-gold" />
                <h2 className="font-display text-2xl text-graphite sm:text-3xl">
                  Что входит в программу
                </h2>
              </div>
            </Reveal>
            <div className="mt-8 space-y-4">
              {program.map((line, i) => (
                <Reveal key={i} delay={0.05 * i}>
                  <div className="flex items-start gap-5 rounded-2xl border border-line bg-white/70 px-6 py-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-powder/70 font-display text-base text-wine">
                      {i + 1}
                    </span>
                    <p className="pt-2 text-[15px] leading-relaxed text-graphite-soft">{line}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-10">
              <PlaceholderNote>
                Структура уроков — редактируемая заглушка: администратор может изменить названия,
                содержание и количество уроков в панели управления.
              </PlaceholderNote>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* Отзывы о тренинге */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <h2 className="text-center font-display text-2xl text-graphite sm:text-3xl">
              Отзывы о тренинге
            </h2>
            <GoldDivider className="mx-auto mt-5" />
          </Reveal>
          <ReviewCards category="training" />
        </div>
      </section>

      {/* Диалог оплаты */}
      <Dialog open={payOpen} onOpenChange={setPayOpen}>
        <DialogContent className="rounded-[1.75rem] border-line bg-[#fffdf9] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-graphite">
              Оплата пока не подключена
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-graphite-soft">
              Это честная заглушка: доступ откроется после настройки внешней платёжной
              ссылки. Администратор задаёт её в панели управления, и кнопка автоматически
              станет платёжной. А пока напишите Елене в Telegram — доступ оформим лично.
            </DialogDescription>
          </DialogHeader>
          <div className="pt-1">
            <WineButton asLink href={content.contacts.telegramUrl} className="h-12 w-full">
              <Send className="mr-2 h-4 w-4" /> Написать в Telegram
            </WineButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
