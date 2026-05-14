# CatPolyglot Server

## Требования
- Node.js 20+
- npm 10+
- Linux/macOS/WSL (проект использует `sharp`)

## Быстрый запуск

```bash
npm install
cp .env.example .env
npm run start
```

Сервер поднимется на `http://localhost:${SERVER_PORT}`.

## Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
SERVER_PORT=3000
ADMIN_LOGIN=admin
ADMIN_PASSWORD=changeme123
SQLITE_PATH=./database.sqlite
```

### Описание переменных
- `SERVER_PORT` — порт HTTP сервера.
- `ADMIN_LOGIN` — логин администратора (`/admin/login`).
- `ADMIN_PASSWORD` — пароль администратора.
- `SQLITE_PATH` — путь к sqlite-файлу базы данных.

## Миграции / инициализация БД

При старте приложения миграции выполняются автоматически (`utils/server/migrations.js`), таблицы создаются через `CREATE TABLE IF NOT EXISTS`.

Отдельно запускать миграции не нужно — достаточно `npm run start`.

## Режим разработки

```bash
npm run dev
```

## Прод-развёртывание (минимум)

1. Подготовьте директорию приложения и скопируйте проект.
2. Выполните `npm ci`.
3. Создайте `.env` с прод-значениями.
4. Запустите процесс-менеджером (например, `pm2`):

```bash
npx pm2 start app.js --name catpolyglot
npx pm2 save
```

5. Прокиньте внешний трафик через reverse proxy (nginx/caddy).

## Проверка после запуска

- Откройте `http://localhost:<SERVER_PORT>/`
- Откройте `http://localhost:<SERVER_PORT>/admin/login`
- Проверьте, что создаётся sqlite-файл по `SQLITE_PATH`

## Частые проблемы

- `sharp` не установился: обновите Node.js до LTS и повторите `npm install`.
- Порт занят: смените `SERVER_PORT`.
- Нет доступа к sqlite-файлу: проверьте права на директорию/файл `SQLITE_PATH`.
