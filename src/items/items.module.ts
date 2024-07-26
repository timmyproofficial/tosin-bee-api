import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, itemSchema } from 'src/schemas/Item.schema';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: itemSchema }]),
  ],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
