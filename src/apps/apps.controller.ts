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
import { AppsService } from './apps.service';
import { App } from '../entities';
import { DeleteResult } from 'typeorm';
import Request from '../types/request';
import { PageResponse } from '../types/pageResponse';
@Controller('v1/apps')
export class AppsController {
  constructor(private readonly service: AppsService) {}

  @Post()
  async create(@Req() req: Request, @Body() app: App): Promise<App> {
    console.log('user', req.user);
    return this.service.create(req.user.id, app);
  }

  @Put(':id')
  async update(
    @Req() { user }: Request,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() app: App,
  ): Promise<App> {
    return this.service.update(user.id, { ...app, id });
  }

  @Delete(':id')
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
  ): Promise<PageResponse<App>> {
    return this.service.getAll(user.id, page, pageSize);
  }

  @Get(':id')
  async getById(
    @Req() { user }: Request,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<App> {
    return this.service.getById(user.id, id);
  }
}
