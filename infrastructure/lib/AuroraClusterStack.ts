import { Stack, App, StackProps } from '@serverless-stack/resources';
import { Vpc, SubnetType, Peer, Port } from '@aws-cdk/aws-ec2';
import { DatabaseInstance, ServerlessCluster, DatabaseClusterEngine } from '@aws-cdk/aws-rds';
import { CfnOutput } from '@aws-cdk/core';

export interface AuroraClusterStackProps extends StackProps {
  vpc: Vpc;
}

export class AuroraClusterStack extends Stack {
  readonly mySQLRDSInstance: DatabaseInstance;
  readonly auroraCluster: ServerlessCluster;

  constructor(scope: App, id: string, props: AuroraClusterStackProps) {
    super(scope, id, props);

    this.auroraCluster = new ServerlessCluster(this, 'auroraCluster', {
      engine: DatabaseClusterEngine.AURORA_MYSQL,
      vpc: props.vpc,
      clusterIdentifier: 'aurora-test',
      defaultDatabaseName: 'ServerlessMonorepo',
      deletionProtection: false,
      enableDataApi: true,
      vpcSubnets: { subnetType: SubnetType.PUBLIC },
    });

    this.auroraCluster.connections.securityGroups[0].addIngressRule(Peer.ipv4('0.0.0.0/0'), Port.tcp(3306));

    if (this.auroraCluster.secret?.secretValue) {
      new CfnOutput(this, 'dbSecret', {
        value: `${this.auroraCluster.secret.secretValue.toString()}`,
        exportName: scope.logicalPrefixedName('dbSecret')
      });
    }

    new CfnOutput(this, 'securityGroupId', {
      value: this.auroraCluster.connections.securityGroups[0].securityGroupId,
      exportName: scope.logicalPrefixedName('securityGroupId')
    });

    new CfnOutput(this, 'subnetId', {
      value: props.vpc.publicSubnets[0].subnetId,
      exportName: scope.logicalPrefixedName('subnetId')
    });
  }
}
