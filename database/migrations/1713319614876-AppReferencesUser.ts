import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import { App } from '../../src/entities';
import { defaultApps } from '../../src/constants/defaultApps';

class AppReferencesUser1713319614876 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'app',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'app',
      new TableForeignKey({
        name: 'app_user_id_FK',
        columnNames: ['user_id'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'cascade',
      }),
    );

    await queryRunner.manager.transaction(
      async (transactionalEntityManager) => {
        for (const app of defaultApps) {
          await transactionalEntityManager.save(App, app);
        }
      },
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('app', 'app_user_id_FK');
    await queryRunner.dropColumn('app', 'user_id');
  }
}

export default AppReferencesUser1713319614876;
