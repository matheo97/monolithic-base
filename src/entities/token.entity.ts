import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsUUID, IsOptional, IsDefined, Length, IsHash } from 'class-validator';
import { Auditable, User } from './index';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity('token')
export class Token extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier',
    nullable: true,
    type: String,
  })
  id?: string;

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
  @IsHash('sha256')
  @ApiProperty({
    description: 'Token',
    nullable: true,
    type: String,
  })
  token: string;

  @Column()
  @IsDefined()
  @Length(2, 50)
  @ApiProperty({
    description: 'Type',
    nullable: false,
    type: String,
  })
  type: string;
}
