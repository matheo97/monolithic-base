import { Injectable } from '@nestjs/common';
import { AppsDAO } from './apps.dao';
import { App } from '../entities';
import { DeleteResult } from 'typeorm';
import { PageResponse } from '../types/pageResponse';

@Injectable()
export class AppsService {
  constructor(private readonly dao: AppsDAO) {}

  async create(userId: string, app: App): Promise<App> {
    return this.dao.create(userId, app);
  }

  async update(userId: string, app: App): Promise<App> {
    return this.dao.update(userId, app);
  }

  async delete(userId: string, id: string): Promise<DeleteResult> {
    return this.dao.delete(userId, id);
  }

  async getAll(
    userId: string,
    page: number,
    pageSize: number,
  ): Promise<PageResponse<App>> {
    return this.dao.getAll(userId, page, pageSize);
  }

  async getById(userId: string, appId: string): Promise<App> {
    return this.dao.getById(userId, appId);
  }
}
