import {HttpService} from '@nestjs/common';
import {AxiosRequestConfig, AxiosResponse} from 'axios';

export abstract class HttpClientBaseService {
    protected constructor(
        protected readonly httpClient: HttpService,
    ) {
    }

    /**
     * getリクエスト
     * @param url
     * @param config
     */
    protected async get<RES>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<RES>> {
        return this.httpClient.get<RES>(url, config).toPromise();
    }

    /**
     * postリクエスト
     * @param url
     * @param data
     * @param config
     */
    protected async post<REQ, RES>(url: string, data: REQ, config?: AxiosRequestConfig): Promise<AxiosResponse<RES>> {
        return this.httpClient.post<RES>(url, data, config).toPromise();
    }

}
