import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config';

interface TRegisterModuleOption {
  configFilePath: string;
}
// @Global() // is this necessary
@Module({})
export class AppConfigModule {
  static forRoot(options: TRegisterModuleOption): DynamicModule {
    const configFn = () => config(options.configFilePath);

    return {
      module: AppConfigModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true, // this sets it as global module and we don't need to import it in other modules
          ignoreEnvFile: true,
          load: [configFn],
        }),
      ],
    };
  }
}
