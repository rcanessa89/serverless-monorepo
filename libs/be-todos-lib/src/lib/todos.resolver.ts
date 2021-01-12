import { Resolver } from '@nestjs/graphql';

import { resolverFactory } from '@serverless-monorepo/be-api-base';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';

const BaseResolver = resolverFactory({
  Entity: Todo,
  CreateInput: CreateTodoInput
});

@Resolver(() => Todo)
export class TodosResolver extends BaseResolver {
  constructor(private readonly todosService: TodosService) {
    super(todosService);
  }
}
