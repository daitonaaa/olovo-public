# Public + CMS

## Требования

Node.JS >16, PostgreSQL 12

## Раскатка проекта

### Поднимаем client

1. `npm i` or `yarn install`
2. `npm run dev`

### Поднимаем backend

1. Создать роль `olovo_public_user` с паролем `olovo_public_user`

SQL:

```sql
create role olovo_public_user with password 'olovo_public_user' login superuser;
```

2. Создать БД `olovo_public`

SQL:

```sql
create database olovo_public;
```

3. Запустить миграции `yarn run db:update`
4. Создать копию .env.local от .env
5. Запустить проект `yarn run start:dev`

## Документаця

# API

- [Создание crud элементов](./docs/create-crud.md)

# Client

- [Начало разработки](./docs/client-start.md)
- [Шаблоны](./docs/client-template.md)
- [Crud элементы для client](./docs/crud-client-settings.md)
