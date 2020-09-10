
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import Config from '@fuse/services/api.service';

@Injectable()
export class LoginService{

    constructor(
        private http: HttpClient,
    ) {}

    getModuleByRole(roleId): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(Config.API_MASTERDATA_GET_MODULE_BY_ROLE + '?roleId=' + roleId)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    loginByUsername(data): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(Config.API_LOGIN_USERNAME, data)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    loginByToken(data): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(Config.API_LOGIN_TOKEN, data)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
