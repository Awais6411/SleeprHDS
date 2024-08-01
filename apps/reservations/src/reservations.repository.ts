import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { ReservationEntity } from './reservations/entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationEntity> {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationsRepo: Repository<ReservationEntity>,
  ) {
    super(reservationsRepo);
  }
}
