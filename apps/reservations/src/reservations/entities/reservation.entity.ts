import { AbstractEntity } from '@app/common/database/abstract.entity';
import { addMonths } from 'date-fns';
import { Column, Entity } from 'typeorm';

@Entity()
export class ReservationEntity extends AbstractEntity {
  @Column({ nullable: true })
  start_date: Date = new Date(Date.now());

  @Column({ nullable: true })
  end_date: Date = addMonths(this.start_date, 1);

  @Column({ nullable: true })
  user_id: number;

  @Column({ nullable: true })
  invoice_id: number;

  @Column({ nullable: true })
  place_id: number;
}
