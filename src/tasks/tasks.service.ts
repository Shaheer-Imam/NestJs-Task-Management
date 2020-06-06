import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PromiseUtils } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { TasksModule } from './tasks.module';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository : TaskRepository
    ){}
    /* getAllTasks(): Task[] {
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
    }*/

    async getTaskById(id: number): Promise<Task>{
        const found = await this.taskRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        else{
            return found;
        }
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto);
    }
    
    async deleteTask(id: number): Promise<void>{
        const result = await this.taskRepository.delete(id);
        console.log(result);
        if(result.affected === 0){
            throw new NotFoundException(`'Task with ${id} not found`);
        }
    }
    
    /*
    updateTaskStatus(id: string, status: TaskStatus){
        const task = this.getTaskbyId(id);
        task.status = status;
        return task;
    } */
}
