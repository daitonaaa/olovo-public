# Crud элементы для client

Для элементов с режимом запись, список записей (например новости)
предлагается использовать автоматическую генерацию crud моделей
для использования в административной интерфейсе и клиентской части.

## Общие свойства __crud_EntityName-ShortList & __crud_EntityName-Single

`getCrudListPageLink(): string` - Возвращает путь до страницы с полным списком

`getCrudItemPageLink(instance: any): string` - Возвращает путь до страницы с
конкретным инстансом


## __crud_EntityName-ShortList


`items: any[]` - Массив элементов для конкретной сущности

`all: boolean` - Отображать все элементы


## __crud_EntityName-Single


`item` - Текущий элемент на основании `slug`
