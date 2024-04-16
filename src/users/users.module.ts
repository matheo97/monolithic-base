import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersDAO } from './users.dao';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersDAO],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
