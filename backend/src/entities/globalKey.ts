import { EntityBase } from 'src/base_entities/EntityBase';
import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { Page } from './page';

@Entity()
export class GlobalKey extends EntityBase {
  @Column({ type: 'text', name: 'key', nullable: false, unique: true })
  public key: string;
  @Column({ type: 'text', name: 'value', nullable: false })
  public value: string;

  @ManyToMany(() => Page)
  @JoinTable()
  pages: Page[];
}
