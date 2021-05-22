import {BaseEntity} from './base.entity';
import {RandomReplies} from '@prisma/client';

export class RandomRepliesEntity extends BaseEntity implements RandomReplies {
    msg: string;
}
