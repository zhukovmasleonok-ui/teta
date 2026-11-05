"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Loader2,
  Lock,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PlaceholderNote, useDocumentTitle, GoldDivider } from "@/components/site/bits";
import type { SiteContent } from "@/lib/types";
import {
  fetchContentJson,
  loadAuth,
  saveAuth,
  saveContentJson,
  verifyAuth,
  type GithubAuth,
} from "@/lib/github-api";

/* ───────────────────────────────────────────────────────────────── */
/*  Конфиги полей для каждой сущности                                */
/* ───────────────────────────────────────────────────────────────── */

type FieldType = "text" | "textarea" | "number" | "bool" | "select" | "date";
type Field = {
  key: string;
  label: string;
  type: FieldType;
  hint?: string;
  options?: string[];
  rows?: number;
};

const SETTINGS_GROUPS: { id: string; label: string; fields: Field[] }[] = [
  {
    id: "hero",
    label: "Главный экран",
    fields: [
      { key: "name", label: "Имя", type: "text" },
      { key: "title", label: "Слоган (заголовок)", type: "text" },
      { key: "subtitle", label: "Подзаголовок", type: "text" },
      { key: "lead", label: "Вводный текст", type: "textarea", rows: 3 },
      { key: "ctaPrimary", label: "Текст основной кнопки", type: "text" },
      { key: "ctaSecondary", label: "Текст вторичной кнопки", type: "text" },
      { key: "coverUrl", label: "Путь к фото (напр. /images/hero-portrait.jpg)", type: "text" },
    ],
  },
  {
    id: "about",
    label: "Знакомство",
    fields: [
      { key: "title", label: "Заголовок", type: "text" },
      { key: "paragraphs", label: "Абзацы (через \\n\\n)", type: "textarea", rows: 6 },
      { key: "note", label: "Примечание (опционально)", type: "textarea", rows: 2 },
      { key: "coverUrl", label: "Путь к фото", type: "text" },
    ],
  },
  {
    id: "thetaIntro",
    label: "Введение в Тета-хилинг",
    fields: [
      { key: "title", label: "Заголовок", type: "text" },
      { key: "description", label: "Описание", type: "textarea", rows: 5 },
      { key: "videoUrl", label: "Видео URL (опционально)", type: "text" },
      { key: "heroUrl", label: "Путь к фоновому фото", type: "text" },
    ],
  },
  {
    id: "invite",
    label: "Приглашение",
    fields: [
      { key: "title", label: "Заголовок", type: "text" },
      { key: "text", label: "Текст приглашения", type: "textarea", rows: 4 },
    ],
  },
  {
    id: "contacts",
    label: "Контакты",
    fields: [
      { key: "telegramUrl", label: "Telegram (ссылка)", type: "text" },
      { key: "telegramHandle", label: "Telegram (подпись)", type: "text" },
      { key: "email", label: "E-mail", type: "text" },
      { key: "phone", label: "Телефон", type: "text" },
      { key: "city", label: "Город", type: "text" },
    ],
  },
  {
    id: "socials",
    label: "Соцсети",
    fields: [
      { key: "instagramReel", label: "Instagram Reel URL", type: "text" },
      { key: "instagramPost", label: "Instagram Post URL", type: "text" },
      { key: "instagramProfile", label: "Instagram профиль URL", type: "text" },
    ],
  },
  {
    id: "seo",
    label: "SEO",
    fields: [
      { key: "title", label: "Title (вкладка браузера)", type: "text" },
      { key: "description", label: "Description (мета)", type: "textarea", rows: 3 },
    ],
  },
];

