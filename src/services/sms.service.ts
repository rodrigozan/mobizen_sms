import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISendSms } from '../interfaces/global.interfaces'
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root',
})
export class SmsService {
    private apiEnvironment: ISendSms = {
        apiKey: environment.api_mobizen_key,
        apiServer: environment.api_mobizen_url,
        apiVersion: environment.api_mobizen_version,
        format: environment.api_mobizen_format
    };

    constructor(private http: HttpClient) {}

    private createRequestBody(recipient: string, text: string): string {
        return new URLSearchParams({
            recipient,
            text,
            output: this.apiEnvironment.format,
            api: this.apiEnvironment.apiVersion,
            apiKey: this.apiEnvironment.apiKey
        }).toString();
    }

    async sendSms(recipients: string[], text: string): Promise<string[]> {
        const url = `${this.apiEnvironment.apiServer}/service/Message/sendsmsmessage`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });

        const sendRequests = recipients.map(async (recipient) => {
            const body = this.createRequestBody(recipient, text);
            try {                
                const response = await this.http.post<string>(url, body, { headers }).toPromise();
                console.log('response')
                console.log(response);
                console.log('---');               
                
                return response;
            } catch (error) {
                return error.status === 0 
                    ? 'A requisição foi cancelada devido a um timeout.' 
                    : `Erro: ${error.statusText}`;
            }
        });

        return Promise.all(sendRequests);
    }
}
