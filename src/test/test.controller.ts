import {Controller, Get, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {ImageProcessorService} from '../image-processor/image-processor.service';
import {CloudStorageService} from '../cloud-storage/cloud-storage.service';
import * as fs from 'fs';
import {join} from 'path';

@Controller('test')
export class TestController {
    constructor(
        private readonly imageProcessorService: ImageProcessorService,
        private readonly cloudStorageService: CloudStorageService,
    ) {
    }

    @Get('image')
    async testImageProcessor() {
        // this.imageProcessorService.trim();
    }

    @Get('storage')
    async testPushStorage() {
        const data = await fs.readFileSync(join(__dirname, '..', 'tmp', 'test.jpg'));
        await this.cloudStorageService.putFileByStream(data, 'test1.jpg');
    }

    @Get('signature')
    @UsePipes(new ValidationPipe({transform: true}))
    testSignature(@Query() query: {filePath: string}): string {
        const url = this.cloudStorageService.generateReadSignedUrl(query.filePath);
        console.log(url);
        return url;
    }
}
