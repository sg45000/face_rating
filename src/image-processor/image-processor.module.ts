import {Module} from '@nestjs/common';
import {ImageProcessorService} from './image-processor.service';

@Module({
    controllers: [],
    providers  : [ImageProcessorService],
    imports    : [],
    exports    : [ImageProcessorService],
})
export class ImageProcessorModule {}
