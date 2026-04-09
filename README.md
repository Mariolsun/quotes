# QuoteFeed MVP

MVP-каталог цитат известных людей на Next.js + Payload CMS.

## Стек

- Next.js (App Router)
- Payload CMS (админка + API внутри того же приложения)
- PostgreSQL
- Tailwind CSS
- shadcn/ui (базовые UI-компоненты)
- TypeScript

---

## Подробный локальный запуск

Ниже инструкция для случая, когда вы запускаете проект с нуля на своём компьютере.

### 1) Установите Node.js и npm

Рекомендуется Node.js **22 LTS**.

Проверьте, что установилось:

```bash
node -v
npm -v
```

---

### 2) Установите Docker Desktop

Если команда `docker` не найдена (`bash: docker: command not found`), значит Docker не установлен или не добавлен в PATH.

Что сделать:

1. Установить Docker Desktop с официального сайта: https://www.docker.com/products/docker-desktop/
2. Перезапустить терминал (иногда — полностью перезагрузить компьютер).
3. Проверить установку:

```bash
docker --version
docker compose version
```

Если команда по-прежнему не найдена:
- На Windows убедитесь, что Docker Desktop запущен.
- На Linux проверьте, что установлен Docker Engine и сервис запущен (`systemctl status docker`).
- На macOS убедитесь, что приложение Docker открыто.

---

### 3) Запустите PostgreSQL в Docker

```bash
docker run --name quotes-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=quotes \
  -p 5432:5432 \
  -d postgres:16
```

Проверить, что контейнер работает:

```bash
docker ps
```

---

### 4) Установите зависимости проекта

```bash
npm install
```

Если ранее были ошибки зависимостей, очистите и поставьте заново:

```bash
rm -rf node_modules package-lock.json
npm install
```

Для Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

---

### 5) Создайте `.env`

```bash
cp .env.example .env
```

Содержимое переменных по умолчанию:

```env
DATABASE_URI=postgresql://postgres:postgres@localhost:5432/quotes
PAYLOAD_SECRET=change-me
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

---

### 6) Запустите проект

```bash
npm run dev
```

Откройте:

- Публичный сайт: http://localhost:3000
- Админка Payload: http://localhost:3000/admin

---

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

---

## Частые проблемы

### `docker: command not found`

Docker не установлен или не доступен из терминала. Установите Docker Desktop и перезапустите терминал/систему.

### `next is not recognized` / `spawn next ENOENT`

Обычно это значит, что зависимости не установлены. Выполните:

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Конфликты npm (`ERESOLVE`)

Если видите конфликт версий, убедитесь, что используете версии из `package.json`, затем удалите lock-файл и переустановите зависимости.

---

## Принцип MVP

- Один репозиторий и одно приложение.
- Нет отдельного backend/admin-приложения.
- Нет лишней сложности (микросервисов, realtime, лайков/комментариев, регистрации читателей).
