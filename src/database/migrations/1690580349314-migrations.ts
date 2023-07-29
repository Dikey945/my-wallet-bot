import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1690580349314 implements MigrationInterface {
    name = 'Migrations1690580349314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_859f36f21e2e084e006a39fc81"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_859f36f21e2e084e006a39fc814"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_tg_id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_9959336f2d94476fd4f32ff698f"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_tag"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "userTgId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_7dc96639910a15980a484abdc55" UNIQUE ("userTgId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "userTag" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_54ffec4610720f4af918bf81d87" UNIQUE ("userTag")`);
        await queryRunner.query(`CREATE INDEX "IDX_7dc96639910a15980a484abdc5" ON "user" ("userTgId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_7dc96639910a15980a484abdc5"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_54ffec4610720f4af918bf81d87"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userTag"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_7dc96639910a15980a484abdc55"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userTgId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "user_tag" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_9959336f2d94476fd4f32ff698f" UNIQUE ("user_tag")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "first_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "user_tg_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_859f36f21e2e084e006a39fc814" UNIQUE ("user_tg_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_859f36f21e2e084e006a39fc81" ON "user" ("user_tg_id") `);
    }

}
