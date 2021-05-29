import {Injectable} from '@nestjs/common';
import * as sharp from 'sharp';
import {IVertex} from '../types/types';
import {OutputInfo, Region} from 'sharp';
import {CustLogger} from '../logger/logger.service';

@Injectable()
export class ImageProcessorService {
    constructor(
        private readonly custLogger: CustLogger,
    ) {
    }
    async trim(data: Buffer, vertexes: NonNullable<IVertex[]>): Promise<Buffer> {
        const region = this.getRegion(vertexes);
        console.log(JSON.stringify(region));

        return new Promise((resolve, reject)=>{
            sharp(data)
                .extract(region)
                .toBuffer((err: Error, buffer: Buffer, info: OutputInfo) => {
                    if (err) {
                        this.custLogger.error(JSON.stringify(err)); // fixme errorParse
                        reject();
                    }
                    if (info) {
                        this.custLogger.log(JSON.stringify(info)); // fixme logParse
                    }
                    resolve(buffer);
                });
        });

    }

    private getRegion(vertexes: NonNullable<IVertex>[]): Region {
        const xList = vertexes.map(v => v.x);
        const yList = vertexes.map(v => v.y);
        const top = Math.floor(yList.reduce((a,c) => Math.min(a,c), 10000));
        const height = Math.floor(yList.reduce((a,c) => Math.max(a,c), 0)) - top;
        const left = Math.floor(xList.reduce((a,c) => Math.min(a,c), 10000));
        const width = Math.floor(xList.reduce((a,c) => Math.max(a,c), 0)) - left;

        return {top, height, left, width};
    }
}
