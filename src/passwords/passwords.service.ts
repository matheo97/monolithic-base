import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PasswordsDAO } from './passwords.dao';
import { Password } from '../entities';
import { DeleteResult } from 'typeorm';
import { AppsService } from '../apps/apps.service';
import { PageResponse } from '../types/pageResponse';

@Injectable()
export class PasswordsService {
  constructor(
    private readonly dao: PasswordsDAO,
    private readonly appService: AppsService,
  ) {}

  async create(userId: string, password: Password): Promise<Password> {
    const { appId } = password;

    const app = this.appService.getById(userId, appId);

    if (!app) {
      throw new InternalServerErrorException('Invalid app');
    }

    return this.dao.create(userId, password);
  }

  async update(userId: string, password: Password): Promise<Password> {
    const { appId } = password;

    const app = this.appService.getById(userId, appId);

    if (!app) {
      throw new InternalServerErrorException('Invalid app');
    }

    return this.dao.update(userId, password);
  }

  async delete(userId: string, id: string): Promise<DeleteResult> {
    return this.dao.delete(userId, id);
  }

  async getAll(
    userId: string,
    page: number,
    pageSize: number,
  ): Promise<PageResponse<Password>> {
    return this.dao.getAll(userId, page, pageSize);
  }

  async getById(userId: string, appId: string): Promise<Password> {
    return this.dao.getById(userId, appId);
  }
}
