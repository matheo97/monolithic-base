import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsUUID, IsOptional, Length, IsDefined } from 'class-validator';
import { Auditable, User } from './index';

@Entity('app')
export class App extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  id?: string;

  @Column()
  @IsOptional()
  @Length(0, 50)
  name?: string;

  @IsOptional()
  @Column()
  icon?: string;

  @IsOptional()
  @Column()
  link?: string;

  @Column({ name: 'user_id' })
  @IsUUID()
  @IsDefined()
  userId?: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
