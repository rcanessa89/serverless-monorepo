import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseEntityService } from '@serverless-monorepo/be-api-base';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';

@Injectable()
export class TodosService extends BaseEntityService<
  Todo,
  CreateTodoInput
> {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>
  ) {
    super(todoRepository);
  }
}
