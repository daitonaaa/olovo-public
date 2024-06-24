import { CustomFileStorage, CustomFileSaveResults } from './types';
import * as fs from 'fs';
import * as path from 'path';

export class DiskFileStorage extends CustomFileStorage {
  constructor(private readonly destination: string) {
    super();
  }

  get_static_folder_path(): string {
    return path.join(process.cwd(), this.destination);
  }

  saveFile(
    file_name: string,
    source: Express.Multer.File,
  ): Promise<CustomFileSaveResults> {
    return new Promise((resolve, reject) => {
      const p = path.join(this.get_static_folder_path(), file_name);
      const outStream = fs.createWriteStream(p);

      source.stream.pipe(outStream);
      outStream.on('error', reject);
      outStream.on('finish', () => {
        resolve({
          size: outStream.bytesWritten,
          name: file_name,
          path: p,
        });
      });
    });
  }

  async saveBuffer(
    file_name: string,
    buff: Buffer,
  ): Promise<CustomFileSaveResults> {
    const p = path.join(this.get_static_folder_path(), file_name);
    await fs.promises.writeFile(p, buff);
    return {
      path: p,
      name: file_name,
    };
  }

  async deleteFile(file_name: string): Promise<void> {
    const p = path.join(this.get_static_folder_path(), file_name);
    await fs.promises.unlink(p);
  }
}
