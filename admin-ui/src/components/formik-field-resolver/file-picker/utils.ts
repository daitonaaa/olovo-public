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
export const write_filename_end = (file_name: string, replacer: (match_group: string) => string): string =>
  file_name.replace(/(\.\w+)$/g, match => replacer(match));

export const pickImage = (path: string, format: 'webp' | 'original', size: 'orig' | 'l' | 's' | 'm') => {
  return write_filename_end(path, match => {
    const ext = format === 'webp' ? '.webp' : match;
    const s = size === 'orig' ? '' : `_${size}`;
    return `${s}${ext}`;
  });
};
