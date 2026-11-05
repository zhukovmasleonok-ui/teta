# Сайт Елены Макаровой — статичная сборка для GitHub Pages

Полноценный сайт-визитка + панель администратора, развёрнутая на статичном
GitHub Pages. Контент хранится в одном JSON-файле в репозитории, правки
делаются через админку (коммиты в репо через GitHub API).

---

## Что внутри

| Компонент | Где |
|-----------|-----|
| Сайт (9 разделов, дизайн, анимации) | `src/` |
| Контент (всё содержимое) | `content/content.json` |
| Изображения | `public/images/` |
| Панель администратора | `/#/admin` — пишет в `content/content.json` через GitHub API |
| Автодеплой | `.github/workflows/deploy.yml` |
| Настройка basePath для картинок | `next.config.ts` + `next-image-loader.ts` |

---

## Развёртывание за 5 минут

### Шаг 1. Создайте репозиторий на GitHub

- github.com/new
- Имя: например, `tetamiditachiya` (войдёт в URL сайта)
- Visibility: ☑ **Public**
- ☐ Add a README / .gitignore / license — НЕ ставьте
- Create repository

### Шаг 2. Залейте файлы архива через git push

```bash
# Распакуйте архив
tar -xzf elena-makarova-ghpages.tar.gz   # или .zip
cd elena-makarova-ghpages

# Инициализируйте и залейте
git init
git add .
git commit -m "Первая версия сайта Елены Макаровой"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/ВАШ-РЕПО.git
git push -u origin main
```

При пуше GitHub спросит логин + **токен** (не пароль аккаунта).
Создать токен: github.com → Settings → Developer settings → Personal access
tokens → Tokens (classic) → Generate new token → ☑ `repo` → Generate →
скопируйте → вставьте как пароль.

### Шаг 3. Включите GitHub Pages

- В репозитории: Settings → Pages
- **Source: GitHub Actions** (не Deploy from branch!)
- Сохранение автоматическое.

### Шаг 4. Дождитесь сборки

- Вкладка Actions → workflow «Deploy to GitHub Pages» запустится автоматически.
- 1–2 минуты → зелёная галочка ✓.
- Откройте: `https://ВАШ_ЛОГИН.github.io/ВАШ-РЕПО/`

Сайт готов 🎉

---

## Панель администратора

### Вход

1. Откройте: `https://ВАШ_ЛОГИН.github.io/ВАШ-РЕПО/#/admin`
2. Введите:
   - **PAT** — Personal Access Token со scope `repo`
     (создаётся: github.com → Settings → Developer settings → Personal
     access tokens → Tokens (classic) → Generate new token → ☑ `repo`)
   - **Владелец** — ваш логин GitHub
   - **Имя репозитория** — например, `tetamiditachiya`
   - **Ветка** — `main` (по умолчанию)
3. Нажмите «Подключиться». Токен проверяется запросом к content.json.

PAT хранится только в localStorage вашего браузера. Используйте на
доверенном устройстве. Чтобы «забыть» токен — нажмите «Выйти» или
очистите localStorage браузера.

### Что можно редактировать

