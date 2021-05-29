import {Module} from '@nestjs/common';
import {ImageProcessorModule} from '../image-processor/image-processor.module';
import {TestController} from './test.controller';
import {CloudStorageModule} from '../cloud-storage/cloud-storage.module';

@Module({
    controllers: [TestController],
    providers  : [],
    imports    : [
        ImageProcessorModule,
        CloudStorageModule,
    ]
})
export class TestModule {}
