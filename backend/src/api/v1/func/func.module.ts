import { Module } from '@nestjs/common';
import { FuncController } from './func.controller';
import { AppConfigModule } from '../../../common/config/app.config.module';

@Module({
  imports: [AppConfigModule],
  controllers: [FuncController],
})
export class FuncModule {}
