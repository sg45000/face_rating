import {Module} from '@nestjs/common';
import {RandomReplyRepository} from './random-reply.repository';
import {PrismaModule} from '../../prisma/prisma.module';

@Module({
    controllers: [],
    providers  : [RandomReplyRepository],
    imports    : [PrismaModule],
    exports    : [RandomReplyRepository],
})
export class RepositoryModule {}
