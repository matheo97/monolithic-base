import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsUUID,
  IsOptional,
  IsDefined,
  Length,
  IsEmail,
  IsHash,
} from 'class-validator';
import { Auditable } from './index';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class User extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier for User',
    nullable: true,
    type: String,
  })
  id?: string;

  @Column()
  @IsDefined()
  @Length(2, 255)
  @ApiProperty({
    description: 'Name for User',
    nullable: false,
    type: String,
  })
  name: string;

  @Column()
  @IsOptional()
  @IsEmail()
  @Length(0, 255)
  @ApiProperty({
    description: 'Email for the user',
    nullable: true,
    type: String,
  })
  email: string;

  @Column()
  @IsOptional()
  @IsHash('sha256')
  @ApiProperty({
    description: 'Password for the user',
    nullable: true,
    type: String,
  })
  password: string;

  @IsOptional()
  @ApiProperty({
    description: 'Picture',
    nullable: false,
    type: String,
  })
  photo?: string;
}
