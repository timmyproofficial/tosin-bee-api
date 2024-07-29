import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Album } from 'src/schemas/Album.schema';
import { CreateAlbumDto } from './dto/Album.dto';
import { UpdateAlbumDto } from './dto/UpdateAlbum.dto';

@Injectable()
export class AlbumsService {
  constructor(@InjectModel(Album.name) private albumModel: Model<Album>) {}

  getAlbums() {
    return this.albumModel.find();
  }

  getAlbumById(id: string) {
    return this.albumModel.findById(id);
  }

  createAlbum(createAlbumDto: CreateAlbumDto) {
    const newAlbum = new this.albumModel(createAlbumDto);
    return newAlbum.save();
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.albumModel.findByIdAndUpdate(id, updateAlbumDto, { new: true });
  }

  deleteAlbum(id: string) {
    return this.albumModel.findByIdAndDelete(id);
  }
}
