import {BaseEntity} from './base.entity';
import {Users} from '@prisma/client';

export class UsersEntity extends BaseEntity implements Users {
    name: string;
    userId: string;
}
