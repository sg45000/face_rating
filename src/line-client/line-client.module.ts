import {Module} from '@nestjs/common';
import {LineClientBaseService} from './line-client-base.service';

@Module({
    controllers: [],
    providers  : [LineClientBaseService],
    imports    : [],
    exports    : [LineClientBaseService],
})
export class LineClientModule {}
