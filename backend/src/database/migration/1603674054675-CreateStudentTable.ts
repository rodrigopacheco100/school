import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateStudentTable1603674054675
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'student',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'birth',
            type: 'date'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
