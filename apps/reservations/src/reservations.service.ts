import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './reservations/dto/create-reservation.dto';
import { UpdateReservationDto } from './reservations/dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { DeepPartial } from 'typeorm';
import { ReservationEntity } from './reservations/entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationsRepo: ReservationsRepository) {}
  create(createReservationDto: CreateReservationDto) {
    return this.reservationsRepo.create({
      ...createReservationDto,
      user_id: 12,
      invoice_id: 1,
    });
  }

  findAll() {
    return this.reservationsRepo.find({});
  }

  findOne(id: number) {
    return this.reservationsRepo.findOne({ id });
  }

  update(id: number, updateReservationDto: DeepPartial<ReservationEntity>) {
    return this.reservationsRepo.findOneAndUpdate({ id }, updateReservationDto);
  }

  remove(id: number) {
    return this.reservationsRepo.findOneAndDelete({ id });
  }
}
