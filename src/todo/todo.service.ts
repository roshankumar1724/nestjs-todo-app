import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { todos } from 'src/mock/todos.mock';
import { toTodoDto } from 'src/shared/mapper';
import { toPromise } from 'src/shared/utils';
import { TodoCreateDto } from './dto/todo-create-dto';
import { TodoDto } from './dto/todo-dto';
import { TodoEntity } from './entity/todo.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService {

  todos: TodoEntity[] = todos;

  async getOneTodo(id: string): Promise<TodoDto> {
    const todo = this.todos.find(todo => todo.id === id);
    if (!todo) {
      throw new HttpException(`Todo item doesn't exist! `, HttpStatus.BAD_REQUEST);
    }

    return toPromise(toTodoDto(todo));
  }

  async createTodo(todoDto: TodoCreateDto): Promise<TodoDto> {
    const { name, description } = todoDto;
    const todo: TodoEntity = {
      id: uuidv4(),
      name,
      description
    };
    this.todos.push(todo);
    return toPromise(toTodoDto(todo));
  }

  async getAllTodo(): Promise<TodoDto[]> {
    const todos = this.todos.map(todo => toTodoDto(todo));
    return toPromise(todos);
  }

  async updateTodo(id: string, todoDto: TodoDto): Promise<TodoDto> {
    const todo = this.todos.find(todo => todo.id === id);
    if (!todo) {
      throw new HttpException(`Todo item doesn't exist! `, HttpStatus.BAD_REQUEST);
    }
    const { name, description } = todoDto;
    this.todos.forEach(todo => {
      if (todo.id === id) {
        todo.name = name;
        todo.description = description;
      }
    });
    const updatedTodo = this.todos.find(todo => todo.id === id);
    return toPromise(toTodoDto(updatedTodo));
  }

  async destroyTodo(id: string): Promise<TodoDto> {
    const todo = this.todos.find(todo => todo.id === id);
    if (!todo) {
      throw new HttpException(`Todo item doesn't exist! `, HttpStatus.BAD_REQUEST);
    }
    this.todos = this.todos.filter(todo => todo.id !== id);
    return toPromise(toTodoDto(todo));
  }
}
