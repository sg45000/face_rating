import {RandomReplies} from '@prisma/client';

export interface RandomReplyRepositoryInterface {
    findAll(): Promise<RandomReplies[]>
}