**Настройки сайта** (одна вкладка, подразделы):
- Главный экран: имя, слоган, подзаголовок, вводный текст, тексты кнопок, путь к фото
- Знакомство: заголовок, абзацы, примечание, путь к фото
- Введение в Тета-хилинг: заголовок, описание, видео URL, путь к фоновому фото
- Приглашение: заголовок, текст
- Контакты: Telegram (ссылка и подпись, e-mail, телефон, город
- Соцсети: Instagram Reel/Post/Profile URLs
- SEO: title и description для мета-тегов

**Сущности** (отдельные вкладки): для каждой — список карточек с формами,
добавление, удаление, перемещение вверх/вниз:
- Бесплатные материалы
- Тренинги в записи (slug, описание, программа, видео, цена, ссылка на оплату)
- Программы Тета-хилинг
- Расписание
- Тарифы
- Бесплатные уроки
- Методика сезона (4 темы, авто-режим по датам или isActive)
- Отзывы

**Сырой JSON** — для продвинутых: правка всего content.json напрямую.

### Как сохранять

- Нажмите **«Сохранить»** в шапке (становится активной при наличии правок).
- Админка коммитит обновлённый content.json в репозиторий (через GitHub API).
- GitHub Actions автоматически пересобирает сайт за 1–2 минуты.
- После — откройте сайт и сделайте **hard refresh** (Ctrl+Shift+R).

Все правки фиксируются в истории коммитов репо — откатить можно всегда.

---

## Замена изображений

Все картинки лежат в `public/images/`. Чтобы заменить сгенерированный
портрет на реальный:
1. Подготовьте фото в тех же пропорциях.
2. Назовите так же (например, `hero-portrait.jpg`).
3. Загрузите в `public/images/` через веб-интерфейс GitHub (Add file →
   Upload files) или через git push.
4. Commit → сайт пересоберётся.

Для нового файла — укажите путь `/images/новый-файл.jpg` в админке
(поле «Обложка» у нужной сущности).

---

## Своё доменное имя

1. Settings → Pages → Custom domain → введите домен.
2. У DNS-провайдера добавьте A-записи на IP GitHub Pages.
3. ☑ Enforce HTTPS.
4. **basePath:** при использовании своего домена или репо формата
   `<логин>.github.io` basePath должен быть пустым. Settings → Secrets
   and variables → Actions → Variables → New repository variable:
   - Name: `NEXT_PUBLIC_BASE_PATH`
   - Value: (пустая строка)

---

## Telegram-виджет

Блок «Свежие мысли Елены» — официальный встраиваемый виджет Telegram
(iframe `https://t.me/Elena_volshebstvo?embed=1`). Без сервера, без токенов.

- **Канал-источник постов:** `@Elena_volshebstvo` (публичный канал «Полезные
  практики»). Сменить — константа `TELEGRAM_FEED_CHANNEL` в
  `src/components/site/TelegramSection.tsx`.
- **Контактный хэндл** «написать Елене»: `@Elenavolshebstvo` (профиль
  «Сессии ТетаХилинг»). Меняется в админке → Контакты.

---

## Что НЕ работает на GitHub Pages (по дизайну платформы)

- ❌ Запись правок без задержки: после «Сохранить» сайт обновится через
  1–2 минуты (пока GitHub Actions пересоберёт).
- ❌ Динамическая SEO-разметка для каждой страницы (базовые meta на
  главной есть).
- ❌ Оптимизация изображений на сервере (Next.js Image) — изображения
  отдаются как есть через `loader: "custom"`.

---

## Частые проблемы

| Симптом | Решение |
|---------|---------|
| Сайт белый, без стилей / картинок | basePath не совпадает. См. «Своё доменное имя». |
| Админка: «Файл не найден» | Проверьте путь: должен быть `content/content.json`. |
| Админка: «401 неверный токен» | Пересоздайте PAT со scope `repo`. |
| Админка: «409 файл изменён» | Кто-то уже закоммитил новую версию. Перезагрузите админку (кнопка «Обновить»). |
| Workflow не запускается | Settings → Pages → Source = **GitHub Actions**. |
| После сохранения изменения не видны | Подождите 1–2 минуты + Ctrl+Shift+R. |

---

## Локальный запуск (для теста перед коммитом)

```bash
npm install
npm run build        # соберёт ./out
npm run dev          # http://localhost:3000 — для разработки
npx serve out        # посмотреть собранную статику
```

---

## Структура архива

```
elena-makarova-ghpages/
├── content/content.json     ← ВЕСЬ КОНТЕНТ (читается админкой)
├── public/images/           ← все изображения
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/site/    # компоненты сайта + AdminView
│   └── lib/
│       ├── site-content.ts  # статичный импорт content.json
│       ├── site-context.tsx # React-контекст (без API refresh)
│       ├── github-api.ts    # PAT-аутентификация + чтение/запись content.json
│       └── types.ts         # TypeScript-типы и константы
├── .github/workflows/deploy.yml  ← автодеплой на GitHub Pages
├── next.config.ts           # output: export + custom image loader
├── next-image-loader.ts     # добавляет basePath к URL картинок
├── package.json             # зависимости (без БД/сервера)
├── README_GITHUB_PAGES.md   # этот файл
└── ИНТЕГРАЦИИ.md            # общая документация
```
