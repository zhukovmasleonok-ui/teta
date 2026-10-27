"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Info, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Появление блоков при прокрутке ─────────────────────────────────────── */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Кнопки бренда ──────────────────────────────────────────────────────── */
export function WineButton({
  children,
  onClick,
  className,
  asLink,
  href,
  size = "default",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  asLink?: boolean;
  href?: string;
  size?: "default" | "lg" | "sm";
}) {
  const cls = cn(
    "rounded-full bg-wine text-[#fdf9f3] hover:bg-wine-deep shadow-soft tracking-wide font-medium",
    size === "lg" && "h-12 px-8 text-base",
    className
  );
  if (asLink && href) {
    return (
      <Button asChild className={cls} size={size}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </Button>
    );
  }
  return (
    <Button className={cls} onClick={onClick} size={size}>
      {children}
    </Button>
  );
}

export function OutlineButton({
  children,
  onClick,
  className,
  asLink,
  href,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  asLink?: boolean;
  href?: string;
}) {
  const cls = cn(
    "rounded-full border-wine/30 bg-transparent text-wine hover:bg-powder/50 hover:text-wine-deep tracking-wide font-medium",
    className
  );
  if (asLink && href) {
    return (
      <Button asChild variant="outline" className={cls}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </Button>
    );
  }
  return (
    <Button variant="outline" className={cls} onClick={onClick}>
      {children}
    </Button>
  );
}

/* ─── Заголовок секции ───────────────────────────────────────────────────── */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow ? (
        <div
          className={cn(
            "mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em]",
            align === "center" && "justify-center",
            dark ? "text-champagne" : "text-gold"
          )}
        >
          <span className={cn("h-px w-8", dark ? "bg-champagne/70" : "bg-gold/60")} />
          {eyebrow}
          {align === "center" && (
            <span className={cn("h-px w-8", dark ? "bg-champagne/70" : "bg-gold/60")} />
          )}
        </div>
      ) : null}
      <h2
        className={cn(
          "font-display text-3xl leading-tight text-balance sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-[#f8efe4]" : "text-graphite"
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            dark ? "text-[#e8d9c8]/85" : "text-graphite-soft"
          )}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}

/* ─── Монограмма-логотип ─────────────────────────────────────────────────── */
export function Monogram({ size = 44 }: { size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full border border-champagne/60 bg-white/70"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span className="font-display text-wine" style={{ fontSize: size * 0.4 }}>
        ЕМ
      </span>
    </span>
  );
}

/* ─── Помощь: разбор видео-URL в embed ───────────────────────────────────── */
export function toEmbedUrl(url: string): string | null {
  const u = (url || "").trim();
  if (!u) return null;
  const yt =
    u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/) ??
    null;
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?rel=0`;
  const vimeo = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  const rutube = u.match(/rutube\.ru\/video\/([0-9a-f]+)/i);
  if (rutube) return `https://rutube.ru/play/embed/${rutube[1]}`;
  return null;
}

/* ─── Адаптивное горизонтальное видео 16:9 ───────────────────────────────── */
export function VideoEmbed({
  url,
  poster,
  label,
  className,
}: {
  url?: string;
  poster?: string;
  label?: string;
  className?: string;
}) {
  const embed = useMemo(() => toEmbedUrl(url ?? ""), [url]);
  const [shown, setShown] = useState(false);
  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-3xl border border-line bg-cream shadow-soft",
        className
      )}
    >
      {embed ? (
        shown ? (
          <iframe
            src={embed}
            title={label || "Видео"}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setShown(true)}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label="Смотреть видео"
          >
            {poster ? (
              <Image
                src={poster}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-cream-gradient" />
            )}
            <span className="absolute inset-0 flex items-center justify-center bg-plum/25 transition-colors group-hover:bg-plum/15">
              <span className="flex items-center gap-3 rounded-full bg-white/90 px-6 py-3 text-wine shadow-soft transition-transform group-hover:scale-105">
                <PlayCircle className="h-6 w-6" />
                <span className="text-sm font-semibold tracking-wide">Смотреть видео</span>
              </span>
            </span>
          </button>
        )
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-cream-gradient px-6 text-center">
          {poster ? (
            <Image src={poster} alt="" fill sizes="60vw" className="object-cover opacity-45" />
          ) : null}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <PlayCircle className="h-10 w-10 text-wine/60" />
            <p className="max-w-sm text-sm leading-relaxed text-graphite-soft">
              {label || "Видео появится здесь"}
              {" — "}
              ссылку (YouTube, Vimeo, RuTube) можно добавить в панели администратора.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Честная заглушка ───────────────────────────────────────────────────── */
export function PlaceholderNote({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-dashed border-champagne/70 bg-white/50 px-5 py-4",
        className
      )}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
      <p className="text-sm leading-relaxed text-graphite-soft">{children}</p>
    </div>
  );
}

/* ─── Пометка «Уточняется» ───────────────────────────────────────────────── */
export function Tbd({ children = "Уточняется" }: { children?: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-powder/60 px-3 py-1 text-xs font-medium tracking-wide text-wine/80">
      {children}
    </span>
  );
}

/* ─── Декоративная золотая линия ─────────────────────────────────────────── */
export function GoldDivider({ className }: { className?: string }) {
  return <div className={cn("gold-line h-px w-full max-w-xs", className)} />;
}

/* ─── Смена title документа (SEO для «страниц») ──────────────────────────── */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
