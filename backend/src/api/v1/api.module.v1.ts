import { Module } from '@nestjs/common';
import { ComponentModule } from './component/component.module';
import { InfoModule } from './info/info.module';
import { PageModule } from './page/page.module';
import { PageKeyModule } from './pageKey/pageKey.module';
import { FuncModule } from './func/func.module';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';
import { CrudModule } from './crud/crud.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    InfoModule,
    ComponentModule,
    PageModule,
    PageKeyModule,
    FuncModule,
    UsersModule,
    SettingsModule,
    CrudModule,
    FilesModule,
  ],
  providers: [],
})
export class ApiModuleV1 {}
