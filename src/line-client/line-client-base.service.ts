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

    /**
     *
     * @param messageId
     */
    async getImage(messageId: string): Promise<Buffer> {
        return new Promise(async (resolve, reject) =>{
            const data: Buffer[] = [];
            const stream = await this.client.getMessageContent(messageId);
            stream.on('data', (chunk: Buffer) => {
                data.push(chunk);
            });
            stream.on('error', (err) => {
                console.log('error'+JSON.stringify(err));
            });
            stream.on('end', () => {
                resolve(Buffer.concat(data));
            });
        });
    }

    async pushMessage(user_id :string, messageTemplate: LineTypes.Message | LineTypes.Message[] | LineTypes.FlexMessage) {
        try {
            await this.client.pushMessage(user_id, messageTemplate);
        }catch (e){
        }
    }

}
