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
import { App } from './app.entity';

@Entity('password')
export class Password extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier',
    nullable: true,
    type: String,
  })
  id?: string;

  @Column()
  @IsOptional()
  @Length(0, 50)
  @ApiProperty({
    description: 'Name',
    nullable: false,
    type: String,
  })
  name: string;

  @Column()
  @IsDefined()
  @IsHash('sha256')
  @ApiProperty({
    description: 'Password',
    nullable: true,
    type: String,
  })
  password: string;

  @Column({ name: 'app_id' })
  @IsUUID()
  @IsDefined()
  @ApiProperty({ description: '' })
  appId?: string;

  @ManyToOne(() => App, (app) => app.id)
  @JoinColumn({ name: 'app_id' })
  @ApiHideProperty()
  app?: App;

  @Column({ name: 'user_id' })
  @IsUUID()
  @IsDefined()
  @ApiProperty({ description: '' })
  userId?: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  @ApiHideProperty()
  user?: User;
}
