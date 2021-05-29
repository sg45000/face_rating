import {Module} from '@nestjs/common';
import {ImageProcessorService} from './image-processor.service';
import {LoggerModule} from '../logger/logger.module';

@Module({
    controllers: [],
    providers  : [ImageProcessorService],
    imports    : [LoggerModule], //fixme custLogger
    exports    : [ImageProcessorService],
})
export class ImageProcessorModule {}
