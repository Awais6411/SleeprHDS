import { UserDto } from '@app/common';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '../../../libs/common/src/dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly configService: ConfigService) {}
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
  );
  async createCharge({ message, amount }: CreateChargeDto, line_items: any) {
    try {
      console.log({ message, amount });

      let session = await this.stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [line_items],
        customer_email: 'awais@gmail.com',
        success_url: this.configService.get('STRIPE_SUCCESS_URL'),
        cancel_url: this.configService.get('STRIPE_CANCEL_URL'),
      });
      return session;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
