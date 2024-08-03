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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch Events' })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    schema: {
      type: 'object',
      properties: {
        count: {
          type: 'number',
          description: 'The length of the result',
          example: 4,
        },
        result: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                description: 'A unique objectId',
                example: '66acfdb89cf7a052700758ad',
              },
              title: {
                type: 'string',
                description: 'Title of the event',
                example: '02 Arena Praise Medley',
              },
              venue: {
                type: 'string',
                description: 'The venue of the event',
                example: 'O2 Arena, London',
              },
              description: {
                type: 'string',
                description: 'Event details',
                example:
                  'A 20K capacity concert. Come and experience high praise...',
              },
              eventDate: {
                type: 'string',
                description: 'Event Date',
                example: '20th Oct, 2077',
              },
              eventTime: {
                type: 'string',
                description: 'Event Time',
                example: '12:00 AM',
              },
              createdAt: {
                type: 'string',
                description: 'Date & Time this record was created',
                example: '2024-08-02T15:39:36.220Z',
              },
              updatedAt: {
                type: 'string',
                description: 'Date & Time this record was updated',
                example: '2024-08-02T15:39:36.220Z',
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server code',
  })
  async getEvents() {
    const events = await this.eventsService.getEvents();
    return {
      count: events.length,
      result: events,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch Single Event' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Valid objectID',
    example: '66acfdcd9cf7a052700758af',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async getEventById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const findEvent = await this.eventsService.getEventById(id);
    if (!findEvent) throw new HttpException('Event not found', 404);

    return findEvent;
  }

  @Post()
  @ApiOperation({ summary: 'Create Event' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Title of the event',
          example: '02 Arena Praise Medley',
        },
        venue: {
          type: 'string',
          description: 'The venue of the event',
          example: 'O2 Arena, London',
        },
        description: {
          type: 'string',
          description: 'Event details',
          example: 'A 20K capacity concert. Come and experience high praise...',
        },
        eventDate: {
          type: 'string',
          description: 'Event Date',
          example: '20th Oct, 2077',
        },
        eventTime: {
          type: 'string',
          description: 'Event Time',
          example: '12:00 AM',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'OK',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @UsePipes(new ValidationPipe())
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Event' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'A unique and valid ObjectId',
    example: '66acfdcd9cf7a052700758af',
    required: true,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Title of the event',
          example: '02 Arena Praise Medley',
        },
        venue: {
          type: 'string',
          description: 'The venue of the event',
          example: 'O2 Arena, London',
        },
        description: {
          type: 'string',
          description: 'Event details',
          example: 'A 20K capacity concert. Come and experience high praise...',
        },
        eventDate: {
          type: 'string',
          description: 'Event Date',
          example: '20th Oct, 2077',
        },
        eventTime: {
          type: 'string',
          description: 'Event Time',
          example: '12:00 AM',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
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
  @ApiOperation({ summary: 'Delete Event' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'A unique and valid ObjectId',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  async deleteEvent(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const deletedEvent = await this.eventsService.deleteEvent(id);
    if (!deletedEvent) throw new HttpException('Event not found', 404);

    return;
  }
}
