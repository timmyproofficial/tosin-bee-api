import { Controller, Get, Param, HttpException, Delete } from '@nestjs/common';
import { ErrandsService } from './errands.service';
import mongoose from 'mongoose';

@Controller('errands')
export class ErrandsController {
  constructor(private errandsService: ErrandsService) {}

  @Get()
  getErrands() {
    return this.errandsService.getErrands();
  }

  @Get(':id')
  async getErrandById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Errand not found', 404);
    const findErrand = await this.errandsService.getErrandById(id);
    if (!findErrand) throw new HttpException('Errand not found', 404);
    return findErrand;
  }

  @Delete(':id')
  async deleteErrand(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const deletedErrand = await this.errandsService.deleteErrand(id);
    if (!deletedErrand) throw new HttpException('Errand Not Found', 404);
    return;
  }
}
