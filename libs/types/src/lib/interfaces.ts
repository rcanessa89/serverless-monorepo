export interface RdsInstanceSecret {
  password: string;
  engine: string;
  port: string;
  dbInstanceIdentifier: string;
  host: string;
  username: string;
}
