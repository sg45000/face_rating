import * as vision from '@google-cloud/vision';

export type IAnnotateImageResponse = vision.protos.google.cloud.vision.v1.IAnnotateImageResponse;
export type IFaceAnnotation = vision.protos.google.cloud.vision.v1.IFaceAnnotation;
export type LikelihoodType = keyof typeof vision.protos.google.cloud.vision.v1.Likelihood | vision.protos.google.cloud.vision.v1.Likelihood;
export type IVertex = vision.protos.google.cloud.vision.v1.IVertex
