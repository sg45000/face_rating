import * as LineTypes from '@line/bot-sdk/lib/types';

export class TextMessageGenerator {
    constructor(private readonly msg: string) {
    }

    getTextMessageTemplate(): LineTypes.Message {
        return {
            type: 'text',
            text: this.msg,
        };
    }
}
