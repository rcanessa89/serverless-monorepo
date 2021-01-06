import { ObjectType, Field } from '@nestjs/graphql';

import { BaseTypeORMEntity } from '@serverless-monorepo/be-api-base';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class Todo extends BaseTypeORMEntity {
  @Field()
  @Column()
  text: string;
}
