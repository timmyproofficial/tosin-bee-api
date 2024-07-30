import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from 'src/schemas/Event.schema';
import { CreateEventDto } from './dto/Event.dto';
import { UpdateEventDto } from './dto/UpdateEvent.dto';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  getEvents() {
    return this.eventModel.find();
  }

  getEventById(id: string) {
    return this.eventModel.findById(id);
  }

  createEvent(createEventDto: CreateEventDto) {
    const newEvent = new this.eventModel(createEventDto);
    return newEvent.save();
  }

  updateEvent(id: string, updateEventDto: UpdateEventDto) {
    return this.eventModel.findByIdAndUpdate(id, updateEventDto, { new: true });
  }

  deleteEvent(id: string) {
    return this.eventModel.findByIdAndDelete(id);
  }
}
