import { Injectable } from '@nestjs/common';
import { EntityManager, In } from 'typeorm';
import { File } from '../../../entities/file';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CustomFileResult } from '../../../common/files/types';
import { map_by } from '../../../common/utils/file';
import { getImagesPostProcessNames } from '../../../common/files/utils/f_system';
import { safe } from '../../../common/utils/safe';
import { DiskFileStorage } from '../../../common/files/disk-storage';

interface SubjectParams {
  id: number;
  field: string;
  name: string;
}

@Injectable()
export class ImagesService {
  diskStorage: DiskFileStorage;

  @InjectEntityManager() em: EntityManager;

  constructor() {
    this.diskStorage = new DiskFileStorage(process.env['UPLOAD_DIR']);
  }

  async create(
    request_model: CustomFileResult,
    subjectParams?: SubjectParams,
  ): Promise<File> {
    const new_file = new File();
    new_file.name = request_model.name;
    new_file.mimeType = request_model.mimetype;
    new_file.path = request_model.path; // hide for response model
    new_file.size = request_model.size;
    new_file.extensions = request_model.ext;
    new_file.subjectId = subjectParams.id;
    new_file.subjectField = subjectParams.field;
    new_file.subjectEntityName = subjectParams.name;

    const db_item = await this.em.getRepository(File).save(new_file);
    return this.mapToViewModel(db_item);
  }

  async getBySubjectIds(name: string, ids: number[]): Promise<File[]> {
    const db_items = await this.em.getRepository(File).find({
      subjectId: In(ids),
      subjectEntityName: name,
    });

    return db_items.map((i) => this.mapToViewModel(i));
  }

  async deleteBySubjectIds(name: string, ids: number[]): Promise<void> {
    const db_items = await this.em.getRepository(File).find({
      subjectId: In(ids),
      subjectEntityName: name,
    });

    await this.deleteFiles(db_items);
  }

  async deleteByIds(ids: number[]): Promise<void> {
    const db_models = await this.em.getRepository(File).find({
      id: In(ids),
    });

    await this.deleteFiles(db_models);
  }

  private async deleteFiles(db_models: File[]): Promise<void> {
    const file_names = map_by(db_models, 'name');
    await this.em.transaction(async (tem) => {
      for (const file_name of file_names) {
        const names_candidates = getImagesPostProcessNames(file_name);
        for (const candidate of names_candidates) {
          await safe(async () => {
            await this.diskStorage.deleteFile(candidate);
          });
        }
      }

      const db_ids = map_by(db_models, 'id');
      await tem.getRepository(File).delete({ id: In(db_ids) });
    });
  }

  private mapToViewModel = (file: File): File => {
    return { ...file };
  };
}
