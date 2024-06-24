import { EntityBase } from 'src/base_entities/EntityBase';
import { FieldType } from 'src/common/types/fieldType';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Component } from './component';

@Entity()
export class ComponentTemplate extends EntityBase {
  @Column({ type: 'int' })
  public componentType: FieldType;

  @ManyToOne(() => Component, (x) => x.componentTemplate)
  public component: Component;
}
