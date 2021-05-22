import {Module} from '@nestjs/common';
import {WebhookController} from './webhook.controller';
import {WebhookService} from './webhook.service';
import {RepositoryModule} from '../database/postgresql/repositories/repository.module';
import {LineClientModule} from '../line-client/line-client.module';

@Module({
    imports: [
        RepositoryModule,
        LineClientModule,
    ],
    controllers: [WebhookController],
    providers  : [WebhookService],
    exports    : [WebhookService],
})
export class WebhookModule {}
