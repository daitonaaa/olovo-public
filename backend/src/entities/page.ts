import { EntityBase } from 'src/base_entities/EntityBase';
import { Column, Entity, Index, OneToMany, ManyToMany } from 'typeorm';
import { GlobalKey } from './globalKey';
import { NodeParam } from './nodeParam';
import { PageMeta } from './pageMeta';
import { PageNode } from './pageNode';

@Entity()
export class Page extends EntityBase {
  @Column({ type: 'text', name: 'name', nullable: false })
  public name: string;

  @Column({ type: 'text', name: 'url', nullable: true })
  @Index({ unique: true })
  public url: string;

  @Column({ type: 'boolean', name: 'isPublished', nullable: false })
  public isPublished: boolean;

  @OneToMany(() => PageMeta, (x) => x.page)
  public pageMeta: PageMeta[];

  @OneToMany(() => PageNode, (x) => x.page)
  public pageNode: PageNode[];

  @OneToMany(() => NodeParam, (x) => x.page)
  public nodeParam: NodeParam[];

  @Column({ type: 'boolean', name: 'isRegional', nullable: false })
  public isRegional: boolean;

  @Column({ type: 'boolean', name: 'isCrud', nullable: false, default: false })
  public isCrud: boolean;

  @ManyToMany(() => GlobalKey, (key) => key.pages)
  public pageKey: GlobalKey[];
}
