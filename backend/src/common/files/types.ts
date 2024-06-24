export interface CustomFileSaveResults {
  size?: number;
  name: string;
  path: string;
}

export interface CustomFileResult extends Partial<Express.Multer.File> {
  name: string;
  path: string;
  ext: string;
  size: number;
}

export abstract class CustomFileStorage {
  abstract get_static_folder_path(): string;

  abstract saveFile(
    file_name: string,
    source: Express.Multer.File,
  ): Promise<CustomFileSaveResults>;

  abstract saveBuffer(
    file_name: string,
    source: Buffer,
  ): Promise<CustomFileSaveResults>;

  abstract deleteFile(file_name: string): Promise<void>;
}

export type ImageFileSizeType = 'l' | 'm' | 's';

interface FileErrorDetails {
  file_name: string;
  failed_operation: string;
}

export class FileUploadError extends Error {
  name = 'FileUploadError';

  details: FileErrorDetails = {
    file_name: 'unknown',
    failed_operation: 'unknown',
  };

  constructor(message: string, details?: FileErrorDetails) {
    super(message);
    if (details) {
      this.details = details;
    }
  }
}
