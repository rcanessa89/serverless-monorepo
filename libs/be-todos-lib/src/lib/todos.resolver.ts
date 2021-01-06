import { Resolver } from '@nestjs/graphql';

import { resolverFactory } from '@serverless-monorepo/be-api-base';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

const BaseResolver = resolverFactory({
  Entity: Todo,
  CreateInput: CreateTodoInput,
  UpdateInput: UpdateTodoInput
});

@Resolver(() => Todo)
export class TodosResolver extends BaseResolver {
  constructor(private readonly todosService: TodosService) {
    super(todosService);
  }
}
