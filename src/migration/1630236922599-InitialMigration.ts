import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1630236922599 implements MigrationInterface {
    name = 'InitialMigration1630236922599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`testapi\`.\`todo\` (\`id\` char(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`createdOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`testapi\`.\`task\` (\`id\` char(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`createdOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`todoId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`testapi\`.\`task\` ADD CONSTRAINT \`FK_91440d017e7b30d2ac16a27d762\` FOREIGN KEY (\`todoId\`) REFERENCES \`testapi\`.\`todo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`testapi\`.\`task\` DROP FOREIGN KEY \`FK_91440d017e7b30d2ac16a27d762\``);
        await queryRunner.query(`DROP TABLE \`testapi\`.\`task\``);
        await queryRunner.query(`DROP TABLE \`testapi\`.\`todo\``);
    }

}
