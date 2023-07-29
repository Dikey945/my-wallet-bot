import { Column, Entity, Index } from 'typeorm';
import { EntityHelper } from '../utils/entity-helper';

@Entity('user')
export class User extends EntityHelper {
  @Column({ unique: true })
  @Index()
  userTgId?: number;

  @Column()
  firstName?: string;

  @Column({ unique: true })
  userTag?: string;
}
