import {Client} from '@line/bot-sdk';
import * as LineTypes from '@line/bot-sdk/lib/types';
import {CustConfigService} from '../config/config.service';
import {Injectable} from '@nestjs/common';

@Injectable()
export class LineClientBaseService {
    private readonly client: Client;
    constructor(
        private readonly custConfigService: CustConfigService,
    ) {
        this.client = new Client({
            channelSecret     : this.custConfigService.getLineConfig.secret,
            channelAccessToken: this.custConfigService.getLineConfig.accessToken,
        });
    }

    async replyMessage(replyToken: string, messageTemplate: LineTypes.Message | LineTypes.Message[] | LineTypes.FlexMessage): Promise<LineTypes.MessageAPIResponseBase> {
        return await this.client.replyMessage(replyToken, messageTemplate);
    }

}
