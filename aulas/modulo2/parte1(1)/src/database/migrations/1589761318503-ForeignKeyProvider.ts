import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class ForeignKeyProvider1589761318503
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'AppointmentProvider',
                columnNames: ['provider_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL', // Muda para nulo caso o provider seja deletado
                onUpdate: 'CASCADE', // Muda o id em todos os appointmets caso o id do provider mude
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
    }
}
