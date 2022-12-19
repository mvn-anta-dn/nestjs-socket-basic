import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1670926643646 implements MigrationInterface {
  name = 'migration1670926643646';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "from_user_id"`);
    await queryRunner.query(
      `ALTER TABLE "message" ADD "from_user_id" uuid NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "to_user_id"`);
    await queryRunner.query(
      `ALTER TABLE "message" ADD "to_user_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_cfe4abe2433969cf662d151e9d5" FOREIGN KEY ("from_user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_76f02fca2415c31e99c8b8817eb" FOREIGN KEY ("to_user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_76f02fca2415c31e99c8b8817eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_cfe4abe2433969cf662d151e9d5"`,
    );
    await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "to_user_id"`);
    await queryRunner.query(
      `ALTER TABLE "message" ADD "to_user_id" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "from_user_id"`);
    await queryRunner.query(
      `ALTER TABLE "message" ADD "from_user_id" character varying NOT NULL`,
    );
  }
}
