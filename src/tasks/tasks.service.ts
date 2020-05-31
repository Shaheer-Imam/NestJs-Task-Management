import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    
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
    }

    getTaskbyId(id: string): Task{
        const found = this.tasks.find(task => task.id === id);

        if(!found){
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        else{
            return found;
        }
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
        const found = this.getTaskbyId(id);
      this.tasks = this.tasks.filter(task => task.id !== id)
    }

    updateTaskStatus(id: string, status: TaskStatus){
        const task = this.getTaskbyId(id);
        task.status = status;
        return task;
    } */
}
