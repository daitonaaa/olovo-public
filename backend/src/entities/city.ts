import { Column, Entity } from 'typeorm';
import { EntityBase } from '../base_entities/EntityBase';

@Entity('city_list')
export class CityEntity extends EntityBase {
  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'double precision', nullable: false })
  lt: number;

  @Column({ type: 'double precision', nullable: false })
  lg: number;
}
