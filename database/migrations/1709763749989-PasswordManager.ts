import { MigrationInterface, QueryRunner } from 'typeorm';

class PasswordManager1709763749989 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "app" (
        "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
        "name" VARCHAR(50),
        "icon" VARCHAR,
        "link" VARCHAR,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
        CONSTRAINT "PK_app" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "password" (
        "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
        "app_id" uuid NOT NULL,
        "user_id" uuid NOT NULL,
        "name" VARCHAR(50),
        "password" TEXT NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
        CONSTRAINT "PK_password" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `ALTER TABLE "password" ADD CONSTRAINT "FK_password_app_id" FOREIGN KEY ("app_id") REFERENCES "app"("id")`,
    );

    await queryRunner.query(
      `ALTER TABLE "password" ADD CONSTRAINT "FK_password_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id")`,
    );

    await queryRunner.query(
      `CREATE TABLE "user_password" (
        "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
        "user_id" uuid NOT NULL,
        "password_id" uuid NOT NULL,
        "can_edit" BOOLEAN DEFAULT false,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
        CONSTRAINT "PK_user_password" PRIMARY KEY ("id", "user_id", "password_id")
      )`,
    );

    await queryRunner.query(
      `ALTER TABLE "user_password" ADD CONSTRAINT "FK_user_password_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id")`,
    );

    await queryRunner.query(
      `ALTER TABLE "user_password" ADD CONSTRAINT "FK_user_password_password_id" FOREIGN KEY ("password_id") REFERENCES "password"("id")`,
    );

    await queryRunner.query(
      `CREATE TABLE "token" (
        "id" uuid DEFAULT uuid_generate_v4() NOT NULL,
        "user_id" uuid NOT NULL,
        "token" uuid DEFAULT uuid_generate_v4() NOT NULL,
        "type" VARCHAR(50),
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
        CONSTRAINT "PK_token" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `ALTER TABLE "token" ADD CONSTRAINT "FK_token_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "token" DROP CONSTRAINT "FK_token_user_id"`,
    );
    await queryRunner.query(`DROP TABLE "token"`);

    await queryRunner.query(
      `ALTER TABLE "user_password" DROP CONSTRAINT "FK_user_password_password_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_password" DROP CONSTRAINT "FK_user_password_user_id"`,
    );
    await queryRunner.query(`DROP TABLE "user_password"`);

    await queryRunner.query(
      `ALTER TABLE "password" DROP CONSTRAINT "FK_password_user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "password" DROP CONSTRAINT "FK_password_app_id"`,
    );
    await queryRunner.query(`DROP TABLE "password"`);

    await queryRunner.query(`DROP TABLE "app"`);
  }
}

export default PasswordManager1709763749989;
