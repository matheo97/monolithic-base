import { MigrationInterface, QueryRunner } from 'typeorm';

class User1709763749987 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`CREATE TABLE "user" (
        "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
        "name" character varying(255) NOT NULL,
        "email" character varying(50) NOT NULL,
        "password" character varying(50) NOT NULL,
        "photo" TEXT,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}

export default User1709763749987;
