import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  releasedYear: number;
}
