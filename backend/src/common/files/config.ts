import { ImageFileSizeType } from './types';
import { write_filename_end } from '../utils/file';

interface ConfigItem {
  size: ImageFileSizeType;
  get_name(name: string): string;
  size_pixels: number;
}

export const image_resize_config: ConfigItem[] = [
  {
    size: 'l',
    size_pixels: 1000,
    get_name: (name: string) =>
      write_filename_end(name, (match) => `_l${match}`),
  },
  {
    size: 'm',
    size_pixels: 500,
    get_name: (name: string) =>
      write_filename_end(name, (match) => `_m${match}`),
  },
  {
    size: 's',
    size_pixels: 200,
    get_name: (name: string) =>
      write_filename_end(name, (match) => `_s${match}`),
  },
];

export const webp_config = {
  quality: 80,
  get_name: (name: string) => write_filename_end(name, () => `.webp`),
} as const;

export const allowed_files_config = {
  images: {
    mime_types: ['image/png', 'image/jpg', 'image/jpeg'],
  },
} as const;
