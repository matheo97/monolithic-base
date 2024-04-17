import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { AppsService } from './apps.service';
import { App } from '../entities';
import { DeleteResult } from 'typeorm';
import Request from '../types/request';
@Controller('v1/apps')
export class AppsController {
  constructor(private readonly service: AppsService) {}

  @Post()
  async create(@Req() { user }: Request, @Body() app: App): Promise<App> {
    return this.service.create(user.id, app);
  }

  @Put()
  async update(@Req() { user }: Request, @Body() app: App): Promise<App> {
    return this.service.update(user.id, app);
  }

  @Delete()
  async delete(
    @Req() { user }: Request,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<DeleteResult> {
    return this.service.delete(user.id, id);
  }

  @Get()
  async getAll(@Req() { user }: Request): Promise<App[]> {
    return this.service.getAll(user.id);
  }

  @Get(':id')
  async getById(
    @Req() { user }: Request,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<App> {
    return this.service.getById(user.id, id);
  }
}
