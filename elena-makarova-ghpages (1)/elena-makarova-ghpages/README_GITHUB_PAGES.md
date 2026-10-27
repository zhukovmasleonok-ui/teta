# Сайт Елены Макаровой — статичная сборка для GitHub Pages

Этот вариант сайта собран для хостинга на **GitHub Pages** — бесплатном
статичном хостинге от GitHub. Сайт не требует сервера, базы данных или
админ-панели: весь контент хранится в одном JSON-файле в репозитории.

---

## Что изменилось по сравнению с «полной» версией

| Было (VPS/Vercel) | Стало (GitHub Pages) |
|-------------------|----------------------|
| База SQLite + админ-панель | Один JSON-файл `content/content.json` |
| Редактирование через `/#/admin` | Редактирование прямо в GitHub (веб-редактор) |
| Серверный парсинг постов Telegram | Официальный встраиваемый виджет Telegram (iframe) |
| API-роуты (`/api/*`) | Удалены (нечему работать без сервера) |
| Динамический SSR | Статичная HTML-сборка (`next export`) |

**Дизайн, анимации, адаптивность, все 9 разделов, фото и видео-вставки —
полностью сохранены.**

---

## Развёртывание за 5 минут

### Шаг 1. Создайте репозиторий на GitHub

- Зайдите на [github.com/new](https://github.com/new)
- Имя репозитория: например, `elena-makarova` (имя войдёт в URL сайта)
- Тип: **Public** (GitHub Pages для приватных репо — только на тарифе Pro)
- ☑ Add a README file — на ваше усмотрение
- Create repository

### Шаг 2. Залейте содержимое архива

Распакуйте `elena-makarova-ghpages.tar.gz` (или `.zip`) в пустую папку.
В корне должны лежать: `package.json`, `next.config.ts`, `src/`, `public/`,
`content/`, `.github/`, этот README.

```bash
tar -xzf elena-makarova-ghpages.tar.gz
cd elena-makarova-ghpages
git init
git add .
git commit -m "Первая версия сайта Елены Макаровой"
git branch -M main
git remote add origin https://github.com/<ВАШ_ЛОГИН>/elena-makarova.git
git push -u origin main
```

(Или просто перетащите файлы в веб-интерфейс GitHub — drag & drop.)

### Шаг 3. Включите GitHub Pages

- В репозитории: **Settings → Pages**
- **Source: GitHub Actions** (важно: именно Actions, а не Deploy from branch)
- Сохраните

### Шаг 4. Запустите workflow

- Вкладка **Actions** → workflow «Deploy to GitHub Pages»
- Если не запустился автоматически — нажмите **Enable workflows**, затем на
  имени workflow справа `Run workflow`
- Через 1–2 минуты сайт будет доступен по адресу
  `https://<ВАШ_ЛОГИН>.github.io/elena-makarova/`

### Шаг 5. Готово!

Откройте сайт. Все разделы, фото, кнопки «написать в Telegram» →
@Elenavolshebstvo — на месте.

---

## Как редактировать контент

**Всё содержимое сайта — в одном файле: `content/content.json`.**

Структура файла:
```json
{
  "hero": { "name", "title", "subtitle", "lead", "ctaPrimary", "ctaSecondary", "coverUrl" },
  "about": { "title", "paragraphs", "note", "coverUrl" },
  "thetaIntro": { "title", "description", "videoUrl", "heroUrl" },
  "invite": { "title", "text" },
  "contacts": { "telegramUrl", "telegramHandle", "email", "phone", "city" },
  "socials": { "instagramReel", "instagramPost", "instagramProfile" },
  "seo": { "title", "description" },
  "materials": [ ... ],
  "trainings": [ ... ],
  "thetaPrograms": [ ... ],
  "schedule": [ ... ],
  "tariffs": [ ... ],
  "freeLessons": [ ... ],
  "seasons": [ ... ],
  "reviews": [ ... ],
  "tgManualPosts": [ ... ]
}
```

### Отредактировать через веб-интерфейс GitHub

1. В репозитории откройте `content/content.json`
2. Нажмите ✏️ **Edit** (карандаш справа сверху)
3. Поменяйте нужный текст (например, `description` у тренинга)
4. Прокрутите вниз → **Commit changes**
5. Через 1–2 минуты GitHub Actions пересоберёт сайт → изменения видны

### Добавить новый отзыв (пример)

Найдите в JSON массив `reviews`, добавьте новый объект:
```json
{
  "authorName": "Мария, Москва",
  "category": "meditation",
  "text": "После практики появилось состояние тепла и опоры...",
  "imageUrl": "",
  "videoUrl": "",
  "isPlaceholder": false,
  "sortOrder": 3
}
```

### Добавить новый тренинг

В массив `trainings`:
```json
{
  "slug": "novyy-trening",
  "title": "Название тренинга",
  "tagline": "Подзаголовок",
  "description": "Описание...",
  "coverUrl": "/images/training-rejection.jpg",
  "forWhom": "Кому 1\nКому 2",
  "workWith": "Тема 1\nТема 2",
  "program": "Урок 1\nУрок 2",
  "videoUrl": "https://www.youtube.com/watch?v=XXXX",
  "priceText": "3000 ₽",
  "formatText": "Записанный формат",
  "paymentLink": "https://your-payment-link.ru/...",
  "sortOrder": 1
}
```

Поля с переносами (`forWhom`, `workWith`, `program`, `features`) используют `\n` между пунктами.

---

## Замена изображений

Все картинки лежат в `public/images/`. Чтобы заменить сгенерированный
портрет на реальный:
1. Подготовьте фото в тех же пропорциях
2. Назовите так же (например, `hero-portrait.jpg`)
3. Загрузите в `public/images/` через веб-интерфейс GitHub (drag & drop)
4. Commit → сайт пересоберётся

Для нового файла — положите в `public/images/` и укажите путь
`/images/новый-файл.jpg` в `content.json`.

---

## Своё доменное имя

1. В репозитории: **Settings → Pages → Custom domain**
2. Введите домен (например, `elena-makarova.ru`)
3. У DNS-провайдера домена добавьте A-запись на IP GitHub Pages
   (см. [список IP](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site))
4. ☑ Enforce HTTPS
5. **Важно для basePath:** при использовании своего домена basePath должен
   быть пустым. В **Settings → Secrets and variables → Actions → Variables →
   New repository variable** добавьте:
   - Name: `NEXT_PUBLIC_BASE_PATH`
   - Value: (пустая строка)

   Workflow в `.github/workflows/deploy.yml` уже умеет это читать.

---

## Корневой репозиторий `username.github.io`

Если вы создали репозиторий с именем `<ваш_логин>.github.io` (это особый
формат для корневых сайтов), basePath должен быть пустым — иначе ассеты не
загрузятся. Действуйте как в разделе «Своё доменное имя»: задайте
`NEXT_PUBLIC_BASE_PATH` пустой переменной репо.

---

## Telegram-виджет: как это работает

Блок «Свежие мысли Елены» встраивает официальный виджет Telegram через
`<iframe src="https://t.me/Elena_volshebstvo?embed=1">`. Виджет сам
подтягивает последние посты канала — без сервера, без токенов, без API.

- **Канал-источник постов:** `@Elena_volshebstvo` (публичный канал «Полезные
  практики»). Сменить — константа `TELEGRAM_FEED_CHANNEL` в
  `src/components/site/TelegramSection.tsx`.
- **Контактный хэндл** «написать Елене»: `@Elenavolshebstvo` (профиль
  «Сессии ТетаХилинг»). Меняется в `content/content.json → contacts`.

Если Telegram ограничит встраивание виджета — лента не подгрузится, но сайт
продолжит работать. Под кнопкой есть прямая ссылка на канал как fallback.

---

## Локальный запуск (для теста перед коммитом)

```bash
npm install
npm run build        # соберёт ./out
npm run dev          # http://localhost:3000 — для разработки
```

Чтобы посмотреть собранную статику локально:
```bash
npx serve out        # или: python3 -m http.server -d out 8000
```

Для корректных ассетов при локальной проверке `./out` basePath должен
совпадать с тем, что используете. Если тестируете локально без подпути —
`NEXT_PUBLIC_BASE_PATH` не задавайте.

---

## Что НЕ работает на GitHub Pages (по дизайну платформы)

- ❌ Запись правок через форму на сайте (нет сервера → некуда сохранять).
  Все правки — через коммит в `content.json`.
- ❌ Живой «полный» фид с парсингом постов — заменён официальным виджетом
  Telegram (он сам всё подгружает на клиенте).
- ❌ Админ-панель с паролем — заменена прямым редактированием JSON в GitHub.
- ❌ Динамическая SEO-разметка для каждого раздела — но базовые meta-теги
  (`title`, `description`, OpenGraph) на главной есть.

---

## Частые проблемы

**Сайт открывается, но без стилей / картинок.** → basePath не совпадает с
URL. Либо репо называется `username.github.io` (нужно пустое basePath), либо
вы перешли на свой домен (тоже пустое basePath). См. разделы выше.

**Workflow не запускается.** → Settings → Pages → Source должен быть
**GitHub Actions** (не Deploy from branch).

**Лента Telegram не подгрузилась.** → Telegram может ограничивать
встраивание. Откройте канал напрямую по ссылке `@Elenavolshebstvo`.

**После коммита изменения не видны.** → Подождите 1–2 минуты (сборка), затем
сделайте жёсткий refresh браузера (Ctrl+Shift+R). Проверьте вкладку
Actions — нет ли красных ошибок.

---

## Структура архива

```
elena-makarova-ghpages/
├── content/content.json     ← ВЕСЬ КОНТЕНТ (редактируйте здесь)
├── public/images/           ← все изображения
├── src/                     # исходники (App Router, TypeScript)
├── .github/workflows/deploy.yml  ← автодеплой на GitHub Pages
├── next.config.ts           # output: export
├── package.json             # зависимости (без БД/сервера)
├── README_GITHUB_PAGES.md   # этот файл
└── ИНТЕГРАЦИИ.md            # общая документация
```

---

## Техподдержка

Если что-то не работает — откройте вкладку **Actions** в репозитории и
посмотрите лог последнего запуска workflow. Частые ошибки:
- `next build` упал → проверьте `content.json` на валидность JSON
  (например, забытая запятая).
- `Deploy failed` → проверьте Settings → Pages → Source = GitHub Actions.
