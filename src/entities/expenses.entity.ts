import { Column, Entity, ManyToOne } from 'typeorm';
import { EntityHelper } from '../utils/entity-helper';
import { User } from './user.entity';

@Entity()
export class Expenses extends EntityHelper {
  @Column()
  amount?: number;

  @Column()
  category?: string;

  @Column()
  description?: string;

  @ManyToOne(() => User)
  user?: User;
}
