import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class EntityBase {
  constructor() {
    this.dateCreated = new Date();
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp with time zone',
    name: 'dateCreated',
    nullable: false,
  })
  public dateCreated: Date;

  @Column({
    type: 'timestamp with time zone',
    name: 'deletedAt',
    nullable: true,
  })
  public deletedAt: Date;

  @Column({
    type: 'timestamp with time zone',
    name: 'updatedAt',
    nullable: true,
  })
  public updatedAt: Date;
}
