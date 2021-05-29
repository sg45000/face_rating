import {Module} from '@nestjs/common';
import {VisionClientService} from './vision-client.service';

@Module({
    controllers: [],
    providers  : [VisionClientService],
    imports    : [],
    exports    : [VisionClientService]
})
export class VisionClientModule {}
