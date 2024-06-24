import { ExtractKeys } from '../types';
import { DateTime } from 'luxon';

/**
 *
 * @param obj any
 * @param path string
 * @description getting object field by lodash path example 'deepPath({ foo: { bar: 1 } }, 'foo.bar') // 1
 */
export const deepPath = <T extends Record<string, any>>(obj: T, path: ExtractKeys<T>) => {
  const paths = path.toString().split('.');
  let current = obj;

  for (let i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined;
    } else {
      current = current[paths[i]];
    }
  }
  return current as any;
};

export const onlyDigits = (v: string) => v.replace(/\D/g, '');

/**
 * Replace last part of filename with extensions
 *
 * Example:
 * write_filename_end(
 *  'test.jpg', (match) => {
 *   const last_part = match; // will be .jpg
 *   return `_copy${last_part}`;
 * })
 *
 * Returned: test_copy.jpg
 */
export const write_filename_end = (
  file_name: string,
  replacer: (match_group: string) => string
): string => file_name.replace(/(\.\w+)$/g, (match) => replacer(match));

export type PickImageSize = 'orig' | 'l' | 's' | 'm';

export const pickImage = (path: string, format: 'webp' | 'original', size: PickImageSize) => {
  return write_filename_end(path, (match) => {
    const ext = format === 'webp' ? '.webp' : match;
    const s = size === 'orig' ? '' : `_${size}`;
    return `${s}${ext}`;
  });
};

export const safeJsonStringify = (obj: any): string => {
  try {
    return JSON.stringify(obj);
  } catch {
    return `${Array.isArray(obj) ? 'array' : typeof obj} with cyclic dependencies`;
  }
};

export const safeJsonParse = (jsonString: string): any => {
  const seen = new WeakSet<object>();

  const customReviver = (key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        throw new Error('Cyclic dependency found in JSON');
      }
      seen.add(value);
    }
    return value;
  };

  try {
    return JSON.parse(jsonString, customReviver);
  } catch (error) {
    return (error as Error).message;
  }
};

export const formatISODate = (isoDate: string, dateFormat = 'dd MMMM yyyy'): string => {
  const date = DateTime.fromISO(isoDate);

  return date.setLocale('ru').toFormat(dateFormat);
};

export const isHttpUrl = (url: string) => url.startsWith('http') || url.startsWith('https');
