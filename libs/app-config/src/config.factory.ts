import { ConfigSchema, TConfiguration } from './config.model';
import * as fs from 'fs';
import * as yaml from 'yaml';
import { join } from 'path';

export abstract class ConfigFactory {
  public abstract getConfig(): TConfiguration;

  public getBooleanFromEnv(val: string | undefined | null): boolean {
    return val === 'true' || val === '1';
  }
}

export class EnvConfigFactory extends ConfigFactory {
  constructor() {
    super();
  }

  getConfig(): TConfiguration {
    return {
      name: process.env.APP_NAME,
      dbConfig: {
        mongo: {
          uri: process.env.DB_MONGO_URI,
          authMode:
            process.env.DB_MONGO_AUTH_MODE === 'aws-iam'
              ? 'aws-iam'
              : 'password',
          database: process.env.DB_MONGO_DATABASE,
          enableMigration: this.getBooleanFromEnv(
            process.env.DB_MONGO_ENABLE_MIGRATION,
          ),
          username: process.env.DB_MONGO_USERNAME,
          password: process.env.DB_MONGO_PASSWORD,
          replicaSet: '',
          useSSL: false,
        },
      },
    };
  }
}

export class StaticConfigFactory extends ConfigFactory {
  constructor(private readonly filePath: string) {
    super();
  }

  private configFilePath = this.filePath;

  getConfig() {
    if (!fs.existsSync(this.configFilePath)) {
      throw new Error(
        `local config file not set, please create a config file at  ${join(__dirname, this.configFilePath)}`,
      );
    } else {
      try {
        const fileContents = fs.readFileSync(this.configFilePath, 'utf8');
        const rawData = yaml.parse(fileContents);

        const validatedConfigData = ConfigSchema.parse(rawData);

        return validatedConfigData;
      } catch (e) {
        console.log(e);
        throw new Error(
          `Failed to loading configuration file ${JSON.stringify(e)}`,
        );
      }
    }
  }
}
