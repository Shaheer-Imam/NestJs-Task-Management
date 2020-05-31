import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class taskRepository extends Repository<Task>{

}