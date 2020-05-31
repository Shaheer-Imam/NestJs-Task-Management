import { TaskStatus } from "../tasks.model";

export class GetTasksFilterDto{
    status: TaskStatus;
    search: string;
}