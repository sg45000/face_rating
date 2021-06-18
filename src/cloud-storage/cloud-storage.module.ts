import {Module} from '@nestjs/common';
import {CloudStorageService} from './cloud-storage.service';
import {CustConfigModule} from '../config/config.module';

@Module({
    controllers: [],
    providers  : [CloudStorageService],
    imports    : [CustConfigModule],
    exports    : [CloudStorageService],
})
export class CloudStorageModule {}
