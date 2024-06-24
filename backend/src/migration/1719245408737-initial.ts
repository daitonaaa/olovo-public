import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1719245408737 implements MigrationInterface {
    name = 'initial1719245408737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "city_list" ("id" SERIAL NOT NULL, "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, "updatedAt" TIMESTAMP WITH TIME ZONE, "name" text NOT NULL, "lt" double precision NOT NULL, "lg" double precision NOT NULL, CONSTRAINT "PK_78d1333408b1b1947e87cd997de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "component" ("id" SERIAL NOT NULL, "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, "updatedAt" TIMESTAMP WITH TIME ZONE, "name" text NOT NULL, "label" text NOT NULL, CONSTRAINT "PK_c084eba2d3b157314de79135f09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a60bfff7094fd0352057e8b44e" ON "component" ("name") `);
        await queryRunner.query(`CREATE TABLE "component_template" ("id" SERIAL NOT NULL, "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, "updatedAt" TIMESTAMP WITH TIME ZONE, "componentType" integer NOT NULL, "componentId" integer, CONSTRAINT "PK_f36742459a3d52453b9a36d7fc5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "page_node" ("id" SERIAL NOT NULL, "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, "updatedAt" TIMESTAMP WITH TIME ZONE, "name" text NOT NULL, "order" integer NOT NULL, "isWrappedContainer" boolean NOT NULL DEFAULT false, "componentId" integer NOT NULL, "pageId" integer, CONSTRAINT "PK_e46db49111eb51d319fba1c7fd2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "node_param" ("id" SERIAL NOT NULL, "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, "updatedAt" TIMESTAMP WITH TIME ZONE, "Value" text NOT NULL, "componentType" integer NOT NULL, "pageNodeId" integer NOT NULL, "pageId" integer, CONSTRAINT "PK_00059196509a9a3e2f89cc272e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "page_meta" ("id" SERIAL NOT NULL, "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, "updatedAt" TIMESTAMP WITH TIME ZONE, "role" integer NOT NULL, "value" text NOT NULL, "pageId" integer, CONSTRAINT "PK_b574b1106b84794c4855125b1da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "page" ("id" SERIAL NOT NULL, "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, "updatedAt" TIMESTAMP WITH TIME ZONE, "name" text NOT NULL, "url" text, "isPublished" boolean NOT NULL, "isRegional" boolean NOT NULL, "isCrud" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_742f4117e065c5b6ad21b37ba1f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f4fdc8c67d3e22af7f60e07540" ON "page" ("url") `);
        await queryRunner.query(`CREATE TABLE "global_key" ("id" SERIAL NOT NULL, "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, "updatedAt" TIMESTAMP WITH TIME ZONE, "key" text NOT NULL, "value" text NOT NULL, CONSTRAINT "UQ_5f2c7f8024d315b8cc2d345f97e" UNIQUE ("key"), CONSTRAINT "PK_e4746cfc237a067a7a434a9201c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "crud_entity" ("id" SERIAL NOT NULL, "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, "updatedAt" TIMESTAMP WITH TIME ZONE, "name" text NOT NULL, CONSTRAINT "PK_7219fb79ca5597fdb087eff90e0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu" ("id" SERIAL NOT NULL, "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, "updatedAt" TIMESTAMP WITH TIME ZONE, "name" text NOT NULL, "label" text, "level" integer, "url" text, "order" integer, "parentId" integer, CONSTRAINT "PK_35b2a8f47d153ff7a41860cceeb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file" ("id" SERIAL NOT NULL, "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, "updatedAt" TIMESTAMP WITH TIME ZONE, "name" text NOT NULL, "mimeType" text NOT NULL, "path" text, "size" integer NOT NULL, "extensions" text NOT NULL, "subjectId" integer, "subjectField" text, "subjectEntityName" text, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "setting" ("id" SERIAL NOT NULL, "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, "updatedAt" TIMESTAMP WITH TIME ZONE, "publicEmail" text, "systemEmail" text, "phoneNumber" text, "head" text, "isTechnicalWork" boolean, "siteName" text, "confidentialityUrl" text, "personalDataUrl" text, CONSTRAINT "PK_fcb21187dc6094e24a48f677bed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, "updatedAt" TIMESTAMP WITH TIME ZONE, "nickName" text NOT NULL, "email" text, "password" text NOT NULL, "role" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`CREATE TABLE "global_key_pages_page" ("globalKeyId" integer NOT NULL, "pageId" integer NOT NULL, CONSTRAINT "PK_a31dba99949a9b86105ace66c0f" PRIMARY KEY ("globalKeyId", "pageId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7b94691a6efda77c603c34478e" ON "global_key_pages_page" ("globalKeyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_13a0e5fcf1922a7ba1246cafb9" ON "global_key_pages_page" ("pageId") `);
        await queryRunner.query(`ALTER TABLE "component_template" ADD CONSTRAINT "FK_3710b9f038f5c86c00d4adae059" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "page_node" ADD CONSTRAINT "FK_80a9f15ca37d7674dbaf3419c9b" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "page_node" ADD CONSTRAINT "FK_3566134e8c6e1c80dd7e8491f6c" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "node_param" ADD CONSTRAINT "FK_c51a0b4ad532d88e3f0bb545bf7" FOREIGN KEY ("pageNodeId") REFERENCES "page_node"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "node_param" ADD CONSTRAINT "FK_8a1040d5d91bd540a1141dc3b4f" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "page_meta" ADD CONSTRAINT "FK_c54e41cad8b4bb55afcd94f0c9f" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu" ADD CONSTRAINT "FK_23ac1b81a7bfb85b14e86bd23a5" FOREIGN KEY ("parentId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "global_key_pages_page" ADD CONSTRAINT "FK_7b94691a6efda77c603c34478e5" FOREIGN KEY ("globalKeyId") REFERENCES "global_key"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "global_key_pages_page" ADD CONSTRAINT "FK_13a0e5fcf1922a7ba1246cafb9a" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "global_key_pages_page" DROP CONSTRAINT "FK_13a0e5fcf1922a7ba1246cafb9a"`);
        await queryRunner.query(`ALTER TABLE "global_key_pages_page" DROP CONSTRAINT "FK_7b94691a6efda77c603c34478e5"`);
        await queryRunner.query(`ALTER TABLE "menu" DROP CONSTRAINT "FK_23ac1b81a7bfb85b14e86bd23a5"`);
        await queryRunner.query(`ALTER TABLE "page_meta" DROP CONSTRAINT "FK_c54e41cad8b4bb55afcd94f0c9f"`);
        await queryRunner.query(`ALTER TABLE "node_param" DROP CONSTRAINT "FK_8a1040d5d91bd540a1141dc3b4f"`);
        await queryRunner.query(`ALTER TABLE "node_param" DROP CONSTRAINT "FK_c51a0b4ad532d88e3f0bb545bf7"`);
        await queryRunner.query(`ALTER TABLE "page_node" DROP CONSTRAINT "FK_3566134e8c6e1c80dd7e8491f6c"`);
        await queryRunner.query(`ALTER TABLE "page_node" DROP CONSTRAINT "FK_80a9f15ca37d7674dbaf3419c9b"`);
        await queryRunner.query(`ALTER TABLE "component_template" DROP CONSTRAINT "FK_3710b9f038f5c86c00d4adae059"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_13a0e5fcf1922a7ba1246cafb9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7b94691a6efda77c603c34478e"`);
        await queryRunner.query(`DROP TABLE "global_key_pages_page"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "setting"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TABLE "menu"`);
        await queryRunner.query(`DROP TABLE "crud_entity"`);
        await queryRunner.query(`DROP TABLE "global_key"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f4fdc8c67d3e22af7f60e07540"`);
        await queryRunner.query(`DROP TABLE "page"`);
        await queryRunner.query(`DROP TABLE "page_meta"`);
        await queryRunner.query(`DROP TABLE "node_param"`);
        await queryRunner.query(`DROP TABLE "page_node"`);
        await queryRunner.query(`DROP TABLE "component_template"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a60bfff7094fd0352057e8b44e"`);
        await queryRunner.query(`DROP TABLE "component"`);
        await queryRunner.query(`DROP TABLE "city_list"`);
    }

}
