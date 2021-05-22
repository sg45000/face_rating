import {MiddlewareConsumer, Module, NestModule, ValidationPipe} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {LineSignChecker} from './middleware/line-sign-checker.middleware';
import {WebhookController} from './webhook/webhook.controller';
import {WebhookModule} from './webhook/webhook.module';
import {CustConfigModule} from './config/config.module';
import {LoggerModule} from './logger/logger.module';
import {AccessLogger} from './middleware/access-logger.middleware';
import {APP_PIPE} from '@nestjs/core';

@Module({
    imports: [
        CustConfigModule,
        LoggerModule,
        WebhookModule,
    ],
    controllers: [AppController],
    providers  : [
        AppService,
        {
            provide : APP_PIPE,
            useClass: ValidationPipe,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LineSignChecker)
            .forRoutes(WebhookController)
            .apply(AccessLogger)
            .forRoutes('/');
    }
}
