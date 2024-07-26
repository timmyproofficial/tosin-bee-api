import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateMarketDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
