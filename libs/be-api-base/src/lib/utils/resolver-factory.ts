import { PipeTransform, Injectable } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';

import { pluralize } from '@serverless-monorepo/utils';
import { ResolverFactoryArgs } from '../types/interfaces';
import { FindOneArgs, FindAllArgs } from '../type-orm/object-types';

@Injectable()
class TransformBodyPipe implements PipeTransform {
  transform(value: any) {
    return JSON.parse(JSON.stringify(value));
  }
}

export function resolverFactory<T, CI, UI extends { id: number }>({
  Entity,
  CreateInput,
  UpdateInput
}: ResolverFactoryArgs<T, CI, UI>): any {
  const lowerFirstLetter = (s): string => {
    return s[0].toLowerCase() + s.slice(1);
  };
  const entityName = Entity.name;
  const createName = `create${entityName}`;
  const findAllName = lowerFirstLetter(pluralize(entityName));
  const findOneName = lowerFirstLetter(entityName);
  const countName = `count${entityName}`;
  const updateName = `update${entityName}`;
  const removeName = `remove${entityName}`;

  @Resolver(() => Entity)
  class BaseResolver {
    protected readonly service;

    constructor(service) {
      this.service = service;
    }

    @Query(() => [Entity], { name: findAllName })
    findAll(@Args(TransformBodyPipe) { options }: FindAllArgs,) {
      console.log(options)

      return this.service.findAll(options);
    }

    @Query(() => Entity, { name: findOneName })
    findOne(@Args() { id, options }: FindOneArgs) {
      return this.service.findOne(id, options);
    }

    @Query(() => Int, { name: countName })
    count() {
      return this.service.count();
    }

    @Mutation(() => Entity, { name: createName })
    create(@Args(lowerFirstLetter(CreateInput.name), { type: () => CreateInput }, TransformBodyPipe) createInput: CI) {
      return this.service.create(createInput);
    }

    @Mutation(() => Entity, { name: updateName })
    update(@Args(lowerFirstLetter(UpdateInput.name), { type: () => UpdateInput }, TransformBodyPipe) updateInput: UI) {
      return this.service.update(updateInput.id, updateInput);
    }

    @Mutation(() => Entity, { name: removeName })
    remove(@Args('id', { type: () => ID }, TransformBodyPipe) id: number) {
      return this.service.remove(id);
    }
  }

  return BaseResolver;
}
