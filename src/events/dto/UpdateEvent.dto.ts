import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateEventDto {
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsNotEmpty()
  @IsString()
  venue?: number;

  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  eventDate?: string;

  @IsNotEmpty()
  @IsString()
  eventTime?: string;
}