const ENTITY_FIELDS: Record<string, Field[]> = {
  materials: [
    { key: "title", label: "Название", type: "text" },
    { key: "subtitle", label: "Подзаголовок", type: "text" },
    { key: "description", label: "Описание", type: "textarea", rows: 4 },
    { key: "coverUrl", label: "Путь к обложке", type: "text" },
    { key: "type", label: "Тип", type: "select", options: ["meditation", "audio", "video", "guide"] },
    { key: "link", label: "Ссылка на прослушивание", type: "text" },
    { key: "formLink", label: "Ссылка на форму получения", type: "text" },
    { key: "reviewsNote", label: "Примечание об отзывах", type: "textarea", rows: 2 },
    { key: "sortOrder", label: "Порядок", type: "number" },
    { key: "isPublished", label: "Опубликован", type: "bool" },
  ],
  trainings: [
    { key: "slug", label: "Slug (для URL, латиница)", type: "text" },
    { key: "title", label: "Название", type: "text" },
    { key: "tagline", label: "Подзаголовок", type: "text" },
    { key: "description", label: "Описание", type: "textarea", rows: 5 },
    { key: "coverUrl", label: "Путь к обложке", type: "text" },
    { key: "forWhom", label: "Для кого (по одному на строку)", type: "textarea", rows: 4 },
    { key: "workWith", label: "С чем работать (по одному на строку)", type: "textarea", rows: 4 },
    { key: "program", label: "Программа (по одному на строку)", type: "textarea", rows: 5 },
    { key: "videoUrl", label: "Видео URL", type: "text" },
    { key: "priceText", label: "Цена (текст)", type: "text" },
    { key: "formatText", label: "Формат (текст)", type: "text" },
    { key: "paymentLink", label: "Ссылка на оплату (внешняя)", type: "text" },
    { key: "sortOrder", label: "Порядок", type: "number" },
    { key: "isPublished", label: "Опубликован", type: "bool" },
  ],
  thetaPrograms: [
    { key: "title", label: "Название", type: "text" },
    { key: "description", label: "Описание", type: "textarea", rows: 3 },
    { key: "durationText", label: "Длительность", type: "text" },
    { key: "formatText", label: "Формат", type: "text" },
    { key: "priceText", label: "Цена", type: "text" },
    { key: "sortOrder", label: "Порядок", type: "number" },
    { key: "isPublished", label: "Опубликован", type: "bool" },
  ],
  schedule: [
    { key: "title", label: "Название программы", type: "text" },
    { key: "dateText", label: "Дата (текст)", type: "text" },
    { key: "formatText", label: "Формат", type: "text" },
    { key: "seatsText", label: "Места", type: "text" },
    { key: "link", label: "Ссылка записи", type: "text" },
    { key: "sortOrder", label: "Порядок", type: "number" },
    { key: "isPublished", label: "Опубликован", type: "bool" },
  ],
  tariffs: [
    { key: "name", label: "Название тарифа", type: "text" },
    { key: "priceText", label: "Цена (текст)", type: "text" },
    { key: "features", label: "Что входит (по одному на строку)", type: "textarea", rows: 4 },
    { key: "isFeatured", label: "Выделить как рекомендуемый", type: "bool" },
    { key: "sortOrder", label: "Порядок", type: "number" },
    { key: "isPublished", label: "Опубликован", type: "bool" },
  ],
  freeLessons: [
    { key: "title", label: "Название", type: "text" },
    { key: "description", label: "Описание", type: "textarea", rows: 3 },
    { key: "coverUrl", label: "Путь к обложке", type: "text" },
    { key: "videoUrl", label: "Видео URL", type: "text" },
    { key: "sortOrder", label: "Порядок", type: "number" },
    { key: "isPublished", label: "Опубликован", type: "bool" },
  ],
  seasons: [
    { key: "title", label: "Название темы", type: "text" },
    { key: "periodText", label: "Период (текст)", type: "text" },
    { key: "seasonTag", label: "Сезон", type: "select", options: ["autumn", "winter", "spring", "summer"] },
    { key: "authorText", label: "Авторский текст", type: "textarea", rows: 6 },
    { key: "mainIdea", label: "Основная идея", type: "textarea", rows: 3 },
    { key: "practiceText", label: "Рекомендуемая практика", type: "textarea", rows: 4 },
    { key: "mediaUrl", label: "Видео/аудио URL", type: "text" },
    { key: "coverUrl", label: "Путь к обложке", type: "text" },
    { key: "materials", label: "Материалы (Название | ссылка, по одному на строку)", type: "textarea", rows: 3 },
    { key: "productLink", label: "Ссылка на продукт", type: "text" },
    { key: "startDate", label: "Дата начала (для авто-режима)", type: "date" },
    { key: "endDate", label: "Дата окончания (для авто-режима)", type: "date" },
    { key: "isActive", label: "Активная тема (если даты не заданы)", type: "bool" },
    { key: "sortOrder", label: "Порядок", type: "number" },
  ],
  reviews: [
    { key: "authorName", label: "Имя автора", type: "text" },
    { key: "category", label: "Категория", type: "select", options: ["meditation", "training", "thetahealing"] },
    { key: "text", label: "Текст отзыва", type: "textarea", rows: 5 },
    { key: "imageUrl", label: "Скриншот URL (опционально)", type: "text" },
    { key: "videoUrl", label: "Видео-отзыв URL (опционально)", type: "text" },
    { key: "isPlaceholder", label: "Заглушка (не показывать как реальный)", type: "bool" },
    { key: "isPublished", label: "Опубликован", type: "bool" },
    { key: "sortOrder", label: "Порядок", type: "number" },
  ],
};

