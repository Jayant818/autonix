import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1757935162702 implements MigrationInterface {
    name = 'NewMigration1757935162702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."workflow_trigger_enum" AS ENUM('webhook', 'manual', 'cron')`);
        await queryRunner.query(`ALTER TABLE "workflow" ADD "trigger" "public"."workflow_trigger_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow" DROP COLUMN "trigger"`);
        await queryRunner.query(`DROP TYPE "public"."workflow_trigger_enum"`);
    }

}
