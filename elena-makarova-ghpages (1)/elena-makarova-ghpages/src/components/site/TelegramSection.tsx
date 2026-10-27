"use client";

import { Send } from "lucide-react";
import { SectionHeading, WineButton } from "@/components/site/bits";
import { useSite } from "@/lib/site-context";

// Публичный канал-источник постов для официального встраиваемого виджета Telegram.
// Контактный хэндл «написать Елене» (@Elenavolshebstvo) задаётся в content.json → contacts.
const TELEGRAM_FEED_CHANNEL = "Elena_volshebstvo";

export function TelegramSection({ compact = false }: { compact?: boolean }) {
  const { content } = useSite();
  const feedUrl = `https://t.me/${TELEGRAM_FEED_CHANNEL}?embed=1&userpic=false`;

  return (
    <section id="telegram" className={compact ? "py-12" : "py-20 sm:py-28"}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center gap-6">
          <SectionHeading
            eyebrow="Из Telegram"
            title="Свежие мысли Елены"
            lead="Лента публикаций канала подгружается официальным виджетом Telegram. Подписывайтесь, чтобы быть ближе к ежедневным практикам."
          />
          <WineButton asLink href={content.contacts.telegramUrl} className="h-11 px-6 text-sm">
            <Send className="mr-2 h-4 w-4" /> Подписаться на канал
          </WineButton>
        </div>

        <div className="mt-12 overflow-hidden rounded-[1.75rem] border border-line bg-white/80 shadow-soft">
          <iframe
            src={feedUrl}
            title="Telegram-канал Елены Макаровой"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups"
            className="h-[640px] w-full"
            frameBorder={0}
          />
        </div>

        <p className="mt-4 text-center text-xs leading-relaxed text-graphite-soft/70">
          Если лента не подгрузилась — откройте канал напрямую:{" "}
          <a
            href={content.contacts.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-wine underline-offset-4 hover:underline"
          >
            {content.contacts.telegramHandle}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
