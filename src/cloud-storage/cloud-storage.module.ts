import {Module} from '@nestjs/common';
import {CloudStorageService} from './cloud-storage.service';
import {CustConfigModule} from '../config/config.module';
import {LoggerModule} from '../logger/logger.module';

@Module({
    controllers: [],
    providers  : [CloudStorageService],
    imports    : [CustConfigModule, LoggerModule], //fixme custLogger
    exports    : [CloudStorageService],
})
export class CloudStorageModule {}
