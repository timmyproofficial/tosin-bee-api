import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Media } from 'src/schemas/Media.schema';
import { CreateMediaDto } from './dto/Media.dto';
import { UpdateMediaDto } from './dto/UpdateMedia.dto';

@Injectable()
export class MediaService {
  constructor(@InjectModel(Media.name) private mediaModel: Model<Media>) {}

  getMedia() {
    return this.mediaModel.find();
  }

  getMediaById(id: string) {
    return this.mediaModel.findById(id);
  }

  createMedia(createMediaDto: CreateMediaDto) {
    const newMedia = new this.mediaModel(createMediaDto);
    return newMedia.save();
  }

  updateMedia(id: string, updateMediaDto: UpdateMediaDto) {
    return this.mediaModel.findByIdAndUpdate(id, updateMediaDto, { new: true });
  }

  deleteMedia(id: string) {
    return this.mediaModel.findByIdAndDelete(id);
  }
}
