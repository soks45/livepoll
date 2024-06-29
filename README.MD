# Архитектурное решение
классическое web-приложение на MVC

## Стек
- Node.js - платформа
- Express.js - веб-сервер
- ejs - шаблонизатор
- postgresql - субд

## Структура
- /api - ядро системы, открытый api
- /client - ui, внутренний api

## Как запустить
- Нужен установленный Node.js выше 14 версии
- npm ci
- нужно создать .env и прописать в нём указанные переменные окружения
- в postresql нужно иметь БД livepoll
- npm run migrate - запуск миграций
- npm run start
