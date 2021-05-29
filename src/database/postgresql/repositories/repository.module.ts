import {Module} from '@nestjs/common';
import {RandomReplyRepository} from './random-reply.repository';
import {PrismaModule} from '../../prisma/prisma.module';
import {PostImageRepository} from './post-image.repository';

@Module({
    controllers: [],
    providers  : [
        RandomReplyRepository,
        PostImageRepository,
    ],
    imports: [PrismaModule],
    exports: [
        RandomReplyRepository,
        PostImageRepository
    ],
})
export class RepositoryModule {}
