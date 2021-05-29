import {Injectable} from '@nestjs/common';
import {Bucket, Storage} from '@google-cloud/storage';
import {CustConfigService} from '../config/config.service';
import {CustLogger} from '../logger/logger.service';
import * as fs from 'fs';
import {join} from 'path';

@Injectable()
export class CloudStorageService {
    private readonly client: Storage;
    private readonly myBucket: Bucket;
    constructor(
        private readonly custConfig: CustConfigService,
        private readonly custLogger: CustLogger,
    ) {
        this.client = new Storage(
            { // fixme 認証わからん
                projectId  : 'wedding-313300',
                keyFilename: join(__dirname, '..', '..', 'gcp_pkey.json'),
            }
        );
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
        } catch (err) {
            this.custLogger.error(JSON.stringify(err));
            throw new Error();
        }
    }

    /**
     *
     * @param filePath
     */
    async generateReadSignedUrl(filePath: string): Promise<string> {
        // Get a v4 signed URL for reading the file
        const [url] = await this.myBucket
            .file(filePath)
            .getSignedUrl({
                version: 'v4',
                action : 'read',
                expires: Date.now() + 15 * 60 * 1000, // 15 minutes
            });

        this.custLogger.log(`Generated GET signed URL: ${url}`);
        return url;
    }
}
