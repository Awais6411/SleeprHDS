import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';
export class AbstractEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
