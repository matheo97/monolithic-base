import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from '../entities';
import { AppsService } from './apps.service';
import { AppsDAO } from './apps.dao';
import { AppsController } from './apps.controller';

@Module({
  imports: [TypeOrmModule.forFeature([App])],
  providers: [AppsService, AppsDAO],
  exports: [AppsService],
  controllers: [AppsController],
})
export class AppsModule {}
