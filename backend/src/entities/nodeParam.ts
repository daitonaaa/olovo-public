import { EntityBase } from 'src/base_entities/EntityBase';
import { FieldType } from 'src/common/types/fieldType';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Page } from './page';
import { PageNode } from './pageNode';

@Entity()
export class NodeParam extends EntityBase {
  @ManyToOne(() => PageNode, (x) => x.nodeParam)
  public pageNode: PageNode;

  @ManyToOne(() => Page, (x) => x.nodeParam)
  public page: Page;

  @Column({ type: 'text', nullable: false, name: 'Value' })
  public value: string;

  @Column({ type: 'int' })
  public componentType: FieldType;

  @Column({ type: 'int' })
  public pageNodeId: number;
}
