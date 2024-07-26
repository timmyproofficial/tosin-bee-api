import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { MarketsService } from './markets.service';
import { CreateMarketDto } from './dto/Market.dto';
import { UpdateMarketDto } from './dto/UpdateMarket.dto';

@Controller('markets')
export class MarketsController {
  constructor(private marketsService: MarketsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createMarket(@Body() createMarketDto: CreateMarketDto) {
    //   console.log(createMarketDto);
    return this.marketsService.createMarket(createMarketDto);
  }

  @Get()
  getMarkets() {
    return this.marketsService.getMarkets();
  }

  @Get(':id')
  async getMarketById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Market not found', 404);
    const findMarket = await this.marketsService.getMarketById(id);
    if (!findMarket) throw new HttpException('Market not found', 404);
    return findMarket;
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateMarket(
    @Param('id') id: string,
    @Body() updateMarketDto: UpdateMarketDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const updatedMarket = await this.marketsService.updateMarket(
      id,
      updateMarketDto,
    );
    if (!updatedMarket) throw new HttpException('Market Not Found', 404);
    return updatedMarket;
  }

  @Delete(':id')
  async deleteMarket(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const deletedMarket = await this.marketsService.deleteMarket(id);
    if (!deletedMarket) throw new HttpException('Market Not Found', 404);
    return;
  }
}
