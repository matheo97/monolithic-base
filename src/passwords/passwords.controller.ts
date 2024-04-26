import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { PasswordsService } from './passwords.service';
import { Password } from '../entities';
import { DeleteResult } from 'typeorm';
import Request from '../types/request';
import { PageResponse } from '../types/pageResponse';
@Controller('v1/passwords')
export class PasswordsController {
  constructor(private readonly service: PasswordsService) {}

  @Post()
  async create(
    @Req() { user }: Request,
    @Body() password: Password,
  ): Promise<Password> {
    return this.service.create(user.id, password);
  }

  @Put()
  async update(
    @Req() { user }: Request,
    @Body() password: Password,
  ): Promise<Password> {
    return this.service.update(user.id, password);
  }

  @Delete()
  async delete(
    @Req() { user }: Request,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<DeleteResult> {
    return this.service.delete(user.id, id);
  }

  @Get()
  async getAll(
    @Req() { user }: Request,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<PageResponse<Password>> {
    return this.service.getAll(user.id, page, pageSize);
  }

  @Get(':id')
  async getById(
    @Req() { user }: Request,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Password> {
    return this.service.getById(user.id, id);
  }
}
