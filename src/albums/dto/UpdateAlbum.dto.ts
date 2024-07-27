import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  releasedYear?: number;
}
