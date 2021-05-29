import {HttpService, Injectable} from '@nestjs/common';
import {HttpClientBaseService} from './http-client-base.service';

@Injectable()
export class LineHttpClientService extends HttpClientBaseService {
    constructor(
        readonly httpClient: HttpService,
    ) {
        super(httpClient);
    }
}
