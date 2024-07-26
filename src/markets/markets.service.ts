import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Market } from 'src/schemas/Market.schema';
import { CreateMarketDto } from './dto/Market.dto';
import { UpdateMarketDto } from './dto/UpdateMarket.dto';

@Injectable()
export class MarketsService {
  constructor(@InjectModel(Market.name) private marketModel: Model<Market>) {}

  createMarket(createMarketDto: CreateMarketDto) {
    const newMarket = new this.marketModel(createMarketDto);
    return newMarket.save();
  }

  getMarkets() {
    return this.marketModel.find();
  }

  getMarketById(id: string) {
    return this.marketModel.findById(id);
  }

  updateMarket(id: string, updateMarketDto: UpdateMarketDto) {
    return this.marketModel.findByIdAndUpdate(id, updateMarketDto, {
      new: true,
    });
  }

  deleteMarket(id: string) {
    return this.marketModel.findByIdAndDelete(id);
  }
}
