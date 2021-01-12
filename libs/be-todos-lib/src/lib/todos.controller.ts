import { Controller } from '@nestjs/common';

import { controllerSwaggerFactory } from '@serverless-monorepo/be-api-base';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';

const BaseController = controllerSwaggerFactory({
  Entity: Todo
});

@Controller('todos')
export class TodosController extends BaseController {
  constructor(private readonly todosService: TodosService) {
    super(todosService);
  }
}
