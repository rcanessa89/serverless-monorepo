import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { isProd } from '@serverless-monorepo/utils';

const isProdStage = isProd();

/**
 * Set the base configuration of the TypeORM module configuration
 * to share between the different projects of the mono-repository
 * NOTE: Can be altered depending on the project necessities
 */
const BASE_CONFIG = Object.freeze({
  autoLoadEntities: true,
  migrations: [__dirname + '/migrations/**/*.{.ts,.js}'],
  migrationsRun: isProdStage,
  synchronize: !isProdStage
});

export const baseTypeOrmConfig = (c: Partial<TypeOrmModuleOptions> = {}): TypeOrmModuleOptions & any => ({
  ...BASE_CONFIG,
  ...c
});
