import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Елена Макарова — Любовь исцеляет всё | Глубокие трансформационные практики",
    template: "%s | Елена Макарова",
  },
  description:
    "Пространство внутренней трансформации Елены Макаровой: бесплатные практики, трансформационные тренинги в записи и обучение методике Тета-хилинг.",
  keywords: [
    "Елена Макарова",
    "Тета-хилинг",
    "трансформационные практики",
    "медитации",
    "обучение Тета-хилинг",
    "глубокие практики",
  ],
  authors: [{ name: "Елена Макарова" }],
  openGraph: {
    title: "Елена Макарова — Любовь исцеляет всё",
    description:
      "Пространство для внутренней трансформации, возвращения к себе и раскрытия новых возможностей. Бесплатные практики, тренинги в записи, обучение Тета-хилинг.",
    type: "website",
    locale: "ru_RU",
    siteName: "Елена Макарова",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbf7f1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${display.variable} ${sans.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
