import {FlexBubble, FlexCarousel, FlexMessage} from '@line/bot-sdk/dist/types';

export class CarouselMessage {
    constructor(
        private readonly bubbles: FlexBubble[],
    ) {
    }

    genCarouselTemplate(): FlexMessage {
        return {
            type    : 'flex',
            altText : 'This is a Flex Message',
            contents: this.genCarousel(),
        };
    }

    genCarousel(): FlexCarousel {
        return {
            type    : 'carousel',
            contents: this.bubbles,
        };
    }
}
