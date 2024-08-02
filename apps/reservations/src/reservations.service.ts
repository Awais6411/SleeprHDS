import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './reservations/dto/create-reservation.dto';
import { UpdateReservationDto } from './reservations/dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { DeepPartial } from 'typeorm';
import { ReservationEntity } from './reservations/entities/reservation.entity';
import { PAYMENTS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepo: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) paymentService: ClientProxy,
  ) {}
  async create(createReservationDto: CreateReservationDto, user_id: number) {
    return this.reservationsRepo.create({
      ...createReservationDto,
      user_id: user_id,
      invoice_id: 1,
    });
  }

  async findAll() {
    return this.reservationsRepo.find({});
  }

  async findOne(id: number) {
    return this.reservationsRepo.findOne({ id });
  }

  async update(
    id: number,
    updateReservationDto: DeepPartial<ReservationEntity>,
  ) {
    return this.reservationsRepo.findOneAndUpdate({ id }, updateReservationDto);
  }

  async remove(id: number) {
    return this.reservationsRepo.findOneAndDelete({ id });
  }
}
