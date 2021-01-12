import { ApiProperty } from '@nestjs/swagger';

import { BaseSwaggerEntity } from '@serverless-monorepo/be-api-base';
import { Column, Entity } from 'typeorm';

@Entity()
export class Todo extends BaseSwaggerEntity {
  @ApiProperty()
  @Column()
  text: string;
}
