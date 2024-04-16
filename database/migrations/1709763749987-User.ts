import { MigrationInterface, QueryRunner } from 'typeorm';
import { hash } from '../../src/utils/bcrypt';

class User1709763749987 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`CREATE TABLE "user" (
        "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
        "name" character varying(255) NOT NULL,
        "email" character varying(50) NOT NULL,
        "password" TEXT NOT NULL,
        "photo" TEXT,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
    )`);
    await queryRunner.query(`
      INSERT INTO "user" ("name", "email", "password", "photo", "created_at", "updated_at")
      VALUES ('Test User', 'test.user@gmail.com', '${hash('password')}', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}

export default User1709763749987;
