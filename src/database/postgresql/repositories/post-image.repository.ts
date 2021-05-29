import {PrismaService} from '../../prisma/prisma.service';
import {Injectable} from '@nestjs/common';


@Injectable()
export class PostImageRepository {
    constructor(
        private readonly prismaService: PrismaService,
    ) {
    }

    async create(imageData: string): Promise<void> {
        await this.prismaService.postImages.create({
            data: {
                data: imageData
            }
        });
    }
}
