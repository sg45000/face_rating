import {Body, Controller, Post, ValidationPipe} from '@nestjs/common';
import {WebhookService} from './webhook.service';
import {LineConsts} from '../consts/myConst';
import {FollowEvent, MessageEvent, PostbackEvent} from '@line/bot-sdk';
import {WebhookEventsDto} from './webhookEvents.dto';

@Controller('webhook')
export class WebhookController {
    constructor(private readonly webhookService: WebhookService) {
    }

    /**
     *
     * @param req
     */
    @Post('/')
    async webhook(@Body() req: WebhookEventsDto): Promise<void> {
        for(const event of req.events) {
            switch (event.type) {
            case LineConsts.WebhookEvent.POSTBACK:
                await this.webhookService.postback(event as PostbackEvent);
                break;
            case LineConsts.WebhookEvent.FOLLOW:
                await this.webhookService.follow(event as FollowEvent);
                break;
            case LineConsts.WebhookEvent.MESSAGE:
                await this.webhookService.message(event as MessageEvent);
                break;
            default:
                break;
            }
        }
    }

}
