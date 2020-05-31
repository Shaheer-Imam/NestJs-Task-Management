import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { stringify } from 'querystring';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { fileURLToPath } from 'url';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}
   
    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto) {
        console.log(filterDto);
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto);
        }
        else{
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string){
        return this.tasksService.getTaskbyId(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task{
        //console.log('title',title);
        //console.log('description',description);
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void{
        this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
       @Param('id') id: string,
       @Body('status') status: TaskStatus,
    ): Task{
        return this.tasksService.updateTaskStatus(id,status); 
    }
}
