import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';



@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
      ) {}
    
      async createUser(
        createUserDto: CreateUserDto & { userId: string },
      ): Promise<TaskDocument> {
        const newTask = new this.taskModel(createTaskDto);
        return newTask.save();
      }
    
      async getTasks(userId: string, status?: TaskStatus): Promise<TaskDocument[]> {
        const filter: { userId: string; completed?: boolean } = { userId };
        if (status) {
          filter.completed = status === TaskStatus.COMPLETED;
        }
        return this.taskModel.find(filter).exec();
      }
}
