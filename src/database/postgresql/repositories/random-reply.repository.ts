import {RandomReplyRepositoryInterface} from './random-reply.repository.interface';
import {PrismaService} from '../../prisma/prisma.service';
import {RandomReplies} from '@prisma/client';
import {Injectable} from '@nestjs/common';

@Injectable()
export class RandomReplyRepository implements RandomReplyRepositoryInterface {
    constructor(
        private readonly prismaService: PrismaService,
    ) {
    }
    findAll(): Promise<RandomReplies[]> {
        return this.prismaService.randomReplies.findMany();
    }

}
