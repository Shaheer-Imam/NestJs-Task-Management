import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class taskStatusValidationPipe implements PipeTransform{
    readonly allowedStatus = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN,
    ];
    
    transform(value: any){
        value = value.toUpperCase();
        
        console.log(value);

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is an invalid status`)
        }
        return value;
    }

    private isStatusValid(status: any){
        const idx = this.allowedStatus.indexOf(status);
        return idx !== -1;
    }
}