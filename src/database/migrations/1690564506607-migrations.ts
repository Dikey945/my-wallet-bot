import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1690564506607 implements MigrationInterface {
  name = 'Migrations1690564506607';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_tg_id" integer NOT NULL, "first_name" character varying NOT NULL, "user_tag" character varying NOT NULL, CONSTRAINT "UQ_859f36f21e2e084e006a39fc814" UNIQUE ("user_tg_id"), CONSTRAINT "UQ_9959336f2d94476fd4f32ff698f" UNIQUE ("user_tag"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_859f36f21e2e084e006a39fc81" ON "user" ("user_tg_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "expenses" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" integer NOT NULL, "category" character varying NOT NULL, "description" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_94c3ceb17e3140abc9282c20610" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "income" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" integer NOT NULL, "category" character varying NOT NULL, "description" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_29a10f17b97568f70cee8586d58" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD CONSTRAINT "FK_3d211de716f0f14ea7a8a4b1f2c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "income" ADD CONSTRAINT "FK_0965fe0d5faa3b2e7518d7bb244" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "income" DROP CONSTRAINT "FK_0965fe0d5faa3b2e7518d7bb244"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" DROP CONSTRAINT "FK_3d211de716f0f14ea7a8a4b1f2c"`,
    );
    await queryRunner.query(`DROP TABLE "income"`);
    await queryRunner.query(`DROP TABLE "expenses"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_859f36f21e2e084e006a39fc81"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
