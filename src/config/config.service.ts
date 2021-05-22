import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {NodeEnvConsts} from './config.validation';

@Injectable()
export class CustConfigService {
    constructor(private readonly configService: ConfigService) {
    }

    get getNodeEnv(): string {
        return this.configService.get<string>('NODE_ENV');
    }

    get isDevelopment(): boolean {
        return this.getNodeEnv === NodeEnvConsts.Development;
    }

    get isStaging(): boolean {
        return this.getNodeEnv === NodeEnvConsts.Staging;
    }

    get isProduction(): boolean {
        return this.getNodeEnv === NodeEnvConsts.Production;
    }

    get getLineConfig(): LineConfig {
        return {
            accessToken: this.configService.get<string>('LINE_CHANNEL_ACCESS_TOKEN'),
            secret     : this.configService.get<string>('LINE_CHANNEL_SECRET'),
        };
    }
}
