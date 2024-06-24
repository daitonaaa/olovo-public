import { Routes } from 'nest-router/routes.interface';
import { AppModule } from './app.module';
import { ApiModuleV1 } from './v1/api.module.v1';
import { ComponentModule } from './v1/component/component.module';
import { InfoModule } from './v1/info/info.module';
import { PageModule } from './v1/page/page.module';
import { PageKeyModule } from './v1/pageKey/pageKey.module';
import { FuncModule } from './v1/func/func.module';
import { UsersModule } from './v1/users/users.module';
import { SettingsModule } from './v1/settings/settings.module';

export const routes: Routes = [
  {
    path: '',
    module: AppModule,
    children: [
      {
        path: 'v1',
        module: ApiModuleV1,
        children: [
          {
            path: 'info',
            module: InfoModule,
          },
          {
            path: 'component',
            module: ComponentModule,
          },
          {
            path: 'page',
            module: PageModule,
          },
          {
            path: 'pageKey',
            module: PageKeyModule,
          },
          {
            path: 'func',
            module: FuncModule,
          },
          {
            path: 'users',
            module: UsersModule,
          },
          {
            path: 'settings',
            module: SettingsModule,
          },
        ],
      },
    ],
  },
];
