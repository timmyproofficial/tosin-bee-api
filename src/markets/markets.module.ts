import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Market, marketSchema } from 'src/schemas/Market.schema';
import { MarketsService } from './markets.service';
import { MarketsController } from './markets.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Market.name, schema: marketSchema }]),
  ],
  providers: [MarketsService],
  controllers: [MarketsController],
})
export class MarketsModule {}
