# QuoteFeed MVP

MVP-каталог цитат известных людей на Next.js + Payload CMS.

## Стек

- Next.js (App Router)
- Payload CMS (админка + API внутри того же приложения)
- PostgreSQL
- Tailwind CSS
- shadcn/ui (базовые UI-компоненты)
- TypeScript

## Быстрый старт

1. Установить зависимости:

```bash
npm install
```

2. Поднять PostgreSQL (локально или через Docker).
3. Скопировать переменные:

```bash
cp .env.example .env
```

4. Запустить проект:

```bash
npm run dev
```

## Что уже реализовано

- Коллекции Payload:
  - `authors`
  - `quotes`
  - `topics`
  - `users`
  - `media`
- Админка Payload: `/admin`
- API Payload: `/api/*`
- Публичные страницы:
  - `/` — лента цитат
  - `/authors/[slug]` — страница автора
  - `/quotes/[slug]` — страница цитаты
  - `/topics/[slug]` — страница темы

## Принцип MVP

- Один репозиторий и одно приложение.
- Нет отдельного backend/admin-приложения.
- Нет лишней сложности (микросервисов, realtime, лайков/комментариев, регистрации читателей).
