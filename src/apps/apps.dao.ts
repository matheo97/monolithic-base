import { Injectable } from '@nestjs/common';
import { Brackets, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { App } from '../entities';
import { PageResponse } from '../types/pageResponse';

@Injectable()
export class AppsDAO {
  constructor(
    @InjectRepository(App)
    private readonly repository: Repository<App>,
  ) {}

  async create(userId: string, app: App): Promise<App> {
    return this.repository.save({
      ...app,
      userId,
    });
  }

  async update(userId: string, app: App): Promise<App> {
    return this.repository.save({
      ...app,
      userId,
    });
  }

  async delete(userId: string, id: string): Promise<DeleteResult> {
    return this.repository.delete({ id, userId });
  }

  async getAll(
    userId: string,
    page: number,
    pageSize: number,
  ): Promise<PageResponse<App>> {
    const query = this.repository
      .createQueryBuilder('app')
      .where('user_id = :userId', { userId })
      .orWhere('user_id IS NULL');

    const [results, total] = await query
      .skip(pageSize && page ? pageSize * (page - 1) : 0)
      .take(pageSize || 0)
      .getManyAndCount();

    return {
      total,
      results,
    };
  }

  async getById(userId: string, appId: string): Promise<App> {
    return this.repository
      .createQueryBuilder('app')
      .where('id = :appId', { appId })
      .andWhere(
        new Brackets((qb) =>
          qb.where('user_id = :userId', { userId }).orWhere('user_id IS NULL'),
        ),
      )
      .getOne();
  }
}
