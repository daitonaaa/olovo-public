import { FieldType, Meta } from './api';

export const componentTypeMeta: { [type in FieldType]: Meta } = {
  [FieldType.Url]: {
    title: 'Ссылка на изображение',
  },
  [FieldType.Title]: {
    title: 'Заголовок',
  },
  [FieldType.Description]: {
    title: 'Текст',
  },
  [FieldType.StringArray]: {
    title: 'Массив строк',
  },
  [FieldType.Json]: {
    title: 'Json',
  },
  [FieldType.HtmlText]: {
    title: 'Html',
  },
  [FieldType.FilesPicker]: {
    title: 'Загрузка файлов',
  },
  [FieldType.Meta]: {
    title: 'Метаданные',
  },
};
