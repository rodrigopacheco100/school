import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export default class CreateClassStudentRelation1603710418100
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'class_student',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'class_id',
            type: 'integer'
          },
          {
            name: 'student_id',
            type: 'integer'
          }
        ]
      })
    );

    await queryRunner.createForeignKeys('class_student', [
      new TableForeignKey({
        name: 'class_fk',
        columnNames: ['class_id'],
        referencedTableName: 'class',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }),
      new TableForeignKey({
        name: 'student_fk',
        columnNames: ['student_id'],
        referencedTableName: 'student',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('class_student');
  }
}
