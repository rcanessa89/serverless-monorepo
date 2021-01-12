import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { TodosModule } from '@serverless-monorepo/be-todos-lib';
import { baseGraphQlConfig, baseTypeOrmConfig } from '@serverless-monorepo/be-api-base';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(baseTypeOrmConfig({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Admin123',
      database: 'serverless-monorepo'
    })),
    TodosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
