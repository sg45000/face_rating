import {Injectable} from '@nestjs/common';
import {Bucket, Storage} from '@google-cloud/storage';
import {CustConfigService} from '../config/config.service';
import {CustLogger} from '../logger/logger.service';
import {join} from 'path';
import * as crypto from 'crypto';
import {V4Signature} from './model/v4Signature';

@Injectable()
export class CloudStorageService {
    private readonly client: Storage;
    private readonly myBucket: Bucket;
    constructor(
        private readonly custConfig: CustConfigService,
        private readonly custLogger: CustLogger,
    ) {
        const option = this.custConfig.isDevelopment 
            ? {
                projectId  : 'wedding-313300',
                keyFilename: join(__dirname, '..', '..', 'env', this.custConfig.getGcpPkeyName),
            }
            : undefined;

        this.client = new Storage(option);
        this.myBucket = this.client.bucket(this.custConfig.getStorageBucketName);
    }

    /**
     *
     * @param data
     * @param fileName
     */
    async putFileByStream(data: Buffer, fileName: string): Promise<void> {
        this.custLogger.log('start put file.');
        try {
            await this.myBucket.file(fileName).save(data);
            this.custLogger.log('succeed put file.');
        } catch (err) {
            this.custLogger.error(JSON.stringify(err));
            throw new Error();
        }
    }

    async getReadSignedUrl(filePath: string): Promise<string> {
        // Get a v4 signed URL for reading the file
        this.custLogger.log('start generating read signed url.');
        try {
            this.custLogger.log(JSON.stringify(await this.client.getServiceAccount()));
            const [url] = await this.myBucket
                .file(filePath)
                .getSignedUrl({
                    version: 'v4',
                    action : 'read',
                    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
                });
            this.custLogger.log(`Generated GET signed URL: ${url}`);
            return url;
        } catch (e) {
            this.custLogger.error(JSON.stringify(e));
            throw new Error('failed to generating read signed url.');
        }
    }

    /**
     *
     * @param filePath
     */
    generateReadSignedUrl(filePath: string): string {
        const v4Sign = new V4Signature(filePath, this.custConfig.getServiceAccountName);
        return  v4Sign.generateSignedUrl;
    }
}
