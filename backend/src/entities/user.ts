import { EntityBase } from 'src/base_entities/EntityBase';
import { Column, Entity, Index } from 'typeorm';

export enum UserRole {
  user,
  admin,
}

@Entity()
export class User extends EntityBase {
  @Column({ type: 'text', name: 'nickName', nullable: false })
  public nickName: string;

  @Column({ type: 'text', name: 'email', nullable: true })
  @Index({ unique: true })
  public email: string;

  @Column({ type: 'text', name: 'password', nullable: false })
  public password: string;

  @Column({
    type: 'int',
    name: 'role',
    nullable: false,
    default: UserRole.user,
  })
  public role: UserRole;
}
