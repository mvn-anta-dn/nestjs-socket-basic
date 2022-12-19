import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1670925725108 implements MigrationInterface {
  name = 'migration1670925725108';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "message" ADD "from_user_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD "to_user_id" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "to_user_id"`);
    await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "from_user_id"`);
  }
}
