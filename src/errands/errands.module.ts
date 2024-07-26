import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Errand, errandSchema } from 'src/schemas/Errand.schema';
import { ErrandsService } from './errands.service';
import { ErrandsController } from './errands.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Errand.name, schema: errandSchema }]),
  ],
  providers: [ErrandsService],
  controllers: [ErrandsController],
})
export class ErrandsModule {}
