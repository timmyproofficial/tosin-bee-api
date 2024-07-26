import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { AgentsService } from './agents.service';
import mongoose from 'mongoose';

@Controller('agents')
export class AgentsController {
  constructor(private agentsService: AgentsService) {}

  @Get()
  getAgents() {
    return this.agentsService.getAgents();
  }

  @Get(':id')
  async getAgentsById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Agent not found', 404);
    const findAgent = await this.agentsService.getAgentById(id);
    if (!findAgent) throw new HttpException('User not found', 404);
    return findAgent;
  }
}
