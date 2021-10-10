import { MigrationInterface, QueryRunner } from 'typeorm';

export class categoryToType1633850265794 implements MigrationInterface {
  name = 'categoryToType1633850265794';

  // 업데이트용
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `mentions` RENAME COLUMN `category` to `type`',
    );
  }

  // 롤백용
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `mentions` RENAME COLUMN `type` TO `category`',
    );
  }
}
