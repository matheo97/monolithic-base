import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsUUID, IsOptional, Length } from 'class-validator';
import { Auditable } from './index';
import { ApiProperty } from '@nestjs/swagger';

@Entity('app')
export class App extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier for App',
    nullable: true,
    type: String,
  })
  id?: string;

  @Column()
  @IsOptional()
  @Length(0, 50)
  @ApiProperty({
    description: 'Name for App',
    nullable: false,
    type: String,
  })
  name?: string;

  @IsOptional()
  @Column()
  @ApiProperty({ description: 'Icon URL' })
  icon?: string;

  @IsOptional()
  @Column()
  @ApiProperty({ description: 'Link' })
  link?: string;
}
