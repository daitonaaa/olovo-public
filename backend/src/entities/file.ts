import { EntityBase } from '../base_entities/EntityBase';
import { Column, Entity } from 'typeorm';

@Entity()
export class File extends EntityBase {
  @Column({ nullable: false, type: 'text' })
  name: string;

  @Column({ nullable: false, type: 'text' })
  mimeType: string;

  @Column({ nullable: true, type: 'text' })
  path: string;

  @Column({ nullable: false, type: 'int' })
  size: number;

  @Column({ nullable: false, type: 'text' })
  extensions: string;

  @Column({ nullable: true, type: 'int' })
  subjectId: number;

  @Column({ nullable: true, type: 'text' })
  subjectField: string;

  @Column({ nullable: true, type: 'text' })
  subjectEntityName: string;
}
