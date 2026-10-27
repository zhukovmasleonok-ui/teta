"use client";

import Image from "next/image";
import { ArrowRight, Quote, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  GoldDivider,
  OutlineButton,
  PlaceholderNote,
  Reveal,
  SectionHeading,
  VideoEmbed,
  WineButton,
  useDocumentTitle,
} from "@/components/site/bits";
import { TelegramSection } from "@/components/site/TelegramSection";
import { ReviewCards } from "@/components/site/ReviewCards";
import { InstagramCards } from "@/components/site/InstagramCards";
import { useSite } from "@/lib/site-context";
import { pickActiveSeason, type Training } from "@/lib/types";

export function HomeView() {
  const { content } = useSite();
  useDocumentTitle(content.seo.title);
  const season = pickActiveSeason(content.seasons);

  return (
    <>
      <Hero />
      <AboutSection />
      <FreeStartSection />
      <TrainingsSection />
      <ThetaSection />
      {season ? <SeasonSection /> : null}
      <ReviewsSection />
      <TelegramSection compact />
      <InstagramCards />
      <InviteSection />
      <ContactsSection />
    </>
  );
}

/* ─── 1. Первый экран ─────────────────────────────────────────────────────── */
function Hero() {
  const { content, navigate } = useSite();
  const h = content.hero;

  return (
    <section className="relative overflow-hidden">
      {/* мягкие градиентные пятна */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-powder/60 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-12%] h-[420px] w-[420px] rounded-full bg-cream-deep/70 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 h-[300px] w-[300px] rounded-full bg-champagne/15 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:pb-24 lg:pt-16">
        <div>
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-champagne/50 bg-white/60 px-4 py-2 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-wine/80">
                {h.subtitle}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="font-display text-lg italic text-wine/70 sm:text-xl">{h.name}</p>
            <h1 className="mt-3 font-display text-[2.6rem] leading-[1.08] text-balance text-graphite sm:text-6xl lg:text-[4.2rem]">
              {h.title}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-graphite-soft sm:text-lg">
              {h.lead}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <WineButton size="lg" onClick={() => navigate("/start")}>
                {h.ctaPrimary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </WineButton>
              <OutlineButton onClick={() => navigate("/thetahealing")} className="h-12 px-8">
                {h.ctaSecondary}
              </OutlineButton>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-12 flex items-center gap-6">
              <GoldDivider className="max-w-[140px]" />
              <p className="text-xs uppercase tracking-[0.2em] text-graphite-soft/80">
                Бережно · Глубоко · С любовью
              </p>
            </div>
          </Reveal>
        </div>

        {/* Портрет */}
        <Reveal delay={0.15} className="relative">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[460px]">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-[2.5rem] border border-champagne/40 bg-gradient-to-b from-powder/40 to-transparent"
            />
            <div className="photo-vignette relative h-full w-full overflow-hidden rounded-[2rem] shadow-soft">
              <Image
                src={h.coverUrl || "/images/hero-portrait.jpg"}
                alt={`Елена Макарова — ${h.subtitle}`}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 460px"
                className="object-cover"
              />
              {/* заменяемая заглушка-пометка */}
              <span className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/80 px-4 py-2.5 text-[11px] leading-snug text-graphite-soft backdrop-blur-md">
                Атмосферное фото-заглушка — легко заменяется на реальный портрет в панели
                администратора
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 2. Знакомство с Еленой ──────────────────────────────────────────────── */
function AboutSection() {
  const { content } = useSite();
  const a = content.about;
  const paragraphs = a.paragraphs.split("\n").filter(Boolean);

  return (
    <section id="about" className="bg-cream-gradient py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px]">
            <div className="absolute -left-4 -top-4 h-full w-full rounded-[2rem] border border-champagne/50" aria-hidden />
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-soft">
              <Image
                src={a.coverUrl || "/images/about-portrait.jpg"}
                alt="Елена Макарова, знакомство"
                fill
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover"
              />
            </div>
            <div
              aria-hidden
              className="absolute -bottom-6 -right-4 rounded-3xl bg-white/90 px-6 py-4 shadow-soft backdrop-blur"
            >
              <p className="font-display text-lg italic text-wine">«Любовь исцеляет всё»</p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading eyebrow="Знакомство" title={a.title} align="left" />
          <div className="mt-6 space-y-5">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.06 * i}>
                <p className="text-base leading-[1.85] text-graphite-soft sm:text-[17px]">{p}</p>
              </Reveal>
            ))}
          </div>
          {a.note ? (
            <Reveal delay={0.2}>
              <PlaceholderNote className="mt-7">{a.note}</PlaceholderNote>
            </Reveal>
          ) : null}
          <Reveal delay={0.26}>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-md">
              {[
                { t: "Бесплатные практики", d: "мягкий старт" },
                { t: "Тренинги в записи", d: "свой темп" },
                { t: "Обучение Тета-хилинг", d: "глубокий путь" },
                { t: "Методика сезона", d: "живые темы" },
              ].map((x) => (
                <div
                  key={x.t}
                  className="rounded-2xl border border-line bg-white/60 px-4 py-3.5"
                >
                  <p className="text-sm font-semibold text-graphite">{x.t}</p>
                  <p className="mt-0.5 text-xs text-graphite-soft">{x.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── 3. С чего начать ────────────────────────────────────────────────────── */
function FreeStartSection() {
  const { content, navigate } = useSite();
  const materials = content.materials.slice(0, 3);

  return (
    <section id="start" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="С чего начать"
          title="Бесплатные материалы для первого шага"
          lead="Мягкое знакомство с практиками: начните с бесплатных медитаций и материалов — без спешки и обязательств."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {materials.map((m, i) => (
            <Reveal key={m.id} delay={0.08 * i}>
              <Card className="group h-full overflow-hidden rounded-[1.75rem] border-line bg-white/75 shadow-softer backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-soft">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={m.coverUrl || "/images/money-meditation.jpg"}
                    alt={m.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-wine backdrop-blur">
                    {typeLabel(m.type)}
                  </span>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-display text-xl leading-snug text-graphite">{m.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-graphite-soft">
                    {m.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="mt-5 rounded-full px-0 text-wine hover:bg-transparent hover:text-wine-deep"
                    onClick={() => navigate("/start")}
                  >
                    Получить медитацию <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <OutlineButton onClick={() => navigate("/start")} className="h-11 px-7">
            Все бесплатные материалы <ArrowRight className="ml-2 h-4 w-4" />
          </OutlineButton>
        </Reveal>
      </div>
    </section>
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

/* ─── 4. Тренинги в записи ────────────────────────────────────────────────── */
function TrainingsSection() {
  const { content, navigate } = useSite();
  const trainings = content.trainings.slice(0, 3);

  return (
    <section id="trainings" className="bg-cream-gradient py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Тренинги в записи"
          title="Трансформационные тренинги"
          lead="Программы в записи — проходите в своём темпе, возвращайтесь к материалам, когда это нужно именно вам."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {trainings.map((t, i) => (
            <Reveal key={t.id} delay={0.08 * i}>
              <TrainingCardLarge t={t} onOpen={() => navigate(`/training/${t.slug}`)} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <OutlineButton onClick={() => navigate("/trainings")} className="h-11 px-7">
            Весь каталог тренингов <ArrowRight className="ml-2 h-4 w-4" />
          </OutlineButton>
        </Reveal>
      </div>
    </section>
  );
}

function TrainingCardLarge({ t, onOpen }: { t: Training; onOpen: () => void }) {
  return (
    <article
      className="group grid h-full cursor-pointer overflow-hidden rounded-[1.75rem] border border-line bg-white/75 shadow-softer transition-all duration-500 hover:-translate-y-1 hover:shadow-soft sm:grid-cols-[0.9fr_1.1fr]"
      onClick={onOpen}
    >
      <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[280px]">
        <Image
          src={t.coverUrl || "/images/training-rejection.jpg"}
          alt={t.title}
          fill
          sizes="(max-width: 640px) 100vw, 40vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col p-6 sm:p-7">
        <Badge className="w-fit rounded-full border-0 bg-powder/70 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-wine">
          Записанный тренинг
        </Badge>
        <h3 className="mt-4 font-display text-[1.45rem] leading-snug text-graphite">{t.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-graphite-soft">
          {t.description}
        </p>
        <div className="mt-auto flex items-center gap-4 pt-5">
          <span className="text-sm font-semibold text-wine">
            {t.priceText || "Уточняется"}
          </span>
          <span className="text-xs text-graphite-soft">· {t.formatText}</span>
        </div>
      </div>
    </article>
  );
}

/* ─── 5. Обучение Тета-хилинг ─────────────────────────────────────────────── */
function ThetaSection() {
  const { content, navigate } = useSite();

  return (
    <section id="thetahealing" className="relative overflow-hidden bg-wine-gradient py-20 text-[#f8efe4] sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-champagne/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-powder/10 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Обучение методике"
              title="Тета-хилинг: путь глубокой внутренней работы"
              align="left"
              dark
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-base leading-[1.85] text-[#e8d9c8]/85 sm:text-[17px]">
                {content.thetaIntro.description}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <ul className="mt-8 space-y-3.5">
                {content.thetaPrograms.slice(0, 3).map((p) => (
                  <li key={p.id} className="flex items-start gap-3.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />
                    <div>
                      <p className="font-medium text-[#f8efe4]">{p.title}</p>
                      <p className="text-sm text-[#e8d9c8]/70">
                        {p.durationText} · {p.formatText} · {p.priceText}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
                <WineButton
                  size="lg"
                  className="bg-[#f8efe4] text-wine-deep shadow-none hover:bg-white"
                  onClick={() => navigate("/thetahealing")}
                >
                  Выбрать программу <ArrowRight className="ml-2 h-4 w-4" />
                </WineButton>
                <OutlineButton
                  className="h-12 border-[#e8d9c8]/40 px-8 text-[#f8efe4] hover:bg-white/10 hover:text-white"
                  asLink
                  href={content.contacts.telegramUrl}
                >
                  <Send className="mr-2 h-4 w-4" /> Написать в Telegram
                </OutlineButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <VideoEmbed
              url={content.thetaIntro.videoUrl}
              poster={content.thetaIntro.heroUrl}
              label="Видео Елены о методике и обучении"
              className="border-white/20 bg-plum/40"
            />
            <p className="mt-4 text-center text-xs text-[#e8d9c8]/60">
              Горизонтальное видео 16:9 · YouTube / Vimeo / RuTube
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── 6. Методика сезона ──────────────────────────────────────────────────── */
function SeasonSection() {
  const { content, navigate } = useSite();
  const season = pickActiveSeason(content.seasons);
  if (!season) return null;

  return (
    <section id="season" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Обновляемый раздел"
          title="Методика сезона"
          lead="Живое пространство сайта: каждое время года — своя тема, своя практика и новое состояние."
        />

        <Reveal className="mt-12">
          <article
            className="group relative grid cursor-pointer overflow-hidden rounded-[2rem] border border-line bg-white/70 shadow-soft transition-all duration-500 hover:shadow-soft lg:grid-cols-[1.15fr_0.85fr]"
            onClick={() => navigate("/season")}
          >
            <div className="relative min-h-[260px] lg:min-h-[360px]">
              <Image
                src={season.coverUrl || "/images/season-autumn.jpg"}
                alt={season.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum/45 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-white/20" />
              <span className="absolute left-5 top-5 rounded-full bg-white/85 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-wine backdrop-blur">
                {season.periodText}
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <p className="font-display text-lg italic text-gold">Тема сезона</p>
              <h3 className="mt-3 font-display text-2xl leading-snug text-graphite sm:text-[2rem]">
                {season.title}
              </h3>
              <p className="mt-4 line-clamp-4 text-[15px] leading-relaxed text-graphite-soft">
                {season.mainIdea || season.authorText}
              </p>
              <div className="mt-7">
                <WineButton onClick={() => navigate("/season")}>
                  Открыть практику <ArrowRight className="ml-2 h-4 w-4" />
                </WineButton>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 7. Отзывы ───────────────────────────────────────────────────────────── */
function ReviewsSection() {
  const { navigate } = useSite();
  return (
    <section id="reviews" className="bg-cream-gradient py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Отзывы"
          title="Опыт учеников и клиентов"
          lead="Живые истории тех, кто уже практикует. Отзывы добавляются в панели управления — тексты, скриншоты и видео."
        />
        <ReviewCards limit={3} />
        <Reveal className="mt-10 text-center">
          <OutlineButton onClick={() => navigate("/reviews")} className="h-11 px-7">
            Все отзывы <ArrowRight className="ml-2 h-4 w-4" />
          </OutlineButton>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 8. Приглашение ──────────────────────────────────────────────────────── */
function InviteSection() {
  const { content, navigate } = useSite();
  const inv = content.invite;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-powder/45 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <Quote className="mx-auto h-8 w-8 text-champagne" />
          <h2 className="mt-6 font-display text-3xl leading-tight text-balance text-graphite sm:text-4xl">
            {inv.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-[1.85] text-graphite-soft sm:text-lg">
            {inv.text}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <WineButton size="lg" onClick={() => navigate("/thetahealing")}>
              Выбрать обучение
            </WineButton>
            <OutlineButton className="h-12 px-8" onClick={() => navigate("/contacts")}>
              Индивидуальная работа
            </OutlineButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 9. Контакты ─────────────────────────────────────────────────────────── */
function ContactsSection() {
  const { content, navigate } = useSite();
  const c = content.contacts;

  return (
    <section id="contacts" className="bg-cream-gradient py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Контакты"
          title="Самый тёплый способ связи — Telegram"
          lead="Напишите Елене: выберем практику под ваш запрос, ответим на вопросы об обучении и индивидуальной работе."
        />
        <Reveal className="mt-12">
          <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
            <a
              href={c.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[1.75rem] border border-line bg-white/75 p-7 shadow-softer transition-all duration-500 hover:-translate-y-1 hover:shadow-soft"
            >
              <Send className="h-6 w-6 text-wine" />
              <p className="mt-4 font-display text-xl text-graphite">Telegram-канал</p>
              <p className="mt-1 text-sm text-graphite-soft">{c.telegramHandle}</p>
              <p className="mt-3 text-sm font-medium text-wine group-hover:text-wine-deep">
                Подписаться и написать →
              </p>
            </a>
            <button
              type="button"
              onClick={() => navigate("/contacts")}
              className="group rounded-[1.75rem] border border-line bg-white/75 p-7 text-left shadow-softer transition-all duration-500 hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="flex h-6 items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-champagne" />
                <span className="h-2 w-2 rounded-full bg-rose-soft" />
                <span className="h-2 w-2 rounded-full bg-wine/60" />
              </div>
              <p className="mt-4 font-display text-xl text-graphite">Все контакты</p>
              <p className="mt-1 text-sm text-graphite-soft">
                E-mail, телефон и город — редактируемые поля
              </p>
              <p className="mt-3 text-sm font-medium text-wine group-hover:text-wine-deep">
                Открыть страницу контактов →
              </p>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
