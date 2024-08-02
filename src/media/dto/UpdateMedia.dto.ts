import { IsOptional, IsString } from 'class-validator';
import { IsObjectId } from 'src/utils/isObjectId.validator';

export class UpdateMediaDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  img?: string;

  @IsOptional()
  @IsString()
  appleLink?: string;

  @IsOptional()
  @IsString()
  audiomackLink?: string;

  @IsOptional()
  @IsString()
  boomplayLink?: string;

  @IsOptional()
  @IsString()
  spotifyLink?: string;

  @IsOptional()
  @IsString()
  youtubeLink?: string;

  @IsOptional()
  @IsObjectId({ message: 'Genre ID must be a valid ObjectId' })
  genre?: string;

  @IsOptional()
  @IsObjectId({ message: 'Album ID must be a valid ObjectId' })
  album?: string;
}
