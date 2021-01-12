import { Module } from '@nestjs/common';

import { TodosService } from './todos.service';
import { TodosResolver } from './todos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';

import { TodosController } from './todos.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Todo
    ])
  ],
  providers: [
    TodosService
  ],
  controllers: [TodosController]
})
export class TodosModule {}
