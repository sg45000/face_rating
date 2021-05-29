import {Injectable} from '@nestjs/common';
import * as vision from '@google-cloud/vision';
import {IAnnotateImageResponse} from '../types/types';

@Injectable()
export class VisionClientService {
    private readonly client: vision.v1.ImageAnnotatorClient
    constructor() {
        this.client = new vision.ImageAnnotatorClient();
    }

    /**
     *
     * @param imageBase64
     */
    async annotateImage(imageBase64: string): Promise<IAnnotateImageResponse> {
        const [result] = await this.client.annotateImage(
            {
                image   : {content: imageBase64},
                features: [
                    {
                        type      : 'FACE_DETECTION',
                        maxResults: 10,
                    }
                ]
            }
        );
        console.log(JSON.stringify(result.faceAnnotations));
        return result;
    }
}
