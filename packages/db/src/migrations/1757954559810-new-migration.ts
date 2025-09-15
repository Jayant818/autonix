import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1757954559810 implements MigrationInterface {
    name = 'NewMigration1757954559810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "execution" ADD "totalTasks" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "execution" ADD "completedTasks" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "webhook" ADD "endpoint" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "webhook" ADD CONSTRAINT "UQ_0e185c4cb17b8696be08a2edc17" UNIQUE ("endpoint")`);
        await queryRunner.query(`ALTER TABLE "workflow" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "workflow" ADD CONSTRAINT "FK_5c43d4a3144b7c40bcfd7071440" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow" DROP CONSTRAINT "FK_5c43d4a3144b7c40bcfd7071440"`);
        await queryRunner.query(`ALTER TABLE "workflow" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "webhook" DROP CONSTRAINT "UQ_0e185c4cb17b8696be08a2edc17"`);
        await queryRunner.query(`ALTER TABLE "webhook" DROP COLUMN "endpoint"`);
        await queryRunner.query(`ALTER TABLE "execution" DROP COLUMN "completedTasks"`);
        await queryRunner.query(`ALTER TABLE "execution" DROP COLUMN "totalTasks"`);
    }

}
