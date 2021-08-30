// import { TodoDto } from "@todo/dto/todo.dto";
// import { TodoEntity } from "@todo/entity/todo.entity";
import { TaskDto } from "src/task/dto/task.dto";
import { Task } from "src/task/entities/task.entity";

// export const toTodoDto = (data: TodoEntity): TodoDto => {
//   const { id, name, description } = data;
//   const todoDto: TodoDto = { id, name, description };
//   return todoDto;
// }

export const toTaskDto = (data: Task): TaskDto => {
  const { id, name, description } = data;
  const taskDto: TaskDto = { id, name, description };
  return taskDto;
}