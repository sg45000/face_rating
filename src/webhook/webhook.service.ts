import {Injectable, ServiceUnavailableException} from '@nestjs/common';
import {WebhookServiceInterface} from './webhook.service.interface';
import {PostbackEvent} from '@line/bot-sdk/lib/types';
import {FollowEvent, MessageEvent} from '@line/bot-sdk';
import {RandomReplyRepository} from '../database/postgresql/repositories/random-reply.repository';
import {LineClientBaseService} from '../line-client/line-client-base.service';
import {RandomReplyRepositoryInterface} from '../database/postgresql/repositories/random-reply.repository.interface';

@Injectable()
export class WebhookService extends WebhookServiceInterface {
    constructor(
        private readonly randomReplyRepository: RandomReplyRepository,
        private readonly lineClient: LineClientBaseService,
    ) {
        super();
    }



    async postback(event: PostbackEvent): Promise<void> {
        // fixme
        throw new ServiceUnavailableException();
        // const params = plainToClass(PostBackData, JSON.parse(event.postback.data));
        //
        // await this.lineService.pushMessage(process.env.OWNER_ID, TextMessage(params.answer));
        //
        // if(params.next_id) {
        //     const question = await this.questionsService.findOneByPrimaryId(params.next_id);
        //     await this.lineService.replyMessage(
        //         webhookEvents.events[0].replyToken,
        //         customMessage(
        //             question.title,
        //             question.image_url,
        //             question.question_choices.map(q => q.choice_text),
        //             question.question_choices.map(q => q.next_question_id)
        //         ));
        // } else {
        //     await this.lineService.replyMessage(webhookEvents.events[0].replyToken, textMessage('ありがとなすー^^'));
        // }
    }

    /**
     *
     * @param event
     */
    async message(event: MessageEvent): Promise<void> {
        const randomMessages = await this.randomReplyRepository.findAll();
        if (randomMessages.length > 0) {
            const index = Math.floor(Math.random() * (randomMessages.length));
            await this.lineClient.replyMessage(
                event.replyToken,
                {
                    type: 'text',
                    text: randomMessages[index].msg
                }
            );
        }
    }

    async follow(event: FollowEvent): Promise<void> {
        // const userProfile = await this.lineService.getUserProfileFromLine(webhookEvents.events[0].source.userId);
        // await this.lineUserService.upsert(userProfile);
        // await this.lineService.replyMessage(webhookEvents.events[0].replyToken, textMessage(`フォローありがとう！これから${userProfile.displayName}さんの生活をサポートするよ！`));
    }
}
