import { UserDto, CreateChargeDto, NOTIFICATIONS_SERVICE } from '@app/common';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
// import { CreateChargeDto } from '../../../libs/common/src/dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
  );
  async createCharge({ message, amount }: CreateChargeDto, line_items: any) {
    try {
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
  async createCheckout(data: { email: string }, line_items: any) {
    try {
      let session = await this.stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [line_items],
        customer_email: data.email,
        success_url: this.configService.get('STRIPE_SUCCESS_URL'),
        cancel_url: this.configService.get('STRIPE_CANCEL_URL'),
      });
      this.notificationsService.emit('notify_email', data);
      return session;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
