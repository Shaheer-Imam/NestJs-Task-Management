import { Injectable } from '@nestjs/common';
import { TaskStatus, Task } from './tasks.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto){
        const {status, search} = filterDto;
        let tasks = this.getAllTasks();
        if(status){
            tasks = tasks.filter(task => task.status === status);
        }
        if(search){
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
        }
        return tasks;
    }

    getTaskbyId(id: string): Task{
        return this.tasks.find(task => task.id === id);
    }
 
    createTask(createTaskDto: CreateTaskDto): Task{
        const {title,description} = createTaskDto;

        const task: Task={
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };
        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): void{
      this.tasks = this.tasks.filter(task => task.id !== id)
    }

    updateTaskStatus(id: string, status: TaskStatus){
        const task = this.getTaskbyId(id);
        task.status = status;
        return task;
    }
}
