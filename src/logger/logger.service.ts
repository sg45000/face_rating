import {Injectable, Logger} from '@nestjs/common';

@Injectable()
export class CustLogger extends Logger {

    log(message: any, context?: string) {
        super.log(message, context);
    }

    debug(message: any, context?: string) {
        super.debug(message, context);
    }

    warn(message: any, context?: string) {
        super.warn(message, context);
    }

    error(message: any, trace?: string, context?: string) {
        super.error(message, trace, context);
    }
}
