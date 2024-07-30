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
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/Event.dto';
import { UpdateEventDto } from './dto/UpdateEvent.dto';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  getEvents() {
    return this.eventsService.getEvents();
  }

  @Get(':id')
  async getEventById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const findEvent = await this.eventsService.getEventById(id);
    if (!findEvent) throw new HttpException('Event not found', 404);

    return findEvent;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const updatedEvent = await this.eventsService.updateEvent(
      id,
      updateEventDto,
    );
    if (!updatedEvent) throw new HttpException('Event not found', 400);

    return updatedEvent;
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const deletedEvent = await this.eventsService.deleteEvent(id);
    if (!deletedEvent) throw new HttpException('Event not found', 404);

    return;
  }
}
