import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {CustLogger} from './logger/logger.service';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useLogger(app.get(CustLogger));
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
