import {plainToClass} from 'class-transformer';
import {IsEnum, IsNumber, IsString, validateSync} from 'class-validator';

export class NodeEnvConsts {
    static Development = 'development';
    static Staging = 'staging';
    static Production = 'production';
}

class EnvironmentVariables {
    @IsEnum(NodeEnvConsts)
    NODE_ENV: NodeEnvConsts;

    @IsNumber()
    PORT: number;

    @IsString()
    LINE_CHANNEL_ACCESS_TOKEN: string;

    @IsString()
    LINE_CHANNEL_SECRET: string;
}

export const validate = (config: Record<string, unknown>): EnvironmentVariables => {
    const validatedConfig = plainToClass(
        EnvironmentVariables,
        config,
        {enableImplicitConversion: true},
    );
    const errors = validateSync(validatedConfig, {skipMissingProperties: false});

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
};
