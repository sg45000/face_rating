import {PostbackEvent} from '@line/bot-sdk/lib/types';
import {FollowEvent, MessageEvent} from '@line/bot-sdk';

export abstract class WebhookServiceInterface {

    abstract message(events: MessageEvent): Promise<void>

    abstract postback(events: PostbackEvent): Promise<void>

    abstract follow(events: FollowEvent): Promise<void>
}
