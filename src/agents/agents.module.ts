import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { Agent, agentSchema } from 'src/schemas/Agent.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Agent.name, schema: agentSchema }]),
  ],
  providers: [AgentsService],
  controllers: [AgentsController],
})
export class AgentsModule {}
