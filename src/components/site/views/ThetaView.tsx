"use client";

import Image from "next/image";
import { ArrowRight, CalendarDays, GraduationCap, PlayCircle, Send, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GoldDivider,
  OutlineButton,
  PlaceholderNote,
  Reveal,
  SectionHeading,
  Tbd,
  VideoEmbed,
  WineButton,
  useDocumentTitle,
} from "@/components/site/bits";
import { ReviewCards } from "@/components/site/ReviewCards";
import { useSite } from "@/lib/site-context";
import { splitLines } from "@/lib/types";

export function ThetaView() {
  const { content, navigate } = useSite();
  useDocumentTitle("Обучение методике Тета-хилинг");
  const t = content.thetaIntro;
  const isTbd = (v?: string) => !v || v === "Уточняется";

  return (
    <>
      {/* Большой вводный экран с атмосферным видео */}
      <section className="relative">
        <div className="relative h-[52vh] min-h-[380px] w-full overflow-hidden sm:h-[62vh]">
          <Image
            src={t.heroUrl || "/images/theta-hero.jpg"}
            alt="Обучение методике Тета-хилинг"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-plum/72 via-plum/30 to-plum/10" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-5 pb-12 sm:px-8 sm:pb-16">
              <Reveal>
                <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5 text-champagne" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f8efe4]">
                    Ключевое направление
                  </span>
                </div>
                <h1 className="max-w-3xl font-display text-4xl leading-[1.1] text-balance text-white drop-shadow sm:text-6xl">
                  {t.title}
                </h1>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Методика и подход */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <Reveal className="lg:sticky lg:top-24">
              <VideoEmbed
                url={t.videoUrl}
                poster="/images/theta-hero.jpg"
                label="Видео Елены о методике и обучении"
              />
              <p className="mt-4 text-center text-xs leading-relaxed text-graphite-soft/75">
                Горизонтальное видео 16:9 · адаптивно на мобильных · YouTube / Vimeo / RuTube
              </p>
            </Reveal>
            <div>
              <SectionHeading
                eyebrow="Методика и подход"
                title="Что такое Тета-хилинг у Елены"
                align="left"
              />
              <Reveal delay={0.1}>
                <p className="mt-6 whitespace-pre-line text-base leading-[1.85] text-graphite-soft sm:text-[17px]">
                  {t.description}
                </p>
              </Reveal>
              <Reveal delay={0.16} className="mt-8">
                <div className="grid gap-3.5 sm:grid-cols-2">
                  {[
                    { icon: GraduationCap, t: "Системное обучение", d: "от основ к практике" },
                    { icon: Heart, t: "Бережная атмосфера", d: "без давления и спешки" },
                    { icon: Users2, t: "Живое сообщество", d: "поддержка учеников" },
                    { icon: CalendarDays, t: "Гибкий формат", d: "онлайн или очно — уточняется" },
                  ].map((x) => (
                    <div key={x.t} className="flex items-start gap-3.5 rounded-2xl border border-line bg-white/65 px-5 py-4">
                      <x.icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                      <div>
                        <p className="text-sm font-semibold text-graphite">{x.t}</p>
                        <p className="mt-0.5 text-xs text-graphite-soft">{x.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Кому подойдёт + Что изучите */}
      <section className="bg-cream-gradient py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[2rem] border border-line bg-white/70 p-8 shadow-softer sm:p-10">
              <div className="flex items-center gap-3">
                <Users2 className="h-5 w-5 text-gold" />
                <h2 className="font-display text-2xl text-graphite">Кому подойдёт обучение</h2>
              </div>
              <ul className="mt-6 space-y-3.5">
                {[
                  "Тем, кто хочет освоить методику для себя — глубже понимать свои состояния",
                  "Практикующим специалистам, желающим добавить методику в свою работу",
                  "Тем, кто ищет системную, бережную линию обучения с живой поддержкой",
                  "Всем, кому близко состояние «любовь исцеляет всё»",
                ].map((line, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-graphite-soft">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-[2rem] border border-line bg-white/70 p-8 shadow-softer sm:p-10">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-gold" />
                <h2 className="font-display text-2xl text-graphite">Что вы изучите</h2>
              </div>
              <ul className="mt-6 space-y-3.5">
                {[
                  "Основы методики: тета-состояние и интуитивная работа",
                  "Техники работы с установками и внутренними убеждениями",
                  "Практики глубокого расслабления и внутренней тишины",
                  "Этику и бережность в работе с собой и с людьми",
                ].map((line, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-graphite-soft">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-soft" />
                    {line}
                  </li>
                ))}
              </ul>
              <PlaceholderNote className="mt-6">
                Программные детали уточняются — администратор дополняет списки в панели
                управления.
              </PlaceholderNote>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Список программ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Обучающие программы"
            title="Линия обучения"
            lead="Последовательные курсы методики: каждая ступень раскрывает новый уровень внутренней работы."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.thetaPrograms.map((p, i) => (
              <Reveal key={p.id} delay={0.07 * i}>
                <article className="flex h-full flex-col rounded-[1.75rem] border border-line bg-white/75 p-7 shadow-softer transition-all duration-500 hover:-translate-y-1 hover:shadow-soft">
                  <p className="font-display text-sm italic text-gold">Ступень {i + 1}</p>
                  <h3 className="mt-3 font-display text-xl leading-snug text-graphite">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-graphite-soft">{p.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Tbd>{isTbd(p.durationText) ? "Длительность: уточняется" : p.durationText}</Tbd>
                    <Tbd>{isTbd(p.formatText) ? "Формат: уточняется" : p.formatText}</Tbd>
                  </div>
                  <p className="mt-auto pt-5 font-display text-xl text-wine">{p.priceText}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Расписание */}
      <section className="bg-cream-gradient py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Расписание"
            title="Ближайшие обучающие потоки"
            lead="Даты уточняются — администратор обновляет расписание в панели управления, в том числе количество мест."
          />
          <div className="mx-auto mt-12 max-w-4xl space-y-4">
            {content.schedule.map((s, i) => (
              <Reveal key={s.id} delay={0.06 * i}>
                <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white/70 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-graphite">{s.title}</p>
                    <p className="mt-1 text-sm text-graphite-soft">Формат: {s.formatText}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5 sm:justify-end">
                    <Tbd>{isTbd(s.dateText) ? "Даты уточняются" : s.dateText}</Tbd>
                    <Tbd>{isTbd(s.seatsText) ? "Места уточняются" : s.seatsText}</Tbd>
                    {s.link ? (
                      <WineButton asLink href={s.link} className="h-9 px-4 text-xs">
                        Записаться
                      </WineButton>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Тарифы */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Тарифы"
            title="Выберите глубину погружения"
            lead="Сравнение тарифов — цены уточняются и задаются в панели администратора."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.tariffs.map((tf, i) => (
              <Reveal key={tf.id} delay={0.07 * i}>
                <article
                  className={
                    "relative flex h-full flex-col rounded-[1.75rem] border p-7 shadow-softer transition-all duration-500 hover:-translate-y-1 hover:shadow-soft " +
                    (tf.isFeatured
                      ? "border-wine/30 bg-wine-gradient text-[#f8efe4]"
                      : "border-line bg-white/75")
                  }
                >
                  {tf.isFeatured ? (
                    <Badge className="absolute -top-3 left-6 rounded-full border-0 bg-champagne px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-plum">
                      Рекомендуемый
                    </Badge>
                  ) : null}
                  <h3
                    className={
                      "font-display text-xl " + (tf.isFeatured ? "text-white" : "text-graphite")
                    }
                  >
                    {tf.name}
                  </h3>
                  <p
                    className={
                      "mt-4 font-display text-3xl " +
                      (tf.isFeatured ? "text-white" : "text-wine")
                    }
                  >
                    {tf.priceText}
                  </p>
                  <ul className="mt-5 flex-1 space-y-3">
                    {splitLines(tf.features).map((f, j) => (
                      <li
                        key={j}
                        className={
                          "flex items-start gap-2.5 text-sm leading-relaxed " +
                          (tf.isFeatured ? "text-[#e8d9c8]/90" : "text-graphite-soft")
                        }
                      >
                        <PlayCircle
                          className={
                            "mt-0.5 h-3.5 w-3.5 shrink-0 " +
                            (tf.isFeatured ? "text-champagne" : "text-gold")
                          }
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {tf.isFeatured ? (
                    <WineButton
                      className="mt-7 w-full bg-[#f8efe4] text-wine-deep shadow-none hover:bg-white"
                      onClick={() => navigate("/contacts")}
                    >
                      Записаться на обучение
                    </WineButton>
                  ) : (
                    <OutlineButton className="mt-7 w-full" onClick={() => navigate("/contacts")}>
                      Выбрать программу
                    </OutlineButton>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <PlaceholderNote className="mx-auto max-w-3xl">
              Информация о формате (онлайн / очно), ценах и датах задаётся администратором в
              панели управления — сейчас поля честно помечены «Уточняется».
            </PlaceholderNote>
          </Reveal>
        </div>
      </section>

      {/* Бесплатные ознакомительные уроки */}
      <section className="bg-cream-gradient py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Попробуйте бесплатно"
            title="Ознакомительные уроки"
            lead="Короткие уроки-знакомства: почувствуйте подачу и атмосферу обучения до выбора программы."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.freeLessons.map((l, i) => (
              <Reveal key={l.id} delay={0.07 * i}>
                <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white/75 shadow-softer transition-all duration-500 hover:-translate-y-1 hover:shadow-soft">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={l.coverUrl || "/images/lesson-intro.jpg"}
                      alt={l.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg leading-snug text-graphite">{l.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-graphite-soft">
                      {l.description}
                    </p>
                    <div className="mt-auto pt-5">
                      {l.videoUrl ? (
                        <WineButton asLink href={l.videoUrl} className="h-10 px-5 text-sm">
                          <PlayCircle className="mr-2 h-4 w-4" /> Смотреть урок
                        </WineButton>
                      ) : (
                        <Button
                          variant="outline"
                          disabled
                          className="h-10 cursor-default rounded-full border-dashed border-champagne/70 text-xs text-graphite-soft/70"
                        >
                          Ссылка появится — поле редактируемое
                        </Button>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Отзывы учеников + FAQ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <h2 className="text-center font-display text-2xl text-graphite sm:text-3xl">
              Отзывы учеников об обучении
            </h2>
            <GoldDivider className="mx-auto mt-5" />
          </Reveal>
          <ReviewCards category="thetahealing" />

          <div className="mx-auto mt-20 max-w-3xl">
            <Reveal>
              <h2 className="text-center font-display text-2xl text-graphite sm:text-3xl">
                Частые вопросы
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="mt-8">
              <ThetaFaq telegramUrl={content.contacts.telegramUrl} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Финальный CTA */}
      <section className="bg-wine-gradient py-16 text-center sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl leading-tight text-balance text-[#f8efe4] sm:text-4xl">
              Готовы выбрать программу или записаться?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#e8d9c8]/85">
              Напишите Елене в Telegram — подберём ступень обучения под ваш запрос и ответим
              на вопросы.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <WineButton
                size="lg"
                className="bg-[#f8efe4] text-wine-deep shadow-none hover:bg-white"
                onClick={() => navigate("/contacts")}
              >
                Выбрать программу <ArrowRight className="ml-2 h-4 w-4" />
              </WineButton>
              <OutlineButton
                asLink
                href={content.contacts.telegramUrl}
                className="h-12 border-[#e8d9c8]/40 px-8 text-[#f8efe4] hover:bg-white/10 hover:text-white"
              >
                <Send className="mr-2 h-4 w-4" /> Записаться на обучение
              </OutlineButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ThetaFaq({ telegramUrl }: { telegramUrl: string }) {
  const items = [
    {
      q: "Нужен ли опыт практик для начала обучения?",
      a: "Нет — базовый курс начинается с основ. Опыт внутренней работы помогает, но не обязателен: методика осваивается шаг за шагом, в бережном темпе.",
    },
    {
      q: "Когда начинаются ближайшие потоки?",
      a: "Даты сейчас уточняются. Как только расписание определится, оно появится в разделе «Расписание» этой страницы и в Telegram-канале.",
    },
    {
      q: "Сколько стоит обучение?",
      a: "Цены уточняются — они появятся в разделе «Тарифы». Тарифы будут отличаться по составу: от самостоятельного прохождения до индивидуального сопровождения.",
    },
    {
      q: "Обучение проходит онлайн или очно?",
      a: "Формат уточняется и будет указан в расписании. Панель администратора позволяет отмечать формат для каждого потока отдельно.",
    },
    {
      q: "Тета-хилинг — это медицинская услуга?",
      a: "Нет. Практики не заменяют медицинскую помощь, диагностику или психотерапию. Это метод внутренней работы с состояниями и установками.",
    },
  ];

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details
          key={i}
          className="group rounded-2xl border border-line bg-white/70 px-6 py-4 transition-colors open:bg-white"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-graphite marker:hidden [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-champagne/50 text-wine transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-graphite-soft">{item.a}</p>
        </details>
      ))}
      <p className="pt-3 text-center text-xs leading-relaxed text-graphite-soft/75">
        Остались вопросы? Напишите в{" "}
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-wine underline decoration-champagne underline-offset-4"
        >
          Telegram
        </a>{" "}
        — Елена ответит лично.
      </p>
    </div>
  );
}

/* маленькие иконки без внешних импортов-конфликтов */
function Heart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M12 21C12 21 4 14.5 4 9.5C4 6.5 6.4 4 9.4 4C11 4 12 5 12 5C12 5 13 4 14.6 4C17.6 4 20 6.5 20 9.5C20 14.5 12 21 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Users2({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19C3.8 16 6 14.5 9 14.5C12 14.5 14.2 16 14.5 19" strokeLinecap="round" />
      <path d="M16 5.5C17.8 5.9 19 7.2 19 9C19 10.4 18.2 11.6 17 12.2" strokeLinecap="round" />
      <path d="M17.5 14.8C19.4 15.4 20.4 16.8 20.5 19" strokeLinecap="round" />
    </svg>
  );
}
