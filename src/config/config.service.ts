import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {NodeEnvConsts} from './config.validation';
import {LineConfig} from './config.types';
import {join} from 'path';

@Injectable()
export class CustConfigService {
    constructor(private readonly configService: ConfigService) {
        // 環境変数の初期値設定
        if(this.isDevelopment) {
            process.env.GOOGLE_APPLICATION_CREDENTIALS = join(__dirname, '..', '..', 'env', this.getGcpPkeyName);
        }
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

    get getStorageBucketName(): string {
        return this.configService.get<string>('GCP_STORAGE_BUCKET_NAME');
    }

    get getGcpPkeyName(): string {
        return this.configService.get<string>('GCP_PKEY');
    }

    get getGcpProjectId(): string {
        return this.configService.get<string>('GCP_PROJECT_ID');
    }
}
