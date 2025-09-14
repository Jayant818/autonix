import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1757874023336 implements MigrationInterface {
    name = 'NewMigration1757874023336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."credentials_platform_enum" AS ENUM('TELEGRAM', 'RESEND', 'OPENAI', 'GEMINI')`);
        await queryRunner.query(`CREATE TABLE "credentials" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "platform" "public"."credentials_platform_enum" NOT NULL, "data" json NOT NULL, "userId" integer, CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."execution_status_enum" AS ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED')`);
        await queryRunner.query(`CREATE TABLE "execution" ("id" SERIAL NOT NULL, "status" "public"."execution_status_enum" NOT NULL DEFAULT 'PENDING', "result" json, "logs" json, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "workflowId" integer, CONSTRAINT "PK_cc6684fedf29ec4c86db8448a2b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."webhook_method_enum" AS ENUM('GET', 'POST', 'PUT', 'DELETE')`);
        await queryRunner.query(`CREATE TABLE "webhook" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "secret" character varying NOT NULL, "method" "public"."webhook_method_enum" NOT NULL, "workflowId" integer, CONSTRAINT "PK_e6765510c2d078db49632b59020" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workflow" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "nodes" json NOT NULL, "connections" json NOT NULL, "description" character varying DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_eb5e4cc1a9ef2e94805b676751b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "credentials" ADD CONSTRAINT "FK_8d3a07b8e994962efe57ebd0f20" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "execution" ADD CONSTRAINT "FK_cefbe33e35d35207a557d13f681" FOREIGN KEY ("workflowId") REFERENCES "workflow"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "webhook" ADD CONSTRAINT "FK_d9c007868e81ef3d0cb6f2456e5" FOREIGN KEY ("workflowId") REFERENCES "workflow"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "webhook" DROP CONSTRAINT "FK_d9c007868e81ef3d0cb6f2456e5"`);
        await queryRunner.query(`ALTER TABLE "execution" DROP CONSTRAINT "FK_cefbe33e35d35207a557d13f681"`);
        await queryRunner.query(`ALTER TABLE "credentials" DROP CONSTRAINT "FK_8d3a07b8e994962efe57ebd0f20"`);
        await queryRunner.query(`DROP TABLE "workflow"`);
        await queryRunner.query(`DROP TABLE "webhook"`);
        await queryRunner.query(`DROP TYPE "public"."webhook_method_enum"`);
        await queryRunner.query(`DROP TABLE "execution"`);
        await queryRunner.query(`DROP TYPE "public"."execution_status_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "credentials"`);
        await queryRunner.query(`DROP TYPE "public"."credentials_platform_enum"`);
    }

}
