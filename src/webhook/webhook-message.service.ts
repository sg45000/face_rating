import {Injectable, ServiceUnavailableException} from '@nestjs/common';
import {MessageEvent} from '@line/bot-sdk';
import {TextMessageGenerator} from '../templates/line/textMessageGenerator';
import {FlexBubble} from '@line/bot-sdk/dist/types';
import {IFaceAnnotation} from '../types/types';
import * as UUID from 'uuid';
import {VisionResponseMapper} from '../mappers/gcp/vision-response.mapper';
import {FlexMessageGenerator} from '../templates/line/flexMessageGenerator';
import {CarouselMessage} from '../templates/line/carouselMessage';
import {LineClientBaseService} from '../line-client/line-client-base.service';
import {VisionClientService} from '../vision-client/vision-client.service';
import {ImageProcessorService} from '../image-processor/image-processor.service';
import {CloudStorageService} from '../cloud-storage/cloud-storage.service';

@Injectable()
export class WebhookMessageService {

    constructor(
        private readonly lineClient: LineClientBaseService,
        private readonly visionClientService: VisionClientService,
        private readonly imageProcessorService: ImageProcessorService,
        private readonly cloudStorageService: CloudStorageService,
    ) {
    }
    
    async text(): Promise<void> {
        throw new ServiceUnavailableException();
        //     const randomMessages = await this.randomReplyRepository.findAll();
        //     if (randomMessages.length > 0) {
        //         const index = Math.floor(Math.random() * (randomMessages.length));
        //         await this.lineClient.replyMessage(
        //             event.replyToken,
        //             {
        //                 type: 'text',
        //                 text: randomMessages[index].msg
        //             }
        //         );
        //     }
    }
    
    /**
     *
     * @param event
     */
    async image(event: MessageEvent): Promise<void> {
        const imgData = await this.lineClient.getImageByMessageId(event.message.id);
        const annotateImageRes = await this.visionClientService.annotateImage(imgData.toString('base64'));
        if(!annotateImageRes.faceAnnotations.length) {
            await this.lineClient.replyMessage(event.replyToken, new TextMessageGenerator('人物を検知できませんでした。').getTextMessageTemplate());
            return;
        }
        const flexBubbleList: FlexBubble[] = [];
        await Promise.all(annotateImageRes.faceAnnotations.map(async (annotation: IFaceAnnotation) => {
            const trimmingImgData = await this.imageProcessorService.trim(imgData, annotation.boundingPoly.vertices!);
            const fileName = `trim/${UUID.v4()}.png`;
            await this.cloudStorageService.putFileByStream(trimmingImgData, fileName);
            const imageUrl = await this.cloudStorageService.getReadSignedUrl(fileName);
            const response = VisionResponseMapper.rateFacialExpression(annotation);
            flexBubbleList.push(new FlexMessageGenerator(response, imageUrl).genAnnotationMessage);
        }));

        await this.lineClient.replyMessage(event.replyToken, new CarouselMessage(flexBubbleList).genCarouselTemplate());
    }
}
