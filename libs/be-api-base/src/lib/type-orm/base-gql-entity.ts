import {
  BaseEntity as TypeORMBaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType({
  isAbstract: true
})
export abstract class BaseGQLEntity extends TypeORMBaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createdAt?: string;

  @Field()
  @UpdateDateColumn()
  updatedAt?: string;
}
