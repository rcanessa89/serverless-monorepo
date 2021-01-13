import * as sst from "@serverless-stack/resources";
import { config } from 'dotenv';
import { resolve } from 'path';

import { VpcStack } from './VpcStack';
import { AuroraClusterStack } from './AuroraClusterStack';

config({ path: resolve(process.cwd(), '../.env') });

export default function main(app: sst.App): void {
  const vpcEntity = new VpcStack(app, 'VpcStack');

  new AuroraClusterStack(app, 'AuroraClusterStack', {
    vpc: vpcEntity.vpc
  });
}
