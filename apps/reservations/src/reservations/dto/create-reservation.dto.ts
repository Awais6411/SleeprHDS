import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { addMonths } from 'date-fns';

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  start_date: Date = new Date(Date.now());

  @IsDate()
  @Type(() => Date)
  end_date: Date = addMonths(this.start_date, 1);

  @IsNumber()
  @IsNotEmpty()
  invoice_id: number;

  @IsNumber()
  @IsNotEmpty()
  place_id: number;
}
