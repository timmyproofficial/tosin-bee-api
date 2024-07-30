import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback } from 'src/schemas/Feedback.schema';
import { CreateFeedbackDto } from './dto/Feedback.dto';
import { UpdateFeedbackDto } from './dto/UpdateFeedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name) private feedbackModel: Model<Feedback>,
  ) {}

  getFeedback() {
    return this.feedbackModel.find();
  }

  getFeedbackById(id: string) {
    return this.feedbackModel.findById(id);
  }

  createFeedback(createFeedbackDto: CreateFeedbackDto) {
    const newFeedback = new this.feedbackModel(createFeedbackDto);
    return newFeedback.save();
  }

  updateFeedback(id: string, updateFeedbackDto: UpdateFeedbackDto) {
    return this.feedbackModel.findByIdAndUpdate(id, updateFeedbackDto, {
      new: true,
    });
  }

  deleteFeedback(id: string) {
    return this.feedbackModel.findByIdAndDelete(id);
  }
}
