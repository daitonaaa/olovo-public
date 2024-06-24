import { Column, Entity } from 'typeorm';
import { EntityBase } from '../base_entities/EntityBase';

@Entity()
export class CrudEntity extends EntityBase {
  @Column({ type: 'text', nullable: false })
  name: string;
}
