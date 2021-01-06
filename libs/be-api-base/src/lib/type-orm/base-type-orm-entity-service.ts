import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository, DeleteResult, FindManyOptions, FindOneOptions, SaveOptions } from 'typeorm';

import { ResolverFactoryOptions } from '../types/interfaces';

export abstract class BaseTypeORMEntityService<T, CI, UI> {
  protected readonly repository: Repository<T>;
  private readonly options: ResolverFactoryOptions<T>;

  constructor(repository: Repository<T>, options: ResolverFactoryOptions<T> = {}) {
    this.repository = repository;
    this.options = {
      create: {},
      findAll: {},
      findOne: {},
      ...options
    };
  }

  public findAll(options: FindManyOptions<T> = {}): Promise<T[]> {
    return this.repository.find({
      ...this.options.findAll,
      ...options
    });
  }

  public findOne(id: string | number, options: FindOneOptions<T> = {}): Promise<T> {
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      throw new HttpException('ID invalid', HttpStatus.BAD_REQUEST);
    }

    return this.repository.findOne(parsedId, {
      ...this.options.findOne,
      ...options
    });
  }

  public create(item: CI): Promise<T> {
    return this.repository.save(item, this.options.create);
  }

  public async update(id: string | number, item: UI): Promise<T> {
    await this.repository.update(id, item);

    return this.findOne(id);
  }

  public remove(id: string | number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  public count(): Promise<number> {
    return this.repository.count();
  }
}
