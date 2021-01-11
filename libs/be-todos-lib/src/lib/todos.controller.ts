import { Controller } from "@nestjs/common";

import { controllerFactory } from '@serverless-monorepo/be-api-base';
import { TodosService } from "./todos.service";
import { Todo } from './entities/todo.entity';

const BaseController = controllerFactory(Todo)

@Controller('todos')
export class TodosController extends BaseController {
  constructor(private readonly todosService: TodosService) {
    super(todosService);
  }
}
