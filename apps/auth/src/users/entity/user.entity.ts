import { AbstractEntity } from '@app/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends AbstractEntity {
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;
}
