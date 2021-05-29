import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import * as fs from 'fs';
import * as path from 'path';
import * as iconv from 'iconv-lite'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

  @Get()
    async getHello(): Promise<string> {
        const data = await fs.readFileSync(path.join(__dirname, '..','src', 'tmp', 'test.png'), 'base64');
        // const str = iconv.decode(data, 'UTF-32');
        return this.appService.getHello();
    }
}
