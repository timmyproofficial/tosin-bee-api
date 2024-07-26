import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AgentsModule } from './agents/agents.module';
import { MarketsModule } from './markets/markets.module';
import { ErrandsModule } from './errands/errands.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://timmyshow96:lBQgrgUGPEUAfSBw@cluster0.fch9y4r.mongodb.net/tosinBeeDb?retryWrites=true&w=majority&appName=Cluster0',
    ),
    UsersModule,
    AgentsModule,
    MarketsModule,
    ErrandsModule,
    ItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
