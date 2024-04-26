import { Injectable } from '@nestjs/common';
import { Brackets, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Password } from '../entities';
import { PageResponse } from '../types/pageResponse';

@Injectable()
export class PasswordsDAO {
  constructor(
    @InjectRepository(Password)
    private readonly repository: Repository<Password>,
  ) {}

  async create(userId: string, password: Password): Promise<Password> {
    return this.repository.save({
      ...password,
      userId,
    });
  }

  async update(userId: string, password: Password): Promise<Password> {
    return this.repository.save({
      ...password,
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
  ): Promise<PageResponse<Password>> {
    const query = this.repository
      .createQueryBuilder('password')
      .where('userId = :userId', { userId });

    const [results, total] = await query
      .skip(pageSize && page ? pageSize * (page - 1) : 0)
      .take(pageSize || 0)
      .getManyAndCount();

    return {
      total,
      results,
    };
  }

  async getById(userId: string, passwordId: string): Promise<Password> {
    return this.repository
      .createQueryBuilder('password')
      .where('id = :passwordId', { passwordId })
      .andWhere('userId = :userId', { userId })
      .getOne();
  }
}
