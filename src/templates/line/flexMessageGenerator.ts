import {FlexBox, FlexBubble, FlexCarousel, FlexMessage} from '@line/bot-sdk/dist/types';
import {FacialExpressionRating} from '../../mappers/gcp/vision-response.mapper';

export class FlexMessageGenerator {
    constructor(
        private readonly rating: FacialExpressionRating,
        private readonly signedUrl: string,
    ) {
    }

    genFlexMessage (): FlexMessage {
        return {
            type    : 'flex',
            altText : 'This is a Flex Message',
            contents: this.genAnnotationMessage,

        };
    }

    get genAnnotationMessage (): FlexBubble {
        return {
            type: 'bubble',
            hero: {
                type       : 'image',
                url        : this.signedUrl,
                size       : 'full',
                aspectRatio: '20:13',
                aspectMode : 'cover',
            },
            body: this.getFlexBox,
        };
    }

    private get getFlexBox(): FlexBox {
        return {
            type    : 'box',
            layout  : 'vertical',
            spacing : 'md',
            contents: [
                {
                    type  : 'text',
                    text  : `幸せ度 ${this.rating.joy}点`,
                    weight: 'bold',
                    size  : 'xl'
                }
            ],
        };
    }

}



