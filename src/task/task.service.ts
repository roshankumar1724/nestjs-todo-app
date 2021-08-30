import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toTaskDto } from '@shared/mapper';
import { toPromise } from '@shared/utils';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>
  ) { }

  create(createTaskDto: CreateTaskDto) {
    console.log(createTaskDto);
    return 'This action adds a new task';
  }

  findAll() {
    return `This action returns all task`;
  }

  async findOne(id: number): Promise<TaskDto> {
    const task = await this.taskRepo.findOne({
      where: { id }
    });
    if (!task) {
      throw new HttpException(`Task item doesn't exist! `, HttpStatus.BAD_REQUEST);
    }

    return toPromise(toTaskDto(task));
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    console.log(updateTaskDto);
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
