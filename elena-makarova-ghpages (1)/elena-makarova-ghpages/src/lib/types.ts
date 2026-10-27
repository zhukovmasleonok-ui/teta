// Общие типы и дефолты — безопасно импортировать и на клиенте.

export type Hero = {
  name: string;
  title: string;
  subtitle: string;
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  coverUrl: string;
};

export type About = {
  title: string;
  paragraphs: string;
  note: string;
  coverUrl: string;
};

export type ThetaIntro = {
  title: string;
  description: string;
  videoUrl: string;
  heroUrl: string;
};

export type Invite = { title: string; text: string };

export type Contacts = {
  telegramUrl: string;
  telegramHandle: string;
  email: string;
  phone: string;
  city: string;
};

export type Socials = {
  instagramReel: string;
  instagramPost: string;
  instagramProfile: string;
};

export type Seo = { title: string; description: string };

export type FreeMaterial = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverUrl: string;
  type: string;
  link: string;
  formLink: string;
  reviewsNote: string;
  sortOrder: number;
  isPublished: boolean;
};

export type Training = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  coverUrl: string;
  forWhom: string;
  workWith: string;
  program: string;
  videoUrl: string;
  priceText: string;
  formatText: string;
  paymentLink: string;
  sortOrder: number;
  isPublished: boolean;
};

export type ThetaProgram = {
  id: string;
  title: string;
  description: string;
  durationText: string;
  formatText: string;
  priceText: string;
  sortOrder: number;
  isPublished: boolean;
};

export type ScheduleItem = {
  id: string;
  title: string;
  dateText: string;
  formatText: string;
  seatsText: string;
  link: string;
  sortOrder: number;
  isPublished: boolean;
};

export type Tariff = {
  id: string;
  name: string;
  priceText: string;
  features: string;
  isFeatured: boolean;
  sortOrder: number;
  isPublished: boolean;
};

export type FreeLesson = {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  videoUrl: string;
  sortOrder: number;
  isPublished: boolean;
};

export type SeasonMethod = {
  id: string;
  title: string;
  periodText: string;
  seasonTag: string;
  authorText: string;
  mainIdea: string;
  practiceText: string;
  mediaUrl: string;
  coverUrl: string;
  materials: string;
  productLink: string;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean;
  sortOrder: number;
};

export type Review = {
  id: string;
  authorName: string;
  category: string;
  text: string;
  imageUrl: string;
  videoUrl: string;
  isPlaceholder: boolean;
  isPublished: boolean;
  sortOrder: number;
};

export type TelegramPost = {
  id: string;
  text: string;
  imageUrl: string;
  dateText: string;
  link: string;
};

export type SiteContent = {
  hero: Hero;
  about: About;
  thetaIntro: ThetaIntro;
  invite: Invite;
  contacts: Contacts;
  socials: Socials;
  seo: Seo;
  materials: FreeMaterial[];
  trainings: Training[];
  thetaPrograms: ThetaProgram[];
  schedule: ScheduleItem[];
  tariffs: Tariff[];
  freeLessons: FreeLesson[];
  seasons: SeasonMethod[];
  reviews: Review[];
  tgManualPosts: TelegramPost[];
};

export const DEFAULT_HERO: Hero = {
  name: "Елена Макарова",
  title: "Любовь исцеляет всё",
  subtitle: "Глубокие трансформационные практики",
  lead: "Пространство для внутренней трансформации, возвращения к себе и раскрытия новых возможностей",
  ctaPrimary: "Начать с бесплатных практик",
  ctaSecondary: "Выбрать обучение",
  coverUrl: "/images/hero-portrait.jpg",
};

export const DEFAULT_ABOUT: About = {
  title: "Знакомство с Еленой",
  paragraphs: "",
  note: "",
  coverUrl: "/images/about-portrait.jpg",
};

export const DEFAULT_THETA_INTRO: ThetaIntro = {
  title: "Обучение методике Тета-хилинг",
  description: "",
  videoUrl: "",
  heroUrl: "/images/theta-hero.jpg",
};

export const DEFAULT_INVITE: Invite = {
  title: "Приглашение к глубокой работе",
  text: "",
};

export const DEFAULT_CONTACTS: Contacts = {
  telegramUrl: "https://t.me/Elenavolshebstvo",
  telegramHandle: "@Elenavolshebstvo",
  email: "",
  phone: "",
  city: "",
};

export const DEFAULT_SOCIALS: Socials = {
  instagramReel: "https://www.instagram.com/reel/DK7Ki4qIi3f/",
  instagramPost: "https://www.instagram.com/p/C4d_KGJsF8Q/",
  instagramProfile: "",
};

export const DEFAULT_SEO: Seo = {
  title: "Елена Макарова — Любовь исцеляет всё | Глубокие трансформационные практики",
  description:
    "Пространство внутренней трансформации Елены Макаровой: бесплатные практики, трансформационные тренинги в записи и обучение методике Тета-хилинг.",
};

export const TELEGRAM_CHANNEL_URL = "https://t.me/Elenavolshebstvo";

export const NAV_ITEMS: { label: string; path: string }[] = [
  { label: "Главная", path: "/" },
  { label: "С чего начать", path: "/start" },
  { label: "Тренинги в записи", path: "/trainings" },
  { label: "Обучение Тета-хилинг", path: "/thetahealing" },
  { label: "Методика сезона", path: "/season" },
  { label: "Отзывы", path: "/reviews" },
  { label: "Контакты", path: "/contacts" },
];

/** Выбрать активную тему сезона: по датам (авто-режим), иначе по флагу isActive. */
export function pickActiveSeason(seasons: SeasonMethod[]): SeasonMethod | null {
  if (seasons.length === 0) return null;
  const now = Date.now();
  const byDate = seasons.find((s) => {
    if (!s.startDate || !s.endDate) return false;
    const from = new Date(s.startDate).getTime();
    const to = new Date(s.endDate).getTime();
    return now >= from && now <= to;
  });
  if (byDate) return byDate;
  return seasons.find((s) => s.isActive) ?? null;
}

export function seasonArchive(seasons: SeasonMethod[]): SeasonMethod[] {
  const active = pickActiveSeason(seasons);
  return seasons
    .filter((s) => s.id !== active?.id)
    .sort((a, b) => {
      const ad = a.startDate ? new Date(a.startDate).getTime() : 0;
      const bd = b.startDate ? new Date(b.startDate).getTime() : 0;
      return bd - ad;
    });
}

export function splitLines(s: string): string[] {
  return (s || "")
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);
}
