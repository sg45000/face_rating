import {plainToClass} from 'class-transformer';
import {IsEnum, IsString, validateSync} from 'class-validator';

export class NodeEnvConsts {
    static Development = 'development';
    static Staging = 'staging';
    static Production = 'production';
}

class EnvironmentVariables {
    @IsEnum(NodeEnvConsts)
    NODE_ENV: NodeEnvConsts;

    @IsString()
    LINE_CHANNEL_ACCESS_TOKEN: string;

    @IsString()
    LINE_CHANNEL_SECRET: string;

    @IsString()
    GCP_STORAGE_BUCKET_NAME: string;
}

class DevEnvironmentVariables extends EnvironmentVariables {
    @IsString()
    GCP_PKEY: string;

    @IsString()
    GCP_PROJECT_ID: string;
}

export const validate = (config: Record<string, unknown>): EnvironmentVariables => {
    const validatedConfig = plainToClass(
        process.env.NODE_ENV === NodeEnvConsts.Development ? DevEnvironmentVariables : EnvironmentVariables,
        config,
        {enableImplicitConversion: true},
    );
    const errors = validateSync(validatedConfig, {skipMissingProperties: false});

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
};
