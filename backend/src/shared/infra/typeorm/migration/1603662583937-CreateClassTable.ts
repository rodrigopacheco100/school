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
            name: 'subjectId',
            type: 'integer'
          },
          {
            name: 'teacherId',
            type: 'integer'
          },
          {
            name: 'year',
            type: 'smallint',
            width: 4
          }
        ]
      })
    );

    await queryRunner.createForeignKeys('class', [
      new TableForeignKey({
        name: 'subject_fk',
        columnNames: ['subjectId'],
        referencedTableName: 'subject',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }),
      new TableForeignKey({
        name: 'teacher_fk',
        columnNames: ['teacherId'],
        referencedTableName: 'teacher',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('class');
  }
}
