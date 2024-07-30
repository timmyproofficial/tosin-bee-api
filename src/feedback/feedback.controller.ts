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

@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Get()
  getFeedback() {
    return this.feedbackService.getFeedback();
  }

  @Get(':id')
  async getFeedbackById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const findFeedback = await this.feedbackService.getFeedbackById(id);
    if (!findFeedback) throw new HttpException('Feedback not found', 404);

    return findFeedback;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createFeedback(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.createFeedback(createFeedbackDto);
  }

  @Patch(':id')
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
  async deleteFeedback(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const deletedFeedback = await this.feedbackService.deleteFeedback(id);
    if (!deletedFeedback) throw new HttpException('Feedback not found', 404);

    return;
  }
}
