import {Injectable, ServiceUnavailableException} from '@nestjs/common';
import {WebhookBaseService} from './webhook-base.service';
import {PostbackEvent} from '@line/bot-sdk/lib/types';
import {FollowEvent, MessageEvent} from '@line/bot-sdk';
import {RandomReplyRepository} from '../database/postgresql/repositories/random-reply.repository';
import {LineClientBaseService} from '../line-client/line-client-base.service';
import {PostImageRepository} from '../database/postgresql/repositories/post-image.repository';
import {VisionClientService} from '../vision-client/vision-client.service';
import {VisionResponseMapper} from '../mappers/gcp/vision-response.mapper';
import {ImageProcessorService} from '../image-processor/image-processor.service';
import * as UUID from 'uuid';
import {CloudStorageService} from '../cloud-storage/cloud-storage.service';
import {FlexMessageGenerator} from '../templates/line/flexMessageGenerator';
import {FlexBubble} from '@line/bot-sdk/dist/types';
import {CarouselMessage} from '../templates/line/carouselMessage';
import {IFaceAnnotation} from '../types/types';

@Injectable()
export class WebhookService extends WebhookBaseService {
    constructor(
        private readonly randomReplyRepository: RandomReplyRepository,
        private readonly lineClient: LineClientBaseService,
        private readonly postImageRepository: PostImageRepository,
        private readonly visionClientService: VisionClientService,
        private readonly imageProcessorService: ImageProcessorService,
        private readonly cloudStorageService: CloudStorageService,
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
        // fixme: 切り分ける
        switch (event.message.type) {
        case 'text':
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
            break;

        case 'image':
            const imgData = await this.lineClient.getImage(event.message.id);
            const annotateImageRes = await this.visionClientService.annotateImage(imgData.toString('base64'));
            if(!annotateImageRes.faceAnnotations.length) {
                // fixme 人を検知しなかったときの処理
                throw new Error();
            }
            const flexBubbleList: FlexBubble[] = [];
            await Promise.all(annotateImageRes.faceAnnotations.map(async (annotation: IFaceAnnotation) => {
                const trimmingImgData = await this.imageProcessorService.trim(imgData, annotation.boundingPoly.vertices!);
                const fileName = `trim/${UUID.v4()}.png`;
                await this.cloudStorageService.putFileByStream(trimmingImgData, fileName);
                const signedUrl = await this.cloudStorageService.generateReadSignedUrl(fileName);
                const response = VisionResponseMapper.rateFacialExpression(annotation);
                flexBubbleList.push(new FlexMessageGenerator(response, signedUrl).genAnnotationMessage);
            }));

            await this.lineClient.replyMessage(event.replyToken, new CarouselMessage(flexBubbleList).genCarouselTemplate());
            break;
        }
    }

    async follow(event: FollowEvent): Promise<void> {
        // const userProfile = await this.lineService.getUserProfileFromLine(webhookEvents.events[0].source.userId);
        // await this.lineUserService.upsert(userProfile);
        // await this.lineService.replyMessage(webhookEvents.events[0].replyToken, textMessage(`フォローありがとう！これから${userProfile.displayName}さんの生活をサポートするよ！`));
    }
}
