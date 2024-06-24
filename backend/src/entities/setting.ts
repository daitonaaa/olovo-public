import { Column, Entity } from 'typeorm';
import { EntityBase } from '../base_entities/EntityBase';

@Entity()
export class Setting extends EntityBase {
  @Column({ type: 'text', name: 'publicEmail', nullable: true })
  publicEmail: string;

  @Column({ type: 'text', name: 'systemEmail', nullable: true })
  systemEmail: string;

  @Column({ type: 'text', name: 'phoneNumber', nullable: true })
  phoneNumber: string;

  @Column({ type: 'text', name: 'head', nullable: true })
  head: string;

  @Column({ type: 'boolean', name: 'isTechnicalWork', nullable: true })
  isTechnicalWork: boolean;

  @Column({ type: 'text', name: 'siteName', nullable: true })
  siteName: string;

  @Column({ type: 'text', name: 'confidentialityUrl', nullable: true })
  confidentialityUrl: string;

  @Column({ type: 'text', name: 'personalDataUrl', nullable: true })
  personalDataUrl: string;
}
