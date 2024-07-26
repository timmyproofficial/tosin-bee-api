import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Errand } from 'src/schemas/Errand.schema';

@Injectable()
export class ErrandsService {
  constructor(@InjectModel(Errand.name) private errandModel: Model<Errand>) {}

  async getErrands() {
    return this.errandModel
      .find()
      .populate('user', '_id firstName lastName email')
      .populate('market')
      .populate('errandList.item');
  }

  async getErrandById(id: string) {
    return (await this.errandModel.findById(id)).populate(
      'user',
      '_id firstName lastName email',
    );
  }

  async deleteErrand(id: string) {
    return this.errandModel.findByIdAndDelete(id);
  }
}
