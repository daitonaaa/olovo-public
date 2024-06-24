module.exports = (item) => {
  return `
    /*
        Auto generated code /src/scripts/crud-template
    */

import { Crud, CrudController } from '@nestjsx/crud';
import { ${item.entityNameStr} } from '../../../../sections-config/crud/${item.path}/entity';
import { Controller } from '@nestjs/common';
import { ${item.path}Service } from '../services/${item.path}.service';
import { EnableAuth } from '../../../../common/auth/auth.decorators';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';

@Crud({
  model: {
    type: ${item.entityNameStr},
  },
  params: {
    slug: {
      field: '${item.slug.field}',
      type: '${item.slug.type}',
      primary: true,
    },
  },
  query: {
    allow: ${JSON.stringify(item.viewModelFields)},
  },
  routes: {
    only: [
      'getOneBase',
      'getManyBase',
      'updateOneBase',
      'createOneBase',
      'deleteOneBase',
    ],
    getOneBase: {},
    getManyBase: {},
    deleteOneBase: {
      decorators: [EnableAuth({ admin: true })],
    },
    updateOneBase: {
      decorators: [EnableAuth({ admin: true })],
    },
    createOneBase: {
      decorators: [EnableAuth({ admin: true })],
    },
  },
})
@Controller(\`/v1/${item.name}\`)
@ApiTags('Cruds')
export class ${item.path}Controller implements CrudController<${item.entityNameStr}> {
  constructor(public service: ${item.path}Service) {}
}`;
}
