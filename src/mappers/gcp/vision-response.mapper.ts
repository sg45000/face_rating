import {IFaceAnnotation, LikelihoodType} from '../../types/types';
import {google} from '@google-cloud/vision/build/protos/protos';
import Likelihood = google.cloud.vision.v1.Likelihood;

export interface FacialExpressionRating {
    joy: number;
    sorrow: number;
    anger: number;
    surprise: number;
    underExposed: number;
    blurred: number;
    headwear: number;
}

export class VisionResponseMapper {

    /**
     * 表情分析結果を評価する
     * @param faceAnnotation
     */
    static rateFacialExpression(faceAnnotation: IFaceAnnotation): FacialExpressionRating {
        const detectionConfidence = faceAnnotation.detectionConfidence;
        return {
            joy         : VisionResponseMapper.weightingLikelihood(faceAnnotation.joyLikelihood, detectionConfidence),
            sorrow      : VisionResponseMapper.weightingLikelihood(faceAnnotation.sorrowLikelihood, detectionConfidence),
            anger       : VisionResponseMapper.weightingLikelihood(faceAnnotation.angerLikelihood, detectionConfidence),
            surprise    : VisionResponseMapper.weightingLikelihood(faceAnnotation.surpriseLikelihood, detectionConfidence),
            underExposed: VisionResponseMapper.weightingLikelihood(faceAnnotation.underExposedLikelihood, detectionConfidence),
            blurred     : VisionResponseMapper.weightingLikelihood(faceAnnotation.blurredLikelihood, detectionConfidence),
            headwear    : VisionResponseMapper.weightingLikelihood(faceAnnotation.headwearLikelihood, detectionConfidence),
        };
    }

    /**
     * 表情分析結果の重み付けをする
     * @param likelihood
     * @param detectionConfidence
     * @private
     */
    private static weightingLikelihood(likelihood: LikelihoodType, detectionConfidence: number): number {
        if(typeof likelihood !== 'string') {
            //fixme エラー内容
            throw new Error();
        }
        const weight = Likelihood[likelihood] * 2 * 10;
        return Math.floor(weight * detectionConfidence);
    }

}
