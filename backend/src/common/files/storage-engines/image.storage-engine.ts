import { StorageEngine } from 'multer';
import { Request } from 'express';
import { CustomFileResult, CustomFileStorage, FileUploadError } from '../types';
import { DiskFileStorage } from '../disk-storage';
import * as sharp from 'sharp';
import * as path from 'path';
import { image_resize_config, webp_config } from '../config';
import { nanoid } from '../../utils/nanoid';
import { write_filename_end } from '../../utils/file';
import { getImagesPostProcessNames } from '../utils/f_system';
import { safe } from '../../utils/safe';

interface FileStorageOptions {
  dest: string;
}

interface StackFileItem {
  name: string;
  buff: Buffer;
}

class FileStorageEngine implements StorageEngine {
  constructor(private readonly storage: CustomFileStorage) {}

  _handleFile(
    req: Request,
    file: Express.Multer.File,
    callback: (error?: any, info?: CustomFileResult) => void,
  ) {
    new Promise<CustomFileResult>(async (resolve) => {
      const processed_files: StackFileItem[] = [];

      const hash = await nanoid(5);
      const start_filename = write_filename_end(
        file.originalname,
        (ext) => `.${hash}${ext}`,
      );

      const handle_error_processing = async (
        err: Error,
        filename: string,
        text: string,
      ): Promise<FileUploadError> => {
        const candidates_for_delete = getImagesPostProcessNames(start_filename);
        if (candidates_for_delete.length > 0) {
          for (const image_name of candidates_for_delete) {
            await safe(async () => {
              await this.storage.deleteFile(image_name);
            });
          }
        }
        return new FileUploadError(err.message, {
          file_name: filename,
          failed_operation: text,
        });
      };

      try {
        const original_file = await this.storage.saveFile(start_filename, file);
        file.size = original_file.size;

        const original_webp_name = write_filename_end(
          original_file.name,
          () => '.webp',
        );
        const original_webp_buffer = await sharp(original_file.path)
          .webp({ quality: webp_config.quality })
          .toBuffer();

        await this.storage.saveBuffer(original_webp_name, original_webp_buffer);
      } catch (err) {
        throw await handle_error_processing(
          err,
          start_filename,
          'Save original image failed',
        );
      }

      for (const resize_conf of image_resize_config) {
        const orig_file_path = path.join(
          this.storage.get_static_folder_path(),
          start_filename,
        );
        const sharp_resized = sharp(orig_file_path).resize({
          width: resize_conf.size_pixels,
          fit: 'contain',
        });

        try {
          const resized_buff = await sharp_resized.toBuffer();
          const resized_buff_webp = await sharp_resized
            .webp({ quality: webp_config.quality })
            .toBuffer();
          const resized_name = resize_conf.get_name(start_filename);

          processed_files.push(
            { name: resized_name, buff: resized_buff },
            {
              name: webp_config.get_name(resized_name),
              buff: resized_buff_webp,
            },
          );
        } catch (err) {
          throw await handle_error_processing(
            err,
            start_filename,
            'Resize or convert to WebP failed',
          );
        }
      }

      for (const image_to_save of processed_files) {
        try {
          await this.storage.saveBuffer(image_to_save.name, image_to_save.buff);
        } catch (err) {
          throw await handle_error_processing(
            err,
            image_to_save.name,
            `Save processed image failed`,
          );
        }
      }

      resolve({
        ext: path.extname(start_filename),
        name: start_filename,
        path: start_filename,
        size: file.size,
      });
    })
      /**
       * Global promise function handler
       * Callback for custom multer storage
       */
      .then((results) => callback(null, results))
      .catch((err) => callback(err));
  }

  _removeFile(
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null) => void,
  ) {
    callback(new Error());
  }
}

export const createImagesFileStorageEngine = (
  options: FileStorageOptions,
): FileStorageEngine => {
  const storage = new DiskFileStorage(options.dest);
  return new FileStorageEngine(storage);
};
