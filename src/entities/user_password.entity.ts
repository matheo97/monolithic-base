import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsUUID, IsOptional, IsDefined, IsBoolean } from 'class-validator';
import { Auditable, Password, User } from './index';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity('user_password')
export class UserPassword extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier',
    nullable: true,
    type: String,
  })
  id?: string;

  @Column({ name: 'password_id' })
  @IsUUID()
  @IsDefined()
  @ApiProperty({ description: '' })
  passwordId?: string;

  @ManyToOne(() => Password, (password) => password.id)
  @JoinColumn({ name: 'password_id' })
  @ApiHideProperty()
  password?: Password;

  @Column({ name: 'user_id' })
  @IsUUID()
  @IsDefined()
  @ApiProperty({ description: '' })
  userId?: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  @ApiHideProperty()
  user?: User;

  @Column()
  @IsDefined()
  @IsBoolean()
  canEdit: boolean;
}
