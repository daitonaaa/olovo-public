import { EntityBase } from 'src/base_entities/EntityBase';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Component } from './component';
import { NodeParam } from './nodeParam';
import { Page } from './page';

@Entity()
export class PageNode extends EntityBase {
  @Column({ type: 'text', name: 'name', nullable: false })
  public name: string;

  @Column({ type: 'int' })
  public order: number;

  @Column({ type: 'boolean', default: false })
  public isWrappedContainer: boolean;

  @ManyToOne(() => Page, (x) => x.pageNode)
  public page: Page;

  @ManyToOne(() => Component, (x) => x.pageNode)
  public component: Component;

  @Column({ type: 'int' })
  public componentId: number;

  @OneToMany(() => NodeParam, (x) => x.pageNode)
  public nodeParam: NodeParam[];
}
