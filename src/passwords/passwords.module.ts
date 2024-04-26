import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Password } from '../entities';
import { PasswordsService } from './passwords.service';
import { PasswordsDAO } from './passwords.dao';
import { PasswordsController } from './passwords.controller';
import { AppsModule } from '../apps/apps.module';

@Module({
  imports: [AppsModule, TypeOrmModule.forFeature([Password])],
  providers: [PasswordsService, PasswordsDAO],
  exports: [PasswordsService],
  controllers: [PasswordsController],
})
export class PasswordsModule {}
