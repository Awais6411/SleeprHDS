import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './reservations/dto/create-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { DeepPartial } from 'typeorm';
import { ReservationEntity } from './reservations/entities/reservation.entity';
import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepo: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentService: ClientProxy,
  ) {}
  async create(createReservationDto: CreateReservationDto, user: UserDto) {
    try {
      return this.paymentService
        .send(
          'create_checkout',
          { email: user.email }, //'awais@gmail.com'
        )
        .pipe(
          map(async (response) => {
            const reservation = await this.reservationsRepo.create({
              ...createReservationDto,
              user_id: user.id,
              invoice_id: 1,
            });
            return { ...reservation, payment_url: response.url };
          }),
        );
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
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
