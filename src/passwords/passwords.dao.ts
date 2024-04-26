import { Injectable } from '@nestjs/common';
import { Brackets, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Password } from '../entities';

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

  async getAll(userId: string): Promise<Password[]> {
    return this.repository
      .createQueryBuilder('password')
      .where('userId = :userId', { userId })
      .getMany();
  }

  async getById(userId: string, passwordId: string): Promise<Password> {
    return this.repository
      .createQueryBuilder('password')
      .where('id = :passwordId', { passwordId })
      .andWhere('userId = :userId', { userId })
      .getOne();
  }
}
