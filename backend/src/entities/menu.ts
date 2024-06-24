import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EntityBase } from '../base_entities/EntityBase';

@Entity('menu')
export class MenuEntity extends EntityBase {
  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  label: string;

  @Column({ type: 'int', nullable: true })
  level: number;

  @Column({ type: 'text', nullable: true })
  url?: string;

  @Column({ type: 'int', nullable: true })
  order?: number;

  @ManyToOne(() => MenuEntity, (service) => service.children)
  parent: MenuEntity;

  @OneToMany(() => MenuEntity, (service) => service.parent)
  children: MenuEntity[];
}
