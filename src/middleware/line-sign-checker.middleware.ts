import {Injectable, NestMiddleware, UnauthorizedException} from '@nestjs/common';
import {NextFunction} from 'express';
import * as crypto from 'crypto';
import {CustConfigService} from '../config/config.service';

@Injectable()
export class LineSignChecker implements NestMiddleware {
    constructor(
       private readonly configService: CustConfigService,
    ) {}

    /**
     * lineのsignature検証
     * @param req
     * @param res
     * @param next
     */
    use(req: Request, res: Response, next: NextFunction): void {
        const signature = crypto
            .createHmac('SHA256', this.configService.getLineConfig.secret)
            .update(Buffer.from(JSON.stringify(req.body))).digest('base64');
        const compareSign = req.headers['x-line-signature'];
        if(signature !== compareSign) {
            throw new UnauthorizedException();
        }
        next();
    }
}
