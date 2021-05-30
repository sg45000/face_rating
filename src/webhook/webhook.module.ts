import {Module} from '@nestjs/common';
import {WebhookController} from './webhook.controller';
import {WebhookService} from './webhook.service';
import {LineClientModule} from '../line-client/line-client.module';
import {VisionClientModule} from '../vision-client/vision-client.module';
import {ImageProcessorModule} from '../image-processor/image-processor.module';
import {CloudStorageModule} from '../cloud-storage/cloud-storage.module';

@Module({
    imports: [
        LineClientModule,
        VisionClientModule,
        ImageProcessorModule,
        CloudStorageModule,
    ],
    controllers: [WebhookController],
    providers  : [WebhookService],
    exports    : [WebhookService],
})
export class WebhookModule {}
