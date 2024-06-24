import { EntityBase } from 'src/base_entities/EntityBase';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { ComponentTemplate } from './componentTemplate';
import { PageNode } from './pageNode';

@Entity()
export class Component extends EntityBase {
  @Index({ unique: true })
  @Column({ type: 'text', name: 'name', nullable: false })
  public name: string;

  @OneToMany(() => ComponentTemplate, (x) => x.component)
  public componentTemplate: ComponentTemplate[];

  @Column({ type: 'text', name: 'label', nullable: false })
  public label: string;

  public pageNode: PageNode[];
}
