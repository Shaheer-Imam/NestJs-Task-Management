import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { stringify } from 'querystring';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { fileURLToPath } from 'url';
import { taskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}
   
    /* @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto) {
        console.log(filterDto);
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto);
        }
        else{
            return this.tasksService.getAllTasks();
        }
    }*/

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task>{
        return this.tasksService.getTaskById(id);
    }

    
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task>{
        //console.log('title',title);
        //console.log('description',description);
        return this.tasksService.createTask(createTaskDto);
    }

    
    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.tasksService.deleteTask(id);
    }

    /*
    @Patch('/:id/status')
    updateTaskStatus(
       @Param('id') id: string,
       @Body('status',taskStatusValidationPipe) status: TaskStatus,
    ): Task{
        return this.tasksService.updateTaskStatus(id,status); 
    } */
}
