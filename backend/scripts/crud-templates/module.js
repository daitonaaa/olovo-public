module.exports = (allConfigs) => {

  return `
    /*
        Auto generated code /src/scripts/crud-template
    */
    
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
${allConfigs.map(item => `import { ${item.path}Service } from './services/${item.path}.service';`).join('\n')}
${allConfigs.map(item => `import { ${item.path}Controller } from './controllers/${item.path}.controller';`).join('\n')}
${allConfigs.map(item => `import { ${item.entityNameStr} } from '../../../sections-config/crud/${item.path}/entity';`).join('\n')}
import { FilesModule } from '../files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([${allConfigs.map(item => item.entityNameStr).join(',')}]), FilesModule],
  providers: [${allConfigs.map(item => `${item.path}Service`).join(',')}],
  exports: [${allConfigs.map(item => `${item.path}Service`).join(',')}],
  controllers: [${allConfigs.map(item => `${item.path}Controller`).join(',')}],
})
export class CrudModule {}

  `
}
