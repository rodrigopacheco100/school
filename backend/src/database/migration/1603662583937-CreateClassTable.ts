import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export default class CreateClassTable1603662583937
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'class',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'subject_id',
            type: 'integer'
          },
          {
            name: 'teacher_id',
            type: 'integer'
          },
          {
            name: 'year',
            type: 'smallint'
          }
        ]
      })
    );

    await queryRunner.createForeignKeys('class', [
      new TableForeignKey({
        name: 'subject_fk',
        columnNames: ['subject_id'],
        referencedTableName: 'subject',
        referencedColumnNames: ['id']
      }),
      new TableForeignKey({
        name: 'teacher_fk',
        columnNames: ['teacher_id'],
        referencedTableName: 'teacher',
        referencedColumnNames: ['id']
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('class_teacher');
  }
}
