import { DateTime } from 'luxon';

export function requireNotNull<T>(value: T | undefined | null, message?: string): T {
  if (value === undefined || value === null) {
    throw new TypeError(message ?? 'Required value is not defined');
  }
  return value;
}

/**
 * @param start
 * @param end
 * @example getRangeArr(1, 5) = [1, 2, 3, 4, 5]
 */
export const getRangeArr = (start: number, end: number): number[] => {
  let cursor = start;
  return [cursor, ...new Array(end - start).fill(null).map(() => ++cursor)];
};

export const formatISODate = (isoDate: string): string => {
  return DateTime.fromISO(isoDate).toLocaleString();
};

export const createSiteUrlByPath = (pagePath: string): string => {
  return `${process.env.REACT_APP_SITE_URL}${pagePath}`;
};

export const isDebug = () => {
  return process.env.NODE_ENV !== 'production';
};

export const rusTextToLat = (w: string): string => {
  const converter: any = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'c',
    ч: 'ch',
    ш: 'sh',
    щ: 'sch',
    ь: '',
    ы: 'y',
    ъ: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
  };

  const word = w.toLowerCase();

  let answer = '';
  for (let i = 0; i < word.length; ++i) {
    if (converter[word[i]] == undefined) {
      answer += word[i];
    } else {
      answer += converter[word[i]];
    }
  }

  answer = answer.replace(/[^-0-9a-z]/g, '-');
  answer = answer.replace(/[-]+/g, '-');
  answer = answer.replace(/^-|-$/g, '');
  return answer;
};

export const safeParseJsonValue = <T>(candidate: string, defaultValue: T): T => {
  try {
    return JSON.parse(candidate) as T;
  } catch (err) {
    console.error('Fail to parse json value ', candidate);
    return defaultValue;
  }
};
