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
  replacer: (match_group: string) => string,
): string => file_name.replace(/(\.\w+)$/g, (match) => replacer(match));

export const map_by = <T, R = any>(arr: T[], key: keyof T): R[] => {
  return arr.map((item) => item[key]) as unknown as R[];
};
