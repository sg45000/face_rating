import {Global, Module} from '@nestjs/common';
import {CustLogger} from './logger.service';

@Global()
@Module({
    controllers: [],
    providers  : [CustLogger],
    imports    : [],
    exports    : [CustLogger],
})
export class LoggerModule {}
