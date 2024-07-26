import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agent } from 'src/schemas/Agent.schema';

@Injectable()
export class AgentsService {
  constructor(@InjectModel(Agent.name) private agentModel: Model<Agent>) {}

  getAgents() {
    return this.agentModel.find();
  }

  getAgentById(id: string) {
    return this.agentModel.findById(id);
  }
}
