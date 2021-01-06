import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeORMEntityService } from '@serverless-monorepo/be-api-base';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Injectable()
export class TodosService extends BaseTypeORMEntityService<
  Todo,
  CreateTodoInput,
  UpdateTodoInput
> {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>
  ) {
    super(todoRepository);
  }
}
