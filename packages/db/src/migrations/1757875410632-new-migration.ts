import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1757875410632 implements MigrationInterface {
    name = 'NewMigration1757875410632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
    }

}