const ENTITY_LABELS: Record<string, string> = {
  materials: "Бесплатные материалы",
  trainings: "Тренинги в записи",
  thetaPrograms: "Программы Тета-хилинг",
  schedule: "Расписание",
  tariffs: "Тарифы",
  freeLessons: "Бесплатные уроки",
  seasons: "Методика сезона",
  reviews: "Отзывы",
};

/* ───────────────────────────────────────────────────────────────── */
/*  Утилиты                                                          */
/* ───────────────────────────────────────────────────────────────── */

function genId(): string {
  return "id-" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function entityTitle(item: Record<string, unknown>): string {
  return String(item.title || item.name || "Без названия");
}

function entitySubtitle(item: Record<string, unknown>, entity: string): string {
  if (entity === "trainings") return `/${item.slug || ""}`;
  if (entity === "seasons") return `${item.periodText || ""}`;
  if (entity === "reviews") return item.isPlaceholder ? "заглушка" : item.authorName as string;
  return String(item.subtitle || item.tagline || "");
}

/* ───────────────────────────────────────────────────────────────── */
/*  Логин                                                            */
/* ───────────────────────────────────────────────────────────────── */

function LoginForm({ onLogin }: { onLogin: (a: GithubAuth) => void }) {
  const [pat, setPat] = useState("");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [branch, setBranch] = useState("main");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const auth: GithubAuth = {
      pat: pat.trim(),
      owner: owner.trim(),
      repo: repo.trim(),
      branch: branch.trim() || "main",
    };
    try {
      const { ok, error: err } = await verifyAuth(auth);
      if (!ok) throw new Error(err || "Не удалось подключиться.");
      saveAuth(auth);
      onLogin(auth);
      toast({ title: "Подключено", description: `${owner}/${repo} (@${branch})` });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg px-5 py-16">
      <div className="rounded-[1.75rem] border border-line bg-white/80 p-6 sm:p-8 shadow-soft">
        <div className="flex items-center gap-3">
          <Lock className="h-6 w-6 text-wine" />
          <h1 className="font-display text-2xl text-graphite">Вход в панель управления</h1>
        </div>
        <p className="mt-3 text-sm text-graphite-soft leading-relaxed">
          Введите данные доступа к репозиторию GitHub. Токен (PAT) хранится только в этом браузере —
          используйте на доверенном устройстве.
        </p>
        <PlaceholderNote className="mt-5">
          Создайте токен: github.com → Settings → Developer settings → Personal access tokens →
          Tokens (classic) → Generate new token → ☑ <strong>repo</strong> → Generate. Скопируйте сразу —
          показать снова нельзя.
        </PlaceholderNote>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <Label>GitHub Personal Access Token (PAT)</Label>
            <Input
              type="password"
              value={pat}
              onChange={(e) => setPat(e.target.value)}
              required
              placeholder="ghp_xxxxxxxxxxxxxxxxxx"
              className="mt-1.5"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Владелец (логин GitHub)</Label>
              <Input
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                required
                placeholder="zhukovmasleonok-ui"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Имя репозитория</Label>
              <Input
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                required
                placeholder="tetamiditachiya"
                className="mt-1.5"
              />
            </div>
          </div>
          <div>
            <Label>Ветка</Label>
            <Input
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="main"
              className="mt-1.5"
            />
          </div>
          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          <Button
            type="submit"
            disabled={busy}
            className="w-full h-12 bg-wine hover:bg-wine-deep text-[#fdf9f3]"
          >
            {busy ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Lock className="mr-2 h-4 w-4" />
            )}
            Подключиться
          </Button>
        </form>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────── */
/*  Поле ввода                                                      */
/* ───────────────────────────────────────────────────────────────── */

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (field.type === "bool") {
    return (
      <div className="flex items-center gap-2 pt-2">
        <Switch checked={!!value} onCheckedChange={onChange} />
        <span className="text-sm text-graphite-soft">{value ? "да" : "нет"}</span>
      </div>
    );
  }
  if (field.type === "textarea") {
    return (
      <Textarea
        value={String(value || "")}
        onChange={(e) => onChange(e.target.value)}
        rows={field.rows || 4}
      />
    );
  }
  if (field.type === "select") {
    return (
      <select
        value={String(value || "")}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-md border border-line bg-white px-3 text-sm"
      >
        <option value="">— выбрать —</option>
        {field.options?.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  }
  if (field.type === "date") {
    const v = value ? new Date(value as string).toISOString().slice(0, 10) : "";
    return (
      <Input
        type="date"
        value={v}
        onChange={(e) =>
          onChange(e.target.value ? new Date(e.target.value).toISOString() : null)
        }
      />
    );
  }
  if (field.type === "number") {
    return (
      <Input
        type="number"
        value={Number(value || 0)}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    );
  }
  return (
    <Input value={String(value || "")} onChange={(e) => onChange(e.target.value)} />
  );
}

function FieldRow({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-graphite">{field.label}</Label>
      {field.hint ? (
        <p className="text-xs text-graphite-soft/80">{field.hint}</p>
      ) : null}
      <FieldInput field={field} value={value} onChange={onChange} />
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────── */
/*  Карточка сущности                                               */
/* ───────────────────────────────────────────────────────────────── */

function EntityCard({
  entity,
  item,
  index,
  total,
  onChange,
  onDelete,
  onUp,
  onDown,
}: {
  entity: string;
  item: Record<string, unknown>;
  index: number;
  total: number;
  onChange: (key: string, value: unknown) => void;
  onDelete: () => void;
  onUp: () => void;
  onDown: () => void;
}) {
  const [open, setOpen] = useState(false);
  const fields = ENTITY_FIELDS[entity] || [];

  return (
    <div className="rounded-2xl border border-line bg-white/80 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="font-display text-lg text-graphite">{entityTitle(item)}</p>
          {entitySubtitle(item, entity) ? (
            <p className="text-xs text-graphite-soft">{entitySubtitle(item, entity)}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onUp}
            disabled={index === 0}
            className="h-8 w-8"
            title="Выше"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onDown}
            disabled={index === total - 1}
            className="h-8 w-8"
            title="Ниже"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setOpen((o) => !o)}
            className="h-8 px-3 text-sm"
          >
            {open ? "Свернуть" : "Изменить"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="h-8 w-8 text-red-700 hover:text-red-800"
            title="Удалить"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {open ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div
              key={f.key}
              className={f.type === "textarea" || f.key === "description" ? "sm:col-span-2" : ""}
            >
              <FieldRow
                field={f}
                value={item[f.key]}
                onChange={(v) => onChange(f.key, v)}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────── */
/*  Вкладка массива сущностей                                       */
/* ───────────────────────────────────────────────────────────────── */

function EntityTab({
  entity,
  items,
  onAdd,
  onChange,
  onDelete,
  onUp,
  onDown,
}: {
  entity: string;
  items: Record<string, unknown>[];
  onAdd: () => void;
  onChange: (index: number, key: string, value: unknown) => void;
  onDelete: (index: number) => void;
  onUp: (index: number) => void;
  onDown: (index: number) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl text-graphite">
          {ENTITY_LABELS[entity] || entity}
        </h2>
        <Button
          type="button"
          onClick={onAdd}
          className="h-10 bg-wine hover:bg-wine-deep text-[#fdf9f3]"
        >
          <Plus className="mr-2 h-4 w-4" /> Добавить
        </Button>
      </div>
      {items.length === 0 ? (
        <PlaceholderNote>Пока нет записей. Нажмите «Добавить», чтобы создать первую.</PlaceholderNote>
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => (
            <EntityCard
              key={String(item.id || i)}
              entity={entity}
              item={item}
              index={i}
              total={items.length}
              onChange={(key, value) => onChange(i, key, value)}
              onDelete={() => onDelete(i)}
              onUp={() => onUp(i)}
              onDown={() => onDown(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────── */
/*  Вкладка настроек                                                */
/* ───────────────────────────────────────────────────────────────── */

function SettingsTab({
  content,
  onChange,
}: {
  content: SiteContent;
  onChange: (group: string, key: string, value: unknown) => void;
}) {
  const [activeGroup, setActiveGroup] = useState("hero");
  return (
    <div>
      <h2 className="font-display text-2xl text-graphite">Настройки сайта</h2>
      <div className="mt-4 flex flex-wrap gap-1 border-b border-line">
        {SETTINGS_GROUPS.map((g) => (
          <button
            key={g.id}
            onClick={() => setActiveGroup(g.id)}
            className={
              "px-3 py-2 text-sm border-b-2 -mb-px transition-colors " +
              (activeGroup === g.id
                ? "border-wine text-wine font-medium"
                : "border-transparent text-graphite-soft hover:text-graphite")
            }
          >
            {g.label}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {SETTINGS_GROUPS.find((g) => g.id === activeGroup)?.fields.map((f) => {
          const group = content[activeGroup as keyof SiteContent] as Record<string, unknown>;
          return (
            <div
              key={f.key}
              className={f.type === "textarea" ? "sm:col-span-2" : ""}
            >
              <FieldRow
                field={f}
                value={group?.[f.key]}
                onChange={(v) => onChange(activeGroup, f.key, v)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────── */
/*  Сырой JSON (для продвинутых)                                    */
/* ───────────────────────────────────────────────────────────────── */

function RawJsonTab({
  content,
  onChange,
}: {
  content: SiteContent;
  onChange: (raw: string) => void;
}) {
  const [text, setText] = useState(() => JSON.stringify(content, null, 2));
  const [error, setError] = useState("");

  useEffect(() => {
    setText(JSON.stringify(content, null, 2));
  }, [content]);

  return (
    <div>
      <h2 className="font-display text-2xl text-graphite">Сырой JSON контента</h2>
      <p className="mt-2 text-sm text-graphite-soft">
        Расширенный режим: правьте весь контент напрямую. Изменения применятся после «Сохранить».
      </p>
      <Textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          try {
            JSON.parse(e.target.value);
            setError("");
          } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
          }
        }}
        rows={24}
        className="mt-4 font-mono text-xs"
      />
      {error ? (
        <p className="mt-2 text-sm text-red-700">JSON невалиден: {error}</p>
      ) : null}
      <Button
        type="button"
        disabled={!!error}
        onClick={() => {
          try {
            const parsed = JSON.parse(text) as SiteContent;
            onChange(text);
            setText(text);
          } catch {
            /* проверено выше */
          }
        }}
        className="mt-3 h-10 bg-wine hover:bg-wine-deep text-[#fdf9f3]"
      >
        Применить изменения
      </Button>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────── */
/*  Главный компонент                                               */
/* ───────────────────────────────────────────────────────────────── */

export function AdminView() {
  useDocumentTitle("Панель управления");
  const { toast } = useToast();
  const [auth, setAuth] = useState<GithubAuth | null>(() => loadAuth());
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [sha, setSha] = useState<string>("");
  const [activeTab, setActiveTab] = useState("settings");
  const [dirty, setDirty] = useState(false);

  const load = useCallback(async () => {
    if (!auth) return;
    setLoading(true);
    try {
      const { content: raw, sha: s } = await fetchContentJson(auth);
      const parsed = JSON.parse(raw) as SiteContent;
      setContent(parsed);
      setSha(s);
      setDirty(false);
    } catch (e) {
      toast({
        title: "Ошибка загрузки",
        description: e instanceof Error ? e.message : String(e),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [auth, toast]);

  useEffect(() => {
    if (auth) load();
  }, [auth, load]);

  const save = useCallback(async () => {
    if (!auth || !content) return;
    setSaving(true);
    try {
      const serialized = JSON.stringify(content, null, 2);
      const newSha = await saveContentJson(
        auth,
        serialized,
        sha,
        "Admin panel: update content.json"
      );
      setSha(newSha);
      setDirty(false);
      toast({
        title: "Сохранено",
        description:
          "GitHub Actions пересоберёт сайт за 1–2 минуты. После — сделайте hard refresh (Ctrl+Shift+R).",
      });
    } catch (e) {
      toast({
        title: "Ошибка сохранения",
        description: e instanceof Error ? e.message : String(e),
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }, [auth, content, sha, toast]);

  const logout = () => {
    saveAuth(null);
    setAuth(null);
    setContent(null);
    setSha("");
    setDirty(false);
  };

  // deep-clone + mutate content + setDirty
  const update = useCallback(
    (mutator: (c: SiteContent) => void) => {
      setContent((prev) => {
        if (!prev) return prev;
        const next = JSON.parse(JSON.stringify(prev)) as SiteContent;
        mutator(next);
        return next;
      });
      setDirty(true);
    },
    []
  );

  // Entity operations
  const addItem = (entity: string) => {
    update((c) => {
      const arr = c[entity as keyof SiteContent] as unknown as Record<string, unknown>[];
      const fields = ENTITY_FIELDS[entity] || [];
      const newItem: Record<string, unknown> = { id: genId() };
      for (const f of fields) {
        if (f.type === "bool") newItem[f.key] = entity === "reviews" && f.key === "isPublished" ? true : false;
        else if (f.type === "number") newItem[f.key] = 0;
        else if (f.type === "select") newItem[f.key] = f.options?.[0] || "";
        else newItem[f.key] = "";
      }
      arr.push(newItem);
    });
  };

  const updateItem = (entity: string, index: number, key: string, value: unknown) => {
    update((c) => {
      const arr = c[entity as keyof SiteContent] as unknown as Record<string, unknown>[];
      if (arr[index]) arr[index][key] = value;
    });
  };

  const deleteItem = (entity: string, index: number) => {
    update((c) => {
      const arr = c[entity as keyof SiteContent] as unknown as Record<string, unknown>[];
      arr.splice(index, 1);
    });
  };

  const moveItem = (entity: string, index: number, dir: -1 | 1) => {
    update((c) => {
      const arr = c[entity as keyof SiteContent] as unknown as Record<string, unknown>[];
      const target = index + dir;
      if (target < 0 || target >= arr.length) return;
      const tmp = arr[index];
      arr[index] = arr[target];
      arr[target] = tmp;
    });
  };

  if (!auth) {
    return (
      <div className="min-h-screen bg-milk">
        <LoginForm
          onLogin={(a) => {
            setAuth(a);
          }}
        />
      </div>
    );
  }

  if (loading || !content) {
    return (
      <div className="min-h-screen bg-milk flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-wine" />
          <p className="mt-4 text-sm text-graphite-soft">Загрузка контента из GitHub…</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "settings", label: "Настройки" },
    { id: "materials", label: ENTITY_LABELS.materials },
    { id: "trainings", label: ENTITY_LABELS.trainings },
    { id: "thetaPrograms", label: ENTITY_LABELS.thetaPrograms },
    { id: "schedule", label: ENTITY_LABELS.schedule },
    { id: "tariffs", label: ENTITY_LABELS.tariffs },
    { id: "freeLessons", label: ENTITY_LABELS.freeLessons },
    { id: "seasons", label: ENTITY_LABELS.seasons },
    { id: "reviews", label: ENTITY_LABELS.reviews },
    { id: "raw", label: "Сырой JSON" },
  ];

  return (
    <div className="min-h-screen bg-milk">
      {/* Sticky шапка */}
      <header className="sticky top-0 z-30 border-b border-line bg-cream/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-5 py-3 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-xl text-graphite flex-1">Панель управления</h1>
          {dirty ? (
            <span className="text-xs text-gold">● несохранённые правки</span>
          ) : null}
          <Button
            type="button"
            variant="outline"
            onClick={load}
            disabled={loading}
            className="h-10"
          >
            <RefreshCw
              className={loading ? "mr-2 h-4 w-4 animate-spin" : "mr-2 h-4 w-4"}
            />
            Обновить
          </Button>
          <Button
            type="button"
            onClick={save}
            disabled={saving || !dirty}
            className="h-10 bg-wine hover:bg-wine-deep text-[#fdf9f3]"
          >
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Сохранить
          </Button>
          <Button type="button" variant="ghost" onClick={logout} className="h-10">
            <LogOut className="mr-2 h-4 w-4" /> Выйти
          </Button>
        </div>
      </header>

      {/* Tabs */}
      <nav className="border-b border-line bg-white/60 sticky top-[57px] z-20">
        <div className="mx-auto max-w-7xl px-5 flex flex-wrap gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={
                "px-3 py-2.5 text-sm border-b-2 -mb-px transition-colors " +
                (activeTab === t.id
                  ? "border-wine text-wine font-medium"
                  : "border-transparent text-graphite-soft hover:text-graphite")
              }
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-5 py-8">
        {activeTab === "settings" ? (
          <SettingsTab
            content={content}
            onChange={(group, key, value) =>
              update((c) => {
                const g = c[group as keyof SiteContent] as Record<string, unknown>;
                if (g) g[key] = value;
              })
            }
          />
        ) : null}

        {["materials", "trainings", "thetaPrograms", "schedule", "tariffs", "freeLessons", "seasons", "reviews"].includes(
          activeTab
        ) ? (
          <EntityTab
            entity={activeTab}
            items={
              (content[activeTab as keyof SiteContent] as unknown as Record<string, unknown>[]) || []
            }
            onAdd={() => addItem(activeTab)}
            onChange={(i, key, value) => updateItem(activeTab, i, key, value)}
            onDelete={(i) => deleteItem(activeTab, i)}
            onUp={(i) => moveItem(activeTab, i, -1)}
            onDown={(i) => moveItem(activeTab, i, 1)}
          />
        ) : null}

        {activeTab === "raw" ? (
          <RawJsonTab
            content={content}
            onChange={(raw) => {
              try {
                const parsed = JSON.parse(raw) as SiteContent;
                setContent(parsed);
                setDirty(true);
              } catch {
                /* проверено внутри компонента */
              }
            }}
          />
        ) : null}
      </main>

      <GoldDivider className="my-4" />
      <PlaceholderNote className="mx-auto max-w-7xl px-5 pb-12">
        После «Сохранить» GitHub Actions пересоберёт сайт за 1–2 минуты. Обновите страницу сайта с
        зажатым Shift (Ctrl+Shift+R или Cmd+Shift+R), чтобы увидеть изменения. Все правки
        фиксируются в истории коммитов репозитория — всегда можно откатить.
      </PlaceholderNote>
    </div>
  );
}
