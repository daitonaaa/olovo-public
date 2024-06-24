import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { createImagesFileStorageEngine } from './storage-engines/image.storage-engine';
import { allowed_files_config } from './config';
import { requireNotNull } from '../utils/requireNotNull';

export const imagesWithCompressMulterOptions: MulterOptions = {
  storage: createImagesFileStorageEngine({
    dest: requireNotNull(process.env['UPLOAD_DIR']),
  }),
  fileFilter: (req, file, cb) => {
    allowed_files_config.images.mime_types.some(
      (type) => type === file.mimetype,
    )
      ? cb(null, true)
      : cb(null, false);
  },
};
