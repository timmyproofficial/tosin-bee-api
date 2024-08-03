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
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/Feedback.dto';
import { UpdateFeedbackDto } from './dto/UpdateFeedback.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Feedbacks')
@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch Feedbacks' })
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
              fullName: {
                type: 'string',
                description: "User's full name.",
                example: 'John Doe',
              },
              email: {
                type: 'string',
                description: "User's email.",
                example: 'johndoe@example.com',
              },
              phone: {
                type: 'string',
                description: "User's phone number.",
                example: '07081785091',
              },
              message: {
                type: 'string',
                description: "User's message.",
                example:
                  'Tosin Bee, when are you bringing your concert to a city near us',
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
  async getFeedback() {
    const feedbacks = await this.feedbackService.getFeedback();
    return {
      count: feedbacks.length,
      result: feedbacks,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch Single Event' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Valid objectID',
    example: '66ad053b9cf7a052700758d6',
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
  async getFeedbackById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const findFeedback = await this.feedbackService.getFeedbackById(id);
    if (!findFeedback) throw new HttpException('Feedback not found', 404);

    return findFeedback;
  }

  @Post()
  @ApiOperation({ summary: 'Create Feedback' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fullName: {
          type: 'string',
          description: "User's full name.",
          example: 'John Doe',
        },
        email: {
          type: 'string',
          description: "User's email.",
          example: 'johndoe@example.com',
        },
        phone: {
          type: 'string',
          description: "User's phone number.",
          example: '07081785091',
        },
        message: {
          type: 'string',
          description: "User's message.",
          example:
            'Tosin Bee, when are you bringing your concert to a city near us',
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
  createFeedback(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.createFeedback(createFeedbackDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Feedback' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'A unique and valid ObjectId',
    example: '66ad053b9cf7a052700758d6',
    required: true,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fullName: {
          type: 'string',
          description: "User's full name.",
          example: 'John Doe',
        },
        email: {
          type: 'string',
          description: "User's email.",
          example: 'johndoe@example.com',
        },
        phone: {
          type: 'string',
          description: "User's phone number.",
          example: '07081785091',
        },
        message: {
          type: 'string',
          description: "User's message.",
          example:
            'Tosin Bee, when are you bringing your concert to a city near us',
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
  async updateFeedback(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const updatedFeedback = await this.feedbackService.updateFeedback(
      id,
      updateFeedbackDto,
    );
    if (!updatedFeedback) throw new HttpException('Feedback not found', 400);

    return updatedFeedback;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Feedback' })
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
  async deleteFeedback(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const deletedFeedback = await this.feedbackService.deleteFeedback(id);
    if (!deletedFeedback) throw new HttpException('Feedback not found', 404);

    return;
  }
}
