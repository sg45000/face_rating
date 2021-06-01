import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {NodeEnvConsts} from './config.validation';
import {GcpConfig, LineConfig} from './config.types';

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

    get getGcpConfig(): GcpConfig {
        return {
            clientId: this.configService.get<string>('GCP_CLIENT_ID'),
            secret  : this.configService.get<string>('GCP_CLIENT_SECRET'),
        };
    }

    get getStorageBucketName(): string {
        return this.configService.get<string>('GCP_STORAGE_BUCKET_NAME');
    }

    get getGcpPkeyName(): string {
        return this.configService.get<string>('GCP_PKEY');
    }

    get getServiceAccountName(): string {
        return this.configService.get<string>('SERVICE_ACCOUNT_NAME');
    }
}
