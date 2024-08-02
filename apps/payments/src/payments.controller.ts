import { Body, Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreateChargeDto, CurrentUser, UserDto } from '@app/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  @MessagePattern('create_charge')
  async createCharge(@Payload() data: CreateChargeDto) {
    let line_items = {
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'T-shirt',
        },
        unit_amount: 2000,
      },
      quantity: 1,
    };
    return await this.paymentsService.createCharge(data, line_items);
  }
}
