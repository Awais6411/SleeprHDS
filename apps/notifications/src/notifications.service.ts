import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/email-notify.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}
  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.get('SMTP_USER'),
      clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
      refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
    },
  });
  async notifyEMail(data: NotifyEmailDto) {
    const { email } = data;
    await this.transporter.sendMail({
      from: this.configService.get('SMTP_USER'),
      to: email,
      subject: 'SLEEPR NOTIFICATIONS',
      text: 'Congrats! Your stripe checkout payment link created successfully.',
    });
    console.log({ 'NOTIFICATIONS-TESTING:=> ': email });
  }
  getHello(): string {
    return 'Hello World!';
  }
}
