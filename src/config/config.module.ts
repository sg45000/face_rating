import {Global, Module} from '@nestjs/common';
import {CustConfigService} from './config.service';
import {ConfigModule} from '@nestjs/config';
import {validate} from './config.validation';

@Global()
@Module({
    controllers: [],
    providers  : [CustConfigService],
    imports    : [ConfigModule.forRoot({
        envFilePath  : './env/.env',
        ignoreEnvFile: process.env.NODE_ENV !== 'development',
        validate,
    })],
    exports: [CustConfigService],
})
export class CustConfigModule {}
