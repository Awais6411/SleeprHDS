import { IsEmail, IsOptional, IsString } from 'class-validator';
import { IsNull } from 'typeorm';

export class NotifyEmailDto {
  @IsEmail()
  email: string;
  @IsString()
  @IsOptional()
  payment_url: string;
}
