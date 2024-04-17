import { Injectable } from '@nestjs/common';
import { Brackets, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { App } from '../entities';

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

  async getAll(userId: string): Promise<App[]> {
    return this.repository
      .createQueryBuilder('app')
      .where('userId = :userId', { userId })
      .orWhere('userId = :userId', { userId: null })
      .getMany();
  }

  async getById(userId: string, appId: string): Promise<App> {
    return this.repository
      .createQueryBuilder('app')
      .where('id = :appId', { appId })
      .andWhere(
        new Brackets((qb) =>
          qb
            .where('userId = :userId', { userId })
            .orWhere('userId = :userId', { userId: null }),
        ),
      )
      .getOne();
  }
}
