import * as crypto from 'crypto';

export class V4Signature {
    private readonly hostname = 'https://storage.googleapis.com';
    private readonly algorithm = 'GOOG4-RSA-SHA256';
    private readonly location = 'auto';
    private readonly service = 'storage';
    private readonly requestType = 'goog4_request';
    private readonly httpVerb = 'GET';
    private readonly startDate: string;
    private readonly authScope: string;
    private readonly credential: string;
    private readonly startDateTime: string;
    constructor(
        private readonly pathToResource: string,
        private readonly serviceAccountName: string,
    ) {
        const date = new Date();
        this.startDate = date.getUTCFullYear().toString() + (date.getUTCMonth() + 1).toString().padStart(2, '0') + date.getUTCDate().toString();
        this.startDateTime = `${this.startDate}T${date.getUTCHours().toString().padStart(2, '0')}${date.getUTCMinutes().toString().padStart(2, '0')}${date.getUTCSeconds().toString().padStart(2, '0')}Z`;
        this.authScope = `${this.startDate}/${this.location}/${this.service}/${this.requestType}`;
        this.credential = `${this.serviceAccountName}/${this.authScope}`;
    }

    get generateSignedUrl(): string {
        return `${this.hostname}/${this.pathToResource}?${this.getCanonicalQueryString}&X-Goog-Signature=${this.getSignature}`;
    }

    private get getSignature(): string {
        const hashedCanonicalRequest = crypto.createHash('RSA-SHA256').update(Buffer.from(this.getCanonicalRequests)).digest('hex');
        console.log('hash ' + hashedCanonicalRequest);
        const signTargetStr = `${this.algorithm}\n${this.startDateTime}\n${this.authScope}\n${hashedCanonicalRequest}`;
        return crypto.createHash('RSA-SHA256').update(Buffer.from(signTargetStr)).digest('hex');
    }

    private get getCanonicalRequests(): string {
        const signedHeaders = 'content-type;host';
        return `${this.httpVerb}\n${this.pathToResource}\n${this.getCanonicalQueryString}\nhost:${this.hostname}\n\n${signedHeaders}\nUNSIGNED-PAYLOAD`;
    }

    private get getCanonicalQueryString(): string {
        const expires = '604800';
        const signedHeaders = 'host';

        return `X-Goog-Algorithm=${this.algorithm}&X-Goog-Credential=${this.credential}&X-Goog-Date=${this.startDateTime}&X-Goog-Expires=${expires}&X-Goog-SignedHeaders=${signedHeaders}`;
    }
}
