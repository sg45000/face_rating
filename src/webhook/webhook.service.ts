import {Injectable, ServiceUnavailableException} from '@nestjs/common';
import {PostbackEvent} from '@line/bot-sdk/lib/types';
import {FollowEvent, MessageEvent} from '@line/bot-sdk';
import {LineClientBaseService} from '../line-client/line-client-base.service';
import {VisionClientService} from '../vision-client/vision-client.service';
import {ImageProcessorService} from '../image-processor/image-processor.service';
import {CloudStorageService} from '../cloud-storage/cloud-storage.service';
import {WebhookMessageService} from './webhook-message.service';

@Injectable()
export class WebhookService {
    constructor(
        private readonly lineClient: LineClientBaseService,
        private readonly visionClientService: VisionClientService,
        private readonly imageProcessorService: ImageProcessorService,
        private readonly cloudStorageService: CloudStorageService,
        private readonly webhookMessageService: WebhookMessageService
    ) {
    }



    async postback(event: PostbackEvent): Promise<void> {
        // fixme
        throw new ServiceUnavailableException();
    }

    /**
     *
     * @param event
     */
    async message(event: MessageEvent): Promise<void> {
        switch (event.message.type) {
        case 'text':
            await this.webhookMessageService.text();
            break;

        case 'image':
            await this.webhookMessageService.image(event);
            break;
        }
    }

    async follow(event: FollowEvent): Promise<void> {
        // const userProfile = await this.lineService.getUserProfileFromLine(webhookEvents.events[0].source.userId);
        // await this.lineUserService.upsert(userProfile);
        // await this.lineService.replyMessage(webhookEvents.events[0].replyToken, textMessage(`フォローありがとう！これから${userProfile.displayName}さんの生活をサポートするよ！`));
    }
}
