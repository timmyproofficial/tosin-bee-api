import { IsNotEmpty, IsString } from 'class-validator';
import { IsObjectId } from 'src/utils/isObjectId.validator';

export class CreateMediaDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  img: string;

  @IsNotEmpty()
  @IsString()
  appleLink: string;

  @IsNotEmpty()
  @IsString()
  audiomackLink: string;

  @IsNotEmpty()
  @IsString()
  boomplayLink: string;

  @IsNotEmpty()
  @IsString()
  spotifyLink: string;

  @IsNotEmpty()
  @IsString()
  youtubeLink: string;

  @IsNotEmpty()
  @IsObjectId({ message: 'Genre ID must be a valid ObjectId' })
  genre: string;

  @IsNotEmpty()
  @IsObjectId({ message: 'Album ID must be a valid ObjectId' })
  album: string;
}
