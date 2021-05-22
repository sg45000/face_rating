import {Module} from '@nestjs/common';
import {CustLogger} from './logger.service';

@Module({
    controllers: [],
    providers  : [CustLogger],
    imports    : [],
    exports    : [CustLogger],
})
export class LoggerModule {}
