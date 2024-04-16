import { Injectable } from '@nestjs/common';
import { UsersDAO } from './users.dao';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly usersDAO: UsersDAO) {}

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.usersDAO.getUserByEmail(email);
  }
}
