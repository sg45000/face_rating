import {Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction} from 'express';
import {CustLogger} from '../logger/logger.service';

@Injectable()
export class AccessLogger implements NestMiddleware {
    constructor(
        private readonly custLogger: CustLogger,
    ) {
    }
    use(req: Request, res: Response, next: NextFunction): void {
        this.custLogger.log(`request to... ${req.method} ${req.url}`);
        next();
    }
}
