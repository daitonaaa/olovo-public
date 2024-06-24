module.exports = (config) => `
    /*
        Auto generated code /src/scripts/crud-template
    */

import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ImagesService } from '../../files/files.service';
import { ${config.entityNameStr} } from '../../../../sections-config/crud/${config.path}/entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { requireNotNull } from '../../../../common/utils/requireNotNull';
import { File } from '../../../../entities/file';
import { map_by } from '../../../../common/utils/file';
import { EntityManager } from 'typeorm';
import { CrudRequest } from '@nestjsx/crud';

@Injectable()
export class ${config.path}Service extends TypeOrmCrudService<${config.entityNameStr}> {
  crud_name = '${config.name}';
  slug_field = '${config.slug.field}';
  
  @InjectEntityManager() em: EntityManager;

  constructor(
    @InjectRepository(${config.entityNameStr}) private readonly repository,
    private readonly image_service: ImagesService,
  ) {
    super(repository);
  }
  
   async getOne(req: CrudRequest): Promise<${config.entityNameStr}> {
      const data = await super.getOne(req);
      const files = await this.image_service.getBySubjectIds(this.crud_name, [
        data.id,
      ]);
  
      return this.joinFiles(data, files);
    }
    
    
    async deleteOne(req: CrudRequest): Promise<void | ${config.entityNameStr}> {
      const slug = requireNotNull(
        req.parsed.paramsFilter.find((f) => f.field === this.slug_field),
        'Slug field should be passed',
      );
  
      return this.em.transaction(async () => {
        const db_item = await this.repository.findOne({
          [slug.field]: slug.value,
        });
        await super.deleteOne(req);
        await this.image_service.deleteBySubjectIds(this.crud_name, [db_item.id]);
      });
    }
    
    async getMany(req: CrudRequest): Promise<${config.entityNameStr}[]> {
      const data = await super.getMany(req);
      const arr_data = data instanceof Array ? data : data.data;
  
      const files = await this.image_service.getBySubjectIds(
        this.crud_name,
        map_by(arr_data, 'id'),
      );
      return arr_data.map((item) => this.joinFiles(item, files));
    }
    
    private joinFiles(instance: ${config.entityNameStr}, files: File[]) {
      if (files.length === 0) {
        return instance;
      }
  
      const image_fields = files.reduce<{ [field_name: string]: File[] }>(
        (acc, cur) => {
          const subject_field = cur.subjectField;
          if (!(subject_field in instance)) {
            return acc;
          }
  
          if (!instance[subject_field]) {
            instance[subject_field] = [];
          }
  
          if (cur.subjectId === instance.id) {
            instance[subject_field].push(cur);
          }
        },
        {},
      );
  
      return {
        ...instance,
        ...image_fields,
      };
    }
}

`;
