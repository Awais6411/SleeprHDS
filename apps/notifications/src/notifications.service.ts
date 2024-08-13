import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/email-notify.dto';

@Injectable()
export class NotificationsService {
  notifyEMail(data: NotifyEmailDto) {
    console.log({ 'NOTIFICATIONS-TESTING:=> ': data });
  }
  getHello(): string {
    return 'Hello World!';
  }
}
